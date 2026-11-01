"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Opens every new page at the very top.
 *
 * Why this is needed: by default, Next.js keeps the scroll position when
 * the new page's start is still on screen, and otherwise scrolls only
 * until the page content touches the top edge (just under our sticky
 * header). So depending on how far you had scrolled, a new page opened at
 * different heights. This component makes it always the top.
 *
 * Exceptions, where the browser's own behavior is kept:
 * - Back/Forward buttons return to where you were on that page.
 * - Links to a spot on a page (e.g. /lv/kategorijas/#category-b) scroll
 *   to that spot.
 *
 * Rendered once, in the [lang] layout. It draws nothing.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const isHistoryNavigation = useRef(false);

  // Remember when the next page change comes from Back/Forward.
  useLayoutEffect(() => {
    const onPopState = () => {
      isHistoryNavigation.current = true;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Runs after every page change, before the browser paints it.
  const isFirstRender = useRef(true);
  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // the first page load is handled by the browser
      return;
    }
    if (isHistoryNavigation.current) {
      isHistoryNavigation.current = false;
      return;
    }
    if (window.location.hash) return;
    // "instant" overrides the smooth scrolling set in globals.css, which is
    // meant only for jumps within a page.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
