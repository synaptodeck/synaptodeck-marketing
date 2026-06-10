# Brand assets

These are **placeholder** assets for v1 review. Swap them with the production
files from the main app repo before the production domain flip.

## Files in this folder

| File | Purpose | Status |
|---|---|---|
| `logo-mark.svg` | Hexagon + synapse mark used in the Nav + Footer | **placeholder** |
| `favicon.svg` | Browser tab favicon | **placeholder** |
| `og-default.png` | OpenGraph image for social shares (1200×630) | **missing — see below** |

## Where the production assets live

- Main app repo: `src-tauri/icons/` (icon variants)
- Main app repo: `logo-work/` (source SVGs + wordmarks)

## Replacement checklist

1. Copy the dark-bg cyan mark (transparent background) to `logo-mark.svg`.
2. Generate a 32×32 favicon from the mark; save as `favicon.svg`.
3. Render a 1200×630 OG image to `og-default.png` with the hex + wordmark on a
   navy background, plus the tagline "AI builds your deck. You approve."
4. (Optional) Add a wordmark SVG (`wordmark-dark.svg`, `wordmark-light.svg`)
   if/when the Nav grows beyond the mark.

The Inter Variable font ships from `@fontsource-variable/inter` — no
separate web-font hosting needed.
