import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { categories, type Teacher } from "@/content/site";

/** "Anna Ozola" → "AO" */
function initials(name: string) {
  return name
    .split(/\s+/)
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/** A teacher: photo (or initials), name, categories and a short bio. */
export function TeacherCard({
  teacher,
  bio,
  categoriesLabel,
}: {
  teacher: Teacher;
  bio?: string;
  categoriesLabel: string;
}) {
  // Show the categories in the same order as on the prices page.
  const teacherCategories = categories.filter((c) => teacher.categories.includes(c.id));

  return (
    <Card className="h-full flex-row items-start gap-5">
      {teacher.photo ? (
        // The photo is decorative: the name right next to it says who it is,
        // so `alt` is empty. `loading="lazy"` is the default for next/image.
        <Image
          src={`/teachers/${teacher.photo}`}
          alt=""
          width={80}
          height={80}
          className="size-20 shrink-0 rounded-2xl object-cover"
        />
      ) : (
        <span
          aria-hidden
          className="grid size-20 shrink-0 place-items-center rounded-2xl bg-secondary text-2xl font-semibold text-secondary-foreground"
        >
          {initials(teacher.name)}
        </span>
      )}

      <div className="flex min-w-0 flex-col gap-3">
        <h2 className="text-lg font-semibold">{teacher.name}</h2>
        <div>
          <span className="sr-only">{categoriesLabel}: </span>
          <ul className="flex flex-wrap gap-1.5">
            {teacherCategories.map((category) => (
              <li key={category.id}>
                <Badge>{category.label}</Badge>
              </li>
            ))}
          </ul>
        </div>
        {bio && <p className="text-sm leading-relaxed text-muted-foreground">{bio}</p>}
      </div>
    </Card>
  );
}
