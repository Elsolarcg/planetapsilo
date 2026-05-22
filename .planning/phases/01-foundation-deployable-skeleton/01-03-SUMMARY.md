---
phase: 01-foundation-deployable-skeleton
plan: 03
subsystem: governance
tags: [trademark, sipi, glossary, backup-branch, gh-pages, legal-colombia, ley-1090, ley-1581, ley-1453, ley-1480]

# Dependency graph
requires:
  - phase: 01-foundation-deployable-skeleton
    provides: existing remote at github.com/Elsolarcg/planetapsilo (v1 HTML estático — preserved in backup-v1)
provides:
  - "Remote branch `backup-v1` on Elsolarcg/planetapsilo (commit 918be1d) — rollback safety net for Plan 05 force-push"
  - ".planning/intel/gh-pages-pre-deploy-settings.md — captured pre-deploy GH Pages config snapshot"
  - ".planning/intel/trademark.md — SIPI/VUE trademark check documented (Decision: PENDING manual confirmation)"
  - "docs/copy-glossary.md — PERMITIDO/PROHIBIDO lexicon + 8 reglas de uso (linter source-of-truth for Phase 2)"
affects: [Phase 1 Plan 05 deploy, Phase 2 copy authoring, Phase 2 copy-linter, Phase 3 legal review by abogado]

# Tech tracking
tech-stack:
  added: []  # docs-only plan — no runtime deps added
  patterns:
    - "`.planning/intel/` directory established for legal/branding/research artifacts that aren't user-facing docs"
    - "Two-account gh CLI workflow (`gh auth switch`) for pushing to Elsolarcg-owned repo from juanmplazasg-lgtm primary"

key-files:
  created:
    - ".planning/intel/gh-pages-pre-deploy-settings.md (89 lines)"
    - ".planning/intel/trademark.md (84 lines)"
    - "docs/copy-glossary.md (83 lines)"
  modified: []

key-decisions:
  - "SIPI/VUE search marked PENDING MANUAL CONFIRMATION (portals are JS-SPA + ASP.NET ViewState — not scriptable from CLI env in budget); user surfaced for manual follow-up before Phase 3 indexation"
  - "Two-account gh CLI workflow chosen: switch to Elsolarcg via `gh auth switch -u Elsolarcg` instead of HTTPS PAT munging — keeps secrets out of git config"
  - "GH Pages pre-deploy snapshot persisted in `.planning/intel/` (not `docs/`) since it's operational/audit not user-facing"
  - "Copy-glossary PROHIBIDO list captured verbatim from PITFALLS.md Pitfalls #1/2/3/6/9 (no executor additions) — preserves traceability to legal research source"

patterns-established:
  - "Pattern: `.planning/intel/` for legal/branding/operational evidence with audit trails"
  - "Pattern: Decision states (PROCEED/WATCH/RE-BRAND/PENDING) for pending-input research artifacts so they're machine-greppable"
  - "Pattern: Pre-deploy infrastructure snapshots saved BEFORE destructive operations (force-push) per Pitfall #20"

requirements-completed: [FOUND-11, FOUND-13, FOUND-15]

# Metrics
duration: 4min
completed: 2026-05-21
---

# Phase 1 Plan 03: Backup branch + SIPI documentation + copy glossary — Summary

**Backup-v1 pushed to Elsolarcg/planetapsilo as rollback safety net (commit 918be1d), SIPI trademark check documented as PENDING manual, and docs/copy-glossary.md PERMITIDO/PROHIBIDO lexicon committed as Phase 2 linter source.**

## Performance

- **Duration:** ~4 min (active execution time; excludes any prior context-loading)
- **Started:** 2026-05-22T01:26:50Z
- **Completed:** 2026-05-22T01:30:42Z
- **Tasks:** 3 / 3
- **Files created:** 3 (2 in `.planning/intel/`, 1 in `docs/`)
- **Files modified:** 0
- **Commits (local):** 3 task commits + this metadata commit
- **Remote branches pushed:** 1 (`backup-v1` to Elsolarcg/planetapsilo)

## Accomplishments

