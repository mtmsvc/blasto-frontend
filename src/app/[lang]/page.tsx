import type { Metadata } from "next";

import { About } from "@/components/home/about";
import { Formats } from "@/components/home/formats";
import { Hero } from "@/components/home/hero";
import { Reviews } from "@/components/home/reviews";
import { Steps } from "@/components/home/steps";
import { CtaSection } from "@/components/sections/cta-section";
import { getDictionary } from "@/dictionaries";
import { getLocale } from "@/i18n/params";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const lang = await getLocale(params);
  const dict = getDictionary(lang);
  return pageMetadata({
    lang,
    page: "home",
    title: dict.home.meta.title,
    description: dict.meta.description,
  });
}

/** Home page: /lv/, /ru/, /en/ */
export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const lang = await getLocale(params);
  const dict = getDictionary(lang);

  return (
    <>
      <Hero lang={lang} dict={dict} />
      <About dict={dict} />
      <Formats dict={dict} />
      <Steps dict={dict} />
      <Reviews lang={lang} texts={dict.home.reviews} />
      <CtaSection lang={lang} dict={dict} />
    </>
  );
}
