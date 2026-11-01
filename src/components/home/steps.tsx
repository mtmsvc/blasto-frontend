import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/sections/section-heading";
import type { Dictionary } from "@/dictionaries";

/** "How it works": four numbered steps from application to licence. */
export function Steps({ dict }: { dict: Dictionary }) {
  const steps = dict.home.steps;

  return (
    <section aria-labelledby="steps-title" className="mt-28 sm:mt-36">
      <Container>
        <SectionHeading id="steps-title" title={steps.title} />
        <ol className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.items.map((step, index) => (
            <li key={step.title} className="flex flex-col gap-3 border-t border-border pt-6">
              <span
                aria-hidden
                className="grid size-10 place-items-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground"
              >
                {index + 1}
              </span>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
