"use client";

import { useRef, useSyncExternalStore } from "react";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getThemePreference,
  setThemePreference,
  subscribeToTheme,
  type ThemePreference,
} from "@/lib/theme";
import type { Dictionary } from "@/dictionaries";

/**
 * Theme menu: Light / Dark / Same as device.
 * The logic (saving the choice, following the device, the circle animation)
 * is in src/lib/theme.ts.
 */
export function ThemeToggle({ labels }: { labels: Dictionary["common"]["theme"] }) {
  // Reads the saved choice and re-renders when it changes. During the build
  // (no browser) it assumes "system"; the real value is read after loading.
  const preference = useSyncExternalStore(
    subscribeToTheme,
    getThemePreference,
    () => "system" as const,
  );

  const buttonRef = useRef<HTMLButtonElement>(null);

  /** Applies the choice; the new theme grows as a circle from the button. */
  function choose(value: ThemePreference) {
    const rect = buttonRef.current?.getBoundingClientRect();
    const origin = rect && { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    setThemePreference(value, origin);
  }

  const options: { value: ThemePreference; label: string; Icon: typeof SunIcon }[] = [
    { value: "light", label: labels.light, Icon: SunIcon },
    { value: "dark", label: labels.dark, Icon: MoonIcon },
    { value: "system", label: labels.system, Icon: MonitorIcon },
  ];

  return (
    // `modal={false}`: the page stays scrollable while the menu is open, so
    // nothing behind it shifts (a modal menu hides the scrollbar, which
    // moves the page sideways on computers with visible scrollbars).
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          ref={buttonRef}
          variant="ghost"
          size="icon"
          aria-label={labels.label}
          title={labels.label}
        >
          {/* The icon follows the *actual* theme via CSS, so it is right even
              before JavaScript loads. */}
          <SunIcon className="size-5 dark:hidden" aria-hidden />
          <MoonIcon className="hidden size-5 dark:block" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        // When the menu closes, focus goes back to the button. Some browsers
        // scroll the page to "show" a focused element, even one in the
        // sticky header; `preventScroll` makes sure the page never moves.
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          buttonRef.current?.focus({ preventScroll: true });
        }}
      >
        <DropdownMenuLabel>{labels.label}</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={preference}
          onValueChange={(value) => choose(value as ThemePreference)}
        >
          {options.map(({ value, label, Icon }) => (
            <DropdownMenuRadioItem key={value} value={value}>
              <Icon aria-hidden />
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
