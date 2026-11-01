/**
 * Facts about the school that are the same in every language:
 * contacts, prices, categories and teachers.
 *
 * Texts that need translating (category descriptions, teacher bios…) live
 * in the dictionaries (src/dictionaries/*.ts), keyed by the same `id`s
 * used here.
 *
 * ⚠️  PLACEHOLDER CONTENT
 * Everything marked `TODO(content)` is sample data, not the school's real
 * details. Replace it before going live. To list every spot:
 *   grep -rn "TODO(content)" src
 */

/* ------------------------------------------------------------------ */
/* School and contacts                                                 */
/* ------------------------------------------------------------------ */

export const site = {
  name: "Blasto",

  /**
   * Public address of the website, used for canonical URLs, hreflang tags
   * and the sitemap. Can be overridden at build time:
   *   NEXT_PUBLIC_SITE_URL=https://staging.blasto.lv npm run build
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://blasto.lv",

  // TODO(content): real company details
  legalName: "SIA “Blasto”",
  registrationNumber: "40000000000",

  // TODO(content): real contacts
  phone: "+371 20 000 000",
  email: "info@blasto.lv",
  address: {
    street: "Brīvības iela 1",
    city: "Rīga",
    postalCode: "LV-1010",
  },
  /** Opens the address in the visitor's map app. No map is embedded on the
   *  page, so no third-party scripts or cookies are loaded. */
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Br%C4%ABv%C4%ABbas+iela+1%2C+R%C4%ABga",

  // TODO(content): real opening hours. The day labels are translated in
  // the dictionaries under `contacts.days`.
  openingHours: [
    { days: "weekdays", time: "09:00–19:00" },
    { days: "saturday", time: "10:00–14:00" },
    { days: "sunday", time: null }, // null = closed
  ],
} as const;

export type OpeningDays = (typeof site.openingHours)[number]["days"];

/** `tel:` links need the number without spaces: "+37120000000". */
export const phoneHref = `tel:${site.phone.replace(/\s+/g, "")}`;

/* ------------------------------------------------------------------ */
/* Driving licence categories and prices                               */
/* ------------------------------------------------------------------ */

/**
 * Category ids. They match the application form fields:
 * id "b" ↔ field `cat_b`, id "95" ↔ field `cat_95`.
 */
export const categoryIds = ["a", "am", "b", "be", "c", "ce", "d", "95"] as const;
export type CategoryId = (typeof categoryIds)[number];

export type Category = {
  id: CategoryId;
  /** Label shown on the site, e.g. "B" or "95". */
  label: string;
  /** Minimum age to get this licence. */
  minAge: number;
  /** Price of the theory course in euros. */
  theoryPrice: number;
  /** Price of one practical driving lesson in euros, or `null` if the
   *  course has no driving lessons (e.g. code 95). */
  lessonPrice: number | null;
};

/**
 * The categories, in the order they are shown on the site.
 * TODO(content): real prices and minimum ages.
 */
export const categories: Category[] = [
  { id: "b", label: "B", minAge: 18, theoryPrice: 120, lessonPrice: 30 },
  { id: "be", label: "BE", minAge: 18, theoryPrice: 60, lessonPrice: 40 },
  { id: "am", label: "AM", minAge: 14, theoryPrice: 70, lessonPrice: 25 },
  { id: "a", label: "A", minAge: 24, theoryPrice: 90, lessonPrice: 35 },
  { id: "c", label: "C", minAge: 21, theoryPrice: 150, lessonPrice: 45 },
  { id: "ce", label: "CE", minAge: 21, theoryPrice: 80, lessonPrice: 55 },
  { id: "d", label: "D", minAge: 24, theoryPrice: 180, lessonPrice: 55 },
  { id: "95", label: "95", minAge: 18, theoryPrice: 200, lessonPrice: null },
];

/** Looks up a category by id, e.g. for the `?category=b` link on the
 *  application form. Returns `undefined` for unknown values. */
export function findCategory(id: string | null | undefined): Category | undefined {
  return categories.find((category) => category.id === id);
}

/* ------------------------------------------------------------------ */
/* Teachers                                                            */
/* ------------------------------------------------------------------ */

export type Teacher = {
  /** Used to find the teacher's bio in the dictionaries. */
  id: string;
  name: string;
  categories: CategoryId[];
  /**
   * Optional photo: put a square WebP file (about 400×400 px) into
   * /public/teachers/ and write its file name here, e.g. "anna.webp".
   * Without a photo, the teacher's initials are shown instead.
   */
  photo?: string;
};

// TODO(content): real teachers. Their bios are in the dictionaries under
// `teachers.bios`, one entry per `id`.
export const teachers: Teacher[] = [
  { id: "teacher-1", name: "Jānis Kalniņš", categories: ["b", "be"] },
  { id: "teacher-2", name: "Anna Ozola", categories: ["b"] },
  { id: "teacher-3", name: "Andris Liepa", categories: ["a", "am", "b"] },
  { id: "teacher-4", name: "Pēteris Bērziņš", categories: ["c", "ce", "d", "95"] },
];
