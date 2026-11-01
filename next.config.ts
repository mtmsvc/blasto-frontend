import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

/**
 * Next.js configuration.
 *
 * The site is a *static export*: `npm run build` writes plain HTML/CSS/JS
 * files to the `out/` folder, which any web server (nginx, Apache, S3,
 * GitHub Pages…) can serve. There is no Node.js server in production.
 *
 * Docs: node_modules/next/dist/docs/01-app/02-guides/static-exports.md
 */
export default function config(phase: string): NextConfig {
  /**
   * Optional local-development proxy for the application form.
   *
   * In production the form POSTs to `/applications` on the same domain, and
   * the web server forwards that to the backend. While developing, there is
   * no such web server, so if you start the dev server with
   *   BACKEND_URL=http://localhost:8000 npm run dev
   * Next.js forwards `/applications` to that address for you.
   *
   * Rewrites are not allowed together with `output: 'export'`, so in that
   * one case (dev server + BACKEND_URL) we skip the export mode. Everywhere
   * else, the export mode stays on, so the dev server warns you early if you
   * use a feature that a static site cannot support.
   */
  const backendUrl = process.env.BACKEND_URL;
  const useDevProxy = phase === PHASE_DEVELOPMENT_SERVER && Boolean(backendUrl);

  return {
    output: useDevProxy ? undefined : "export",

    // `/lv/courses` is written as `out/lv/courses/index.html`, so the site
    // works on any static server without extra rewrite rules.
    trailingSlash: true,

    // The built-in image optimizer needs a server. Teacher photos are already
    // small WebP files, so we serve them as they are.
    images: { unoptimized: true },

    // Needed for the 404 page of a site whose root layout lives in `[lang]`.
    // See src/app/global-not-found.tsx.
    experimental: { globalNotFound: true },

    // Tailwind CSS v4 runs through its Turbopack loader (the default bundler).
    turbopack: {
      rules: {
        "*.css": {
          loaders: ["@tailwindcss/turbopack"],
          as: "*.css",
        },
      },
    },

    ...(useDevProxy && {
      async rewrites() {
        return [{ source: "/applications", destination: `${backendUrl}/applications` }];
      },
    }),
  };
}
