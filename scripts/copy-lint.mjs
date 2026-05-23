// scripts/copy-lint.mjs
// Phase 2 (CONT-14, D-25): Copy linter — fails CI on PROHIBIDO term violations.
// Source-of-truth for rules: docs/copy-glossary.md §PROHIBIDO + §Exemptions.
// Run after `npm run build`; integrated as `npm run lint:copy` in package.json.
// Called in .github/workflows/deploy.yml as a step between build and deploy.
//
// Usage:
//   node scripts/copy-lint.mjs            # default: scans ./dist
//   node scripts/copy-lint.mjs ./dist     # explicit path
//
// Exit codes:
//   0 = clean (zero non-exempt PROHIBIDO matches)
//   1 = at least one violation
//   2 = misuse / unreadable directory

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname, resolve } from 'node:path';

const DIST = process.argv[2] ?? 'dist';

// PROHIBIDO list — mirrors docs/copy-glossary.md table.
// Diacritics-preserving exact word match (Unicode boundaries, case-insensitive flag).
const PROHIBIDO = [
  'terapia',
  'tratamiento',
  'paciente',
  'psilocibina',
  'hongos',
  'ayahuasca',
  'cura',
  'garantizado',
  'diagnóstico',
  'antes/después',
];

// EXEMPT_PATTERNS — keep in lockstep with docs/copy-glossary.md §Exemptions.
// Each pattern is checked against a ±50-char window around the match.
// If ANY pattern matches the window, the violation is exempted.
const EXEMPT_PATTERNS = [
  /no\s+(es|constituye)\s+terapia/i,
  /sin\s+(terapia|tratamiento|diagnóstico)/i,
  /tratamiento\s+de\s+(datos|mis\s+datos)\s+personales/i,
  /tratamiento\s+de\s+datos/i,
];

function walk(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) {
      out.push(...walk(p));
    } else if (extname(p) === '.html') {
      out.push(p);
    }
  }
  return out;
}

function lint() {
  const distPath = resolve(DIST);
  if (!existsSync(distPath)) {
    console.error(`copy-lint: dist path '${distPath}' does not exist. Run \`npm run build\` first.`);
    process.exit(2);
  }
  const files = walk(distPath);
  if (files.length === 0) {
    console.error(`copy-lint: no .html files found under '${distPath}'.`);
    process.exit(2);
  }

  const violations = [];
  for (const file of files) {
    const text = readFileSync(file, 'utf8');
    for (const word of PROHIBIDO) {
      const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // \b doesn't work across all Unicode chars in JS RegExp without /u — use lookahead/lookbehind for Unicode-aware boundaries instead.
      const re = new RegExp(`(?<![\\p{L}])${escaped}(?![\\p{L}])`, 'giu');
      let m;
      while ((m = re.exec(text))) {
        const start = Math.max(0, m.index - 50);
        const end = Math.min(text.length, m.index + word.length + 50);
        const window = text.slice(start, end);
        if (EXEMPT_PATTERNS.some(p => p.test(window))) continue;
        const snippet = window.replace(/\s+/g, ' ').trim();
        violations.push({ file: file.replace(distPath + '/', ''), word, snippet });
      }
    }
  }

  if (violations.length > 0) {
    console.error(`\ncopy-lint FAILED: ${violations.length} violation(s) found in ${files.length} HTML file(s).\n`);
    for (const v of violations) {
      console.error(`  ${v.file}`);
      console.error(`    word:    "${v.word}"`);
      console.error(`    context: …${v.snippet}…`);
      console.error('');
    }
    console.error(`Source-of-truth: docs/copy-glossary.md §PROHIBIDO + §Exemptions.`);
    console.error(`If a new denial-clause should be exempted, update BOTH the table in copy-glossary.md AND the EXEMPT_PATTERNS array in this script.`);
    process.exit(1);
  }

  console.log(`copy-lint OK — scanned ${files.length} HTML file(s); zero non-exempt PROHIBIDO matches.`);
  process.exit(0);
}

lint();
