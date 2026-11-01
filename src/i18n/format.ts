import type { Locale } from "./config";

/**
 * Formats a price in euros the way each language expects:
 *   formatPrice(120, "lv") → "120 €"
 *   formatPrice(120, "en") → "€120"
 * Cents are only shown when the amount has them (e.g. 32.50).
 */
export function formatPrice(amount: number, lang: Locale): string {
  return new Intl.NumberFormat(lang, {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Fills `{placeholders}` in a dictionary text:
 *   fill("Pieteikties {category} kategorijai", { category: "B" })
 *     → "Pieteikties B kategorijai"
 */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

/**
 * Joins items with "or" in the right way for each language:
 *   formatList(["C1", "D1", "C"], "lv") → "C1, D1 vai C"
 *   formatList(["C1", "D1", "C"], "en") → "C1, D1, or C"
 */
export function formatList(items: string[], lang: Locale): string {
  return new Intl.ListFormat(lang, { type: "disjunction" }).format(items);
}
