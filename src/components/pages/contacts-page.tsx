import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRightIcon,
  ClockIcon,
  ExternalLinkIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { IconBubble } from "@/components/sections/icon-bubble";
import { PageHeader } from "@/components/sections/page-header";
import { phoneHref, site } from "@/content/site";
import { pagePath } from "@/i18n/routes";
import type { PageViewProps } from ".";

/** One block of contact info: icon, small heading, content. */
function ContactItem({
  icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <IconBubble icon={icon} />
      {/* `min-w-0` lets long words (e.g. the email) wrap instead of
          pushing the page wider than the screen. */}
      <div className="min-w-0 flex-1">
        <h2 className="text-sm text-muted-foreground">{title}</h2>
        <div className="mt-1">{children}</div>
      </div>
    </li>
  );
}

/** Contacts: address, phone, email, opening hours and company details. */
export function ContactsPage({ lang, dict }: PageViewProps) {
  const texts = dict.contacts;
  const company = texts.company;
  const details = [
    { label: company.name, value: site.legalName },
    { label: company.registrationNumber, value: site.registrationNumber },
    { label: company.legalAddress, value: site.legalAddress },
    { label: company.bank, value: `${site.bank.name}, ${site.bank.swift}` },
    { label: company.account, value: site.bank.account },
  ];

  return (
    <>
      <PageHeader title={texts.title} text={texts.text} />

      <Container className="grid items-start gap-6 lg:grid-cols-[2fr_1fr]">
        <Card glass className="p-6 sm:p-8">
          <ul className="grid gap-8 sm:grid-cols-2">
            <ContactItem icon={MapPinIcon} title={texts.address}>
              <address className="font-medium not-italic">
                {site.address.street}
                <br />
                {texts.addressDetails}
                <br />
                {site.address.city}, {site.address.postalCode}
              </address>
              <a
                href={site.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-sm prose-link"
              >
                {texts.openMap}
                <ExternalLinkIcon className="size-3.5" aria-hidden />
              </a>
            </ContactItem>

            <ContactItem icon={ClockIcon} title={texts.hours}>
              <ul className="flex flex-col gap-1 font-medium">
                {texts.hoursLines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </ContactItem>

            <ContactItem icon={PhoneIcon} title={texts.phone}>
              <a href={phoneHref} className="prose-link font-medium whitespace-nowrap">
                {site.phone}
              </a>
            </ContactItem>

            <ContactItem icon={MailIcon} title={texts.email}>
              <a href={`mailto:${site.email}`} className="prose-link font-medium break-all">
                {site.email}
              </a>
            </ContactItem>
          </ul>
        </Card>

        <Card className="p-6 sm:p-8">
          <h2 className="text-lg font-semibold">{company.title}</h2>
          <dl className="flex flex-col gap-3 text-sm">
            {details.map((detail) => (
              <div key={detail.label}>
                <dt className="text-muted-foreground">{detail.label}</dt>
                <dd className="font-medium break-words">{detail.value}</dd>
              </div>
            ))}
          </dl>
          <Button asChild className="mt-2 self-start">
            <Link href={pagePath(lang, "apply")}>
              {dict.nav.apply}
              <ArrowRightIcon aria-hidden />
            </Link>
          </Button>
        </Card>
      </Container>
    </>
  );
}
