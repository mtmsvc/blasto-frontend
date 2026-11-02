import { ChevronDownIcon } from "lucide-react";

/**
 * Questions and answers that open on click.
 * Uses the native <details>/<summary> elements: they work without
 * JavaScript and are accessible to keyboards and screen readers out of
 * the box.
 */
export function Faq({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <details key={item.question} className="group rounded-2xl glass">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronDownIcon
              className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <p className="px-5 pb-5 leading-relaxed text-muted-foreground">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
