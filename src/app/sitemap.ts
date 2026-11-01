import type { MetadataRoute } from "next";

import { locales } from "@/i18n/config";
import { pagePath, pagePathsByLocale, pages, type PageKey } from "@/i18n/routes";
import { site } from "@/content/site";

// Generate the file once at build time (required for a static export).
export const dynamic = "force-static";

/** /sitemap.xml: every page in every language, with hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const absolute = (path: string) => new URL(path, site.url).toString();

  return (Object.keys(pages) as PageKey[]).flatMap((page) =>
    locales.map((lang) => ({
      url: absolute(pagePath(lang, page)),
      alternates: {
        languages: Object.fromEntries(
          Object.entries(pagePathsByLocale(page)).map(([l, path]) => [l, absolute(path)]),
        ),
      },
    })),
  );
}
