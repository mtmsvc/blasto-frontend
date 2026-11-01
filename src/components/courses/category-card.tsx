import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fill, formatList, formatPrice } from "@/i18n/format";
import { pagePath } from "@/i18n/routes";
import type { Category } from "@/content/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/dictionaries";

/**
 * One licence category: what it allows, age and requirements, prices, and
 * an Apply button. The button opens the form with this category already
 * ticked (e.g. /lv/pieteikums/?category=b).
 */
export function CategoryCard({
  category,
  lang,
  dict,
}: {
  category: Category;
  lang: Locale;
  dict: Dictionary;
}) {
  const texts = dict.courses;
  const { name, text } = texts.items[category.id];
  const { startAge, examAge, requires, prices } = category;

  // "16+" when the course and the exam have the same age limit,
  // otherwise "training 16+, exam 18+".
  const age =
    startAge === null || examAge === null
      ? null
      : startAge === examAge
        ? `${startAge}+`
        : fill(texts.ageRange, { start: startAge, exam: examAge });

  // Rows of the price list. A row is left out when it does not apply.
  const priceRows: { label: string; value: string }[] = prices
    ? [
        { label: texts.documents, value: formatPrice(prices.documents, lang) },
        { label: texts.theory, value: formatPrice(prices.theory, lang) },
        { label: texts.drivingHour, value: formatPrice(prices.drivingHour, lang) },
        ...(prices.minDrivingHours
          ? [
              {
                label: fill(texts.minDriving, { hours: prices.minDrivingHours }),
                value: formatPrice(prices.minDrivingHours * prices.drivingHour, lang),
              },
            ]
          : []),
      ]
    : [];

  return (
    // `id` lets other pages link straight to this card: …/kategorijas/#category-b
    <Card id={`category-${category.id}`} className="h-full scroll-mt-28 gap-5">
      <span className="grid size-14 place-items-center rounded-2xl bg-secondary text-xl font-semibold text-secondary-foreground">
        {category.label}
      </span>

      <div>
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
      </div>

      {(age || requires) && (
        <div className="flex flex-wrap gap-1.5">
          {age && (
            <Badge variant="outline" className="rounded-lg whitespace-normal">
              {texts.age}: {age}
            </Badge>
          )}
          {requires && (
            <Badge variant="outline" className="rounded-lg whitespace-normal">
              {fill(texts.requires, { list: formatList(requires, lang) })}
            </Badge>
          )}
        </div>
      )}

      <dl className="mt-auto flex flex-col gap-2 border-t border-border pt-4 text-sm">
        {prices ? (
          priceRows.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-3">
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd className="font-semibold whitespace-nowrap">{row.value}</dd>
            </div>
          ))
        ) : (
          <div>
            <dt className="sr-only">{texts.theory}</dt>
            <dd className="font-semibold">{texts.priceOnRequest}</dd>
          </div>
        )}
      </dl>

      <Button asChild variant="secondary" className="w-full">
        <Link
          href={`${pagePath(lang, "apply")}?category=${category.id}`}
          aria-label={fill(texts.applyFor, { category: category.label })}
        >
          {texts.apply}
        </Link>
      </Button>
    </Card>
  );
}
