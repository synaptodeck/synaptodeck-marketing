#!/usr/bin/env node
// Sync release notes from the main repo for the /changelog page.
// Source: src/services/releaseNotes.ts in synaptodeck/synaptodeck.
// We just grab the raw TS file and let the page extract entries at build
// time via a lightweight regex parser (or fall back to a stub if the
// remote shape changes). v1.1 should formalise this as JSON.

import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, '..', 'src', 'data');

const URL = 'https://raw.githubusercontent.com/synaptodeck/synaptodeck/main/src/services/releaseNotes.ts';

async function main() {
  await mkdir(dataDir, { recursive: true });
  process.stdout.write('sync releaseNotes.ts … ');
  const res = await fetch(URL, {
    headers: { 'user-agent': 'synaptodeck-marketing/sync-release-notes' },
  });
  if (!res.ok) {
    console.warn(`skipped — HTTP ${res.status}. Using existing local copy if any.`);
    return;
  }
  const text = await res.text();
  await writeFile(resolve(dataDir, 'release-notes.source.ts'), text, 'utf8');
  console.log(`ok (${text.length} bytes)`);
}

main().catch((err) => {
  console.warn('sync skipped:', err.message);
  // Non-fatal — the changelog page falls back to a "coming soon" state.
});
