"use client";

import { useEffect } from "react";

/**
 * Sets `data-ready` on <html> once the page's JavaScript is running.
 *
 * Interactive parts (theme menu, mobile menu, form choices) only work from
 * that moment on. The automated tests wait for this marker before clicking
 * them, so they behave the same on slow and fast machines. Draws nothing.
 */
export function ReadyMarker() {
  useEffect(() => {
    document.documentElement.dataset.ready = "true";
  }, []);
  return null;
}
