# synaptodeck-marketing

Marketing site for **SynaptoDeck** — published at `synaptodeck.app` after the
maintainer flips the production domain.

Built with [Astro 4](https://astro.build) + [Tailwind 3](https://tailwindcss.com),
deployed to [Cloudflare Pages](https://pages.cloudflare.com).

> **Deployment gate.** This v1 ships to a Cloudflare Pages preview URL
> (`*.pages.dev`) only. Do not point the production `synaptodeck.app` or
> `synaptodeck.com` DNS at this site until the maintainer has reviewed the
> generated pages.

---

## Quickstart

```bash
nvm use            # Node 22 (or use the .nvmrc / .node-version files)
npm install
npm run dev        # http://localhost:4321
```

Other scripts:

| Script | What it does |
|---|---|
| `npm run build` | Full type-check + production build into `dist/`. |
| `npm run build:fast` | Skip `astro check`; useful for quick iteration. |
| `npm run preview` | Serve the production build locally. |
| `npm run sync:features` | Re-fetch `features.json` + schema from the main app repo. |
| `npm run sync:release-notes` | Re-fetch `releaseNotes.ts` from the main app repo (preview hook for v1.1 changelog wiring). |

Node ≥ 22 required. The repo ships `.nvmrc` and `.node-version` so version
managers pick it up automatically.

---

## How the feature inventory stays in sync

The single most important design rule: **adding or removing a feature in the
main app repo must update this site without a separate marketing-side edit.**

### v1 — vendor + sync (in place)

- The marketing site imports `src/data/features.json` at build time.
- That file is a **vendored copy** of
  `marketing/features.json` in the main repo
  ([synaptodeck/synaptodeck](https://github.com/synaptodeck/synaptodeck)).
- To refresh:
  ```bash
  npm run sync:features
  git diff src/data/features.json
  git commit -am "sync: features.json"
  git push
  ```
- Cloudflare Pages auto-deploys on push to `main`.

### v1.1 — auto-mirror (planned)

A GitHub Action in the main repo will mirror `features.json` here on every
push that touches the file:

1. The main repo's CI watches `marketing/features.json`.
2. On change, it opens a PR in this repo (`sync: features.json @ <sha>`).
3. We auto-merge if the schema validates.
4. CF Pages picks up the merge and redeploys.

That removes the manual `npm run sync:features` step. v1 keeps the script;
v1.1 also keeps it as a manual fallback.

### Schema

`src/data/features.schema.json` is also vendored. The marketing site doesn't
re-validate at build time (CI does that in the main repo) — but the schema
file is here for editor tooling and for the v1.1 auto-mirror to validate
against.

---

## What the site renders

Routes (in priority order):

| Route | What's there |
|---|---|
| `/` | Hero + 6 top features + AI Builder section + Mobile Remote section + Workflow showcase + Download CTA |
| `/features` | Every feature, grouped by the 8 categories in `features.json` |
| `/download` | Win + Mac buttons, system requirements, signature verification |
| `/mobile-remote` | Pair-by-QR flow + Mobile Remote feature list |
| `/ai-builder` | Authoring-vs-executing pitch, the safety invariants, supported clients |
| `/pricing` | Free feature list + "Pro coming soon" teaser (no $ numbers yet) |
| `/security` | Local-first promise, secrets in OS keychain, audit log, AI safety model |
| `/feedback` | GitHub issues + in-app feedback channel + PR link |
| `/changelog` | v1 links to GitHub Releases; v1.1 will mirror release notes inline |
| `/vs/stream-deck` | Factual side-by-side; honest about Stream Deck's strengths |

Routes deliberately **not** in v1 nav: `/blog` (empty blog reads as
abandoned — add when the first post is written), `/vs/raycast` (lower
competitive leverage than `/vs/stream-deck`), `/docs` (lives inside the app's
Help panel for now).

---

## Adding a new feature

You don't. Feature copy is sourced from the manifest in the main repo.

1. In **synaptodeck/synaptodeck**, edit `marketing/features.json`:
   - Add an entry with a stable kebab-case `id`, a category from the list,
     a `marketingCopy` line (1–2 sentences, user-outcome voice), and a Lucide
     PascalCase `icon` name.
   - Set `status: live` and `versionIntroduced` to the release tag.
2. In **this repo**, run `npm run sync:features`.
3. Commit and push. CF Pages redeploys.

The icon string in `features.json` is the lucide-react component name
(`LayoutGrid`, `CheckCircle2`, `RefreshCcw`). The renderer converts it to the
Iconify name (`lucide:layout-grid`) via `src/lib/iconName.ts` — no per-icon
mapping required.

---

## Brand & voice

- **Tagline (locked):** "AI builds your deck. You approve."
- **Brand colours** (Tailwind tokens — see `tailwind.config.mjs`):
  - `brand-cyan` `#5fbeff` — primary accent on dark
  - `brand-blue` `#1e64c9` — secondary blue
  - `brand-navy` `#0b1d3d` — base dark
  - `brand-ink` `#f1f5fb` — wordmark on dark
- **Font:** Inter Variable, served via `@fontsource-variable/inter`.
- **Voice:** Linear / Vercel / Stripe — short sentences, lead with user
  outcome. **Banned words:** powerful, seamless, intuitive, unleash.
- **No emoji on the marketing surface.** Lucide icons everywhere instead.

Brand assets in `public/brand/` are v1 placeholders — see
`public/brand/README.md` for the swap checklist.

---

## Cloudflare Pages — connecting the repo

Once the maintainer is ready for the preview deploy:

1. Cloudflare dashboard → Workers & Pages → Create application → Pages →
   Connect to Git → pick `synaptodeck/synaptodeck-marketing`.
2. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (leave default)
3. Environment variables:
   - **NODE_VERSION** = `22`
   - **PUBLIC_CF_ANALYTICS_TOKEN** = *(optional, set once analytics is on)*
4. Deploy. The preview URL is `synaptodeck-marketing.pages.dev`.

**Custom domain (production flip — DO NOT enable until reviewed):**

- In the Pages project → Custom domains → Add `synaptodeck.app`.
- Cloudflare's DNS already owns the zone; add a CNAME automatically.
- For `synaptodeck.com`, create a second Pages project with the same repo,
  add the `.com` domain, and configure a 301 redirect to `synaptodeck.app/:splat`
  in the Pages dashboard's bulk redirects.

---

## Analytics

Cloudflare Web Analytics — zero cookies, no third-party requests, no consent
banner needed. The Base layout embeds the beacon only when
`PUBLIC_CF_ANALYTICS_TOKEN` is set as a build env var. Configure it once the
production domain is wired up.

---

## Lighthouse target

≥ 95 on perf / a11y / best practices / SEO. The static-first Astro build,
Tailwind purging, and zero client-side JS on most pages should hit this
without tuning.

---

## Conventions

- All copy lives in the `.astro` files; there's no CMS. Edits go through PRs.
- Components are stateless server-rendered Astro components. Only `Nav` ships
  a small inline script for the mobile menu toggle.
- Icons: import from `astro-icon/components`, name as `lucide:<kebab-case>`.
- Don't add new top-level routes without checking the brief
  (`marketing/MARKETING_SITE_BRIEF.md` in the main repo).
