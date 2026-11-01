import { Suspense } from "react";
import type { Metadata } from "next";
import { PhoneIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import {
  ApplicationForm,
  ApplicationFormFromUrl,
  type ApplicationFormProps,
} from "@/components/apply/application-form";
import { PageHeader } from "@/components/sections/page-header";
import { categories, phoneHref, site } from "@/content/site";
import { getDictionary } from "@/dictionaries";
import { getLocale } from "@/i18n/params";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/apply">): Promise<Metadata> {
  const lang = await getLocale(params);
  return pageMetadata({ lang, page: "apply", ...getDictionary(lang).apply.meta });
}

/** Application page: the form, plus "what happens next" on the side. */
export default async function ApplyPage({ params }: PageProps<"/[lang]/apply">) {
  const lang = await getLocale(params);
  const dict = getDictionary(lang);
  const { aside } = dict.apply;

  // Only the texts the form needs are sent to the browser.
  const formProps: Omit<ApplicationFormProps, "initialCategory"> = {
    texts: { form: dict.apply.form, errors: dict.apply.errors, result: dict.apply.result },
    categories: categories.map(({ id, label }) => ({
      id,
      label,
      name: dict.courses.items[id].name,
    })),
  };

  return (
    <>
      <PageHeader title={dict.apply.title} text={dict.apply.text} />

      <Container className="grid items-start gap-6 lg:grid-cols-[1fr_20rem]">
        <Card glass className="p-6 sm:p-10">
          <Suspense fallback={<ApplicationForm {...formProps} />}>
            <ApplicationFormFromUrl {...formProps} />
          </Suspense>
        </Card>

        <aside
          aria-labelledby="next-steps-title"
          className="flex flex-col gap-6 lg:sticky lg:top-28"
        >
          <Card>
            <h2 id="next-steps-title" className="text-lg font-semibold">
              {aside.title}
            </h2>
            <ol className="flex flex-col gap-4">
              {aside.steps.map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="grid size-7 shrink-0 place-items-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground"
                  >
                    {index + 1}
                  </span>
                  <span className="pt-0.5 text-sm">{step}</span>
                </li>
              ))}
            </ol>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-border pt-4 text-sm text-muted-foreground">
              <PhoneIcon className="size-4" aria-hidden />
              {aside.question}
              <a href={phoneHref} className="prose-link text-foreground">
                {site.phone}
              </a>
            </p>
          </Card>
        </aside>
      </Container>
    </>
  );
}
