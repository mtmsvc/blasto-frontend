"use client";

import { useSyncExternalStore } from "react";
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
 * The logic (saving the choice, following the device) is in src/lib/theme.ts.
 */
export function ThemeToggle({ labels }: { labels: Dictionary["common"]["theme"] }) {
  // Reads the saved choice and re-renders when it changes. During the build
  // (no browser) it assumes "system"; the real value is read after loading.
  const preference = useSyncExternalStore(
    subscribeToTheme,
    getThemePreference,
    () => "system" as const,
  );

  const options: { value: ThemePreference; label: string; Icon: typeof SunIcon }[] = [
    { value: "light", label: labels.light, Icon: SunIcon },
    { value: "dark", label: labels.dark, Icon: MoonIcon },
    { value: "system", label: labels.system, Icon: MonitorIcon },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={labels.label} title={labels.label}>
          {/* The icon follows the *actual* theme via CSS, so it is right even
              before JavaScript loads. */}
          <SunIcon className="size-5 dark:hidden" aria-hidden />
          <MoonIcon className="hidden size-5 dark:block" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{labels.label}</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={preference}
          onValueChange={(value) => setThemePreference(value as ThemePreference)}
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
