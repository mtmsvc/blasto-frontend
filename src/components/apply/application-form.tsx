"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { CircleAlertIcon, CircleCheckIcon, LoaderCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IconBubble } from "@/components/sections/icon-bubble";
import { findCategory, type CategoryId } from "@/content/site";
import { fill } from "@/i18n/format";
import type { Dictionary } from "@/dictionaries";
import {
  emptyValues,
  QUESTIONS_MAX_LENGTH,
  submitApplication,
  toPayload,
  validate,
  type FieldName,
  type FormValues,
  type SubmitErrorKey,
  type TrainingType,
} from "./application";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type ApplicationFormProps = {
  texts: Pick<Dictionary["apply"], "form" | "errors" | "result">;
  /** Categories in display order, with their translated names. */
  categories: { id: CategoryId; label: string; name: string }[];
  /** Link to the privacy policy, shown under the Send button. */
  privacyHref: string;
};

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "success" }
  | { state: "error"; error: SubmitErrorKey; httpStatus?: number };

/** The order of the fields on screen; the first invalid one gets focus. */
const FIELD_ORDER: FieldName[] = ["name", "phone", "email", "trainingType", "categories"];

/* ------------------------------------------------------------------ */
/* The form                                                            */
/* ------------------------------------------------------------------ */

/**
 * The application form.
 *
 * How it works:
 * 1. Values live in React state (`values`).
 * 2. Errors are *calculated* from the values on every render (`validate`),
 *    but only shown after the first attempt to send (`showErrors`). From
 *    then on they update live as the visitor fixes them.
 * 3. On submit: if something is invalid, the first invalid field gets
 *    focus. Otherwise the data is sent and a success or error message is
 *    shown.
 */
