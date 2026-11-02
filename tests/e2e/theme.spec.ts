import { expect, test, type Page } from "@playwright/test";

import { openReady, scrollTo, scrollY } from "../helpers";

/** Light/dark theme: switching, remembering, no flash, no page jump. */

async function chooseTheme(page: Page, name: string) {
  await page.getByRole("button", { name: "Krāsu tēma" }).click();
  await page.getByRole("menuitemradio", { name }).click();
}

const isDark = (page: Page) =>
  page.evaluate(() => document.documentElement.classList.contains("dark"));

test("choosing Dark switches the theme and it is remembered", async ({ page }) => {
  await openReady(page, "/lv/");
  await chooseTheme(page, "Tumšā");
  await expect.poll(() => isDark(page)).toBe(true);

  // After a reload, the class must already be set before the page is
  // interactive (= no flash of the light theme).
  await page.addInitScript(() => {
    document.addEventListener("readystatechange", () => {
      if (document.readyState === "interactive") {
        (window as unknown as { darkEarly: boolean }).darkEarly =
          document.documentElement.classList.contains("dark");
      }
    });
  });
  await page.reload();
  await page.locator("html[data-ready]").waitFor({ state: "attached" });
  expect(await page.evaluate(() => (window as unknown as { darkEarly: boolean }).darkEarly)).toBe(
    true,
  );

  await chooseTheme(page, "Kā ierīcē");
  await expect.poll(() => isDark(page)).toBe(false);
});

test("switching the theme does not move the page", async ({ page }) => {
  await openReady(page, "/lv/");
  await scrollTo(page, 1200);
  await chooseTheme(page, "Tumšā");
  await page.waitForTimeout(700); // let the animation finish
  expect(await scrollY(page)).toBe(1200);
});

test.describe("on a phone", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("opening and closing the menu does not move the page", async ({ page }) => {
    await openReady(page, "/lv/");
    await scrollTo(page, 1500);
    await page.getByRole("button", { name: "Atvērt izvēlni" }).click();
    await page.keyboard.press("Escape");
    await page.waitForTimeout(400);
    expect(await scrollY(page)).toBe(1500);
  });
});
