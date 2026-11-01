/**
 * Facts about the school that are the same in every language:
 * contacts, prices, categories, teachers and reviews.
 *
 * Texts that need translating (category descriptions, teacher bios…) live
 * in the dictionaries (src/dictionaries/*.ts), keyed by the same `id`s
 * used here.
 *
 * Source: the previous website blasto.lv (November 2026). Spots that still
 * need checking are marked `TODO(content)`. To list them:
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

  legalName: "SIA “BLASTO”",
  registrationNumber: "40203287655",
  legalAddress: "Merķeļa iela 6-8, Rīga, LV-1050",
  bank: { name: "Swedbank", swift: "HABALV22", account: "LV82HABA0551050183837" },

  // TODO(content): the old site also shows +371 20169111 (form thank-you
  // message and internal rules). Confirm which number is the main one.
  phone: "+371 25 875 969",
  email: "blastoautoskola@gmail.com",
  /** Where the lessons take place. The floor/room line is translated in
   *  the dictionaries (`contacts.addressDetails`).
   *  TODO(content): the first aid page of the old site says "Merķeļa ielā 21". */
  address: {
    street: "Merķeļa iela 6",
    city: "Rīga",
    postalCode: "LV-1050",
  },
  /** Opens the school in Google Maps (location, reviews, directions).
   *  No map is embedded on the page, so no third-party scripts or cookies
   *  are loaded. */
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Blasto%20autoskola%2C%20Mer%C4%B7e%C4%BCa%20iela%206%2C%20R%C4%ABga&query_place_id=ChIJeaXxzWjP7kYRZd_alvKY2iw",
} as const;

/** `tel:` links need the number without spaces: "+37125875969". */
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

/** Prices of one category, in euros. */
export type CategoryPrices = {
  /** Registration and paperwork. */
  documents: number;
  /** The theory course. */
  theory: number;
  /** One academic hour (45 minutes) of driving. A lesson is usually 2 hours. */
  drivingHour: number;
  /** Minimum number of academic hours of driving, or `null` if there is no
   *  minimum (e.g. AM). The minimum driving cost is calculated from it. */
  minDrivingHours: number | null;
};

export type Category = {
  id: CategoryId;
  /** Label shown on the site, e.g. "B" or "95". */
  label: string;
  /** Label in the application form, if different (e.g. "A1/A2/A"). */
  formLabel?: string;
  /** Age to start the course, and age to take the CSDD exams.
   *  `null` when not applicable. */
  startAge: number | null;
  examAge: number | null;
  /** Licences you must already have (any one of them), e.g. ["B"]. */
  requires?: string[];
  /** `null` = price on request. */
  prices: CategoryPrices | null;
};

/** The categories, in the order they are shown on the site. */
export const categories: Category[] = [
  {
    id: "b",
    label: "B",
    startAge: 16,
    examAge: 18,
    prices: { documents: 25, theory: 29, drivingHour: 22.5, minDrivingHours: 20 },
  },
  {
    id: "be",
    label: "BE",
    startAge: 18,
    examAge: 18,
    requires: ["B"],
    prices: { documents: 25, theory: 29, drivingHour: 25, minDrivingHours: 8 },
  },
  {
    id: "am",
    label: "AM",
    startAge: 14,
    examAge: 14,
    prices: { documents: 25, theory: 29, drivingHour: 22.5, minDrivingHours: null },
  },
  {
    id: "a",
    label: "A",
    formLabel: "A1/A2/A",
    startAge: 22,
    examAge: 24,
    requires: ["B"],
    prices: { documents: 25, theory: 19, drivingHour: 22.5, minDrivingHours: 10 },
  },
  {
    id: "c",
    label: "C",
    startAge: 19,
    examAge: 21,
    requires: ["B"],
    prices: { documents: 20, theory: 49, drivingHour: 32.5, minDrivingHours: 20 },
  },
  {
    id: "ce",
    label: "CE",
    startAge: 21,
    examAge: 21,
    requires: ["C"],
    prices: { documents: 25, theory: 49, drivingHour: 35, minDrivingHours: 14 },
  },
  {
    id: "d",
    label: "D",
    startAge: 22,
    examAge: 24,
    requires: ["C1", "D1", "C"],
    prices: { documents: 25, theory: 49, drivingHour: 40, minDrivingHours: 12 },
  },
  {
    id: "95",
    label: "95",
    startAge: null,
    examAge: null,
    requires: ["C1", "C", "C1E", "CE", "D1", "D", "D1E", "DE"],
    // TODO(content): the old site lists no price for code 95.
    prices: null,
  },
];

/**
 * Order of the checkboxes in the application form. Copied from the form on
 * the previous blasto.lv, which listed B first and then A1/A2/A.
 * (Elsewhere on the site, `categories` above sets the order.)
 */
export const applicationFormOrder: CategoryId[] = ["b", "a", "am", "be", "c", "ce", "d", "95"];

/** Looks up a category by id, e.g. for the `?category=b` link on the
 *  application form. Returns `undefined` for unknown values. */
export function findCategory(id: string | null | undefined): Category | undefined {
  return categories.find((category) => category.id === id);
}

/** Services needed for most categories, available at the school (euros). */
export const extraServices = {
  firstAid: 55,
  medicalCertificate: 29,
} as const;

/** State fees paid to CSDD, not to the school (euros). They change from
 *  time to time: check https://www.csdd.lv before updating prices. */
export const csddFees = {
  learnerPermit: 12.86,
  theoryExam: 11.4,
  drivingExam: 50.57,
  licence: 22.41,
} as const;

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

/* ------------------------------------------------------------------ */
/* Reviews                                                             */
/* ------------------------------------------------------------------ */

/** The school's rating on Google. Update the numbers from time to time. */
export const googleReviews = {
  rating: 5,
  count: 19,
  url: site.mapUrl,
} as const;

/**
 * A few reviews from Google, quoted word for word in their original
 * language (`lang`), so screen readers pronounce them correctly.
 */
export const reviews: { author: string; lang: "lv" | "ru" | "en"; text: string }[] = [
  {
    author: "Кристина С.",
    lang: "ru",
    text: "Очень благодарна этой автошколе и инструктору Сергею. С каждого занятия по вождению уходила с чувством, что узнала что-то новое. Экзамен в CSDD сдала с первого раза. Советую!",
  },
  {
    author: "Anastasija F.",
    lang: "lv",
    text: "Labāka autoskola, ļoti ātri nokārtoju tiesibas. Individuāla pieeja katram, visu skaidro saprotami, laipni un atsaucigi instruktori.",
  },
  {
    author: "Foret E.",
    lang: "en",
    text: "Excellent driving instructor, very professional and patient. All lessons were carefully planned, for example - what manoeuvre are we practicing today.",
  },
];
