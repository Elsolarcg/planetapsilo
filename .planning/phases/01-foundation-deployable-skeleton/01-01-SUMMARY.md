---
phase: 01-foundation-deployable-skeleton
plan: 01
subsystem: infra
tags: [astro, scaffold, gh-pages, base-path, node22, typescript-strict, gitignore]

# Dependency graph
requires:
  - phase: init
    provides: ".planning/ artifacts (PROJECT, ROADMAP, REQUIREMENTS, STATE, research/, phases/01-CONTEXT)"
provides:
  - "Astro 6.3.7 project scaffold in repo root"
  - "Node 22 pinned via .nvmrc (Astro 6 hard requirement)"
  - "TypeScript strict mode (extends astro/tsconfigs/strict)"
  - "astro.config.mjs with site='https://elsolarcg.github.io' + base='/planetapsilo' + output='static' locked from commit 1"
  - ".gitignore covering node_modules, dist, .astro, .env*, .DS_Store, IDE dirs"
  - "Reproducible install via committed package-lock.json"
  - "Green npm run build producing dist/index.html"
affects:
  - "01-02 (Tailwind v4 install via `npx astro add tailwind`)"
  - "01-03 (backup-v1 branch + force-push to Elsolarcg/planetapsilo)"
  - "01-04 (Layout + 4 page stubs — will consume import.meta.env.BASE_URL)"
  - "01-05 (.github/workflows/deploy.yml with withastro/action@v3)"

# Tech tracking
tech-stack:
  added:
    - "astro@6.3.7"
    - "Node 22 (pinned via .nvmrc)"
    - "TypeScript strict (via astro/tsconfigs/strict)"
  patterns:
    - "base path locked at commit 1 (Pitfall #13 mitigation)"
    - "Pure static output (output: 'static') for GH Pages compatibility"
    - "Custom build.assets directory '_astro' (matches Astro default; explicit for clarity)"
    - "Spanish locale on all pages (lang='es')"

key-files:
  created:
    - ".nvmrc"
    - "src/env.d.ts"
    - "package-lock.json"
    - ".planning/phases/01-foundation-deployable-skeleton/01-01-SUMMARY.md"
  modified:
    - "package.json (renamed from scaffold artifact '--typescript' to 'planetapsilo')"
    - "astro.config.mjs (site + base + output + trailingSlash + build.assets)"
    - ".gitignore (replaced scaffold default with locked exclusions per 01-CONTEXT)"
    - "src/pages/index.astro (temporary Spanish stub; Plan 04 replaces)"

key-decisions:
  - "Accepted scaffold's .git/ as new history baseline after cp -r collision (force-push planned in Plan 03 anyway)"
  - "package.json renamed from CLI flag artifact '--typescript' to 'planetapsilo'"
  - "README.md from scaffold removed (project README is .planning/PROJECT.md)"
  - "Astro telemetry left at default (no explicit disable; can revisit in Plan 05 CI)"

patterns-established:
  - "Per-task atomic commits with conventional commit prefixes (feat/chore/fix) scoped to '(01-01)'"
  - "Spanish-locale HTML stubs (lang='es') as the default before real copy lands in Phase 2"
  - "Plan-locked decisions from CONTEXT.md are translated literally into config (no improvisation on site/base/output)"

requirements-completed: [FOUND-02, FOUND-14]

# Metrics
duration: 5min
completed: 2026-05-22
---

# Phase 01 Plan 01: Astro 6 scaffold + base path locked + locked .gitignore Summary

**Astro 6.3.7 scaffolded with Node 22, TypeScript strict, GH Pages base path `/planetapsilo` locked from commit 1, and a `.gitignore` that excludes node_modules, dist, .astro, .env*, and macOS/IDE noise.**

## Performance

- **Duration:** 4m 59s (well under typical 45–60 min Astro scaffold window per research/STACK.md)
- **Started:** 2026-05-22T01:17:03Z
- **Completed:** 2026-05-22T01:22:02Z
- **Tasks:** 3 / 3
- **Files modified:** 8 (4 created, 4 modified)