export function ApplicationForm({ texts, categories, privacyHref }: ApplicationFormProps) {
  const id = useId(); // unique prefix for the ids that link labels and fields
  const [values, setValues] = useState<FormValues>(() => emptyValues());
  // False in the pre-built HTML, true once JavaScript is running. Until
  // then the Send button is disabled: otherwise an early click would make
  // the browser submit the form by itself, putting the data in the URL.
  const [ready, setReady] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  // Which field to focus after the next render (a new object each time, so
  // that pressing Send twice focuses the field twice).
  const [focusRequest, setFocusRequest] = useState<{ field: FieldName } | null>(null);

  const fieldRefs = useRef<Partial<Record<FieldName, HTMLElement | null>>>({});
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const questionsRef = useRef<HTMLTextAreaElement>(null);

  const errors = validate(values);
  const hasErrors = Object.keys(errors).length > 0;
  /** Translated error text for a field, or undefined if it should not show. */
  const errorFor = (field: FieldName) =>
    showErrors && errors[field] ? texts.errors[errors[field]] : undefined;

  // Once JavaScript runs:
  // - take over anything typed before that moment. The text fields are
  //   "uncontrolled" (`defaultValue`): the browser keeps what is typed, and
  //   React only reads it. Otherwise Safari erases early typing when React
  //   starts.
  // - tick the category from a "?category=b" link.
  useEffect(() => {
    const typed = {
      name: (fieldRefs.current.name as HTMLInputElement | null)?.value ?? "",
      phone: (fieldRefs.current.phone as HTMLInputElement | null)?.value ?? "",
      email: (fieldRefs.current.email as HTMLInputElement | null)?.value ?? "",
      questions: questionsRef.current?.value ?? "",
    };
    const category = findCategory(new URLSearchParams(window.location.search).get("category"));
    // Setting state in an effect is intended here: the URL is only known in
    // the browser, after the pre-built HTML has loaded.
    /* eslint-disable react-hooks/set-state-in-effect */
    setValues((current) => ({
      ...current,
      ...typed,
      categories: category ? { ...current.categories, [category.id]: true } : current.categories,
    }));
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Focus is moved *after* rendering, so screen readers already hear the
  // field's error message when they land on it.
  useEffect(() => {
    if (focusRequest) fieldRefs.current[focusRequest.field]?.focus();
  }, [focusRequest]);

  // After a successful send, move focus to the thank-you message.
  useEffect(() => {
    if (status.state === "success") successHeadingRef.current?.focus();
  }, [status.state]);

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function toggleCategory(categoryId: CategoryId, checked: boolean) {
    setValues((current) => ({
      ...current,
      categories: { ...current.categories, [categoryId]: checked },
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // we send the data ourselves, with fetch
    if (status.state === "sending") return;

    const firstInvalid = FIELD_ORDER.find((field) => errors[field]);
    if (firstInvalid) {
      setShowErrors(true);
      setFocusRequest({ field: firstInvalid });
      return;
    }

    setStatus({ state: "sending" });
    const result = await submitApplication(toPayload(values));
    setStatus(
      result.ok
        ? { state: "success" }
        : { state: "error", error: result.error, httpStatus: result.status },
    );
  }

  function reset() {
    setValues(emptyValues());
    setShowErrors(false);
    setStatus({ state: "idle" });
  }

  /* ---------- Success ---------- */

  if (status.state === "success") {
    return (
      <div className="flex flex-col items-start gap-4 py-6">
        <IconBubble icon={CircleCheckIcon} className="size-14 rounded-2xl" />
        <h2 ref={successHeadingRef} tabIndex={-1} className="text-2xl font-semibold outline-none">
          {texts.result.successTitle}
        </h2>
        <p className="text-lg text-muted-foreground">{texts.result.successText}</p>
        <Button variant="secondary" onClick={reset} className="mt-2">
          {texts.result.again}
        </Button>
      </div>
    );
  }

  /* ---------- Form ---------- */

  const sending = status.state === "sending";
  const ids = {
    name: `${id}-name`,
    phone: `${id}-phone`,
    phoneHint: `${id}-phone-hint`,
    email: `${id}-email`,
    trainingType: `${id}-training-type`,
    categoriesHint: `${id}-categories-hint`,
    questions: `${id}-questions`,
    questionsHint: `${id}-questions-hint`,
  };
  const errorId = (field: FieldName) => `${id}-${field}-error`;
  /** Joins ids for `aria-describedby`, skipping empty ones. */
  const describedBy = (...list: (string | false | undefined)[]) =>
    list.filter(Boolean).join(" ") || undefined;

  const trainingOptions: { value: TrainingType; label: string; hint: string }[] = [
    { value: "online", label: texts.form.online, hint: texts.form.onlineHint },
    { value: "in_person", label: texts.form.inPerson, hint: texts.form.inPersonHint },
  ];

  return (
    // `noValidate` turns off the browser's own pop-up messages, so ours
    // (translated, and readable by screen readers) are shown instead.
    <form
      onSubmit={handleSubmit}
      noValidate
      data-ready={ready || undefined}
      className="flex flex-col gap-7"
    >
      <p className="text-sm text-muted-foreground">{texts.form.allRequired}</p>

      {/* Name */}
      <div className="flex flex-col gap-2">
        <Label htmlFor={ids.name}>{texts.form.name}</Label>
        <Input
          id={ids.name}
          ref={(el) => {
            fieldRefs.current.name = el;
          }}
          name="name"
          autoComplete="name"
          maxLength={100}
          defaultValue=""
          onChange={(e) => update("name", e.target.value)}
          aria-invalid={errorFor("name") ? true : undefined}
          aria-describedby={describedBy(errorFor("name") && errorId("name"))}
        />
        <FieldError id={errorId("name")} message={errorFor("name")} />
      </div>

      <div className="grid gap-7 sm:grid-cols-2 sm:gap-5">
        {/* Phone */}
        <div className="flex flex-col gap-2">
          <Label htmlFor={ids.phone}>{texts.form.phone}</Label>
          <Input
            id={ids.phone}
            ref={(el) => {
              fieldRefs.current.phone = el;
            }}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={25}
            defaultValue=""
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={errorFor("phone") ? true : undefined}
            aria-describedby={describedBy(ids.phoneHint, errorFor("phone") && errorId("phone"))}
          />
          <p id={ids.phoneHint} className="text-sm text-muted-foreground">
            {texts.form.phoneHint}
          </p>
          <FieldError id={errorId("phone")} message={errorFor("phone")} />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label htmlFor={ids.email}>{texts.form.email}</Label>
          <Input
            id={ids.email}
            ref={(el) => {
              fieldRefs.current.email = el;
            }}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={254}
            defaultValue=""
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={errorFor("email") ? true : undefined}
            aria-describedby={describedBy(errorFor("email") && errorId("email"))}
          />
          <FieldError id={errorId("email")} message={errorFor("email")} />
        </div>
      </div>

      {/* Training type: two radio "cards" */}
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-sm font-medium">{texts.form.trainingType}</legend>
        <RadioGroup
          value={values.trainingType}
          onValueChange={(value) => update("trainingType", value as TrainingType)}
          className="grid gap-3 sm:grid-cols-2"
          aria-invalid={errorFor("trainingType") ? true : undefined}
          aria-describedby={describedBy(errorFor("trainingType") && errorId("trainingType"))}
        >
          {trainingOptions.map((option, index) => {
            const optionId = `${ids.trainingType}-${option.value}`;
            return (
              <label key={option.value} htmlFor={optionId} className={choiceCardClass}>
                <RadioGroupItem
                  id={optionId}
                  value={option.value}
                  ref={
                    index === 0
                      ? (el) => {
                          fieldRefs.current.trainingType = el;
                        }
                      : undefined
                  }
                  aria-invalid={errorFor("trainingType") ? true : undefined}
                  className="mt-0.5"
                />
                <span>
                  <span className="block font-medium">{option.label}</span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">{option.hint}</span>
                </span>
              </label>
            );
          })}
        </RadioGroup>
        <FieldError id={errorId("trainingType")} message={errorFor("trainingType")} />
      </fieldset>

      {/* Categories: checkboxes */}
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-1 text-sm font-medium">{texts.form.categories}</legend>
        <p id={ids.categoriesHint} className="text-sm text-muted-foreground">
          {texts.form.categoriesHint}
        </p>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {categories.map((category, index) => {
            const checkboxId = `${id}-cat-${category.id}`;
            return (
              <label key={category.id} htmlFor={checkboxId} className={choiceCardClass}>
                <Checkbox
                  id={checkboxId}
                  checked={values.categories[category.id]}
                  onCheckedChange={(checked) => toggleCategory(category.id, checked === true)}
                  ref={
                    index === 0
                      ? (el) => {
                          fieldRefs.current.categories = el;
                        }
                      : undefined
                  }
                  aria-invalid={errorFor("categories") ? true : undefined}
                  aria-describedby={describedBy(
                    ids.categoriesHint,
                    errorFor("categories") && errorId("categories"),
                  )}
                  className="mt-0.5"
                />
                <span className="min-w-0">
                  <span className="block font-semibold">{category.label}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                    {category.name}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
        <FieldError id={errorId("categories")} message={errorFor("categories")} />
      </fieldset>

      {/* Questions (optional, not sent yet: see SEND_QUESTIONS in application.ts) */}
      <div className="flex flex-col gap-2">
        <Label htmlFor={ids.questions}>{texts.form.questions}</Label>
        <Textarea
          id={ids.questions}
          ref={questionsRef}
          name="questions"
          maxLength={QUESTIONS_MAX_LENGTH}
          defaultValue=""
          onChange={(e) => update("questions", e.target.value)}
          aria-describedby={ids.questionsHint}
        />
        <p id={ids.questionsHint} className="text-sm text-muted-foreground">
          {texts.form.questionsHint}
        </p>
      </div>

      {/* Server / network error */}
      {status.state === "error" && (
        <div
          role="alert"
          className="flex gap-3 rounded-xl border border-destructive/50 bg-background/70 p-4"
        >
          <CircleAlertIcon className="mt-0.5 size-5 shrink-0 text-destructive" aria-hidden />
          <div className="flex flex-col gap-1">
            <p className="font-semibold">{texts.result.errorTitle}</p>
            <p className="text-sm">{texts.result[status.error]}</p>
            {status.httpStatus !== undefined && (
              <p className="text-xs text-muted-foreground">
                {fill(texts.result.statusCode, { status: status.httpStatus })}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 border-t border-border pt-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button type="submit" size="lg" disabled={sending || !ready} className="w-full sm:w-auto">
            {sending && <LoaderCircleIcon className="animate-spin" aria-hidden />}
            {sending ? texts.form.sending : texts.form.submit}
          </Button>
          {/* Announced by screen readers when it appears. */}
          <p aria-live="polite" className="text-sm font-medium text-destructive">
            {showErrors && hasErrors ? texts.errors.summary : ""}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          {texts.form.privacy}{" "}
          <Link href={privacyHref} className="prose-link text-foreground">
            {texts.form.privacyLink}
          </Link>
        </p>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

/** Shared look of the radio and checkbox "cards". */
const choiceCardClass = [
  "flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background/60 p-4 transition-colors",
  "hover:bg-accent",
  "has-data-[state=checked]:border-primary has-data-[state=checked]:bg-secondary",
].join(" ");

/** Error text under a field. The field's `aria-describedby` points to this
 *  id only while there is an error, so screen readers read it with the field. */
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="flex items-center gap-1.5 text-sm font-medium text-destructive">
      <CircleAlertIcon className="size-4 shrink-0" aria-hidden />
      {message}
    </p>
  );
}
