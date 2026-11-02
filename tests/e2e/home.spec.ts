import { expect, test } from "@playwright/test";

import { googleReviews, reviews, showReviewQuotes } from "@/content/site";

/** The home page. */

test("reviews: rating and link to Google; quotes follow the flag", async ({ page }) => {
  await page.goto("/lv/");
  const section = page.getByRole("region", { name: "Ko saka mūsu audzēkņi" });

  await expect(section.getByText("5,0 no 5 Google")).toBeVisible();
  await expect(section.getByRole("link", { name: /Visas atsauksmes Google/ })).toHaveAttribute(
    "href",
    googleReviews.url,
  );
  // showReviewQuotes in src/content/site.ts decides whether quotes appear.
  await expect(section.locator("blockquote")).toHaveCount(showReviewQuotes ? reviews.length : 0);
});
