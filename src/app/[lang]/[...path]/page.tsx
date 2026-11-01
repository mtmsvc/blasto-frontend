import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { pageViews } from "@/components/pages";
import { CategoryPage } from "@/components/pages/category-page";
import { categoryIds, findCategory } from "@/content/site";
import { getDictionary } from "@/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { categoryPathsByLocale, pageFromSlug, pages, type PageKey } from "@/i18n/routes";
import { pageMetadata } from "@/lib/metadata";

/**
 * Every page except the home page.
 *
 * The URLs are translated, so folder names cannot describe them. Instead
 * this one "catch-all" route (`[...path]`) receives every address and
 * decides what to show:
 *
 *   /lv/kontakti/        path = ["kontakti"]           → the contacts page
 *   /ru/kategorii/b/     path = ["kategorii", "b"]      → the category B page
 *
 * Pages are listed in src/i18n/routes.ts, their components are in
 * src/components/pages/.
 */

/** Every address of a language, as path segments. */
export function generateStaticParams({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) return [];
  const lang = params.lang;
  const coursesSlug = pages.courses[lang];
  return [
    // The pages: ["kontakti"], ["kategorijas"], …
    ...(Object.keys(pages) as PageKey[])
      .filter((page) => page !== "home")
      .map((page) => ({ path: [pages[page][lang]] })),
    // The category pages: ["kategorijas", "b"], …
    ...categoryIds.map((id) => ({ path: [coursesSlug, id] })),
  ];
}
// Any other address is "page not found".
export const dynamicParams = false;

type Resolved =
  | { lang: Locale; kind: "page"; page: Exclude<PageKey, "home"> }
  | { lang: Locale; kind: "category"; category: NonNullable<ReturnType<typeof findCategory>> };

/** Works out what an address points to, or shows "page not found". */
async function resolve(params: Promise<{ lang: string; path: string[] }>): Promise<Resolved> {
  const { lang, path } = await params;
  if (!isLocale(lang)) notFound();
  const [slug = "", sub, ...rest] = path;
  const page = pageFromSlug(lang, slug);
  if (!page || page === "home" || rest.length > 0) notFound();

  if (sub === undefined) return { lang, kind: "page", page };

  const category = page === "courses" ? findCategory(sub) : undefined;
  if (!category) notFound();
  return { lang, kind: "category", category };
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/[...path]">): Promise<Metadata> {
  const resolved = await resolve(params);
  const { lang } = resolved;
  const dict = getDictionary(lang);

  if (resolved.kind === "page") {
    const { page } = resolved;
    return pageMetadata({ lang, page, ...pageViews[page].meta(dict) });
  }

  const { category } = resolved;
  const text = dict.categoryPages.items[category.id];
  return pageMetadata({
    lang,
    page: "courses",
    paths: categoryPathsByLocale(category.id),
    title: `${text.title}: ${dict.courses.items[category.id].name}`,
    description: text.intro,
  });
}

export default async function Page({ params }: PageProps<"/[lang]/[...path]">) {
  const resolved = await resolve(params);
  const dict = getDictionary(resolved.lang);

  if (resolved.kind === "category") {
    return <CategoryPage lang={resolved.lang} dict={dict} category={resolved.category} />;
  }
  const { Component } = pageViews[resolved.page];
  return <Component lang={resolved.lang} dict={dict} />;
}
