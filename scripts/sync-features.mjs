#!/usr/bin/env node
// Sync features.json + features.schema.json from the main SynaptoDeck repo.
// v1 mechanism — run by hand or in CI before a build.
// v1.1 will move this to a GitHub Action in synaptodeck/synaptodeck that
// pushes a PR to this repo on change.

import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, '..', 'src', 'data');

const SOURCES = [
  {
    url: 'https://raw.githubusercontent.com/synaptodeck/synaptodeck/main/marketing/features.json',
    out: 'features.json',
  },
  {
    url: 'https://raw.githubusercontent.com/synaptodeck/synaptodeck/main/marketing/features.schema.json',
    out: 'features.schema.json',
  },
];

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { 'user-agent': 'synaptodeck-marketing/sync-features' },
  });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  const text = await res.text();
  // Validate it parses before writing.
  JSON.parse(text);
  return text;
}

async function main() {
  await mkdir(dataDir, { recursive: true });
  for (const src of SOURCES) {
    process.stdout.write(`sync ${src.out} … `);
    const body = await fetchJson(src.url);
    await writeFile(resolve(dataDir, src.out), body, 'utf8');
    process.stdout.write(`ok (${body.length} bytes)\n`);
  }
  console.log('done. commit the result if it changed.');
}

main().catch((err) => {
  console.error('sync failed:', err.message);
  process.exit(1);
});
