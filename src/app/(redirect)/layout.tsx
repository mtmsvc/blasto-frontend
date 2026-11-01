import { defaultLocale } from "@/i18n/config";

/**
 * Layout for the root URL "/" only.
 *
 * A static site cannot redirect on the server, so "/" is a tiny HTML page
 * that sends the browser to /lv/ immediately, in three ways:
 *   1. <meta http-equiv="refresh"> works even without JavaScript,
 *   2. the inline script is a bit faster and keeps the Back button clean,
 *   3. a visible link, just in case.
 *
 * Tip: if your web server can do redirects, also add a real 301 from "/"
 * to "/lv/" there (see README). Search engines prefer it.
 *
 * The folder name "(redirect)" is in brackets, so it is not part of the
 * URL: this is a "route group" with its own root layout.
 */
export default function RedirectLayout({ children }: { children: React.ReactNode }) {
  const target = `/${defaultLocale}/`;

  return (
    <html lang={defaultLocale}>
      <head>
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
        <link rel="canonical" href={target} />
        <script
          dangerouslySetInnerHTML={{ __html: `location.replace(${JSON.stringify(target)})` }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
