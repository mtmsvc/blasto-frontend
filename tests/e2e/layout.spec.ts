import { expect, test } from "@playwright/test";

import { allUrls } from "../helpers";

/** No page may scroll sideways, on a small phone or a tablet. */

for (const width of [320, 768]) {
  test.describe(`at ${width}px`, () => {
    test.use({ viewport: { width, height: 800 } });

    for (const { url } of allUrls) {
      test(`no horizontal scroll on ${url}`, async ({ page }) => {
        await page.goto(url);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow, "page is wider than the screen").toBeLessThanOrEqual(0);
      });
    }
  });
}
