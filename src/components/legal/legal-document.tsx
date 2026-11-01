import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

/**
 * Layout for long text documents (privacy policy, school rules):
 * a readable column with numbered section headings.
 */
export function LegalDocument({
  title,
  updated,
  note,
  lang,
  children,
}: {
  title: string;
  /** "Updated: …" line under the title. */
  updated?: string;
  /** A short notice shown above the text (e.g. "available in Latvian only"). */
  note?: string;
  /** Set when the text is in another language than the page. */
  lang?: string;
  children: React.ReactNode;
}) {
  return (
    <Container className="max-w-3xl pt-16 sm:pt-24">
      <h1 className="text-3xl font-semibold tracking-tight text-balance break-words hyphens-auto sm:text-5xl">
        {title}
      </h1>
      {updated && <p className="mt-4 text-sm text-muted-foreground">{updated}</p>}
      {note && (
        <p className="mt-8 rounded-2xl border border-border bg-secondary p-5 text-secondary-foreground">
          {note}
        </p>
      )}
      <div lang={lang} className="mt-12 flex flex-col gap-10">
        {children}
      </div>
    </Container>
  );
}

/** One numbered section of a document. */
export function LegalSection({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold tracking-tight">
        <span className="mr-2 text-muted-foreground">{number}.</span>
        {title}
      </h2>
      <div className="flex flex-col gap-3 leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

/** A bulleted list inside a section. */
export function LegalList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul
      className={cn("flex list-disc flex-col gap-2 pl-5 marker:text-muted-foreground", className)}
    >
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
