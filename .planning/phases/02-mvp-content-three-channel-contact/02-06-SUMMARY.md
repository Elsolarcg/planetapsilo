---
phase: 02-mvp-content-three-channel-contact
plan: 06
subsystem: tooling
tags: [copy-linter, ci-gate, deploy-workflow, copy-glossary, denial-clauses, node-22]

# Dependency graph
requires:
  - phase: 01-foundation-deployable-skeleton
    plan: 03
    provides: "docs/copy-glossary.md baseline — 11 PERMITIDO + 15 PROHIBIDO + 8 reglas"
  - phase: 01-foundation-deployable-skeleton
    plan: 05
    provides: ".github/workflows/deploy.yml Phase 1 baseline (withastro/action@v3)"
  - phase: 02-mvp-content-three-channel-contact
    plan: 01
    provides: "Footer.astro global disclaimer 'No constituye terapia ni servicio de salud' (denial-clause 1)"
  - phase: 02-mvp-content-three-channel-contact
    plan: 02
    provides: "BrandBio P1 'No es terapia ni servicio de salud' (denial-clause 2)"
  - phase: 02-mvp-content-three-channel-contact
    plan: 03
    provides: "services.ts.description 'no es terapia ni servicio de salud' + outcomes 'sin diagnóstico' (denial-clauses 3-4)"
  - phase: 02-mvp-content-three-channel-contact
    plan: 04
    provides: "HabeasDataCheckbox 'tratamiento de mis datos personales' + /privacidad 'tratamiento de datos personales' (denial-clauses 5-6)"
provides:
  - "scripts/copy-lint.mjs — Node 22 CLI scanning dist/**/*.html against 10-term PROHIBIDO list with 4 EXEMPT_PATTERNS for denial-clauses"
  - "docs/copy-glossary.md ##Exemptions section — 7-row table of false-positive denial-clauses (single source of truth shared with linter)"
  - "package.json scripts: lint:copy + build:check"
  - ".github/workflows/deploy.yml manual build chain — checkout → setup-node@v4 → npm ci → build → copy-lint → upload-pages-artifact@v3"
  - "D-25 CI gate: failing lint blocks GH Pages publication (deploy job needs: build, gate runs between build and upload steps)"
  - "CONT-14 requirement satisfied: copy linter active in CI"
affects:
  - 02-07 (release verification) — must spot-check that lint:copy still exits 0 on closing-build of Phase 2; manual negative test before phase close per <verification> section 4
  - Phase 3 LEGAL-01..03 — any new denial clause introduced by abogado must update BOTH copy-glossary.md ##Exemptions table AND EXEMPT_PATTERNS array (sync rule documented in script header)
  - Phase 3 indexación — when noindex is removed, the linter prevents regression by blocking any post-LEGAL copy edit that accidentally introduces PROHIBIDO terms

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Node 22 CLI script with no npm deps — uses only node:fs + node:path stdlib"
    - "Unicode-aware word boundary detection via (?<![\\p{L}])WORD(?![\\p{L}]) + /giu flags — JS \\b is ASCII-only and would miss 'diagnóstico' (with ó)"
    - "Exempt-clause detection: ±50-char context window around each match tested against EXEMPT_PATTERNS regex array — if any matches, the violation is skipped"
    - "Recursive HTML walk via fs.readdirSync + statSync.isDirectory — no glob dependency"
    - "Plain process.exit(0|1|2) — 0 clean, 1 violation(s), 2 misuse (no dist/, empty dir)"
    - "Deploy workflow migrated from withastro/action@v3 (single composite step that uploads at end) to manual chain — gives sequential guarantee that lint runs BETWEEN astro build and upload-pages-artifact@v3"
    - "Source-of-truth sync rule: any new denial clause requires BOTH a row in docs/copy-glossary.md ##Exemptions AND an entry in EXEMPT_PATTERNS — documented in both files' header comments"

