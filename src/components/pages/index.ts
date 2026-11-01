/**
 * Every page except the home page, by its key from src/i18n/routes.ts.
 *
 * Why pages live here and not in folders under src/app: the URLs are
 * translated (/lv/kontakti/, /ru/kontakty/, /en/contacts/), so a single
 * route, src/app/[lang]/[slug]/page.tsx, receives all of them, finds which
 * page the slug belongs to, and renders the component registered below.
 */

import type { Dictionary } from "@/dictionaries";
import type { Locale } from "@/i18n/config";
import type { PageKey } from "@/i18n/routes";
import { ApplyPage } from "./apply-page";
import { ContactsPage } from "./contacts-page";
import { CoursesPage } from "./courses-page";
import { PrivacyPage } from "./privacy-page";
import { RulesPage } from "./rules-page";
import { TeachersPage } from "./teachers-page";

/** Props every page component receives. */
export type PageViewProps = { lang: Locale; dict: Dictionary };

type PageView = {
  Component: (props: PageViewProps) => React.ReactNode;
  /** Where the page's <title> and description are in the dictionary. */
  meta: (dict: Dictionary) => { title: string; description: string };
};

export const pageViews: Record<Exclude<PageKey, "home">, PageView> = {
  courses: { Component: CoursesPage, meta: (d) => d.courses.meta },
  teachers: { Component: TeachersPage, meta: (d) => d.teachers.meta },
  contacts: { Component: ContactsPage, meta: (d) => d.contacts.meta },
  apply: { Component: ApplyPage, meta: (d) => d.apply.meta },
  privacy: { Component: PrivacyPage, meta: (d) => d.legal.privacy.meta },
  rules: { Component: RulesPage, meta: (d) => d.legal.rulesMeta },
};
