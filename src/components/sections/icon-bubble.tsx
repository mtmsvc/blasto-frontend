import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/** An icon on a soft pastel tile, used next to headings in cards. */
export function IconBubble({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return (
    <span
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-xl bg-secondary text-secondary-foreground",
        className,
      )}
    >
      <Icon className="size-5" aria-hidden />
    </span>
  );
}