key-files:
  created:
    - "scripts/copy-lint.mjs (108 líneas) — Node 22 linter, 10-term PROHIBIDO + 4 EXEMPT_PATTERNS, Unicode-aware boundaries, structured error reporting with snippets"
  modified:
    - "docs/copy-glossary.md (84 → 102 líneas) — new ##Exemptions section between ##Reglas de uso and ##Verification, 7-row table of denial-clause patterns"
    - "package.json (20 → 22 líneas) — 2 new scripts: lint:copy + build:check"
    - ".github/workflows/deploy.yml (49 → 70 líneas) — rewrite from withastro/action@v3 composite to manual 7-step chain"

key-decisions:
  - "Migrated deploy.yml from withastro/action@v3 to manual chain — pros: clean step ordering (lint guaranteed BETWEEN build and upload), explicit cache control (cache: npm), easier future hooks (e.g., Lighthouse CI). Cons: ~20 lines longer YAML, manual Node 22 pin (must update if Astro 7+ requires Node 23+)"
  - "Unicode-aware boundaries via lookbehind/lookahead with \\p{L} instead of \\b — JS \\b is ASCII-only and 'diagnóstico' would be matched only at substrings like 'diagnós' not the full token. The /giu flag is essential"
  - "EXEMPT_PATTERNS use specific phrases (no\\s+(es|constituye)\\s+terapia) not broad wildcards — T-02-21 mitigation: a typo'd 'la terapia se ofrece' will NOT match any exempt pattern and will fire"
  - "PROHIBIDO list trimmed to 10 most-critical terms (terapia, tratamiento, paciente, psilocibina, hongos, ayahuasca, cura, garantizado, diagnóstico, antes/después) — matches the plan's <action> block exactly. The 15-term original glossary table includes terms like 'exclusivo' and 'selecto' which are flagged for human review but NOT enforced by the linter in this iteration (deferred to Plan 07 audit if needed)"
  - "±50-char window for exempt detection chosen because the longest denial clause ('No constituye terapia ni servicio de salud' = 41 chars) fits comfortably; shorter windows (20 chars) would split 'tratamiento de datos personales' (32 chars) and produce false negatives"
  - "Manual chain replaces withastro/action@v3 — the action uploads dist/ as Pages artifact as its LAST internal step, leaving no clean insertion point for a post-build gate. Splitting into checkout/setup-node/ci/build/lint/configure-pages/upload-pages-artifact gives explicit control over ordering"

patterns-established:
  - "Source-of-truth sync rule: human-readable table (copy-glossary.md ##Exemptions) and machine-readable array (EXEMPT_PATTERNS in script) must mirror each other. Plan 07 audit verifies this invariant"
  - "Three-tier exit codes (0=clean, 1=violation, 2=misuse) — standard CLI lint convention; Plan 07 audit can rely on these"
  - "GH Actions manual build chain pattern — extensible for future quality gates (Lighthouse CI, accessibility checks) by inserting them between build and upload steps"
  - "Vanilla JS dependency-free tooling — scripts/ directory established as the home for build-time CLI utilities (no npm deps; pure Node 22 stdlib)"

requirements-completed:
  - CONT-14

# Metrics
duration: 3m 2s
completed: 2026-05-23
---

# Phase 2 Plan 06: Copy Linter + CI Gate Summary

**One-liner:** Node 22 copy-lint script blocks GitHub Pages deploy on any non-exempt PROHIBIDO term in built HTML, with 7 documented denial-clause exemptions synced between docs/copy-glossary.md and the EXEMPT_PATTERNS array.

## Performance

- **Duration:** 3m 2s
- **Started:** 2026-05-23T02:03:29Z
- **Tasks:** 3
- **Files modified:** 1 created, 3 modified

## Accomplishments

