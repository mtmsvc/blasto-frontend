/**
 * Light / dark theme.
 *
 * - By default the site follows the device setting (`prefers-color-scheme`).
 * - The theme menu lets the visitor override it. The choice is saved in
 *   localStorage and used on every later visit.
 * - The dark theme is switched on by the `dark` class on <html>; the colors
 *   for it are in src/app/globals.css.
 *
 * Avoiding a "flash" of the wrong theme: the HTML files are built in advance
 * and do not know the visitor's choice. So `themeScript` (below) runs in
 * <head>, before the page is painted, and sets the class right away.
 */

export type ThemePreference = "light" | "dark" | "system";

const STORAGE_KEY = "theme";

/** How long the circle animation of a theme change takes, in milliseconds.
 *  Bigger = slower. */
export const THEME_ANIMATION_MS = 900;

/**
 * Inline script placed in <head> of every page. It must be tiny, have no
 * imports, and never throw (localStorage can be blocked), so it is plain
 * old JavaScript in a string. Keep it in sync with `applyTheme()` below.
 */
export const themeScript = `(function () {
  try {
    var stored = localStorage.getItem("${STORAGE_KEY}");
    var dark = stored === "dark" ||
      (stored !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
  } catch (e) {}
})();`;

const darkQuery = () => window.matchMedia("(prefers-color-scheme: dark)");

/** Reads the saved choice. Anything unexpected counts as "system". */
export function getThemePreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    return "system"; // storage blocked (e.g. strict privacy mode)
  }
}

/** Whether a preference means "dark" right now. */
function isDark(preference: ThemePreference) {
  return preference === "dark" || (preference === "system" && darkQuery().matches);
}

/**
 * Puts the `dark` class on <html> (or removes it) for a preference.
 *
 * While the class changes, the `theme-switching` class turns off all CSS
 * transitions (see globals.css). Otherwise elements with a hover
 * transition (buttons, links) would fade to their new colors a moment
 * later than the rest of the page.
 */
function applyTheme(preference: ThemePreference) {
  const root = document.documentElement;
  root.classList.add("theme-switching");
  root.classList.toggle("dark", isDark(preference));
  // Reading a style forces the browser to apply the new colors now,
  // while transitions are still off.
  void getComputedStyle(root).color;
  requestAnimationFrame(() => root.classList.remove("theme-switching"));
}

/* A tiny "store": components subscribe to it and re-render on change. */
const listeners = new Set<() => void>();

function notify() {
  applyTheme(getThemePreference());
  listeners.forEach((listener) => listener());
}

/** Saves the choice. Returns false when storage is blocked. */
function storePreference(preference: ThemePreference): boolean {
  try {
    if (preference === "system") localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, preference);
    return true;
  } catch {
    return false; // storage blocked: the theme still changes, it just is not remembered
  }
}

/**
 * Saves the visitor's choice and applies it.
 *
 * If `origin` (a point on the screen, usually the theme button) is given
 * and the colors really change, the new theme is revealed as a circle
 * growing from that point. How it works, and why it is cheap:
 *
 * - `document.startViewTransition` takes a picture of the page, applies the
 *   change, and lets us animate from the old picture to the new page.
 * - We animate only a `clip-path` circle on the new page. The browser does
 *   this on the graphics card, in about half a second, without
 *   re-rendering the page. Even old phones handle it smoothly.
 * - Browsers without this feature, and visitors who asked their device for
 *   reduced motion, get an instant switch instead.
 */
export function setThemePreference(preference: ThemePreference, origin?: { x: number; y: number }) {
  const commit = () => {
    if (storePreference(preference)) notify();
    else applyTheme(preference);
  };

  const colorsChange = isDark(preference) !== document.documentElement.classList.contains("dark");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!origin || !colorsChange || reducedMotion || !document.startViewTransition) {
    commit();
    return;
  }

  const transition = document.startViewTransition(commit);
  transition.ready
    .then(() => {
      // Radius that reaches the farthest corner of the screen.
      const radius = Math.hypot(
        Math.max(origin.x, window.innerWidth - origin.x),
        Math.max(origin.y, window.innerHeight - origin.y),
      );
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${origin.x}px ${origin.y}px)`,
            `circle(${radius}px at ${origin.x}px ${origin.y}px)`,
          ],
        },
        {
          duration: THEME_ANIMATION_MS,
          easing: "cubic-bezier(0.65, 0, 0.35, 1)", // gentle start and finish
          pseudoElement: "::view-transition-new(root)",
        },
      );
    })
    .catch(() => {
      // The transition was skipped (e.g. the tab was hidden): the theme has
      // already been applied by `commit`, so there is nothing to do.
    });
}

/**
 * Subscribes to theme changes, in the format React's
 * `useSyncExternalStore` expects. Also reacts to:
 * - the device switching between light and dark (when on "system"),
 * - the choice being changed in another browser tab.
 */
export function subscribeToTheme(listener: () => void) {
  listeners.add(listener);
  const media = darkQuery();
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) notify();
  };
  media.addEventListener("change", notify);
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    media.removeEventListener("change", notify);
    window.removeEventListener("storage", onStorage);
  };
}
