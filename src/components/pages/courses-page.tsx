import { InfoIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { CategoryCard } from "@/components/courses/category-card";
import { ExtraCosts } from "@/components/courses/extra-costs";
import { Faq } from "@/components/courses/faq";
import { PageHeader } from "@/components/sections/page-header";
import { categories } from "@/content/site";
import type { PageViewProps } from ".";

/** Courses & prices: all categories, extra costs, then notes and FAQ. */
export function CoursesPage({ lang, dict }: PageViewProps) {
  const { notes, faq } = dict.courses;

  return (
    <>
      <PageHeader title={dict.courses.title} text={dict.courses.text} />

      <Container>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <li key={category.id}>
              <CategoryCard category={category} lang={lang} dict={dict} />
            </li>
          ))}
        </ul>
      </Container>

      <ExtraCosts lang={lang} texts={dict.courses.extras} />

      <Container className="mt-24 grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <section aria-labelledby="notes-title">
          <h2 id="notes-title" className="text-2xl font-semibold tracking-tight">
            {notes.title}
          </h2>
          <Card className="mt-6">
            <ul className="flex flex-col gap-4">
              {notes.items.map((note) => (
                <li key={note} className="flex items-start gap-3">
                  <InfoIcon className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <section aria-labelledby="faq-title">
          <h2 id="faq-title" className="text-2xl font-semibold tracking-tight">
            {faq.title}
          </h2>
          <div className="mt-6">
            <Faq items={faq.items} />
          </div>
        </section>
      </Container>
    </>
  );
}