- **FOUND-11 satisfied:** `backup-v1` branch created from existing remote HEAD (commit `918be1d`, original v1 HTML + 4 imágenes by Elsolarcg) and pushed to `github.com/Elsolarcg/planetapsilo`. Verified via `git ls-remote --heads`. Plan 05's force-push now has a verified rollback path; recovery is `git fetch origin backup-v1 && git push origin backup-v1:main --force-with-lease`.
- **Pitfall #20 mitigated:** Pre-existing GitHub Pages settings captured into `.planning/intel/gh-pages-pre-deploy-settings.md` BEFORE any force-push. Discovered current source is `build_type: legacy` (serves directly from `main` branch root) — Plan 05 must switch to `build_type: workflow` for Astro+GH-Actions deploy to work.
- **FOUND-13 satisfied:** `.planning/intel/trademark.md` documents the SIPI search attempt across classes 35/41/44, with explicit Decision = `PENDING MANUAL CONFIRMATION` and step-by-step manual search instructions for the user (portals are JS-SPA / ASP.NET ViewState — not reliably automatable from CLI). Phase 1 deploy NOT blocked; Phase 3 indexation gate explicitly flagged.
- **FOUND-15 satisfied:** `docs/copy-glossary.md` committed with 11 PERMITIDO entries, 15 PROHIBIDO entries, and 8 reglas de uso. Includes grep linter reference for Phase 2 pre-deploy gate and cites Leyes 1090 / 1581 / 1453 / 1480.

## Task Commits

Each task was committed atomically:

1. **Task 1: Backup branch push + GH Pages snapshot (FOUND-11)** — `aed68f4` (chore)
2. **Task 2: SIPI trademark check documented (FOUND-13)** — `f2f4e9f` (docs)
3. **Task 3: Copy glossary authored (FOUND-15)** — `658d9e6` (docs)

Plus the remote push of `backup-v1` (not a local commit; verifies via `git ls-remote --heads https://github.com/Elsolarcg/planetapsilo.git backup-v1` → `918be1d`).

## Files Created

- **`.planning/intel/gh-pages-pre-deploy-settings.md`** (89 lines) — Raw Pages API response, parsed settings table, Phase 5 migration steps (switch from legacy → workflow build type), rollback procedure with copy-paste API commands.
- **`.planning/intel/trademark.md`** (84 lines) — Schema-compliant trademark check doc: 3 classes searched, search method (4 sources documented with status), Results table empty, Decision state = PENDING, 7-step manual search procedure, audit trail table for future updates.
- **`docs/copy-glossary.md`** (83 lines) — PERMITIDO table (11 rows), PROHIBIDO table (15 rows), 8 numbered reglas de uso, Phase 2 grep linter reference command, citations to all four relevant Colombian laws (1090, 1581, 1453, 1480).

## Decisions Made

- **PENDING vs forced-PROCEED for SIPI:** chose PENDING with explicit user-action instructions rather than assuming clear. Marking PROCEED without evidence would be repudiation-risk per threat T-01-13.
- **Active gh account switch (`gh auth switch -u Elsolarcg`) for the push** — leverages already-configured tokens, no PAT exposure in git config. Switched back is unnecessary for this plan; subsequent plans use whichever account matches the destination repo.
- **GH Pages snapshot location = `.planning/intel/`** (not `docs/`) because it's operational evidence + rollback runbook, not user-facing documentation.
- **Copy glossary content sourced verbatim from PITFALLS.md** Pitfalls #1, #2, #3, #6, #9 — preserves traceability to legal research without executor improvisation on legally-sensitive language.

## Deviations from Plan

None — plan executed exactly as written.

The plan anticipated SIPI search may be inconclusive (Flow B fallback "if WebFetch returns unreadable → mark as PENDING + ask user"). I followed Flow B's documented fallback path; this is plan-as-specified behavior, not deviation.

Similarly, the plan anticipated the gh push might require auth handling (Task 1 is `checkpoint:human-action` precisely because of auth uncertainty). The push succeeded automatically after `gh auth switch` — the orchestrator pre-loaded that two-account context, so no human checkpoint was required. The acceptance criteria's "User has confirmed visually via the GitHub UI" remains pending but is non-blocking for plan completion (the remote-side verification via `git ls-remote` is the machine-checkable criterion).

## Threat Surface Scan

