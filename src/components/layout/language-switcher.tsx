"use client";

import { usePathname } from "next/navigation";

import { locales, localeLabels, localeNames, type Locale } from "@/i18n/config";
import { switchLocaleInPath } from "@/i18n/routes";
import { cn } from "@/lib/utils";

/**
 * LV / RU / EN switcher. Each link leads to the *same page* in the other
 * language (e.g. /lv/courses/ → /ru/courses/).
 *
 * Plain <a> links are used on purpose (not next/link): changing the language
 * changes the <html lang> of the whole document, so a normal full page load
 * is the simplest and most reliable way.
 *
 * The switcher appears in the header, the mobile menu and the footer. Only
 * the header one is a navigation landmark (`landmark`, the default);
 * the others are plain groups, so screen readers do not list several
 * identical "Language" navigation regions.
 */
export function LanguageSwitcher({
  current,
  label,
  landmark = true,
  className,
}: {
  current: Locale;
  /** Accessible name of the group, e.g. "Language". */
  label: string;
  /** Render as a <nav> landmark (header) or as a plain group (elsewhere). */
  landmark?: boolean;
  className?: string;
}) {
  const pathname = usePathname();
  const Wrapper = landmark ? "nav" : "div";

  return (
    <Wrapper role={landmark ? undefined : "group"} aria-label={label} className={className}>
      <ul className="flex items-center gap-0.5 rounded-full border border-border bg-background/50 p-1">
        {locales.map((lang) => (
          <li key={lang}>
            <a
              href={switchLocaleInPath(pathname, lang)}
              hrefLang={lang}
              lang={lang}
              aria-current={lang === current ? "true" : undefined}
              className={cn(
                "grid h-8 min-w-9 place-items-center rounded-full px-2 text-xs font-semibold tracking-wide transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                "aria-[current=true]:bg-secondary aria-[current=true]:text-secondary-foreground",
              )}
            >
              {localeLabels[lang]}
              {/* Screen readers hear "LV Latviešu" instead of just "LV". */}
              <span className="sr-only"> {localeNames[lang]}</span>
            </a>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
}
