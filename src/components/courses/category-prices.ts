import { fill, formatPrice } from "@/i18n/format";
import type { Category } from "@/content/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/dictionaries";

export type PriceRow = { label: string; value: string };

/**
 * The price list of a category, as label/value rows. Used by both the card
 * on the courses page and the category page, so they always match.
 * Returns an empty list for "price on request" categories.
 */
export function categoryPriceRows(
  category: Category,
  lang: Locale,
  texts: Dictionary["courses"],
): PriceRow[] {
  const { prices } = category;
  if (!prices) return [];

  const rows: PriceRow[] = [
    { label: texts.documents, value: formatPrice(prices.documents, lang) },
    { label: texts.theory, value: formatPrice(prices.theory, lang) },
    { label: texts.drivingHour, value: formatPrice(prices.drivingHour, lang) },
  ];
  if (prices.minDrivingHours) {
    rows.push({
      label: fill(texts.minDriving, { hours: prices.minDrivingHours }),
      value: formatPrice(prices.minDrivingHours * prices.drivingHour, lang),
    });
  }
  return rows;
}

/**
 * The smallest total the school charges: paperwork + theory + minimum
 * driving. `null` when there is no minimum (or no price).
 */
export function categoryMinimumTotal(category: Category): number | null {
  const { prices } = category;
  if (!prices || !prices.minDrivingHours) return null;
  return prices.documents + prices.theory + prices.minDrivingHours * prices.drivingHour;
}
