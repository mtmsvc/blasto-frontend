"use client";

import { useEffect } from "react";

/**
 * A soft light that follows the mouse on glass surfaces (anything with the
 * `glass` class: cards, the header…), like light catching frosted glass.
 *
 * How it works: one mouse listener for the whole page. When the mouse is
 * over a glass element, its position inside that element is written to the
 * CSS variables `--spot-x` / `--spot-y`, and `data-spot` turns the light on.
 * The drawing itself is pure CSS (see the `glass` utility in globals.css).
 *
 * Only for devices with a real mouse; off for touch screens and for people
 * who asked their device for reduced motion. Rendered once, in the [lang]
 * layout. Draws nothing itself.
 */
export function GlassSpotlight() {
  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    let lit: HTMLElement | null = null; // the glass element currently lit
    let frame = 0;
    let lastEvent: PointerEvent | null = null;

    const turnOff = () => {
      lit?.removeAttribute("data-spot");
      lit = null;
    };

    // Runs at most once per screen frame, however fast the mouse moves.
    const update = () => {
      frame = 0;
      const event = lastEvent;
      if (!event) return;
      const target = event.target instanceof Element ? event.target : null;
      const glass = target?.closest<HTMLElement>(".glass") ?? null;

      if (glass !== lit) {
        turnOff();
        lit = glass;
        lit?.setAttribute("data-spot", "");
      }
      if (lit) {
        const rect = lit.getBoundingClientRect();
        lit.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
        lit.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
      }
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      lastEvent = event;
      if (!frame) frame = requestAnimationFrame(update);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", turnOff);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", turnOff);
      cancelAnimationFrame(frame);
      turnOff();
    };
  }, []);

  return null;
}
