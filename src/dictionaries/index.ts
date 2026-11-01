/**
 * Entry point for all translated texts.
 *
 *   const dict = getDictionary("ru");
 *   dict.nav.courses // → "Курсы и цены"
 *
 * Dictionaries are used in Server Components, so they are rendered into the
 * HTML at build time and are not shipped to the browser as JavaScript.
 * When a Client Component needs a few texts, pass just those as props
 * (e.g. `labels={dict.common.theme}`), not the whole dictionary.
 */

import type { Locale } from "@/i18n/config";
import lv from "./lv";
import ru from "./ru";
import en from "./en";

/** The shape of a dictionary, taken from the Latvian one. */
export type Dictionary = typeof lv;

const dictionaries: Record<Locale, Dictionary> = { lv, ru, en };

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}
