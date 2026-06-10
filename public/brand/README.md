# Brand assets

| File | Status | Notes |
|---|---|---|
| `logo-mark.svg` | **production** (v0.88.7 master) | Solid-navy hex with cyan synapses + rim + hub command node. Tuned for 16px → 1024px. |
| `favicon.svg` | **production** (v0.88.3 tray) | Denser variant — no connection lines (sub-pixel at 16px) + brighter hub. Optimised for 16-32px favicon surfaces. |
| `og-default.png` | **production** | 1200×630, navy gradient + hex + "AI builds your deck. You approve." tagline + `synaptodeck.app` footer. Referenced by `Base.astro` as the default OpenGraph image. |

Source: `logo-work/` in the main app repo. Copied here so the marketing site
builds standalone.

The Inter Variable font ships from `@fontsource-variable/inter` — no
separate web-font hosting needed.

## Why two icon variants

Tray surfaces are hostile (light Win 11 flyout, dark mode, 16-24px render);
the brand icon's thin lines were illegible there. The `favicon.svg` here is
the tray-icon variant — same colour story (navy + cyan), simpler geometry
for small renders. `logo-mark.svg` is the master at 256-viewBox fidelity with
the full neural-network detail.

## If you replace one of these

Match the existing `viewBox` so the Nav + Footer sizing still works. The Nav
renders the mark at 28×28; the favicon serves browser tabs at 16-32.
