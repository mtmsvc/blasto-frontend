/**
 * Language settings for the whole site.
 *
 * Every page exists once per language, under its own path:
 *   /lv/…  Latvian (default, the root "/" redirects here)
 *   /ru/…  Russian
 *   /en/…  English
 *
 * To add a language: add its code to `locales`, fill in the three maps
 * below, and create src/dictionaries/<code>.ts (TypeScript will tell you
 * every place that still needs it).
 */

export const locales = ["lv", "ru", "en"] as const;

/** A supported language code: "lv" | "ru" | "en". */
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "lv";

/** Type guard: turns a plain string (e.g. from the URL) into a `Locale`. */
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Each language's name, written in that language (for the switcher). */
export const localeNames: Record<Locale, string> = {
  lv: "Latviešu",
  ru: "Русский",
  en: "English",
};

/** Short labels shown on the language switcher buttons. */
export const localeLabels: Record<Locale, string> = {
  lv: "LV",
  ru: "RU",
  en: "EN",
};

/** Locale codes for Open Graph tags (link previews in messengers). */
export const openGraphLocales: Record<Locale, string> = {
  lv: "lv_LV",
  ru: "ru_RU",
  en: "en_US",
};
