import { defineConfig, devices } from "@playwright/test";

/**
 * Automated tests (Playwright).
 *
 *   npm test            build the site, then run every test
 *   npm run test:only   run the tests against the last build (faster)
 *
 * The browser tests open the built site from `out/`, served on port 4173,
 * exactly as a visitor would see it.
 * First time on a new computer: `npx playwright install chromium`.
 */
export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://localhost:4173",
    trace: "retain-on-failure",
  },
  // Chrome always. Firefox and Safari's engine (WebKit) on GitHub, or locally
  // with ALL_BROWSERS=1 after `npx playwright install firefox webkit`.
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    ...(process.env.CI || process.env.ALL_BROWSERS
      ? [
          { name: "firefox", use: { ...devices["Desktop Firefox"] } },
          { name: "webkit", use: { ...devices["Desktop Safari"] } },
        ]
      : []),
  ],
  webServer: {
    command: "npx serve out -l 4173 --no-clipboard",
    url: "http://localhost:4173/lv/",
    reuseExistingServer: !process.env.CI,
  },
});
