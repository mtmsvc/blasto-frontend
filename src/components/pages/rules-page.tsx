import { LegalDocument, LegalSection } from "@/components/legal/legal-document";
import { rulesLv } from "@/content/legal/rules-lv";
import type { PageViewProps } from ".";

/**
 * Internal rules for students. The document exists in Latvian only
 * (src/content/legal/rules-lv.ts); on the Russian and English pages a note
 * in that language explains this.
 */
export function RulesPage({ lang, dict }: PageViewProps) {
  return (
    <LegalDocument
      title={dict.legal.rulesMeta.title}
      note={dict.legal.rulesNote || undefined}
      lang={lang === "lv" ? undefined : "lv"}
    >
      {rulesLv.sections.map((section, index) => (
        <LegalSection key={section.title} number={index + 1} title={section.title}>
          {section.clauses.map((clause) => (
            <p key={clause}>{clause}</p>
          ))}
        </LegalSection>
      ))}
    </LegalDocument>
  );
}
