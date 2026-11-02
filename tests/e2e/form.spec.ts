import { expect, test, type Page } from "@playwright/test";

import { SEND_QUESTIONS } from "@/components/apply/application";

/** The application form at /lv/pieteikums/. */

const FORM_URL = "/lv/pieteikums/";

/** Opens the form and waits until its JavaScript is running. */
async function openForm(page: Page, url = FORM_URL) {
  await page.goto(url);
  await expect(page.locator("form[data-ready]")).toBeVisible();
}

async function fillValidForm(page: Page) {
  await page.getByLabel("Vārds, uzvārds").fill("Jānis Tests");
  await page.getByLabel("Tālrunis").fill("+371 20 123 456");
  await page.getByLabel("E-pasts").fill("janis@example.lv");
  await page.getByRole("radio", { name: /Klātienē/ }).click();
  await page.getByRole("checkbox", { name: /^B / }).click();
  await page.getByLabel("Jautājumi").fill("Vai ir vakara grupas?");
}

/** Answers POST /applications with `status` and returns the sent JSON. */
async function mockBackend(page: Page, status: number) {
  const sent: { body?: Record<string, unknown> } = {};
  await page.route("**/applications", async (route) => {
    sent.body = route.request().postDataJSON();
    await route.fulfill({ status, contentType: "application/json", body: "{}" });
  });
  return sent;
}

const send = (page: Page) => page.getByRole("button", { name: "Nosūtīt pieteikumu" }).click();
const errorAlert = (page: Page) => page.getByRole("alert").filter({ hasText: "Pieteikumu" });

test("sending an empty form shows errors and focuses the first field", async ({ page }) => {
  await openForm(page);
  await send(page);
  await expect(page.getByText("Lūdzu, ieraksti vārdu un uzvārdu.")).toBeVisible();
  await expect(page.getByText("Lūdzu, izvēlies vismaz vienu kategoriju.")).toBeVisible();
  await expect(page.getByLabel("Vārds, uzvārds")).toBeFocused();
});

test("on 201 the exact payload is sent and a thank-you is shown", async ({ page }) => {
  await openForm(page);
  const sent = await mockBackend(page, 201);
  await fillValidForm(page);
  await send(page);

  await expect(page.getByRole("heading", { name: "Paldies! Pieteikums saņemts." })).toBeFocused();
  expect(sent.body).toMatchObject({
    name: "Jānis Tests",
    phone: "+37120123456",
    email: "janis@example.lv",
    training_type: "in_person",
    cat_b: true,
    cat_a: false,
    cat_95: false,
  });
  // The questions field is only sent once the backend supports it.
  expect("questions" in (sent.body ?? {})).toBe(SEND_QUESTIONS);
});

test("server errors are shown in plain words with the status code", async ({ page }) => {
  await openForm(page);
  await mockBackend(page, 500);
  await fillValidForm(page);
  await send(page);
  await expect(errorAlert(page)).toContainText("Serverī radās kļūda");
  await expect(errorAlert(page)).toContainText("500");
});

test("a lost connection is explained", async ({ page }) => {
  await openForm(page);
  await page.route("**/applications", (route) => route.abort());
  await fillValidForm(page);
  await send(page);
  await expect(errorAlert(page)).toContainText("Neizdevās sazināties ar serveri");
});

test("?category= ticks that category", async ({ page }) => {
  await openForm(page, "/ru/zayavka/?category=ce");
  await expect(page.getByRole("checkbox", { name: /^CE/ })).toBeChecked();
});

test("categories are listed like on the old form: B, A1/A2/A, AM…", async ({ page }) => {
  await openForm(page);
  const labels = await page
    .locator("fieldset")
    .nth(1)
    .getByRole("checkbox")
    .evaluateAll((boxes) =>
      boxes.map((box) => box.closest("label")?.querySelector("span span")?.textContent),
    );
  expect(labels).toEqual(["B", "A1/A2/A", "AM", "BE", "C", "CE", "D", "95"]);
});

test("text typed before the page is ready is kept", async ({ page }) => {
  // Simulates a slow device: type into the pre-built form, then let the
  // JavaScript start. Nothing typed may be lost.
  await page.route("**/_next/static/**/*.js", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await route.continue();
  });
  await page.goto("/lv/pieteikums/?category=b");
  await page.getByLabel("Vārds, uzvārds").fill("Ātrs Rakstītājs");
  await expect(page.locator("form[data-ready]")).toBeVisible({ timeout: 15000 });
  await expect(page.getByLabel("Vārds, uzvārds")).toHaveValue("Ātrs Rakstītājs");
  await expect(page.getByRole("checkbox", { name: /^B / })).toBeChecked();
});
