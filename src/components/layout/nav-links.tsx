"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export type NavItem = { href: string; label: string };

/** "/lv/courses/" and "/lv/courses" should count as the same page. */
function samePath(a: string, b: string) {
  const strip = (path: string) => path.replace(/\/+$/, "");
  return strip(a) === strip(b);
}

/**
 * The main menu links. A Client Component only because it needs the
 * current URL (`usePathname`) to mark the active page with
 * `aria-current="page"` (read out by screen readers, and styled below).
 */
export function NavLinks({
  items,
  className,
  linkClassName,
  onNavigate,
}: {
  items: NavItem[];
  className?: string;
  linkClassName?: string;
  /** Called after a link is clicked (the mobile menu uses it to close). */
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            onClick={onNavigate}
            aria-current={samePath(pathname, item.href) ? "page" : undefined}
            className={cn(
              "block rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              "aria-[current=page]:bg-secondary aria-[current=page]:text-secondary-foreground",
              linkClassName,
            )}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
