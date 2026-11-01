import { notFound } from "next/navigation";

import { isLocale, type Locale } from "./config";

/**
 * Reads the language from a page's `params` (the `[lang]` part of the URL).
 *
 *   export default async function Page({ params }: PageProps<"/[lang]">) {
 *     const lang = await getLocale(params);
 *   }
 *
 * Only "lv", "ru" and "en" pages are built (see `generateStaticParams` in
 * src/app/[lang]/layout.tsx), so the `notFound()` branch is a safety net
 * that also narrows the type from `string` to `Locale`.
 */
export async function getLocale(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return lang;
}
