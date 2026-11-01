import {
  BadgeEuroIcon,
  CalendarCheckIcon,
  HeartHandshakeIcon,
  MonitorSmartphoneIcon,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { IconBubble } from "@/components/sections/icon-bubble";
import type { Dictionary } from "@/dictionaries";

type BenefitKey = keyof Dictionary["home"]["benefits"]["items"];

/** One icon per benefit. The texts are in the dictionaries. */
const benefitIcons: Record<BenefitKey, LucideIcon> = {
  instructors: HeartHandshakeIcon,
  schedule: CalendarCheckIcon,
  online: MonitorSmartphoneIcon,
  prices: BadgeEuroIcon,
};

/** "About us" text on the left, the four benefits on the right. */
export function About({ dict }: { dict: Dictionary }) {
  const { about, benefits } = dict.home;

  return (
    <section aria-labelledby="about-title" className="mt-28 sm:mt-36">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <h2 id="about-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {about.title}
          </h2>
          <div className="mt-6 flex flex-col gap-4 text-lg leading-relaxed text-muted-foreground">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            {benefits.title}
          </h3>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {(Object.keys(benefits.items) as BenefitKey[]).map((key) => (
              <li key={key} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                <IconBubble icon={benefitIcons[key]} />
                <div>
                  <h4 className="font-semibold">{benefits.items[key].title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {benefits.items[key].text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
