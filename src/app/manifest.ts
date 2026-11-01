import type { MetadataRoute } from "next";

import { defaultLocale } from "@/i18n/config";
import { site } from "@/content/site";

// Generate the file once at build time (required for a static export).
export const dynamic = "force-static";

/**
 * /manifest.webmanifest: lets phones show the "B" icon when someone adds
 * the site to their home screen. The icons are in /public/icons/; the
 * iPhone icon is src/app/apple-icon.png.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} autoskola`,
    short_name: site.name,
    start_url: `/${defaultLocale}/`,
    display: "browser",
    background_color: "#023025",
    theme_color: "#023025",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
