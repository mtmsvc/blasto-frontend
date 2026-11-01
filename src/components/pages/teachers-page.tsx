import { Container } from "@/components/layout/container";
import { CtaSection } from "@/components/sections/cta-section";
import { PageHeader } from "@/components/sections/page-header";
import { TeacherCard } from "@/components/teachers/teacher-card";
import { teachers } from "@/content/site";
import type { PageViewProps } from ".";

/** Teachers: one card per teacher from src/content/site.ts. */
export function TeachersPage({ lang, dict }: PageViewProps) {
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
