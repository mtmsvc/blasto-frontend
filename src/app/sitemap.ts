import type { MetadataRoute } from "next";

import { locales, type Locale } from "@/i18n/config";
import { categoryPathsByLocale, pagePathsByLocale, pages, type PageKey } from "@/i18n/routes";
import { categoryIds, site } from "@/content/site";

// Generate the file once at build time (required for a static export).
export const dynamic = "force-static";

/** /sitemap.xml: every page in every language, with hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const absolute = (path: string) => new URL(path, site.url).toString();

  // One entry per language for a page that exists in all three languages.
  const entries = (paths: Record<Locale, string>) =>
    locales.map((lang) => ({
      url: absolute(paths[lang]),
      alternates: {
        languages: Object.fromEntries(locales.map((other) => [other, absolute(paths[other])])),
      },
    }));

  return [
    ...(Object.keys(pages) as PageKey[]).flatMap((page) => entries(pagePathsByLocale(page))),
    ...categoryIds.flatMap((id) => entries(categoryPathsByLocale(id))),
  ];
}
