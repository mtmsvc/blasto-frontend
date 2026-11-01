import { BuildingIcon, HeartPulseIcon, type LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { IconBubble } from "@/components/sections/icon-bubble";
import { csddFees, extraServices } from "@/content/site";
import { formatPrice } from "@/i18n/format";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/dictionaries";

type Texts = Dictionary["courses"]["extras"];

/**
 * Costs that are the same for every category: the first aid course and
 * medical certificate (available at the school) and the CSDD state fees.
 * Amounts are in src/content/site.ts.
 */
export function ExtraCosts({ lang, texts }: { lang: Locale; texts: Texts }) {
  const groups: {
    icon: LucideIcon;
    title: string;
    text: string;
    rows: { label: string; amount: number }[];
  }[] = [
    {
      icon: HeartPulseIcon,
      title: texts.services.title,
      text: texts.services.text,
      rows: [
        { label: texts.services.firstAid, amount: extraServices.firstAid },
        { label: texts.services.medicalCertificate, amount: extraServices.medicalCertificate },
      ],
    },
    {
      icon: BuildingIcon,
      title: texts.csdd.title,
      text: texts.csdd.text,
      rows: [
        { label: texts.csdd.learnerPermit, amount: csddFees.learnerPermit },
        { label: texts.csdd.theoryExam, amount: csddFees.theoryExam },
        { label: texts.csdd.drivingExam, amount: csddFees.drivingExam },
        { label: texts.csdd.licence, amount: csddFees.licence },
      ],
    },
  ];

  return (
    <section aria-labelledby="extras-title" className="mt-24">
      <Container>
        <h2 id="extras-title" className="text-2xl font-semibold tracking-tight">
          {texts.title}
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {groups.map((group) => (
            <Card key={group.title} glass className="gap-5">
              <div className="flex items-start gap-4">
                <IconBubble icon={group.icon} />
                <div>
                  <h3 className="font-semibold">{group.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{group.text}</p>
                </div>
              </div>
              <dl className="mt-auto flex flex-col gap-2 border-t border-border pt-4 text-sm">
                {group.rows.map((row) => (
                  <div key={row.label} className="flex items-baseline justify-between gap-3">
                    <dt className="text-muted-foreground">{row.label}</dt>
                    <dd className="font-semibold whitespace-nowrap">
                      {formatPrice(row.amount, lang)}
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
