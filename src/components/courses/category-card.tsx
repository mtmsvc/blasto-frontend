import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fill, formatPrice } from "@/i18n/format";
import { pagePath } from "@/i18n/routes";
import type { Category } from "@/content/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/dictionaries";

/**
 * One licence category with its prices and an Apply button.
 * The button opens the form with this category already ticked
 * (/lv/apply/?category=b).
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

  return (
    // `id` lets other pages link straight to this card: /lv/courses/#category-b
    <Card id={`category-${category.id}`} className="h-full scroll-mt-28 gap-5">
      <div className="flex items-start justify-between gap-3">
        <span className="grid size-14 place-items-center rounded-2xl bg-secondary text-xl font-semibold text-secondary-foreground">
          {category.label}
        </span>
        <Badge variant="outline">
          {texts.minAge}: {category.minAge}+
        </Badge>
      </div>

      <div>
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
      </div>

      <dl className="mt-auto flex flex-col gap-2 border-t border-border pt-4 text-sm">
        <div className="flex items-baseline justify-between gap-3">
          <dt className="text-muted-foreground">{texts.theory}</dt>
          <dd className="font-semibold">{formatPrice(category.theoryPrice, lang)}</dd>
        </div>
        {/* Theory-only courses (e.g. code 95) have no driving lessons. */}
        {category.lessonPrice !== null && (
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-muted-foreground">{texts.lesson}</dt>
            <dd className="font-semibold">{formatPrice(category.lessonPrice, lang)}</dd>
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
