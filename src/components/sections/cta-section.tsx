import Link from "next/link";
import { ArrowRightIcon, PhoneIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { pagePath } from "@/i18n/routes";
import { phoneHref, site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/dictionaries";

/** "Ready to start?" block with the Apply button and the phone number. */
export function CtaSection({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const cta = dict.common.cta;

  return (
    <section aria-labelledby="cta-title" className="mt-24">
      <Container>
        <div className="flex flex-col items-start gap-8 rounded-[2rem] glass p-8 sm:p-12 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 id="cta-title" className="text-3xl font-semibold tracking-tight">
              {cta.title}
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">{cta.text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:items-end">
            <Button asChild size="lg">
              <Link href={pagePath(lang, "apply")}>
                {cta.button}
                <ArrowRightIcon aria-hidden />
              </Link>
            </Button>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <PhoneIcon className="size-4" aria-hidden />
              {cta.call}{" "}
              <a href={phoneHref} className="prose-link text-foreground">
                {site.phone}
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
