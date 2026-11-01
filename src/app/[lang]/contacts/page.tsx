import type { Metadata } from "next";
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
import { getDictionary } from "@/dictionaries";
import { getLocale } from "@/i18n/params";
import { pagePath } from "@/i18n/routes";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/contacts">): Promise<Metadata> {
  const lang = await getLocale(params);
  return pageMetadata({ lang, page: "contacts", ...getDictionary(lang).contacts.meta });
}

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
      <div className="min-w-0 flex-1">
        <h2 className="text-sm text-muted-foreground">{title}</h2>
        <div className="mt-1">{children}</div>
      </div>
    </li>
  );
}

/** Contacts: address, phone, email, opening hours and company details. */
export default async function ContactsPage({ params }: PageProps<"/[lang]/contacts">) {
  const lang = await getLocale(params);
  const dict = getDictionary(lang);
  const texts = dict.contacts;

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
                {site.address.postalCode}, {site.address.city}
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
              <table className="w-full text-sm">
                <tbody>
                  {site.openingHours.map((row) => (
                    <tr key={row.days}>
                      <th
                        scope="row"
                        className="py-0.5 pr-4 text-left font-normal whitespace-nowrap"
                      >
                        {texts.days[row.days]}
                      </th>
                      <td className="py-0.5 text-right font-medium whitespace-nowrap">
                        {row.time ?? texts.closed}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ContactItem>

            <ContactItem icon={PhoneIcon} title={texts.phone}>
              <a href={phoneHref} className="prose-link">
                {site.phone}
              </a>
            </ContactItem>

            <ContactItem icon={MailIcon} title={texts.email}>
              <a href={`mailto:${site.email}`} className="prose-link break-words">
                {site.email}
              </a>
            </ContactItem>
          </ul>
        </Card>

        <Card className="p-6 sm:p-8">
          <h2 className="text-lg font-semibold">{texts.company.title}</h2>
          <dl className="flex flex-col gap-3 text-sm">
            <div>
              <dt className="text-muted-foreground">{texts.company.name}</dt>
              <dd className="font-medium">{site.legalName}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">{texts.company.registrationNumber}</dt>
              <dd className="font-medium">{site.registrationNumber}</dd>
            </div>
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