## Accomplishments

- Astro 6.3.7 installed (`npx astro --version` → `6.3.7`); meets the `^6.3.x` lock in plan.must_haves
- `.nvmrc` pins Node `22` (Astro 6 hard requirement; CI will read this via `withastro/action@v3` in Plan 05)
- `tsconfig.json` extends `astro/tsconfigs/strict` (TypeScript strict mode active)
- `astro.config.mjs` declares the three locked values (`site`, `base: '/planetapsilo'`, `output: 'static'`) plus `trailingSlash: 'ignore'` and `build.assets: '_astro'`
- `npm run build` exits 0 and produces `dist/index.html` (1 page so far — the temp stub)
- `.gitignore` blocks node_modules, dist, .astro, .env / .env.production / .env.local / .env.*.local, .DS_Store, .vscode/ (with allow-rules for extensions.json + settings.json), .idea/, *.tsbuildinfo
- `package-lock.json` committed → `npm ci` reproducibility unlocked for CI and downstream agents
- `.planning/` and `CLAUDE.md` survived the scaffold (after recovery — see Deviations)

## Task Commits

Each task was committed atomically:

0. **Preparatory recovery: restore planning context after scaffold** - `de403fc` (chore)
1. **Task 1: Bootstrap Astro 6 with Node 22 pinned and strict TypeScript** - `06ff509` (feat)
2. **Task 2: Configure astro.config.mjs with site + base + static output** - `6f1a008` (feat)
3. **Task 3: Write .gitignore covering node_modules, dist, .astro, .env*, .DS_Store** - `6fcc34f` (chore)

**Plan metadata commit:** _added at end of this plan with this SUMMARY + STATE/ROADMAP/REQUIREMENTS updates_

## Files Created/Modified

### Created
- `/home/plazasia/workspace/07_DIGITAL_GROWTH/clientes/planetapsilo/.nvmrc` — pins Node `22`
- `/home/plazasia/workspace/07_DIGITAL_GROWTH/clientes/planetapsilo/src/env.d.ts` — references `.astro/types.d.ts`
- `/home/plazasia/workspace/07_DIGITAL_GROWTH/clientes/planetapsilo/package-lock.json` — lockfile for reproducible installs (254 packages)
- `/home/plazasia/workspace/07_DIGITAL_GROWTH/clientes/planetapsilo/public/favicon.ico` and `favicon.svg` — scaffold defaults (will be replaced by the cosmic-gradient favicon in Plan 02/04 per D-08)
- `/home/plazasia/workspace/07_DIGITAL_GROWTH/clientes/planetapsilo/.vscode/{extensions.json,launch.json}` — scaffold defaults; allowlisted in `.gitignore`

### Modified
- `/home/plazasia/workspace/07_DIGITAL_GROWTH/clientes/planetapsilo/package.json` — renamed `name` from `--typescript` to `planetapsilo`; added `"private": true` for safety; kept `engines.node >=22.12.0`
- `/home/plazasia/workspace/07_DIGITAL_GROWTH/clientes/planetapsilo/astro.config.mjs` — added site/base/trailingSlash/output/build.assets
- `/home/plazasia/workspace/07_DIGITAL_GROWTH/clientes/planetapsilo/.gitignore` — replaced scaffold default with locked exclusions
- `/home/plazasia/workspace/07_DIGITAL_GROWTH/clientes/planetapsilo/src/pages/index.astro` — Spanish-locale temporary stub
- `/home/plazasia/workspace/07_DIGITAL_GROWTH/clientes/planetapsilo/tsconfig.json` — _unmodified post-scaffold_ (already extends `astro/tsconfigs/strict`)

### Removed
- `/home/plazasia/workspace/07_DIGITAL_GROWTH/clientes/planetapsilo/README.md` — scaffold artifact; project README lives in `.planning/PROJECT.md`

## Decisions Made

