import { locales, type Locale } from "./config";

/**
 * All pages of the site and their URL in each language.
 *
 *   courses → /lv/kategorijas/  /ru/kategorii/  /en/courses/
 *
 * The home page has an empty slug: /lv/, /ru/, /en/.
 *
 * To add a page:
 *   1. add it here with a slug for every language,
 *   2. create its component in src/components/pages/ and register it in
 *      src/components/pages/index.ts,
 *   3. add its menu label under `nav` in every dictionary.
 *
 * Changing a slug changes the page's address. If the site is already live,
 * add a redirect from the old address on the web server (see README).
 */
export const pages = {
  home: { lv: "", ru: "", en: "" },
  courses: { lv: "kategorijas", ru: "kategorii", en: "courses" },
  teachers: { lv: "pasniedzeji", ru: "prepodavateli", en: "teachers" },
  contacts: { lv: "kontakti", ru: "kontakty", en: "contacts" },
  apply: { lv: "pieteikums", ru: "zayavka", en: "apply" },
  privacy: { lv: "privatuma-politika", ru: "politika-konfidencialnosti", en: "privacy-policy" },
  rules: { lv: "ieksejas-kartibas-noteikumi", ru: "pravila", en: "school-rules" },
} as const satisfies Record<string, Record<Locale, string>>;

export type PageKey = keyof typeof pages;

/** Pages shown in the main menu (the Apply page has its own button). */
export const menuPages = [
  "home",
  "courses",
  "teachers",
  "contacts",
] as const satisfies readonly PageKey[];

/** Legal documents, linked at the bottom of the footer. */
export const legalPages = ["privacy", "rules"] as const satisfies readonly PageKey[];

/**
 * Builds the URL of a page in a language.
 *   pagePath("ru", "courses") → "/ru/kategorii/"
 *   pagePath("lv", "home")    → "/lv/"
 * URLs end with "/" because the site is exported with `trailingSlash: true`.
 */
export function pagePath(lang: Locale, page: PageKey): string {
  const slug = pages[page][lang];
  return slug ? `/${lang}/${slug}/` : `/${lang}/`;
}

/**
 * The same page in every language, for hreflang tags and the sitemap.
 *   { lv: "/lv/kategorijas/", ru: "/ru/kategorii/", en: "/en/courses/" }
 */
export function pagePathsByLocale(page: PageKey): Record<Locale, string> {
  return Object.fromEntries(locales.map((lang) => [lang, pagePath(lang, page)])) as Record<
    Locale,
    string
  >;
}

/** Finds which page a slug belongs to: ("ru", "kategorii") → "courses". */
export function pageFromSlug(lang: Locale, slug: string): PageKey | undefined {
  return (Object.keys(pages) as PageKey[]).find((page) => pages[page][lang] === slug);
}

/**
 * The URL of the current page in another language. Used by the language
 * switcher, which only knows the current URL:
 *   switchLocaleInPath("/lv/kategorijas/", "ru") → "/ru/kategorii/"
 * Unknown paths fall back to the other language's home page.
 */
export function switchLocaleInPath(pathname: string, lang: Locale): string {
  const [, currentLang = "", slug = ""] = pathname.split("/"); // "/lv/kontakti/" → ["", "lv", "kontakti", ""]
  const current = (locales as readonly string[]).includes(currentLang)
    ? (currentLang as Locale)
    : undefined;
  const page = current ? pageFromSlug(current, slug) : undefined;
  return pagePath(lang, page ?? "home");
}
