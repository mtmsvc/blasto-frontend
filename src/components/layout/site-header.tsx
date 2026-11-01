import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavLinks } from "./nav-links";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";
import { menuPages, pagePath } from "@/i18n/routes";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/dictionaries";

/**
 * Sticky header: a floating glass bar.
 *
 * What is visible at which width (Tailwind breakpoints):
 *   < 640px   logo · theme · menu button
 *   ≥ 640px   + language switcher + Apply button   (sm:)
 *   ≥ 1024px  + full menu, the menu button hides   (lg:)
 */
export function SiteHeader({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const items = menuPages.map((page) => ({ href: pagePath(lang, page), label: dict.nav[page] }));
  const apply = { href: pagePath(lang, "apply"), label: dict.nav.apply };

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-4">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 rounded-2xl glass pr-2 pl-4 sm:pr-3 sm:pl-5">
        <Link
          href={pagePath(lang, "home")}
          aria-label={dict.common.homeLink}
          className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <Logo />
        </Link>

        <nav aria-label={dict.common.menu} className="ml-6 hidden lg:block">
          <NavLinks items={items} className="flex items-center gap-1" />
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <LanguageSwitcher
            current={lang}
            label={dict.common.language}
            className="mr-1 hidden sm:block"
          />
          <ThemeToggle labels={dict.common.theme} />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href={apply.href}>{apply.label}</Link>
          </Button>
          <MobileNav
            lang={lang}
            items={items}
            apply={apply}
            labels={{
              menu: dict.common.menu,
              openMenu: dict.common.openMenu,
              closeMenu: dict.common.closeMenu,
              language: dict.common.language,
            }}
            className="lg:hidden"
          />
        </div>
      </div>
    </header>
  );
}