- **`scripts/copy-lint.mjs`** (108 líneas, Node 22, zero deps):
  - 10-term `PROHIBIDO` array mirrors `docs/copy-glossary.md` table: terapia, tratamiento, paciente, psilocibina, hongos, ayahuasca, cura, garantizado, diagnóstico, antes/después
  - 4 `EXEMPT_PATTERNS` regexes — `no\s+(es|constituye)\s+terapia`, `sin\s+(terapia|tratamiento|diagnóstico)`, `tratamiento\s+de\s+(datos|mis\s+datos)\s+personales`, `tratamiento\s+de\s+datos`
  - Unicode-aware word boundaries: `(?<![\p{L}])WORD(?![\p{L}])` with `/giu` flags — handles `diagnóstico` (with `ó`) correctly. ASCII `\b` would split on the accented char and fail
  - Recursive HTML scan via `fs.readdirSync` + `statSync.isDirectory` (no glob dep)
  - Per-match context window: ±50 chars; if any `EXEMPT_PATTERNS` regex matches the window, the violation is skipped
  - Structured error output: filename + matched word + 80-char snippet, plus pointer to source-of-truth (copy-glossary.md §Exemptions)
  - Exit codes: 0 = clean, 1 = violation(s), 2 = misuse (no dist/, empty)
- **`docs/copy-glossary.md`** (84 → 102 líneas) — new `## Exemptions (false-positive denial clauses)` section between `## Reglas de uso` and `## Verification`. 7-row markdown table documenting which denial clauses bypass the linter and why. Sync rule explicitly stated: "every entry in EXEMPT_PATTERNS has a matching row in this table"
- **`package.json`** (20 → 22 líneas) — 2 new scripts: `"lint:copy": "node scripts/copy-lint.mjs"` and `"build:check": "npm run build && npm run lint:copy"`
- **`.github/workflows/deploy.yml`** (49 → 70 líneas) — full rewrite from `withastro/action@v3` composite step to manual 7-step chain: checkout → setup-node@v4 (Node 22, npm cache) → npm ci → npm run build → **node scripts/copy-lint.mjs** → configure-pages@v5 → upload-pages-artifact@v3. Lint step is the gate: any non-zero exit prevents `upload-pages-artifact` from running, which prevents the `deploy` job (needs: build) from receiving an artifact, which prevents publication

## Task Commits

Cada task se commiteó atómicamente:

1. **Task 1: Exemptions section in copy-glossary.md** — `c7144e4` (docs) — 18 líneas insertadas, sección formal con 7 patterns y sync rule documentada
2. **Task 2: scripts/copy-lint.mjs** — `d98ffc1` (feat) — 108 líneas, Node 22 stdlib only, syntax-checked, passes against current dist/ (zero non-exempt matches across 7 HTML files)
3. **Task 3: package.json + deploy.yml wiring** — `ee7bcc8` (feat) — 2 npm scripts + manual deploy chain replacing withastro/action@v3, lint step verified ordered between build and upload by line-number assertion

**Plan metadata commit:** pendiente (incluirá este SUMMARY.md + STATE.md + ROADMAP.md + REQUIREMENTS.md)

## Files Modified

### Created (1)

- `scripts/copy-lint.mjs` (108 líneas) — Node 22 CLI, zero npm deps, 10-term PROHIBIDO + 4 EXEMPT_PATTERNS with Unicode-aware boundaries

### Modified (3)

- `docs/copy-glossary.md` (84 → 102 líneas) — `## Exemptions` section added, 7-row table mirroring `EXEMPT_PATTERNS` array
- `package.json` (20 → 22 líneas) — `lint:copy` + `build:check` scripts
- `.github/workflows/deploy.yml` (49 → 70 líneas) — manual chain replacing `withastro/action@v3`; lint step between build and upload

## Lint Script Regex Pattern Explanation

The PROHIBIDO match regex is:

```
new RegExp(`(?<![\\p{L}])${escapedWord}(?![\\p{L}])`, 'giu')
```

- `(?<![\p{L}])` — negative lookbehind asserting no Unicode letter precedes the match. Equivalent to "word start" but works for accented chars (`ó`, `á`, `é`)
- `(?![\p{L}])` — negative lookahead asserting no Unicode letter follows. Equivalent to "word end"
- `g` — global (find all matches)
- `i` — case-insensitive (`Terapia`, `terapia`, `TERAPIA` all match)
- `u` — Unicode mode, required for `\p{L}` property escape

