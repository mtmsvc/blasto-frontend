import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { CtaSection } from "@/components/sections/cta-section";
import { PageHeader } from "@/components/sections/page-header";
import { TeacherCard } from "@/components/teachers/teacher-card";
import { teachers } from "@/content/site";
import { getDictionary } from "@/dictionaries";
import { getLocale } from "@/i18n/params";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/teachers">): Promise<Metadata> {
  const lang = await getLocale(params);
  return pageMetadata({ lang, page: "teachers", ...getDictionary(lang).teachers.meta });
}

/** Teachers: one card per teacher from src/content/site.ts. */
export default async function TeachersPage({ params }: PageProps<"/[lang]/teachers">) {
  const lang = await getLocale(params);
  const dict = getDictionary(lang);

  return (
    <>
      <PageHeader title={dict.teachers.title} text={dict.teachers.text} />
      <Container>
        <ul className="grid gap-4 md:grid-cols-2">
          {teachers.map((teacher) => (
            <li key={teacher.id}>
              <TeacherCard
                teacher={teacher}
                bio={dict.teachers.bios[teacher.id]}
                categoriesLabel={dict.teachers.categories}
              />
            </li>
          ))}
        </ul>
      </Container>
      <CtaSection lang={lang} dict={dict} />
    </>
  );
}
