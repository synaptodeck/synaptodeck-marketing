#!/usr/bin/env node
// Sync features.json + features.schema.json from the main SynaptoDeck repo
// into src/data/. v1 manual sync — run before a build, commit the result.
// v1.1 will replace this with a GitHub Action in the source repo that pushes
// a PR here automatically (see .github/workflows in synaptodeck/synaptodeck).
//
// The source repo (synaptodeck/synaptodeck) is private, so direct
// raw.githubusercontent.com fetches 404 without auth. We use `gh api` for
// authenticated access; the developer needs `gh auth status` to be green.
// Falls back to an anonymous raw fetch if `gh` is unavailable, in case the
// source repo ever becomes public.

import { writeFile, mkdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, '..', 'src', 'data');

const REPO = 'synaptodeck/synaptodeck';
const SOURCES = [
  { remotePath: 'marketing/features.json', out: 'features.json' },
  { remotePath: 'marketing/features.schema.json', out: 'features.schema.json' },
];

function hasGh() {
  try {
    execFileSync('gh', ['auth', 'status'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function fetchViaGh(remotePath) {
  const stdout = execFileSync(
    'gh',
    ['api', '-H', 'Accept: application/vnd.github+json', `repos/${REPO}/contents/${remotePath}`],
    { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 },
  );
  const meta = JSON.parse(stdout);
  return Buffer.from(meta.content, 'base64').toString('utf8');
}

async function fetchViaRaw(remotePath) {
  const url = `https://raw.githubusercontent.com/${REPO}/main/${remotePath}`;
  const res = await fetch(url, {
    headers: { 'user-agent': 'synaptodeck-marketing/sync-features' },
  });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.text();
}

async function fetchSource(remotePath, mode) {
  if (mode === 'gh') return fetchViaGh(remotePath);
  return fetchViaRaw(remotePath);
}

async function main() {
  const ghAvailable = hasGh();
  const mode = ghAvailable ? 'gh' : 'raw';
  if (!ghAvailable) {
    console.warn(
      'gh CLI not authenticated — falling back to raw.githubusercontent. ' +
        'This will 404 while the source repo is private.',
    );
  }

  await mkdir(dataDir, { recursive: true });
  for (const src of SOURCES) {
    process.stdout.write(`sync ${src.out} via ${mode} … `);
    const body = await fetchSource(src.remotePath, mode);
    JSON.parse(body); // throws on malformed JSON before we overwrite a working file
    await writeFile(resolve(dataDir, src.out), body, 'utf8');
    process.stdout.write(`ok (${body.length} bytes)\n`);
  }
  console.log('done. commit src/data/*.json if it changed.');
}

main().catch((err) => {
  console.error('sync failed:', err.message);
  process.exit(1);
});
