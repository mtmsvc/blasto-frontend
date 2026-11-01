# Blasto frontend: guide for AI assistants (and humans)

Website of the Blasto driving school (Riga). Static Next.js 16 site in
Latvian, Russian and English. Read this file before changing anything.
`README.md` has the full human documentation; `AGENTS.md` has Next.js
version notes:

@AGENTS.md

## Golden rules

1. **Before finishing any change, run both and make them pass:**
   ```bash
   npm run check   # types, lint, formatting, color contrast
   npm test        # builds the site and runs ~150 browser tests
   ```
   `npm run format` fixes formatting. Never delete or weaken a test to make
   it pass; fix the code, or update the test only if the behavior was
   meant to change.
2. **The site is a static export** (`output: "export"`). Do not use
   anything that needs a server: API routes / route handlers with POST,
   server actions, middleware/proxy, cookies, headers, rewrites, redirects,
   ISR, `next/image` optimization. Every page must be generated at build
   time.
3. **No hard-coded text in components.** Every visible text lives in
   `src/dictionaries/{lv,ru,en}.ts`. Add new keys to `lv.ts` first (it
   defines the shape), then the same keys to `ru.ts` and `en.ts`;
   TypeScript fails if one is missing.
4. **Facts that are the same in every language** (phone, prices,
   categories, teachers, reviews) live in `src/content/site.ts`. Do not
   repeat them in dictionaries; use `{placeholders}` + `fill()` instead.
5. **Colors only through tokens** (`bg-primary`, `text-muted-foreground`…)
   defined in `src/app/globals.css`. No raw colors (`bg-green-200`, hex).
   Pastel colors never for text. After changing tokens:
   `npm run check:contrast`.
6. **Do not add tracking, analytics, external fonts, embeds or third-party
   scripts.** No new npm dependencies unless really needed.
7. Keep the code commented in plain English for a beginner maintainer,
   in the same style as the existing files.

## Where things are

| What                                            | Where                                                                                   |
| ----------------------------------------------- | --------------------------------------------------------------------------------------- |
| All texts (3 languages)                         | `src/dictionaries/lv.ts`, `ru.ts`, `en.ts`                                              |
| Contacts, prices, categories, teachers, reviews | `src/content/site.ts`                                                                   |
| Internal rules (Latvian legal text)             | `src/content/legal/rules-lv.ts`                                                         |
| List of pages and their URL per language        | `src/i18n/routes.ts` (`pages`)                                                          |
| Page components                                 | `src/components/pages/` (+ `index.ts` registry)                                         |
| Category pages (`/lv/kategorijas/b/`)           | `src/components/pages/category-page.tsx`                                                |
| Home page sections                              | `src/components/home/`                                                                  |
| Header, footer, menus, switchers                | `src/components/layout/`                                                                |
| shadcn/ui primitives                            | `src/components/ui/` (change only if necessary)                                         |
| Application form UI / logic                     | `src/components/apply/application-form.tsx` / `application.ts`                          |
| Theme logic (no flash, animation)               | `src/lib/theme.ts`                                                                      |
| `<head>` tags, hreflang                         | `src/lib/metadata.ts`                                                                   |
| Design tokens, glass effect                     | `src/app/globals.css`                                                                   |
| Routes                                          | `src/app/[lang]/page.tsx` (home), `src/app/[lang]/[...path]/page.tsx` (everything else) |
| Tests                                           | `tests/unit/`, `tests/e2e/`                                                             |
| Deployment (Docker + Caddy)                     | `Dockerfile`, `deploy/`                                                                 |

## How routing works (important)

URLs are translated (`/lv/kontakti/`, `/ru/kontakty/`, `/en/contacts/`),
so folder names cannot match them. One catch-all route,
`src/app/[lang]/[...path]/page.tsx`, receives every address except the
home page, looks it up in `pages` (`src/i18n/routes.ts`) and renders the
component registered in `src/components/pages/index.ts`. Category pages are
`[coursesSlug, categoryId]`. Always build links with `pagePath(lang, page)`
or `categoryPath(lang, id)`, never by hand.

## Recipes

- **Change a text:** edit it in all three dictionaries.
- **Change prices/contacts:** `src/content/site.ts`.
- **Add a page:** add it to `pages` in `src/i18n/routes.ts` (slug per
  language) → create `src/components/pages/<name>-page.tsx` → register it in
  `src/components/pages/index.ts` (with its `meta`) → add `nav.<page>` and
  the page texts to all dictionaries. The sitemap, hreflang tags and the
  page tests pick it up automatically.
- **Add a form field the backend accepts:** `FormValues`, `emptyValues`,
  `validate`, `ApplicationPayload` and `toPayload` in `application.ts`, the
  input in `application-form.tsx`, texts under `apply.form` in all
  dictionaries, and update `tests/unit/application.spec.ts`.
- **Send the "questions" field:** set `SEND_QUESTIONS = true` in
  `src/components/apply/application.ts` (backend field name: `questions`).
- **Add a shadcn component:** `npx shadcn@latest add <name>`.

## Known decisions (do not "fix" these)

- No `scroll-padding-top` on `<html>`: it made the page jump when focus
  moved into the sticky header. Anchor targets use `scroll-mt-*` instead.
- `ScrollToTop` (`src/components/layout/scroll-to-top.tsx`) makes every
  page change open at the top; Next.js alone does not.
- The theme dropdown is `modal={false}` so it does not lock page scroll.
- Language switcher uses plain `<a>` links (full reload, new `<html lang>`).
- Legal documents: the privacy policy is in the dictionaries; the internal
  rules are Latvian-only in `src/content/legal/rules-lv.ts`.
- Content still to confirm with the school is marked `TODO(content)`
  (`grep -rn "TODO(content)" src`).
