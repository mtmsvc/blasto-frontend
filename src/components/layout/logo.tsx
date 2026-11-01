import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/**
 * The Blasto logo: a road in perspective inside a rounded square, plus the
 * name. Drawn in SVG, so it is sharp at any size and follows the theme
 * colors. The favicon (src/app/icon.svg) is the same mark.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-8", className)}>
      <rect width="32" height="32" rx="9" className="fill-primary" />
      <g className="stroke-primary-foreground" strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M10.5 25 14.5 7M21.5 25 17.5 7" />
        <path d="M16 23.5v-2.5M16 17.5v-2M16 12v-1.5" />
      </g>
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="text-lg font-semibold tracking-tight">{site.name}</span>
    </span>
  );
}
