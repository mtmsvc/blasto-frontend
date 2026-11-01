import type { Metadata } from "next";

import { defaultLocale } from "@/i18n/config";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: site.name,
};

/** Shown for a split second (or forever, if redirects are blocked). */
export default function RootRedirectPage() {
  return (
    <p style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <a href={`/${defaultLocale}/`}>{site.name}</a>
    </p>
  );
}