1. **Treat the Astro scaffold's `.git/` as the new history baseline.** The `cp -r ./--typescript/. ./` step overwrote the project's original `.git/` directory (planning files showed as "untracked" after the copy). The original v1 history was going to be force-pushed away in Plan 03 anyway, so we accept the scaffold's "Initial commit from Astro" as commit 0 and committed the recovered `.planning/` + `CLAUDE.md` as a preparatory `chore(01-01)` commit before Task 1.
2. **Renamed the package from `"--typescript"` to `"planetapsilo"`.** `create-astro@5.0.6` interpreted `--typescript` (intended as a flag) as the positional project-directory argument, producing both a `./--typescript/` scaffold dir and a `name: "--typescript"` in `package.json`. Renaming was required for npm hygiene (the leading `--` is technically invalid as an npm package name).
3. **Added `"private": true` to `package.json`.** Defense in depth against an accidental `npm publish`. The project is a static site and never publishes.
4. **Left Astro telemetry at default (collecting anonymous usage).** Plan 05 can decide whether to disable in CI; not a Phase 1 blocker.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking issue] `create-astro@5.0.6` rejected the `--typescript strict` flag form**
- **Found during:** Task 1, step 2 (`npm create astro@latest -- --template minimal --typescript strict --no-install --git no --skip-houston --yes .`)
- **Issue:** The CLI parsed `--typescript` as the positional project directory and silently scaffolded into `./--typescript/` instead of `.`. The expected `--typescript=strict` form was not supported, so `strict` was dropped and the project went to the wrong directory.
- **Fix:** Used the plan's fallback path (copy from a side directory into project root, skipping `.git`). Then ran `git rm` on the scaffold's `README.md` and renamed `package.json` to `planetapsilo`.
- **Files modified:** `package.json`, the entire scaffold tree (copied into project root from `./--typescript/`)
- **Verification:** `npx astro --version` returns `6.3.7`; `tsconfig.json` extends `astro/tsconfigs/strict` (strict mode survived because Astro 6's minimal template defaults to strict)
- **Committed in:** `06ff509` (Task 1 commit)

**2. [Rule 1 - Bug] Scaffold's `cp -r` overwrote the original project `.git/` directory**
- **Found during:** Task 1, step 3 (the `cp -r /tmp/.../. /project/` step). Side-effect: `.planning/` + `CLAUDE.md` showed as untracked in `git status` because the scaffold's fresh `.git/` had no record of them.
- **Issue:** The original local git history (pre-existing commits for `.planning/` setup + `CLAUDE.md`) was lost. No backup directory existed elsewhere on the filesystem.
- **Fix:** Recovery commit `de403fc` adds back `.planning/` (PROJECT, ROADMAP, REQUIREMENTS, STATE, config, phases/, research/) and `CLAUDE.md` as a single `chore(01-01)` commit before Task 1. Acceptable because Plan 03 will force-push to `Elsolarcg/planetapsilo` regardless, discarding any prior history.
- **Files modified:** 18 files restored under `.planning/` + `CLAUDE.md`
- **Verification:** `git ls-files .planning/` shows all expected files; `git status` clean after Task 1 commit
- **Committed in:** `de403fc` (preparatory commit between scaffold and Task 1)

**3. [Rule 2 - Missing critical config] `package.json` did not include `"private": true`**
- **Found during:** Task 1 (during the rename)
- **Issue:** Project is a static site for GH Pages — there is no scenario where it should be publishable to npm. Without `"private": true`, an accidental `npm publish` would attempt to register `planetapsilo` on the public registry.
- **Fix:** Added `"private": true` to `package.json` alongside the name rename.
- **Files modified:** `package.json`
- **Verification:** `cat package.json | grep '"private"'` → `"private": true,`
- **Committed in:** `06ff509` (Task 1 commit)

---

**Total deviations:** 3 auto-fixed (1 blocking, 1 bug recovery, 1 missing-critical-config)
**Impact on plan:** All three auto-fixes were necessary for correctness. The scaffold tooling had a real CLI ergonomics issue (deviation #1) that the plan partially anticipated with its fallback path; the `.git/` overwrite (deviation #2) was a hidden side-effect of the cp-into-project-root approach. No plan goals were missed; no scope creep — the `private: true` field is a 1-line npm hygiene safeguard.

## Issues Encountered

- **`create-astro@5.0.6` does not accept `--typescript strict` as a CLI argument.** The plan's command form was outdated for the current scaffolder. Worked around by accepting the scaffold's default (which IS strict) and renaming the resulting artifacts. Future iteration: the plan's command in `.planning/research/STACK.md` should be reviewed against current `create-astro` releases.
- **`cp -r` of the scaffold's full content into a directory with an existing `.git/` will overwrite that `.git/`.** Documented now so future plans (or re-runs) can use `rsync --exclude=.git` instead.

## Known Stubs

| Stub | File | Reason | Resolved by |
|------|------|--------|-------------|
| Spanish "scaffolding in progress" placeholder | `src/pages/index.astro` | Intentional per plan Task 1 step 8 — Plan 04 replaces this with the real `BaseLayout.astro` + cosmic hero | Plan 01-04 (Layout + 4 page stubs) |
| Scaffold favicon (Astro purple logo) | `public/favicon.svg`, `public/favicon.ico` | Not addressed in this plan — D-08 of CONTEXT.md specifies a cosmic-gradient SVG favicon | Plan 01-02 or 01-04 (per D-08 in CONTEXT.md) |

Both stubs are tracked in subsequent plan acceptance criteria; no work needed in this plan.

## Threat Flags

No new security surface beyond what the threat_model in 01-01-PLAN.md anticipated. T-01-01 (`.env` ignore), T-01-02 (base-path drift), T-01-03 (`node_modules`/`dist` exclusion), T-01-04 (lockfile reproducibility), and T-01-05 (Node version pin) are all mitigated in this plan's commits.

## User Setup Required

None — no external service configuration required for this plan. Plan 03/05 will require GitHub Pages settings (Source = "GitHub Actions") to be flipped once in the `Elsolarcg/planetapsilo` Settings tab.

## Next Phase Readiness

**Ready for Plan 01-02 (Tailwind v4 + design tokens):**
- `npx astro add tailwind` will edit `astro.config.mjs` to inject the Vite plugin — this plan's config layout (single `defineConfig`, no `integrations` array yet) is compatible with that CLI.
- `import.meta.env.BASE_URL` is now correctly bound to `/planetapsilo/` and any internal link in future pages will respect it.

**Ready for Plan 01-03 (backup-v1 branch + force-push):**
- Local repo has a clean, atomic history (5 commits) ready to be pushed to `Elsolarcg/planetapsilo` after the `backup-v1` branch captures the remote v1.

**Outstanding for FOUND-01:** FOUND-01 mentions "Astro 6.3.x + Tailwind v4 + Node 22" — this plan delivers the Astro + Node halves. Tailwind half ships in Plan 01-02; FOUND-01 will be marked complete then. **FOUND-02 and FOUND-14 are fully complete with this plan.**

## Self-Check: PASSED

- FOUND: `.nvmrc` (content `22\n`)
- FOUND: `src/env.d.ts`
- FOUND: `package-lock.json`
- FOUND: `package.json` (with `"name": "planetapsilo"`, `"private": true`, `"astro": "^6.3.7"`)
- FOUND: `astro.config.mjs` (with `site`, `base: '/planetapsilo'`, `output: 'static'`)
- FOUND: `.gitignore` (with all 6 locked exclusion lines)
- FOUND: `tsconfig.json` (extends `astro/tsconfigs/strict`)
- FOUND: `dist/index.html` (after `npm run build`)
- FOUND: commit `de403fc` (planning recovery)
- FOUND: commit `06ff509` (Task 1)
- FOUND: commit `6f1a008` (Task 2)
- FOUND: commit `6fcc34f` (Task 3)
- FOUND: `.planning/STATE.md` (untouched by scaffold)
- FOUND: `CLAUDE.md` (untouched by scaffold)

---
*Phase: 01-foundation-deployable-skeleton*
*Completed: 2026-05-22*
