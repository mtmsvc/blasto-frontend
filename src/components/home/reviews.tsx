import { ExternalLinkIcon, QuoteIcon, StarIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/sections/section-heading";
import { googleReviews, reviews, showReviewQuotes } from "@/content/site";
import { cn } from "@/lib/utils";
import { fill } from "@/i18n/format";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/dictionaries";

/**
 * The overall Google rating and a link to all reviews, plus (when
 * `showReviewQuotes` in site.ts is true) a few reviews quoted in their
 * original language.
 *
 * The quotes are plain text in src/content/site.ts, not a Google widget:
 * no third-party scripts, no tracking, nothing extra to download.
 */
export function Reviews({ lang, texts }: { lang: Locale; texts: Dictionary["home"]["reviews"] }) {
  const rating = new Intl.NumberFormat(lang, { minimumFractionDigits: 1 }).format(
    googleReviews.rating,
  );

  return (
    <section aria-labelledby="reviews-title" className="mt-28 sm:mt-36">
      <Container>
        <div
          className={cn(
            "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
            showReviewQuotes && "mb-10",
          )}
        >
          <SectionHeading id="reviews-title" title={texts.title} className="mb-0" />
          <div className="flex flex-col gap-1 sm:items-end">
            <p className="flex items-center gap-2 font-semibold">
              <span aria-hidden className="flex text-primary">
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon key={i} className="size-4 fill-current" />
                ))}
              </span>
              {fill(texts.rating, { rating })}
            </p>
            <a
              href={googleReviews.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm prose-link"
            >
              {texts.all} ({fill(texts.count, { count: googleReviews.count })})
              <ExternalLinkIcon className="size-3.5" aria-hidden />
            </a>
          </div>
        </div>

        {/* Quotes can be switched off with `showReviewQuotes` in site.ts. */}
        {showReviewQuotes && (
          <ul className="grid gap-4 md:grid-cols-3">
            {reviews.map((review) => (
              <li key={review.author}>
                <Card className="h-full gap-4">
                  <QuoteIcon className="size-6 text-muted-foreground" aria-hidden />
                  <blockquote lang={review.lang} className="leading-relaxed">
                    {review.text}
                  </blockquote>
                  <p className="mt-auto text-sm font-medium text-muted-foreground">
                    {review.author}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