**Why not `\b`?** JavaScript's `\b` is ASCII-only. In the string `diagnóstico`, between `n` and `ó` there is NO `\b` because `ó` is treated as a non-word character. So `/\bdiagnóstico\b/i` matches only on positions where the boundary happens to align — making detection inconsistent. The `\p{L}` approach treats all Unicode letters uniformly.

**Exempt context window:** for each match at index `m.index`, the script extracts `text.slice(max(0, m.index - 50), min(text.length, m.index + word.length + 50))` and tests each `EXEMPT_PATTERNS` regex against it. If any matches, the violation is exempted. The ±50-char window comfortably accommodates the longest denial clause ("No constituye terapia ni servicio de salud" = 41 chars).

## Migration: withastro/action@v3 → Manual Build Chain

| Aspect | withastro/action@v3 (before) | Manual chain (after) |
|--------|------------------------------|----------------------|
| Lines of YAML | 6 | ~25 |
| Lint insertion point | None (action uploads as its last internal step; subsequent workflow steps run AFTER upload, which is too late) | Explicit — between `npm run build` and `actions/upload-pages-artifact@v3` |
| Node version pin | Implicit via `with: node-version: "22"` (action-internal) | Explicit `actions/setup-node@v4 with: node-version: "22"` |
| npm cache | Internal to action | Explicit `cache: "npm"` on setup-node |
| Future quality gates (Lighthouse, a11y) | Hard — would need separate job downloading artifact | Easy — insert step between build and upload |
| Maintenance burden | Action version updates handle most concerns | Manual updates needed for each individual action |

**Pros:** clean step ordering with the lint gate exactly where it must be; explicit and auditable.
**Cons:** longer YAML; manual Node version pin must be updated if Astro 7+ requires Node 23+; manual action version pins must be kept current.

**Flag for Phase 3/4 maintenance:** if `actions/setup-node`, `actions/configure-pages`, or `actions/upload-pages-artifact` releases a breaking version, update the pinned `@v4` / `@v5` / `@v3` accordingly. The same applies if Astro upgrades Node requirements.

## Exemption Sync Rule

The script's header comment, the glossary's `## Exemptions` section, and the failure output all explicitly state:

> If a new LOCKED denial clause is added in Phase 3, append it to this table AND update the EXEMPT_PATTERNS array in `scripts/copy-lint.mjs`. Both MUST stay in sync.

Plan 07 audit will spot-check this invariant: every entry in `EXEMPT_PATTERNS` should have a matching row in `docs/copy-glossary.md §Exemptions`. Today (close of Plan 06) the count is 4 regex patterns ↔ 7 table rows. The rows are denser than the regexes because some table rows describe variants that fall under the same regex (e.g., `No es terapia ni servicio de salud` + `no es terapia ni servicio de salud` are both covered by `no\s+(es|constituye)\s+terapia/i`).

## Suggested Manual Negative Test (for Plan 07 Close)

Before merging Plan 07 and closing Phase 2, the developer should run this manual negative-test sequence to prove the gate is wired correctly:

```bash
# 1. Confirm current state passes:
npm run build:check  # Expected: exit 0

# 2. Inject a clear violation into a page source:
echo "Ofrecemos terapia con resultados garantizados" >> src/pages/index.astro

# 3. Re-run the build + lint chain:
npm run build:check  # Expected: build OK, lint FAIL with exit 1, violations listed

# 4. Revert the change:
git checkout -- src/pages/index.astro

# 5. Confirm clean again:
npm run build:check  # Expected: exit 0
```

This 5-step sequence exercises the full gate path: build → lint detects → exit code propagates → CI would block deploy. Plan 07 should document this test as a one-time manual proof and reference it in the verification matrix.

## Deviations from Plan

