import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/**
 * The Blasto wordmark: slanted letters with a "B" made of speed lines.
 *
 * How it is drawn: every letter is built from simple straight shapes and
 * arcs in an *upright* grid (cap height = 100 units, baseline at y = 100),
 * and the whole group is then slanted with `skewX`. So the letters stay
 * geometrically clean, and the slant is one number:
 *
 *   SLANT = 14  → the original sporty slant (current)
 *   SLANT = 8   → more upright
 * If you change it, adjust the viewBox width (it grows with the slant).
 *
 * It is drawn in `currentColor`, so it takes the text color of its parent
 * (`text-primary` by default: deep green in light mode, pastel in dark).
 * Standalone files of the logo for print/social media are in /brand.
 */
const SLANT = 14;

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="4 -2 480 104"
      role="img"
      aria-label={site.name}
      className={cn("h-7 w-auto text-primary", className)}
    >
      <g fill="currentColor" transform={`translate(0 100) skewX(-${SLANT}) translate(0 -100)`}>
        {/* B: four speed lines joined by two rounded bowls */}
        <path d="M0 55h101v13H0z" />
        <path d="M13 33.5h97v13H13z" />
        <path d="M56 0h54v22H56z" />
        <path d="M45 78h65v22H45z" />
        <path d="M100 0h37a23 23 0 0 1 23 23v.5a23 23 0 0 1-23 23h-37v-13h32.25a5.75 5.75 0 0 0 0-11.5H100z" />
        <path d="M100 33.5h36a26 26 0 0 1 26 26V74a26 26 0 0 1-26 26h-36V78h24.25a15.75 15.75 0 0 0 0-31.5H100z" />
        {/* l */}
        <path d="M167 0h23v100h-23z" />
        {/* a: arch with stem, and the lower bowl */}
        <path d="M207 29h46a22 22 0 0 1 22 22v49h-22V57a6 6 0 0 0-6-6h-40z" />
        <path
          fillRule="evenodd"
          d="M260 57h-38a21.5 21.5 0 0 0 0 43h38zm-6 13h-25a6 6 0 0 0 0 12h25z"
        />
        {/* s: drawn as one thick line */}
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="19"
          d="M333 38.5h-29a11.5 11.5 0 0 0-11.5 11.5v3a11.5 11.5 0 0 0 11.5 11.5h11a11.5 11.5 0 0 1 11.5 11.5v3a11.5 11.5 0 0 1-11.5 11.5H283"
        />
        {/* t: stem with a curved foot, and the crossbar */}
        <path d="M345 10.5h23V74a7 7 0 0 0 7 7h15v19h-22a23 23 0 0 1-23-23z" />
        <path d="M339 29h48v19h-48z" />
        {/* o: outer and inner ellipse */}
        <path
          fillRule="evenodd"
          d="M431 28a39 36.5 0 1 1 0 73a39 36.5 0 1 1 0-73zm0 21.5a17.5 15 0 1 0 0 30a17.5 15 0 1 0 0-30z"
        />
      </g>
    </svg>
  );
}
