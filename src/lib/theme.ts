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

/** Puts the `dark` class on <html> (or removes it) for a preference. */
function applyTheme(preference: ThemePreference) {
  const dark = preference === "dark" || (preference === "system" && darkQuery().matches);
  document.documentElement.classList.toggle("dark", dark);
}

/* A tiny "store": components subscribe to it and re-render on change. */
const listeners = new Set<() => void>();

function notify() {
  applyTheme(getThemePreference());
  listeners.forEach((listener) => listener());
}

/** Saves the visitor's choice and applies it immediately. */
export function setThemePreference(preference: ThemePreference) {
  try {
    if (preference === "system") localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, preference);
  } catch {
    // Storage blocked: the theme still changes, it just is not remembered.
    applyTheme(preference);
    return;
  }
  notify();
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
