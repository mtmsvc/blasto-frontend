import { cn } from "@/lib/utils";

/**
 * An <h2> for a page section, with an optional short text below.
 * Pass `id` and point the section's `aria-labelledby` at it, so screen
 * readers announce the section by its title.
 */
export function SectionHeading({
  id,
  title,
  text,
  className,
}: {
  id: string;
  title: string;
  text?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 max-w-2xl", className)}>
      <h2 id={id} className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {text && <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{text}</p>}
    </div>
  );
}
