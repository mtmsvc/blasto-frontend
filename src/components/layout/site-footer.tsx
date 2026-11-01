import Link from "next/link";

import { Container } from "./container";
import { Logo } from "./logo";
import { LanguageSwitcher } from "./language-switcher";
import { legalPages, menuPages, pagePath } from "@/i18n/routes";
import { phoneHref, site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/dictionaries";

export function SiteFooter({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  // The year is taken when the site is built. Rebuild once a year to update.
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-background/60">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
        <div className="flex flex-col items-start gap-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">{dict.footer.tagline}</p>
          <LanguageSwitcher current={lang} label={dict.common.language} className="self-start" />
        </div>

        <nav aria-labelledby="footer-pages">
          <h2 id="footer-pages" className="text-sm font-semibold">
            {dict.footer.pages}
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            {[...menuPages, "apply" as const].map((page) => (
              <li key={page}>
                <Link
                  href={pagePath(lang, page)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {dict.nav[page]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold">{dict.footer.contacts}</h2>
          <address className="mt-4 flex flex-col gap-2.5 text-sm text-muted-foreground not-italic">
            <a href={phoneHref} className="hover:text-foreground">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="hover:text-foreground">
              {site.email}
            </a>
            <span>
              {site.address.street}, {site.address.city}
            </span>
          </address>
        </div>
      </Container>

      <Container className="flex flex-col gap-3 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.legalName}. {dict.footer.rights}
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {legalPages.map((page) => (
            <li key={page}>
              <Link href={pagePath(lang, page)} className="hover:text-foreground">
                {dict.nav[page]}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
