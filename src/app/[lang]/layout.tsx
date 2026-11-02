import type { Metadata, Viewport } from "next";

import "../globals.css";
import { BackgroundDecor } from "@/components/layout/background-decor";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { ReadyMarker } from "@/components/layout/ready-marker";
import { GlassSpotlight } from "@/components/layout/glass-spotlight";
import { getDictionary } from "@/dictionaries";
import { locales } from "@/i18n/config";
import { getLocale } from "@/i18n/params";
import { themeScript } from "@/lib/theme";
import { site } from "@/content/site";

/**
 * Root layout of every page: /lv/…, /ru/… and /en/….
 * It lives in the `[lang]` folder so that `<html lang>` is correct for each
 * language.
 */

// Build one version of the site per language…
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
// …and treat any other value (e.g. /de/) as "page not found".
export const dynamicParams = false;

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const lang = await getLocale(params);
  const dict = getDictionary(lang);

  return {
    // Makes relative URLs (canonical, hreflang, Open Graph) absolute.
    metadataBase: new URL(site.url),
    title: { default: site.name, template: `%s · ${site.name}` },
    description: dict.meta.description,
    applicationName: site.name,
  };
}

export const viewport: Viewport = {
  // Browser UI color on phones; matches the --background token.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#deeee3" },
    { media: "(prefers-color-scheme: dark)", color: "#0b110e" },
  ],
};

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const lang = await getLocale(params);
  const dict = getDictionary(lang);

  return (
    // The theme script changes the `class` of <html> before React loads;
    // `suppressHydrationWarning` tells React that this difference is expected.
    // `data-scroll-behavior="smooth"` tells Next.js to switch off the smooth
    // scrolling from globals.css during page changes, so pages never
    // visibly slide.
    <html lang={lang} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* Must run before the page is painted, to avoid a flash of the
            wrong theme. See src/lib/theme.ts. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        {/* First thing keyboard users reach with Tab: jumps over the menu. */}
        <a
          href="#main"
          className="sr-only rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
        >
          {dict.common.skipToContent}
        </a>
        <BackgroundDecor />
        <SiteHeader lang={lang} dict={dict} />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter lang={lang} dict={dict} />
        <ScrollToTop />
        <ReadyMarker />
        <GlassSpotlight />
      </body>
    </html>
  );
}
