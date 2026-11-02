import { CheckIcon, LaptopIcon, SchoolIcon } from "lucide-react";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { IconBubble } from "@/components/sections/icon-bubble";
import { SectionHeading } from "@/components/sections/section-heading";
import type { Dictionary } from "@/dictionaries";

/** The two theory formats: online and in person (the same choice as in the form). */
export function Formats({ dict }: { dict: Dictionary }) {
  const formats = dict.home.formats;
  const items = [
    { ...formats.online, icon: LaptopIcon },
    { ...formats.inPerson, icon: SchoolIcon },
  ];

  return (
    <section aria-labelledby="formats-title" className="mt-28 sm:mt-36">
      <Container>
        <SectionHeading id="formats-title" title={formats.title} text={formats.text} />
        <ul className="grid gap-5 md:grid-cols-2">
          {items.map((item) => (
            <li key={item.title}>
              <Card className="h-full gap-5 p-7 sm:p-8">
                <div className="flex items-center gap-4">
                  <IconBubble icon={item.icon} />
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </div>
                <CardDescription className="text-base">{item.text}</CardDescription>
                <ul className="flex flex-col gap-2.5">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <CheckIcon
                        className="mt-0.5 size-5 shrink-0 text-muted-foreground"
                        aria-hidden
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
