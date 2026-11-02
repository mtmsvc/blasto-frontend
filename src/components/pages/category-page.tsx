import Link from "next/link";
import {
  ArrowRightIcon,
  BookOpenIcon,
  ChevronRightIcon,
  ClipboardCheckIcon,
  GraduationCapIcon,
  PhoneIcon,
  RouteIcon,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { IconBubble } from "@/components/sections/icon-bubble";
import { categoryMinimumTotal, categoryPriceRows } from "@/components/courses/category-prices";
import { categories, phoneHref, site, type Category } from "@/content/site";
import { formatPrice } from "@/i18n/format";
import { categoryPath, pagePath } from "@/i18n/routes";
import type { PageViewProps } from ".";

type SectionKey = "requirements" | "theory" | "practice" | "exams";

/** Icon for each section of a category page. */
const sectionIcons: Record<SectionKey, LucideIcon> = {
  requirements: ClipboardCheckIcon,
  theory: BookOpenIcon,
  practice: RouteIcon,
  exams: GraduationCapIcon,
};

/**
 * One licence category in detail: /lv/kategorijas/b/, /ru/kategorii/b/…
 * Texts are in the dictionaries under `categoryPages.items`, prices in
 * src/content/site.ts.
 */
export function CategoryPage({ lang, dict, category }: PageViewProps & { category: Category }) {
  const texts = dict.categoryPages;
  const page = texts.items[category.id];
  const name = dict.courses.items[category.id].name;
  const priceRows = categoryPriceRows(category, lang, dict.courses);
  const total = categoryMinimumTotal(category);
  const coursesPath = pagePath(lang, "courses");
  const applyPath = `${pagePath(lang, "apply")}?category=${category.id}`;

  return (
    <>
      <Container className="pt-10 sm:pt-16">
        {/* Breadcrumb: Courses & prices › Category B */}
        <nav aria-label={dict.common.breadcrumb}>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            <li>
              <Link href={coursesPath} className="hover:text-foreground">
                {dict.nav.courses}
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRightIcon className="size-4" />
            </li>
            <li aria-current="page" className="text-foreground">
              {page.title}
            </li>
          </ol>
        </nav>

        <div className="mt-8 flex items-center gap-5">
          <span
            aria-hidden
            className="grid size-16 shrink-0 place-items-center rounded-2xl bg-secondary text-2xl font-semibold text-secondary-foreground sm:size-20 sm:text-3xl"
          >
            {category.label}
          </span>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
              {page.title}
            </h1>
            {/* The vehicle type, e.g. "Car". Skipped when it would repeat the
                title (code 95). */}
            {name !== page.title && <p className="mt-1 text-lg text-muted-foreground">{name}</p>}
          </div>
        </div>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
          {page.intro}
        </p>
      </Container>

      <Container className="mt-12 grid items-start gap-6 lg:grid-cols-[1fr_22rem]">
        {/* Costs and Apply. First in the page order, so on phones they come
            right after the intro; on large screens they move to the right
            column and stay in view while scrolling. */}
        <aside
          aria-labelledby="costs-title"
          className="lg:sticky lg:top-28 lg:col-start-2 lg:row-start-1"
        >
          <Card className="gap-5">
            <h2 id="costs-title" className="text-lg font-semibold">
              {texts.costs}
            </h2>
            {priceRows.length > 0 ? (
              <dl className="flex flex-col gap-2 text-sm">
                {priceRows.map((row) => (
                  <div key={row.label} className="flex items-baseline justify-between gap-3">
                    <dt className="text-muted-foreground">{row.label}</dt>
                    <dd className="font-semibold whitespace-nowrap">{row.value}</dd>
                  </div>
                ))}
                {total !== null && (
                  <div className="mt-2 flex items-baseline justify-between gap-3 border-t border-border pt-3 text-base">
                    <dt className="font-semibold">{texts.total}</dt>
                    <dd className="font-semibold whitespace-nowrap">{formatPrice(total, lang)}</dd>
                  </div>
                )}
              </dl>
            ) : (
              <p className="font-semibold">{dict.courses.priceOnRequest}</p>
            )}
            <p className="text-sm text-muted-foreground">
              {texts.totalNote}{" "}
              <Link href={`${coursesPath}#extras`} className="prose-link text-foreground">
                {texts.extrasLink}
              </Link>
            </p>
            <Button asChild size="lg" className="w-full">
              <Link href={applyPath}>
                {dict.courses.apply}
                <ArrowRightIcon aria-hidden />
              </Link>
            </Button>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
              <PhoneIcon className="size-4" aria-hidden />
              {dict.apply.aside.question}
              <a href={phoneHref} className="prose-link text-foreground">
                {site.phone}
              </a>
            </p>
          </Card>
        </aside>
        {/* What you need, theory, driving, exams */}
        <div className="flex flex-col gap-4 lg:col-start-1 lg:row-start-1">
          {(Object.keys(sectionIcons) as SectionKey[]).map((key) => (
            <Card key={key} className="gap-3">
              <div className="flex items-center gap-4">
                <IconBubble icon={sectionIcons[key]} />
                <h2 className="text-lg font-semibold">{texts.sections[key]}</h2>
              </div>
              {/* On larger screens the text lines up with the heading. */}
              <div className="flex flex-col gap-2 sm:pl-15">
                {page[key].map((paragraph) => (
                  <p key={paragraph} className="leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Container>

      {/* Links to the other categories */}
      <Container className="mt-20">
        <h2 className="text-lg font-semibold">{texts.otherCategories}</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {categories
            .filter((other) => other.id !== category.id)
            .map((other) => (
              <li key={other.id}>
                <Link
                  href={categoryPath(lang, other.id)}
                  className="flex h-11 items-center gap-2 rounded-full border border-border bg-background/60 px-4 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <span className="font-semibold">{other.label}</span>
                  <span className="text-muted-foreground">{dict.courses.items[other.id].name}</span>
                </Link>
              </li>
            ))}
        </ul>
      </Container>
    </>
  );
}
