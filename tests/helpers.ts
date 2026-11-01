import type { Page } from "@playwright/test";

import { categoryIds } from "@/content/site";
import { locales, type Locale } from "@/i18n/config";
import { categoryPath, pagePath, pages, type PageKey } from "@/i18n/routes";

/**
 * Every page of the site in every language, built from the same lists the
 * site uses (src/i18n/routes.ts, src/content/site.ts). Add a page there and
 * it is tested automatically.
 */
export const allUrls: { lang: Locale; url: string }[] = locales.flatMap((lang) => [
  ...(Object.keys(pages) as PageKey[]).map((page) => ({ lang, url: pagePath(lang, page) })),
  ...categoryIds.map((id) => ({ lang, url: categoryPath(lang, id) })),
]);

/** Collects console errors of a page, to assert that there are none. */
export function collectConsoleErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(String(error)));
  return errors;
}

/** Current vertical scroll position, rounded. */
export async function scrollY(page: Page): Promise<number> {
  return page.evaluate(() => Math.round(window.scrollY));
}

/** Scrolls without animation. */
export async function scrollTo(page: Page, y: number) {
  await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
}
