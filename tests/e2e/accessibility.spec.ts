import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { allUrls } from "../helpers";

/**
 * Automated accessibility check (axe, the engine behind Lighthouse's
 * accessibility score) on every page, in the light and the dark theme.
 * Catches missing labels, duplicate landmarks, bad heading structure,
 * insufficient color contrast and similar problems.
 */

for (const colorScheme of ["light", "dark"] as const) {
  test.describe(`${colorScheme} theme`, () => {
    test.use({ colorScheme });

    for (const { url } of allUrls) {
      test(`accessibility of ${url}`, async ({ page }) => {
        await page.goto(url);
        const results = await new AxeBuilder({ page }).analyze();
        // Readable summary in the test output if something fails.
        const problems = results.violations.map(
          (v) => `${v.id}: ${v.help} (${v.nodes.map((n) => n.target.join(" ")).join(", ")})`,
        );
        expect(problems).toEqual([]);
      });
    }
  });
}
