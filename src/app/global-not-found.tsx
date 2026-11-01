import type { Metadata } from "next";

import "./globals.css";
import { BackgroundDecor } from "@/components/layout/background-decor";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/dictionaries";
import { locales } from "@/i18n/config";
import { pagePath } from "@/i18n/routes";
import { themeScript } from "@/lib/theme";
import { site } from "@/content/site";

/**
 * The 404 page (exported as out/404.html; configure your web server to use
 * it for missing pages, see README).
 *
 * The URL that was not found may have no valid language in it, so this page
 * shows its message in all three languages.
 */

export const metadata: Metadata = {
  title: `404 · ${site.name}`,
};

export default function GlobalNotFound() {
  return (
    <html lang="lv" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <BackgroundDecor />
        <Container className="flex flex-1 flex-col justify-center gap-12 py-16">
          <a
            href={pagePath("lv", "home")}
            className="self-start rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <Logo />
          </a>
          <p aria-hidden className="text-7xl font-semibold tracking-tight text-muted-foreground">
            404
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {locales.map((lang) => {
              const texts = getDictionary(lang).notFound;
              return (
                <section
                  key={lang}
                  lang={lang}
                  className="flex flex-col gap-3 rounded-2xl glass p-6"
                >
                  {lang === "lv" ? (
                    <h1 className="text-xl font-semibold">{texts.title}</h1>
                  ) : (
                    <h2 className="text-xl font-semibold">{texts.title}</h2>
                  )}
                  <p className="text-muted-foreground">{texts.text}</p>
                  <Button asChild variant="secondary" className="mt-auto self-start">
                    <a href={pagePath(lang, "home")}>{texts.home}</a>
                  </Button>
                </section>
              );
            })}
          </div>
        </Container>
      </body>
    </html>
  );
}
