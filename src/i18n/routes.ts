import { locales, type Locale } from "./config";

/**
 * All pages of the site, in menu order.
 * The value is the URL segment after the language: "courses" → /lv/courses/.
 * The home page has an empty segment: /lv/.
 *
 * To add a page: add it here, create src/app/[lang]/<segment>/page.tsx,
 * and add its menu label under `nav` in every dictionary.
 */
export const pages = {
  home: "",
  courses: "courses",
  teachers: "teachers",
  contacts: "contacts",
  apply: "apply",
} as const;

export type PageKey = keyof typeof pages;

/** Pages shown in the main menu (the Apply page has its own button). */
export const menuPages = [
  "home",
  "courses",
  "teachers",
  "contacts",
] as const satisfies readonly PageKey[];

/**
 * Builds the URL of a page in a language.
 *   pagePath("ru", "courses") → "/ru/courses/"
 *   pagePath("lv", "home")    → "/lv/"
 * URLs end with "/" because the site is exported with `trailingSlash: true`.
 */
export function pagePath(lang: Locale, page: PageKey): string {
  const segment = pages[page];
  return segment ? `/${lang}/${segment}/` : `/${lang}/`;
}

/**
 * The same page in every language, for hreflang tags and the sitemap.
 *   { lv: "/lv/courses/", ru: "/ru/courses/", en: "/en/courses/" }
 */
export function pagePathsByLocale(page: PageKey): Record<Locale, string> {
  return Object.fromEntries(locales.map((lang) => [lang, pagePath(lang, page)])) as Record<
    Locale,
    string
  >;
}

/**
 * Swaps the language part of a path, keeping the rest:
 *   switchLocaleInPath("/lv/courses/", "en") → "/en/courses/"
 * Used by the language switcher, which only knows the current URL.
 */
export function switchLocaleInPath(pathname: string, lang: Locale): string {
  const parts = pathname.split("/"); // "/lv/courses/" → ["", "lv", "courses", ""]
  parts[1] = lang;
  const path = parts.join("/");
  return path.endsWith("/") ? path : `${path}/`;
}
