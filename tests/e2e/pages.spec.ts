import { expect, test } from "@playwright/test";

import { allUrls, collectConsoleErrors } from "../helpers";

/** Every page loads, has the basics right, and logs no errors. */

for (const { lang, url } of allUrls) {
  test(`page ${url}`, async ({ page }) => {
    const errors = collectConsoleErrors(page);
    const response = await page.goto(url);

    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page).toHaveTitle(/Blasto/);
    // Canonical URL + one hreflang link per language + x-default.
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(4);
    expect(errors).toEqual([]);
  });
}

test("the root URL redirects to the Latvian home page", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/lv\/$/);
});

test("unknown URLs show the 404 page", async ({ page }) => {
  const response = await page.goto("/lv/does-not-exist/");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Lapa nav atrasta");
});