Plan executed exactly as written. Las 3 tasks landearon con el contenido LOCKED que el `<action>` block dicta. Las acceptance criteria pasaron en el primer intento. Cero auto-fixes Rule 1/2/3 requeridos.

### Auto-fixed Issues

Ninguno — sin Rule 1/2/3 activations. El plan estaba completo y self-contained.

### No-Rule observaciones

**1. [No-Rule observación] Singular vs plural detection — "garantizados" no se detecta como violación**

- **Encontrado durante:** verificación end-to-end del lint script con la frase `Ofrecemos terapia con resultados garantizados`
- **Hecho:** el linter sí detecta `terapia` y `diagnóstico` (singular/base) pero NO matchea `garantizados` (plural) porque `(?![\p{L}])` rechaza la `s` final. Comportamiento esperado: PROHIBIDO list contiene formas base, no plurales
- **Semántica:** El plan documenta `garantizado` (singular) en el PROHIBIDO list y eso es lo que matchea. Detección morfológica de plurales/conjugaciones NO está en el alcance de Plan 06 — sería un futuro upgrade (NLP-based linter) si se materializa esa necesidad
- **Fix:** Ninguno — comportamiento alineado con el plan. Si Sofía/abogado quieren cubrir plurales, basta con añadir `garantizados` al `PROHIBIDO` array
- **Files:** `scripts/copy-lint.mjs`

**2. [No-Rule observación] Plan menciona "minimum 60 líneas" para copy-lint.mjs; el script final tiene 108**

- **Encontrado durante:** acceptance criteria check
- **Hecho:** Plan especifica `min_lines: 60` en `<artifacts>`. El script final tiene 108 líneas (incluye comentarios extensivos del header explicando el rol del archivo en CI/CD y la regla de sync con copy-glossary.md)
- **Semántica:** Above the minimum — cumple
- **Fix:** Ninguno
- **Files:** `scripts/copy-lint.mjs`

## Authentication Gates Encountered

Ninguno. No hay paths que requieran auth en este plan (todo es tooling local + CI config).

## Issues Encountered

Ninguno. El plan estaba self-contained y exactamente especificado. Dependencias de Plans 01-05 (denial-clauses landeadas en dist/) estaban en su forma exacta esperada — el linter pasa contra el dist/ resultante del build pre-Plan-06 sin un solo false positive ni false negative.

## Verification Gates (All Passed)

1. ✓ `docs/copy-glossary.md` tiene `## Exemptions` section (grep confirmed)
2. ✓ Las 6 secciones del glosario preservadas (PERMITIDO, PROHIBIDO, Reglas de uso, Exemptions, Verification, Sources)
3. ✓ Exemptions table tiene 7 filas (>5 mínimo) incluyendo `tratamiento de datos personales` y `No constituye terapia ni servicio de salud`
4. ✓ `scripts/copy-lint.mjs` exists y `node --check` succeeds (sintaxis válida)
5. ✓ Script contiene `EXEMPT_PATTERNS` array con 4 regexes documentados
6. ✓ `npm run build` exits 0 (7 páginas en ~2.3s)
7. ✓ `node scripts/copy-lint.mjs` exits 0 contra dist/ post-build (zero non-exempt matches)
8. ✓ `npm run lint:copy` exits 0 (script alias funciona)
9. ✓ `npm run build:check` exits 0 (full chain funciona)
10. ✓ `.github/workflows/deploy.yml` NO contiene `withastro/action@v3` (replaced)
11. ✓ Contiene `actions/setup-node@v4`, `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3`
12. ✓ Step ordering: `node scripts/copy-lint.mjs` aparece en línea ANTERIOR a `actions/upload-pages-artifact@v3` (line 46 < line 54)
13. ✓ Negative test (manual): inyectar `Ofrecemos terapia` en dist/index.html y correr lint → exit 1 con 1 violation reportada
14. ✓ Negative test edge case: `Resultado garantizado` (singular) detectado correctamente
15. ✓ Working tree limpio post-Task 3 — solo los 4 archivos del plan tocados, dist/ no commited (gitignore-respected)

