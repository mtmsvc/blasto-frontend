import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Joins CSS class names and resolves Tailwind conflicts.
 *
 *   cn("px-2 py-1", isActive && "bg-accent", "px-4") → "py-1 bg-accent px-4"
 *
 * `clsx` drops falsy values; `twMerge` keeps only the last of two
 * conflicting Tailwind classes (here `px-4` wins over `px-2`).
 * Used by every component that accepts a `className` prop.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
