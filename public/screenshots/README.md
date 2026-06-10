# Screenshots

## Hero — `hero-deck.png` (TO CAPTURE)

The home page Hero uses this image. Until you drop a PNG here, the Hero
component falls back to `hero-placeholder.svg` (an inline SVG mock).

### Capture spec

| | |
|---|---|
| **Target dimensions** | **1200 × 900 px** (4:3) — matches the Hero's `aspect-[4/3]` slot |
| **Format** | PNG with light compression (~150–250 KB). Lossy JPG fine if smaller. |
| **DPR** | Capture at 2× DPI (2400×1800) and downscale to 1200×900 for crispness on retina. |
| **Theme** | Dark theme. The Hero sits on the dark navy gradient and the screenshot needs to blend. |
| **Profile** | Use the `SYNAPTO` profile (already on your machine). |
| **Content** | A populated deck — recognisable buttons (Spotify, GitHub, Slack, terminal, calendar widget, Now-Playing strip). Mix of action buttons + at least 2 live widgets so the "buttons + widgets on the same grid" story is visible at a glance. |
| **Window chrome** | Include the app window chrome (titlebar + sidebar). It reads as "an actual app" rather than a marketing render. |
| **No PII** | No personal calendar entries, no real Spotify track titles you don't want shared, no commit history visible. |
| **Filename** | `hero-deck.png` (lowercase, hyphenated). Drop it in this folder. |

Once it's in, swap the Hero default in `src/components/Hero.astro` (line with
`screenshotSrc = '/screenshots/hero-placeholder.svg'`) to
`/screenshots/hero-deck.png`. Or override per-page from `index.astro`.

## Phase 6 — animated hero

Once the static screenshot has been live for a few days and the layout reads
well, replace it with a 4–6s loop GIF of the AI Builder approve flow:

1. A proposal lands in the inbox.
2. You hover, then click **Approve**.
3. The new button materialises on the deck with the brand-cyan glow animation.

That's the "AI builds your deck" demo in motion. Target: 1200×900, ≤ 1.5 MB,
loop, no flashes. Save as `hero-ai-builder.gif` and update the Hero's
`screenshotSrc` prop.
