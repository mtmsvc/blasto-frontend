import { cn } from "@/lib/utils";

/**
 * Centers content and limits its width. On phones it keeps a 16px gutter
 * on both sides (`px-4`), on larger screens 24px (`sm:px-6`).
 */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)} {...props} />;
}
