import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { categories } from "@/content/site";
import { categoryPath, pagePath } from "@/i18n/routes";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/dictionaries";

/** Top of the home page: headline, two buttons, and a card with categories. */
export function Hero({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const hero = dict.home.hero;
  const coursesPath = pagePath(lang, "courses");

  return (
    <section aria-labelledby="hero-title" className="pt-14 sm:pt-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div>
          <p className="inline-flex rounded-full bg-secondary px-3.5 py-1 text-sm font-medium text-secondary-foreground">
            {hero.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="mt-6 text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-6xl"
          >
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">
            {hero.text}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={pagePath(lang, "apply")}>
                {hero.primary}
                <ArrowRightIcon aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={coursesPath}>{hero.secondary}</Link>
            </Button>
          </div>
        </div>

        <Card className="gap-5 rounded-[2rem] p-6 sm:p-8">
          <div>
            <h2 className="text-lg font-semibold">{hero.cardTitle}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{hero.cardText}</p>
          </div>
          <ul className="grid grid-cols-4 gap-2.5">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={categoryPath(lang, category.id)}
                  className="grid aspect-square place-items-center rounded-2xl bg-secondary text-lg font-semibold text-secondary-foreground transition-colors hover:bg-pastel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {category.label}
                  <span className="sr-only"> {dict.courses.items[category.id].name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </Container>
    </section>
  );
}
