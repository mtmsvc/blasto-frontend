import { expect, test } from "@playwright/test";

import { openReady, scrollTo, scrollY } from "../helpers";

/** Moving between pages and languages. */

test("a new page always opens at the top", async ({ page }) => {
  for (const start of [30, 150, 900]) {
    await openReady(page, "/lv/");
    await scrollTo(page, start);
    await page.locator("header nav").getByRole("link", { name: "Kontakti", exact: true }).click();
    await expect(page).toHaveURL(/\/lv\/kontakti\/$/);
    await expect.poll(() => scrollY(page)).toBe(0);
  }
});

test("the Back button returns to the previous position", async ({ page }) => {
  await openReady(page, "/lv/kontakti/");
  await scrollTo(page, 300);
  await page.locator("header nav").getByRole("link", { name: "Pasniedzēji", exact: true }).click();
  await expect(page).toHaveURL(/pasniedzeji/);
  await page.goBack();
  await expect.poll(() => scrollY(page)).toBe(300);
});

test("the language switcher keeps you on the same page", async ({ page }) => {
  await openReady(page, "/lv/kategorijas/ce/");
  const switcher = page.locator("header").getByRole("navigation", { name: "Valoda" });
  await expect(switcher.locator('a[hreflang="ru"]')).toHaveAttribute("href", "/ru/kategorii/ce/");
  await expect(switcher.locator('a[hreflang="en"]')).toHaveAttribute("href", "/en/categories/ce/");
});

test("home page category tiles open the category page", async ({ page }) => {
  await openReady(page, "/lv/");
  await page.locator('a[href="/lv/kategorijas/d/"]').first().click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("D kategorija");
});

test.describe("on a phone", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("the menu opens, navigates and closes", async ({ page }) => {
    await openReady(page, "/ru/");
    await page.getByRole("button", { name: "Открыть меню" }).click();
    await page.getByRole("dialog").getByRole("link", { name: "Курсы и цены" }).click();
    await expect(page).toHaveURL(/\/ru\/kategorii\/$/);
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });
});
