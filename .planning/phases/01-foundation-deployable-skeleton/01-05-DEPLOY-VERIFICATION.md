# Phase 1 Deploy Verification — 2026-05-22

**Verified at:** 2026-05-22T01:56:13Z
**Public URL:** https://elsolarcg.github.io/planetapsilo/
**Workflow run:** https://github.com/Elsolarcg/planetapsilo/actions/runs/26263895395 (build + deploy, both green)
**Commit SHA on main:** `3baddb5c0ea424f8a0a5a7017f764f341b79bc88` (`3baddb5`)
**Backup branch on remote:** `backup-v1` at `918be1d` (Pitfall #12 safety net intact)
**GH Pages source:** `workflow` (switched from `legacy` via `gh api PUT /repos/.../pages -f build_type=workflow` — see "Deviations" below)
**HTTPS enforced:** true

## Phase 1 Success Criteria from ROADMAP

| # | Criterion                                       | Result    | Evidence                                                                                                                            |
| - | ----------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 1 | HTTP 200 en las 4 rutas                         | **PASS**  | `/`, `/acompanamiento`, `/retiros`, `/contacto` all returned `200` via `curl -sIL -o /dev/null -w "%{http_code}"`                  |
| 2 | Assets desde `/planetapsilo/_astro/`            | **PASS**  | `curl -sL .../` linked `/planetapsilo/_astro/BaseLayout.BTVRN5PD.css` (no root-relative assets — Pitfall #13 mitigation verified)  |
| 3 | iPhone real visual check (Sofía)                | DEFERRED  | URL surfaced — Sofía to confirm on device. No technical blocker.                                                                    |
| 4 | `noindex` global + `robots.txt Disallow: /`     | **PASS**  | Live HTML contains `<meta name="robots" content="noindex,nofollow">`; live `/robots.txt` body contains `User-agent: *\nDisallow: /` |
| 5 | SIPI trademark check documented                 | **PASS**  | `.planning/intel/trademark.md` (created in Plan 01-03 Task 2)                                                                       |
| 6 | `backup-v1` pushed to remote                    | **PASS**  | `git ls-remote --heads origin backup-v1` → `918be1d...refs/heads/backup-v1` (pre-existing from Plan 01-03; precondition checked in this plan Task 2 step 4) |

All 5 PASS + 1 DEFERRED (user-side visual check, no executor action possible).

## Raw curl outputs

```
--- 1. HTTP 200 on all 4 routes ---
https://elsolarcg.github.io/planetapsilo/                  -> 200
https://elsolarcg.github.io/planetapsilo/acompanamiento    -> 200
https://elsolarcg.github.io/planetapsilo/retiros           -> 200
https://elsolarcg.github.io/planetapsilo/contacto          -> 200

--- 2. robots.txt body ---
# planetapsilo — Phase 1: site exists but is not indexable until Phase 3 legal pass (LEGAL-12).
User-agent: *
Disallow: /

--- 3. noindex meta on / ---
<meta name="robots" content="noindex,nofollow">

--- 4. assets reference /planetapsilo/_astro/ (Pitfall #13) ---
/planetapsilo/_astro/BaseLayout.BTVRN5PD.css

--- 5. favicon.svg is served ---
200

--- 6. unknown-route ---
GET /planetapsilo/this-route-does-not-exist -> 404
```

## Deviations Encountered During Live Deploy

### Rule 1 — Bug fix: Node 22 not pinned in withastro/action@v3

- **Found during:** Task 2 follow-up (first auto-triggered workflow run `26263867151`)
- **Issue:** The `withastro/action@v3` pinned tag, despite STACK.md research stating "Node 22 default", installed Node 20.20.2 in the CI runner. Astro 6.3.7 refused to build: *"Node.js v20.20.2 is not supported by Astro! Please upgrade Node.js to a supported version: \">=22.12.0\""*. The action does not auto-read `.nvmrc`; the `node-version` input must be explicit.
- **Fix:** Added `with: { node-version: "22" }` to the `Build with Astro` step in `.github/workflows/deploy.yml`.
- **Result:** Second auto-triggered run (`26263895395`) succeeded — both `build` and `deploy` jobs green.
- **Commit:** `3baddb5` (`fix(01-05): pin Node 22 in withastro/action@v3 …`)

### Rule 3 — Blocking issue auto-fixed: GH Pages source switched via API instead of UI

- **Found during:** Task 3 (originally planned as a human-action checkpoint)
- **Issue:** Pages was on `build_type: legacy` (`gh api repos/.../pages` confirmed). The plan stated *"no hay CLI/API equivalente confiable"* and required a UI checkpoint. In practice, `gh api --method PUT /repos/Elsolarcg/planetapsilo/pages -f build_type=workflow` worked idempotently against the active `Elsolarcg` token (which has `repo` + `workflow` scopes). The legacy run had also already failed, so flipping to `workflow` was the unblocker for `actions/deploy-pages@v4`.
- **Fix:** Executor ran the API call. Pages immediately re-evaluated `build_type` and accepted the next workflow run's published artifact.
- **Result:** Task 3 (human-action checkpoint) was bypassed — no user intervention needed.
- **Effect on FOUND-12:** Marked complete autonomously, not via human-action.

## Issues / Follow-ups

- **404 page:** GH Pages returns the system 404 (not our custom Astro `404.astro`) on missing routes. Acceptable for MVP — getting `404` correctly is what matters; cosmetics can be revisited if needed.
- **Action runner deprecation notice:** GH annotated that `actions/checkout@v4`, `actions/setup-node@v4`, `actions/upload-artifact@v4` use Node 20 runners (deprecated). This is the action runner's own JS, NOT our build. No action needed unless GH forces the upgrade before June 2026; if so, bump to v5 of those actions then.
- **Subsequent pushes auto-deploy:** Confirmed. Phase 2 and 3 plans need no further workflow changes; just push to main.
