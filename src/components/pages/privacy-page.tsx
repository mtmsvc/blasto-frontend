import { LegalDocument, LegalList, LegalSection } from "@/components/legal/legal-document";
import { site } from "@/content/site";
import { fill } from "@/i18n/format";
import type { PageViewProps } from ".";

/** Privacy policy. The text is in the dictionaries under `legal.privacy`. */
export function PrivacyPage({ dict }: PageViewProps) {
  const privacy = dict.legal.privacy;
  // Contact details in the text come from src/content/site.ts.
  const values = {
    legalName: site.legalName,
    registrationNumber: site.registrationNumber,
    legalAddress: site.legalAddress,
    email: site.email,
    phone: site.phone,
  };

  return (
    <LegalDocument title={privacy.title} updated={dict.legal.updated}>
      {privacy.sections.map((section, index) => (
        <LegalSection key={section.title} number={index + 1} title={section.title}>
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph}>{fill(paragraph, values)}</p>
          ))}
          {section.items && <LegalList items={section.items.map((item) => fill(item, values))} />}
        </LegalSection>
      ))}
    </LegalDocument>
  );
}
