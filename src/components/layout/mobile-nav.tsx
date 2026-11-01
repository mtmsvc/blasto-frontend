"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { LanguageSwitcher } from "./language-switcher";
import { NavLinks, type NavItem } from "./nav-links";
import type { Locale } from "@/i18n/config";

type MobileNavProps = {
  lang: Locale;
  items: NavItem[];
  apply: NavItem;
  labels: { menu: string; openMenu: string; closeMenu: string; language: string };
  className?: string;
};

/** The menu button and slide-in panel shown on small screens. */
export function MobileNav({ lang, items, apply, labels, className }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={labels.openMenu} className={className}>
          <MenuIcon className="size-5" aria-hidden />
        </Button>
      </SheetTrigger>

      <SheetContent closeLabel={labels.closeMenu} aria-describedby={undefined}>
        <SheetTitle className="pt-2 text-muted-foreground">{labels.menu}</SheetTitle>

        <nav aria-label={labels.menu}>
          <NavLinks
            items={items}
            onNavigate={close}
            className="flex flex-col gap-1"
            linkClassName="px-4 py-3 text-lg"
          />
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          <LanguageSwitcher current={lang} label={labels.language} className="self-start" />
          <Button asChild size="lg">
            <Link href={apply.href} onClick={close}>
              {apply.label}
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
