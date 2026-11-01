#!/usr/bin/env node
/**
 * Checks that the color tokens in src/app/globals.css meet WCAG AA.
 *
 *   npm run check:contrast
 *
 * - Text pairs need a contrast ratio of at least 4.5:1.
 * - Form-control borders and focus rings ("non-text") need at least 3:1.
 * - Semi-transparent colors (glass, hover states) are first blended over
 *   what is behind them, including the pastel background shapes in their
 *   strongest spot, so the worst case is tested.
 *
 * Run it after changing any color. It exits with an error if a pair fails.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { converter, parse, wcagContrast } from "culori";

const cssPath = fileURLToPath(new URL("../src/app/globals.css", import.meta.url));
const css = readFileSync(cssPath, "utf8");
const toRgb = converter("rgb");

/** Reads all `--name: value;` lines inside the first `selector { … }` block. */
function readTokens(selector) {
  const start = css.indexOf(`${selector} {`);
  if (start === -1) throw new Error(`Block "${selector}" not found in globals.css`);
  const block = css.slice(start, css.indexOf("\n}", start));
  const tokens = {};
  for (const [, name, value] of block.matchAll(/--([\w-]+):\s*([^;]+);/g))
    tokens[name] = value.trim();
  return tokens;
}

/** Blends a (possibly transparent) color over an opaque one, like a browser does. */
function over(top, bottom) {
  const a = top.alpha ?? 1;
  return {
    mode: "rgb",
    r: top.r * a + bottom.r * (1 - a),
    g: top.g * a + bottom.g * (1 - a),
    b: top.b * a + bottom.b * (1 - a),
  };
}

function withAlpha(color, alpha) {
  return { ...color, alpha: (color.alpha ?? 1) * alpha };
}

function checkTheme(name, tokens) {
  const color = (token) => {
    const value = tokens[token];
    if (!value) throw new Error(`Token --${token} missing in ${name} theme`);
    return toRgb(parse(value));
  };
  const bg = color("background");
  const surface = (token) => over(color(token), bg);

  // Backgrounds that text can sit on, including the worst-case glass ones.
  const glassOver = (behind) => over(color("glass"), behind);
  const blobs = ["blob-1", "blob-2", "blob-3"].map((blob) => over(color(blob), bg));
  const glassSurfaces = [glassOver(bg), ...blobs.map(glassOver)];

  const checks = [
    // [description, foreground, background(s), minimum ratio]
    ["foreground on background", color("foreground"), [bg], 4.5],
    ["muted text on background", color("muted-foreground"), [bg], 4.5],
    ["card text on card", color("card-foreground"), [surface("card")], 4.5],
    ["muted text on card", color("muted-foreground"), [surface("card")], 4.5],
    ["muted text on muted", color("muted-foreground"), [surface("muted")], 4.5],
    ["popover text on popover", color("popover-foreground"), [surface("popover")], 4.5],
    ["primary button text", color("primary-foreground"), [surface("primary")], 4.5],
    [
      "primary button text (hover 90%)",
      color("primary-foreground"),
      [over(withAlpha(color("primary"), 0.9), bg)],
      4.5,
    ],
    ["secondary text on secondary", color("secondary-foreground"), [surface("secondary")], 4.5],
    ["secondary text on pastel (hover)", color("secondary-foreground"), [surface("pastel")], 4.5],
    ["foreground on secondary (selected option)", color("foreground"), [surface("secondary")], 4.5],
    [
      "muted text on secondary (selected option)",
      color("muted-foreground"),
      [surface("secondary")],
      4.5,
    ],
    ["accent text on accent (hover)", color("accent-foreground"), [surface("accent")], 4.5],
    ["muted text on accent (hover)", color("muted-foreground"), [surface("accent")], 4.5],
    ["error text on background", color("destructive"), [bg, surface("card")], 4.5],
    ["error text on glass", color("destructive"), glassSurfaces, 4.5],
    ["foreground on glass", color("foreground"), glassSurfaces, 4.5],
    ["muted text on glass", color("muted-foreground"), glassSurfaces, 4.5],
    ["muted text on background over shapes", color("muted-foreground"), blobs, 4.5],
    ["foreground on background over shapes", color("foreground"), blobs, 4.5],
    ["form control border", color("input"), [bg, surface("card"), ...glassSurfaces], 3],
    ["focus ring", color("ring"), [bg, surface("card"), ...glassSurfaces], 3],
    ["checked checkbox", color("primary"), [bg, surface("card")], 3],
  ];

  let failures = 0;
  console.log(`\n${name} theme`);
  for (const [label, fg, backgrounds, min] of checks) {
    const worst = Math.min(...backgrounds.map((b) => wcagContrast(fg, b)));
    const ok = worst >= min;
    if (!ok) failures++;
    console.log(`  ${ok ? "✓" : "✗"} ${label.padEnd(44)} ${worst.toFixed(2)} (min ${min})`);
  }
  return failures;
}

const failures =
  checkTheme("Light", readTokens(":root")) +
  checkTheme("Dark", { ...readTokens(":root"), ...readTokens(".dark") });

if (failures > 0) {
  console.error(`\n${failures} pair(s) below WCAG AA. Adjust the tokens in globals.css.`);
  process.exit(1);
}
console.log("\nAll color pairs meet WCAG AA.");
