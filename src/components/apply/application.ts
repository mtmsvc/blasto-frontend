/**
 * The application form's data, validation and sending.
 * No React here: plain functions that are easy to read and to test.
 */

import { categoryIds, type CategoryId } from "@/content/site";

/** Where the form is sent. Same origin as the site: https://blasto.me/applications */
export const APPLICATIONS_ENDPOINT = "/applications";

/** How long to wait for the server before showing a network error. */
const TIMEOUT_MS = 15_000;

/**
 * The optional "Questions" field.
 *
 * The backend does not accept it yet, so for now it is shown in the form
 * but NOT sent. When the backend is ready:
 *   1. set SEND_QUESTIONS to true,
 *   2. make sure the backend field is called `questions` (or rename it in
 *      `ApplicationPayload` and `toPayload` below).
 */
export const SEND_QUESTIONS = false;
export const QUESTIONS_MAX_LENGTH = 1000;

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type TrainingType = "online" | "in_person";

/**
 * The exact JSON body that the backend expects. Do not rename these
 * fields without changing the backend too.
 */
export type ApplicationPayload = {
  name: string;
  phone: string;
  email: string;
  training_type: TrainingType;
  /** Only sent when SEND_QUESTIONS is true and the visitor wrote something. */
  questions?: string;
} & Record<`cat_${CategoryId}`, boolean>;

/** What the form holds while the visitor is filling it in. */
export type FormValues = {
  name: string;
  phone: string;
  email: string;
  trainingType: TrainingType | "";
  categories: Record<CategoryId, boolean>;
  /** Optional free text. Not validated. */
  questions: string;
};

/** Which fields can show an error. */
export type FieldName = "name" | "phone" | "email" | "trainingType" | "categories";

/** Error keys match the texts in the dictionaries under `apply.errors`. */
export type ErrorKey =
  | "nameRequired"
  | "phoneRequired"
  | "phoneInvalid"
  | "emailRequired"
  | "emailInvalid"
  | "trainingTypeRequired"
  | "categoriesRequired";

export type FormErrors = Partial<Record<FieldName, ErrorKey>>;

/* ------------------------------------------------------------------ */
/* Defaults and validation                                             */
/* ------------------------------------------------------------------ */

/** An empty form, optionally with one category already ticked. */
export function emptyValues(preselected?: CategoryId): FormValues {
  const categories = Object.fromEntries(
    categoryIds.map((id) => [id, id === preselected]),
  ) as Record<CategoryId, boolean>;
  return { name: "", phone: "", email: "", trainingType: "", categories, questions: "" };
}

/** "+371 20-000 000" → "+37120000000" (keeps digits and a leading +). */
export function normalizePhone(phone: string): string {
  return phone.trim().replace(/[\s\-().]/g, "");
}

// 8–15 digits, optional "+" in front. Latvian numbers have 8 digits;
// international ones (E.164) up to 15.
const PHONE_PATTERN = /^\+?\d{8,15}$/;
// Deliberately simple: "something@something.something". The server makes
// the final decision; this only catches obvious typos.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Checks the form. Returns an empty object when everything is fine,
 * otherwise one error per invalid field, in the order the fields appear.
 */
export function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (values.name.trim().length < 2) errors.name = "nameRequired";

  const phone = normalizePhone(values.phone);
  if (!phone) errors.phone = "phoneRequired";
  else if (!PHONE_PATTERN.test(phone)) errors.phone = "phoneInvalid";

  const email = values.email.trim();
  if (!email) errors.email = "emailRequired";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "emailInvalid";

  if (!values.trainingType) errors.trainingType = "trainingTypeRequired";

  if (!Object.values(values.categories).some(Boolean)) {
    errors.categories = "categoriesRequired";
  }

  return errors;
}

/** Turns valid form values into the JSON body for the backend. */
export function toPayload(values: FormValues): ApplicationPayload {
  const categoryFlags = Object.fromEntries(
    categoryIds.map((id) => [`cat_${id}`, values.categories[id]]),
  ) as Record<`cat_${CategoryId}`, boolean>;

  const payload: ApplicationPayload = {
    name: values.name.trim(),
    phone: normalizePhone(values.phone),
    email: values.email.trim(),
    // `validate()` guarantees a value here.
    training_type: values.trainingType as TrainingType,
    ...categoryFlags,
  };

  const questions = values.questions.trim();
  if (SEND_QUESTIONS && questions) payload.questions = questions;

  return payload;
}

/* ------------------------------------------------------------------ */
/* Sending                                                             */
/* ------------------------------------------------------------------ */

/** Keys match the texts in the dictionaries under `apply.result`. */
export type SubmitErrorKey =
  "badRequest" | "tooManyRequests" | "serverError" | "network" | "unknown";

export type SubmitResult = { ok: true } | { ok: false; error: SubmitErrorKey; status?: number };

function errorForStatus(status: number): SubmitErrorKey {
  if (status === 400 || status === 422) return "badRequest";
  if (status === 429) return "tooManyRequests";
  if (status >= 500) return "serverError";
  return "unknown";
}

/**
 * POSTs the application as JSON.
 * Success is only HTTP 201 Created; anything else is reported as an error
 * with a key for a human-readable message.
 */
export async function submitApplication(payload: ApplicationPayload): Promise<SubmitResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(APPLICATIONS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (response.status === 201) return { ok: true };
    return { ok: false, error: errorForStatus(response.status), status: response.status };
  } catch {
    // No connection, DNS failure, timeout…: the request never got an answer.
    return { ok: false, error: "network" };
  } finally {
    clearTimeout(timeout);
  }
}