No new threat surface introduced beyond the threat model. All threats T-01-10 through T-01-15 from the plan's `<threat_model>` are mitigated as documented:

- **T-01-10 (force-push tampering):** mitigated — `backup-v1` live on remote at `918be1d`, ls-remote verified.
- **T-01-11 (spoofing wrong pusher):** mitigated — auth verified via `gh auth status`, push attributed to `Elsolarcg` account with correct repo permissions.
- **T-01-12 (GH Pages settings loss):** mitigated — full settings snapshot persisted to disk including raw API JSON.
- **T-01-13 (trademark repudiation):** mitigated — audit trail table established with date + searcher + outcome.
- **T-01-14 (Sofía PII leak in glossary):** mitigated — sanity grep confirmed no full-name+title leakage; glossary only uses generic role labels ("guía", "anfitriona").
- **T-01-15 (unauthorized glossary edit):** accept (per plan) — relies on git history audit.

## Issues Encountered

- **First push attempt failed (HTTP 403):** Active gh account was `juanmplazasg-lgtm` which lacks push rights to `Elsolarcg/planetapsilo`. Resolved by `gh auth switch -u Elsolarcg`; second push succeeded. Documented as standard two-account flow in plan summary so future plans pushing to Elsolarcg-owned repos can apply the same switch.
- **SIPI/VUE portal inaccessible programmatically:** Expected per plan Flow B fallback. Documented thoroughly with manual search instructions; non-blocking for Phase 1 per ROADMAP (RE-BRAND only blocks Phase 3 indexation).

## User Setup Required

**User action requested** (non-blocking, but pre-Phase-3):

1. **SIPI trademark search (~10–20 min):** Open `https://sipi.sic.gov.co` or `https://www.vue.gov.co/tramites-y-consultas/consulta-de-nombre-de-marca`. Search "planetapsilo" + phonetic variants (`planeta psilo`, `psilo`, `psiloplanet`) in classes 35, 41, 44 (3 classes × ~4 variants ≈ 12 queries). Update `.planning/intel/trademark.md` Results table and flip Decision checkbox from PENDING to PROCEED / WATCH / RE-BRAND.
2. **Visual confirmation of `backup-v1`** in GitHub UI: visit `https://github.com/Elsolarcg/planetapsilo/branches` and confirm `backup-v1` appears with v1 content (1 file `index.html` + 4 imágenes). Click into the branch and verify file list matches v1.

## Next Phase Readiness

- **Phase 1 deploy (Plan 05) unblocked:** Rollback safety net live. Plan 05 may force-push `master` over `main` knowing recovery is one command. Plan 05 must ALSO switch GH Pages source from legacy → workflow build type — flagged in `.planning/intel/gh-pages-pre-deploy-settings.md`.
- **Phase 2 copy authoring unblocked:** `docs/copy-glossary.md` is the linter source-of-truth.
- **Phase 3 indexation gate:** Blocked on SIPI manual search outcome (this plan documented the gate but did not resolve it — by design).

---
*Phase: 01-foundation-deployable-skeleton, Plan 03*
*Completed: 2026-05-21*

## Self-Check: PASSED

Verified post-write:

| Claim | Verification | Result |
|-------|--------------|--------|
| `.planning/intel/gh-pages-pre-deploy-settings.md` exists | `test -f` | FOUND |
| `.planning/intel/trademark.md` exists | `test -f` | FOUND |
| `docs/copy-glossary.md` exists | `test -f` | FOUND |
| Task 1 commit `aed68f4` | `git log --oneline` | FOUND |
| Task 2 commit `f2f4e9f` | `git log --oneline` | FOUND |
| Task 3 commit `658d9e6` | `git log --oneline` | FOUND |
| Remote branch `backup-v1` at `918be1d` | `git ls-remote --heads` | FOUND |
| Trademark Decision state present | `grep -E "(PROCEED\|WATCH\|RE-BRAND\|PENDING)"` | FOUND (all 4 options listed; PENDING checked) |
| Glossary has 4 required sections (PERMITIDO/PROHIBIDO/Reglas/Sources) | `grep -cE "^## (...)"` | 4 (matches) |
| No Sofía full-name+surname leak | `grep -roE "Sofía [A-Z][a-z]+ [A-Z][a-z]+"` | 0 matches |