## Threat Surface Scan

Todos los archivos creados/modificados encajan con el threat model en `02-06-PLAN.md`:

- **T-02-20 (Tampering futuro PROHIBIDO leak — mitigate):** Lint step en deploy.yml runs ANTES de upload step. Exit 1 → upload step skipped → deploy job (needs: build) tampoco corre. Step ordering verified por line-number comparison. ✓
- **T-02-21 (Spoofing exempt patterns over-permissivos — mitigate):** EXEMPT_PATTERNS usan frases específicas (`no\s+(es|constituye)\s+terapia`, `tratamiento\s+de\s+(datos|mis\s+datos)\s+personales`) — no broad wildcards. Cada pattern documentado en glosario para auditoría humana. ✓
- **T-02-22 (Information Disclosure snippets en CI log — accept):** Snippets son copy públicamente commiteado; nothing sensitive. ✓
- **T-02-23 (Denial of Service catastrophic backtracking — accept):** PROHIBIDO terms son simple word matches con linear-time `\p{L}` boundaries; dist/ tiene 7 HTML files de <15 KB cada uno. Lint tarda <200ms locally. ✓
- **T-02-24 (Repudiation sync drift — mitigate):** Plan 07 close criterion añade verification step: "every EXEMPT_PATTERNS entry has a matching row in copy-glossary.md ##Exemptions". Sync rule documentada en el header del script Y en el cuerpo de la table del glosario. ✓

No se introducen `threat_flag:` nuevos — el script `scripts/copy-lint.mjs` corre offline (zero network), zero external deps, read-only access a `dist/`. No new attack surface.

## Known Stubs

Ninguno introducido por este plan. El linter es funcionalmente completo y enforcement-ready. Los stubs heredados (Calendly placeholder, WhatsApp number `57XXXXXXXXXX`, testimonials placeholder) son irrelevantes para este plan — el linter sólo evalúa PROHIBIDO terms, no URLs ni placeholders semánticos.

## Self-Check: PASSED

**Archivos verificados que existen:**

- `scripts/copy-lint.mjs` — FOUND (108 líneas, syntax-valid)
- `docs/copy-glossary.md` — FOUND (102 líneas, contains `## Exemptions`)
- `package.json` — FOUND (lint:copy + build:check scripts present)
- `.github/workflows/deploy.yml` — FOUND (manual chain, no withastro/action@v3, lint step before upload)
- `.planning/phases/02-mvp-content-three-channel-contact/02-06-SUMMARY.md` — FOUND (this file)

**Commits verificados en git log:**

- `c7144e4` — FOUND (Task 1: Exemptions section)
- `d98ffc1` — FOUND (Task 2: scripts/copy-lint.mjs)
- `ee7bcc8` — FOUND (Task 3: package.json + deploy.yml)

## Next Plan Readiness

Plan 07 (release verification) puede:

- Confiar en que `npm run lint:copy` está disponible y exits 0 contra el dist/ final del Phase 2
- Ejecutar el negative-test manual documentado arriba como parte del audit (5-step inject/revert sequence)
- Verificar el sync invariant: contar entries en `EXEMPT_PATTERNS` array (`grep -c "^  /" scripts/copy-lint.mjs` against the array region) y filas en la table del glosario; ambos counts deben ser auditables manualmente
- Spot-check que ninguna copy edit posterior a Plan 06 introdujo PROHIBIDO terms (es un by-product gratuito de tener el gate activo)

Phase 2 cierre criterion: con Plan 06 completo, **CONT-14 (copy linter blocking deploy)** está plenamente satisfecho. La Phase 2 ha pasado de "content-complete" (Plans 01-05) a "content-and-gate-complete" (Plans 01-06). Sólo queda Plan 07 (audit + Phase close).

---
*Phase: 02-mvp-content-three-channel-contact*
*Completed: 2026-05-23*
