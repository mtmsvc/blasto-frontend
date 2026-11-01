import { expect, test } from "@playwright/test";

import {
  emptyValues,
  normalizePhone,
  SEND_QUESTIONS,
  toPayload,
  validate,
  type FormValues,
} from "@/components/apply/application";

/** Tests of the form logic alone, without a browser. */

const valid: FormValues = {
  ...emptyValues("b"),
  name: "Jānis Bērziņš",
  phone: "+371 20 123 456",
  email: "janis@example.lv",
  trainingType: "online",
  questions: "Vai ir vakara grupas?",
};

test("an empty form has an error for every required field", () => {
  expect(validate(emptyValues())).toEqual({
    name: "nameRequired",
    phone: "phoneRequired",
    email: "emailRequired",
    trainingType: "trainingTypeRequired",
    categories: "categoriesRequired",
  });
});

test("a filled form has no errors; questions are optional", () => {
  expect(validate(valid)).toEqual({});
  expect(validate({ ...valid, questions: "" })).toEqual({});
});

test("invalid phone and email are reported", () => {
  expect(validate({ ...valid, phone: "123" }).phone).toBe("phoneInvalid");
  expect(validate({ ...valid, email: "abc@" }).email).toBe("emailInvalid");
});

test("phone numbers are sent without spaces or dashes", () => {
  expect(normalizePhone(" +371 20-123 456 ")).toBe("+37120123456");
});

test("the payload has exactly the fields the backend expects", () => {
  const payload = toPayload(valid);
  const expectedKeys = [
    "name",
    "phone",
    "email",
    "training_type",
    "cat_a",
    "cat_am",
    "cat_b",
    "cat_be",
    "cat_c",
    "cat_ce",
    "cat_d",
    "cat_95",
    ...(SEND_QUESTIONS ? ["questions"] : []),
  ];
  expect(Object.keys(payload).sort()).toEqual(expectedKeys.sort());
  expect(payload).toMatchObject({
    name: "Jānis Bērziņš",
    phone: "+37120123456",
    training_type: "online",
    cat_b: true,
    cat_a: false,
  });
});
