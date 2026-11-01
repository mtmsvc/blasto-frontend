import type { Metadata } from "next";

import { defaultLocale, locales, openGraphLocales, type Locale } from "@/i18n/config";
import { pagePath, pagePathsByLocale, type PageKey } from "@/i18n/routes";
import { site } from "@/content/site";

/**
 * Builds the <head> tags of a page: title, description, canonical URL,
 * hreflang links to the same page in the other languages, and Open Graph
 * tags for link previews.
 *
 *   export async function generateMetadata({ params }) {
 *     const lang = await getLocale(params);
 *     const dict = getDictionary(lang);
 *     return pageMetadata({ lang, page: "courses", ...dict.courses.meta });
 *   }
 *
 * The resulting hreflang tags look like:
 *   <link rel="alternate" hreflang="lv" href="https://blasto.lv/lv/courses/">
 *   <link rel="alternate" hreflang="ru" href="https://blasto.lv/ru/courses/">
 *   <link rel="alternate" hreflang="en" href="https://blasto.lv/en/courses/">
 *   <link rel="alternate" hreflang="x-default" href="https://blasto.lv/lv/courses/">
 * (URLs become absolute thanks to `metadataBase` in the [lang] layout.)
 */
export function pageMetadata({
  lang,
  page,
  title,
  description,
}: {
  lang: Locale;
  page: PageKey;
  title: string;
  description: string;
}): Metadata {
  const url = pagePath(lang, page);
  // The home page shows its title as is; other pages get " · Blasto" added
  // by the title template in the layout.
  const isHome = page === "home";

  return {
    title: isHome ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...pagePathsByLocale(page),
        "x-default": pagePath(defaultLocale, page),
      },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url,
      locale: openGraphLocales[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => openGraphLocales[l]),
    },
  };
}
