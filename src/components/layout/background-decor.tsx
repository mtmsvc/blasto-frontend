/**
 * Soft pastel shapes fixed behind the page. They give the glass surfaces
 * (header, cards) something to blur, which is what makes them look like
 * frosted glass. Purely decorative, hidden from screen readers.
 *
 * The shapes are plain CSS gradients (no images, no blur filters), so they
 * cost almost nothing to draw. Their colors are the `--blob-*` tokens in
 * globals.css.
 */
export function BackgroundDecor() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-48 -left-40 size-[38rem] rounded-full bg-[radial-gradient(closest-side,var(--blob-1),transparent)]" />
      <div className="absolute top-[20%] -right-56 size-[34rem] rounded-full bg-[radial-gradient(closest-side,var(--blob-2),transparent)]" />
      <div className="absolute -bottom-64 left-[15%] size-[42rem] rounded-full bg-[radial-gradient(closest-side,var(--blob-3),transparent)]" />
      <div className="absolute top-[45%] left-[35%] size-[30rem] rounded-full bg-[radial-gradient(closest-side,var(--blob-1),transparent)] opacity-70" />
      <div className="absolute -right-32 -bottom-40 size-[34rem] rounded-full bg-[radial-gradient(closest-side,var(--blob-2),transparent)] opacity-80" />
    </div>
  );
}
