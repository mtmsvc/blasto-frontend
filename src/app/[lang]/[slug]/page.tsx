import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { pageViews } from "@/components/pages";
import { getDictionary } from "@/dictionaries";
import { isLocale } from "@/i18n/config";
import { pageFromSlug, pages, type PageKey } from "@/i18n/routes";
import { pageMetadata } from "@/lib/metadata";

/**
 * Every page except the home page: /lv/kategorijas/, /ru/kontakty/,
 * /en/privacy-policy/…
 *
 * The URL slugs are translated, so one dynamic route serves them all:
 * it looks up which page the slug belongs to (src/i18n/routes.ts) and
 * renders that page's component (src/components/pages/).
 */

// Build every (language, slug) pair, e.g. { lang: "ru", slug: "kontakty" }.
// `params` holds the parent's `lang`, provided by the [lang] layout.
export function generateStaticParams({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) return [];
  const lang = params.lang;
  return (Object.keys(pages) as PageKey[])
    .filter((page) => page !== "home")
    .map((page) => ({ slug: pages[page][lang] }));
}
// Any other slug is "page not found".
export const dynamicParams = false;

/** Turns the URL params into a language and a page key, or 404s. */
async function resolve(params: Promise<{ lang: string; slug: string }>) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const page = pageFromSlug(lang, slug);
  if (!page || page === "home") notFound();
  return { lang, page };
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[slug]">): Promise<Metadata> {
  const { lang, page } = await resolve(params);
  return pageMetadata({ lang, page, ...pageViews[page].meta(getDictionary(lang)) });
}

export default async function Page({ params }: PageProps<"/[lang]/[slug]">) {
  const { lang, page } = await resolve(params);
  const { Component } = pageViews[page];
  return <Component lang={lang} dict={getDictionary(lang)} />;
}
