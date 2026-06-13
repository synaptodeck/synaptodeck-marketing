# Security policy — marketing site

This document covers how to report a security vulnerability in the
**SynaptoDeck marketing website**
([`synaptodeck.app`](https://synaptodeck.app)) and the code behind
it.

For vulnerabilities in the **SynaptoDeck desktop app**, mobile
remote, or MCP sidecar, see the source repo's security policy:
[`synaptodeck/synaptodeck` → SECURITY.md](https://github.com/synaptodeck/synaptodeck/blob/main/SECURITY.md).

## Reporting a vulnerability

Email: **`security+synaptodeck@efthymioug.com`** — monitored by the
maintainer.

> **Note:** `security@synaptodeck.app` is reserved for future use but
> is NOT yet provisioned. Do not send reports there; they will not be
> received.

When reporting, please include:

- A clear description of the issue
- Steps to reproduce or a proof-of-concept
- Affected page / URL (e.g. `https://synaptodeck.app/features/...`)
- Your contact details for follow-up

Encrypted transport (PGP/age) is not currently offered.

## Response SLA

Same SLA as the desktop app:

| Phase | Target |
|---|---|
| Acknowledge the report | Within 72 hours |
| Initial assessment + severity | Within 7 days |
| Fix critical vulnerabilities | Within 14 days |
| Public disclosure (coordinated) | 90 days after first report OR 30 days after the fix ships — whichever is sooner |

## Scope

In-scope for this disclosure process:

- The marketing site source code in this repo
  (`synaptodeck/synaptodeck-marketing`)
- The Cloudflare Worker for the contact / feedback form
  (`synaptodeck-feedback.efthymioug.workers.dev` — note: this Worker
  is currently invoked from the desktop app; the marketing site
  links to it for direct feedback)
- The Cloudflare Pages deployment of `synaptodeck.app` itself
- The `release`-branch promotion workflow
  (`.github/workflows/promote-to-prod.yml`)

## Out of scope

Report these to the appropriate project instead:

- SynaptoDeck desktop app, MCP sidecar, mobile remote — see the
  source repo's
  [SECURITY.md](https://github.com/synaptodeck/synaptodeck/blob/main/SECURITY.md)
- Upstream Astro / Cloudflare Pages / Cloudflare Workers
  vulnerabilities — report to those projects directly
- Synaptodeck cloud / account services (not yet built)

## Promotion gate

Production deploys to `synaptodeck.app` go through a `release`
branch + a `promote-to-prod` workflow. Commits on `main` deploy to
preview only. See
[`synaptodeck/synaptodeck` → docs/RELEASE_PROMOTION.md](https://github.com/synaptodeck/synaptodeck/blob/main/docs/RELEASE_PROMOTION.md)
for the full procedure.
