# Blasto: driving school website

The website of the Blasto driving school, in Latvian, Russian and English.

- **Next.js 16** (App Router, TypeScript), exported as a **static site**: plain HTML/CSS/JS files that any web server can host. No Node.js server in production.
- **Tailwind CSS 4** for styling, **shadcn/ui** for the interactive components (menu, dropdown, form controls).
- Light and dark theme, three languages, an application form that POSTs JSON to `/applications`.

> ⚠️ **The content is sample data.** Prices, contacts, teachers and some texts are placeholders.
> See [Placeholder content](#placeholder-content) before going live.

---

## Quick start

You need **Node.js 20.9 or newer** (`node -v` to check; see `.nvmrc`).

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000. It redirects to http://localhost:3000/lv/. Edits to the code show up in the browser right away.

### Trying the application form locally

The form sends data to `/applications` on the same domain. While developing there is no backend, so use the included fake one.

In one terminal:

```bash
npm run mock-api
```

In a second terminal:

```bash
BACKEND_URL=http://localhost:8000 npm run dev
```

The mock prints every application it receives and answers `201 Created`. To see how the form shows a server error, start it with `MOCK_STATUS=500 npm run mock-api`.

To use your **real backend** locally, point `BACKEND_URL` at it instead (e.g. `BACKEND_URL=http://localhost:8080`).

---

## Building the static files

```bash
npm run build
```

This writes the whole website to the **`out/`** folder:

```
out/
├── index.html          → "/" (redirects to /lv/)
├── 404.html            → "page not found" page
├── lv/index.html       → /lv/
├── lv/courses/index.html
├── ru/…, en/…
├── sitemap.xml, robots.txt, icon.svg
└── _next/…             → CSS and JavaScript
```

To look at the built site exactly as a web server would serve it:

```bash
npm run preview
```

Then open http://localhost:3000.

The site address used in canonical links, hreflang tags and the sitemap is `https://blasto.lv`. For another domain (e.g. a staging server), set it when building:

```bash
NEXT_PUBLIC_SITE_URL=https://staging.blasto.lv npm run build
```

### Deploying

Copy the contents of `out/` to your web server. The server should also:

1. **Forward `POST /applications` to the backend** (the form needs it).
2. **Serve `404.html`** for missing pages.
3. Optionally **redirect `/` to `/lv/` with a 301** (the site already does this in the browser, but a real redirect is better for search engines).

Example for **nginx**:

```nginx
server {
    server_name blasto.lv;
    root /var/www/blasto/out;

    # 3. Real redirect for the root URL
    location = / { return 301 /lv/; }

    # 1. The application form → backend
    location = /applications {
        proxy_pass http://127.0.0.1:8000;   # your backend address
    }

    # Static files; "/lv/courses/" → "/lv/courses/index.html"
    location / {
        try_files $uri $uri/ =404;
    }

    # 2. Custom 404 page
    error_page 404 /404.html;

    # Files in /_next/static/ have a hash in their name and never change
    location /_next/static/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

On **Apache**, the equivalents are `ErrorDocument 404 /404.html`, `RedirectMatch 301 ^/$ /lv/` and a `ProxyPass /applications …` rule.

---

## Project structure

```
src/
├── app/                        Pages (Next.js "App Router": folders = URLs)
│   ├── [lang]/                 Everything under /lv/, /ru/, /en/
│   │   ├── layout.tsx          <html>, header, footer, theme script (wraps every page)
│   │   ├── page.tsx            Home page
│   │   ├── courses/page.tsx    Courses & prices
│   │   ├── teachers/page.tsx   Teachers
│   │   ├── contacts/page.tsx   Contacts
│   │   └── apply/page.tsx      Application form
│   ├── (redirect)/             The "/" page that redirects to /lv/
│   ├── global-not-found.tsx    404 page (in all three languages)
│   ├── globals.css             Design tokens (colors), glass effect, base styles
│   ├── sitemap.ts, robots.ts   Generated sitemap.xml and robots.txt
│   └── icon.svg                Favicon
│
├── dictionaries/               ALL TEXTS. One file per language.
│   ├── lv.ts                   Latvian (defines the structure)
│   ├── ru.ts                   Russian
│   ├── en.ts                   English
│   └── index.ts                getDictionary(lang)
│
├── content/site.ts             Facts that are the same in every language:
│                               contacts, prices, categories, teachers
│
├── components/
│   ├── ui/                     shadcn/ui building blocks (Button, Card, Checkbox…)
│   ├── layout/                 Header, footer, menus, language & theme switchers
│   ├── sections/               Reusable page parts (page title, call-to-action…)
│   ├── home/                   Sections of the home page
│   ├── courses/, teachers/     Cards for those pages
│   └── apply/
│       ├── application.ts      Form data, validation and sending (no React)
│       └── application-form.tsx The form itself
│
├── i18n/                       Language helpers
│   ├── config.ts               List of languages
│   ├── routes.ts               List of pages and URL helpers
│   ├── params.ts               Reads the language from the URL
│   └── format.ts               Price formatting, {placeholder} filling
│
└── lib/
    ├── theme.ts                Light/dark logic + the no-flash script
    ├── metadata.ts             <title>, description, canonical, hreflang
    └── utils.ts                cn() helper for class names

brand/                          Logo files for print, social media, documents
├── blasto-logo.svg             Wordmark, sage green, transparent background
├── blasto-logo-on-dark.svg     Wordmark on the dark forest-green background
└── blasto-logo-upright.svg     Alternative with a smaller slant (8° instead of 14°)

scripts/
├── check-contrast.mjs          Verifies the colors meet WCAG AA
└── mock-api.mjs                Fake backend for local testing
```

**Server vs Client Components.** Files without `"use client"` at the top run only at build time and become plain HTML. Only the interactive pieces (menu, theme switcher, form) are Client Components that ship JavaScript to the browser.

---

## Common tasks

### Change a text

Open `src/dictionaries/lv.ts` (and `ru.ts`, `en.ts`), find the text, edit it. All three files have the same structure. If you add a new key to `lv.ts` and forget it in another language, `npm run typecheck` (and your editor) will point it out.

### Change prices, contacts or opening hours

Edit `src/content/site.ts`. Prices are numbers in euros and are formatted per language automatically (`120 €` in Latvian, `€120` in English).

### Add or edit a teacher

1. In `src/content/site.ts`, add an entry to `teachers` with a unique `id`.
2. Add a bio for that `id` under `teachers.bios` in each dictionary.
3. **Photo (optional):** save a square image (about 400×400 px) as **WebP** into `public/teachers/`, e.g. `public/teachers/anna.webp`, and set `photo: "anna.webp"`. Without a photo, the teacher's initials are shown. Photos load lazily (only when scrolled into view).

   To convert a JPG or PNG: open https://squoosh.app, drop the image in, choose **WebP** and resize to 400 px wide.

### Add a page

1. Add it to `pages` in `src/i18n/routes.ts` (and to `menuPages` if it belongs in the menu).
2. Create `src/app/[lang]/<name>/page.tsx`; copy `teachers/page.tsx` as a starting point.
3. Add its menu label under `nav`, plus its texts, in every dictionary.

It is automatically included in the sitemap and gets hreflang tags.

### Change colors

All colors are CSS variables at the top of `src/app/globals.css`, once for the light theme (`:root`) and once for the dark theme (`.dark`). Components only use these tokens (`bg-primary`, `text-muted-foreground`…), so changing a value restyles the whole site. After a change, run:

```bash
npm run check:contrast
```

It checks every text/background pair (including text on glass) against WCAG AA and tells you which one fails.

**The rule:** pastel colors are for backgrounds, borders and decoration only. Text always uses a `*-foreground` token.

### The logo

On the website the logo is drawn in code, in `src/components/layout/logo.tsx`. It takes the theme's colors and stays sharp at any size. The letters are simple shapes in an upright grid, slanted by one number (`SLANT`). The favicon is `src/app/icon.svg` (the "B" alone). Ready-made files for other uses are in `brand/`.

### Add a shadcn/ui component

```bash
npx shadcn@latest add accordion
```

The component is copied into `src/components/ui/`, where you can read and change it. Browse them at https://ui.shadcn.com/docs/components.

---

## How it works

### Languages

Every page lives under `src/app/[lang]/`. `[lang]` is a _dynamic segment_: `generateStaticParams()` in `src/app/[lang]/layout.tsx` tells Next.js to build each page three times, for `lv`, `ru` and `en`. Each page reads the language from the URL and loads its texts with `getDictionary(lang)`.

The language switcher links to the same page in another language. Each page has `<link rel="alternate" hreflang="…">` tags (built in `src/lib/metadata.ts`), so search engines know the three versions belong together.

### Theme without flash

The HTML is built in advance, so it cannot know whether the visitor chose dark mode. A tiny script in `<head>` (`themeScript` in `src/lib/theme.ts`) runs _before the page is painted_: it reads the saved choice from `localStorage` (or the device setting) and adds the `dark` class to `<html>`. The CSS for `.dark` swaps the color tokens.

### Glass effect

The `glass` class (defined in `globals.css`) gives an element a semi-transparent background, a blur of what is behind it (`backdrop-filter`), a thin light border and a soft shadow. Soft pastel shapes are fixed behind the page (`background-decor.tsx`) so the blur has something to show. People who enable "reduce transparency" in their OS get solid surfaces instead.

### The application form

`src/components/apply/application-form.tsx` keeps the values in React state. Errors are calculated from the values on every render and shown after the first Send attempt. On Send:

1. If something is invalid, the first invalid field gets focus and its error is read out by screen readers.
2. Otherwise `submitApplication()` (in `application.ts`) POSTs this JSON to `/applications`:

   ```json
   {
     "name": "Jānis Bērziņš",
     "phone": "+37120000000",
     "email": "janis@example.lv",
     "training_type": "online",
     "cat_a": false,
     "cat_am": false,
     "cat_b": true,
     "cat_be": false,
     "cat_c": false,
     "cat_ce": false,
     "cat_d": false,
     "cat_95": false
   }
   ```

   The phone number is sent without spaces. `training_type` is `"online"` or `"in_person"`.

3. **201** → thank-you message. Anything else → a readable error (bad data, too many requests, server error, no connection), plus the HTTP status code.

The Apply buttons on the prices page link to `/lv/apply/?category=b`, which ticks that category in advance.

---

## Quality checks

```bash
npm run check
```

This runs all of the following in one go:

| Command                  | What it checks                                         |
| ------------------------ | ------------------------------------------------------ |
| `npm run typecheck`      | TypeScript types, including missing dictionary keys    |
| `npm run lint`           | ESLint (Next.js + React rules)                         |
| `npm run format:check`   | Code formatting (Prettier). `npm run format` fixes it. |
| `npm run check:contrast` | WCAG AA color contrast in both themes                  |

Lighthouse (Chrome DevTools → Lighthouse, mobile) on the built site (`npm run build && npm run preview`) scored 95–100 for Performance and 100 for Accessibility, Best Practices and SEO at the time of writing.

There are no analytics or tracking scripts, and no third-party requests. The map is a link, not an embedded widget.

---

## Placeholder content

Everything below is **sample data** and must be replaced with the school's real information:

- `src/content/site.ts`: company name and number, phone, email, address, map link, opening hours, **all prices and minimum ages**, teachers.
- Dictionaries (`lv.ts`, `ru.ts`, `en.ts`): the "About us" text, teacher bios, the "Good to know" notes and the FAQ answers.

Every such spot is marked with `TODO(content)`. To list them:

```bash
grep -rn "TODO(content)" src
```

---

## Learning resources

- Next.js docs for **this exact version** ship with the package: `node_modules/next/dist/docs/`. Start with `01-app/01-getting-started/`.
- Next.js: https://nextjs.org/docs (App Router), especially _Layouts and Pages_, _Linking_, _Server and Client Components_, _Static Exports_.
- Tailwind CSS: https://tailwindcss.com/docs. Hover over a class in VS Code with the _Tailwind CSS IntelliSense_ extension to see the CSS it produces.
- shadcn/ui: https://ui.shadcn.com
- Radix UI (what shadcn is built on): https://www.radix-ui.com/primitives
- React: https://react.dev/learn

Recommended VS Code extensions: _ESLint_, _Prettier_, _Tailwind CSS IntelliSense_.
