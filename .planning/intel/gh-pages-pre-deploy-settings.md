# GitHub Pages — Pre-deploy Settings Snapshot (Elsolarcg/planetapsilo)

**Captured:** 2026-05-21 (before Phase 1 Plan 05 force-push + GH Actions deploy)
**Pitfall reference:** PITFALLS.md Pitfall #20 — "Reorientar repo perdiendo continuidad GH Pages"
**Captured by:** Phase 01 Plan 03 — Task 1 (FOUND-11 backup-v1 push)

## Raw API Response

`GET /repos/Elsolarcg/planetapsilo/pages`:

```json
{
  "url": "https://api.github.com/repos/Elsolarcg/planetapsilo/pages",
  "status": "built",
  "cname": null,
  "custom_404": false,
  "html_url": "https://elsolarcg.github.io/planetapsilo/",
  "build_type": "legacy",
  "source": {
    "branch": "main",
    "path": "/"
  },
  "public": true,
  "protected_domain_state": null,
  "pending_domain_unverified_at": null,
  "https_enforced": true
}
```

## Parsed Settings (snapshot pre force-push)

| Setting | Value |
|---------|-------|
| Public URL | `https://elsolarcg.github.io/planetapsilo/` |
| Source branch | `main` |
| Source path | `/` (root) |
| Build type | **legacy** (serves files directly from branch — NOT GitHub Actions) |
| Custom domain (CNAME) | none |
| HTTPS enforced | true |
| Custom 404 | false |
| Visibility | public |
| Status | built (last successful build of the v1 HTML) |

## Existing Content On `main` (pre force-push, preserved in `backup-v1`)

- 1 commit: `918be1d` — *"Add files via upload"* by Elsolarcg, 2026-02-18
- Files: `index.html` + 4 imágenes (3 jpg + 1 png)
- Estilo: HTML estático puro sin framework
- Recoverable via: `git fetch origin backup-v1 && git checkout backup-v1`

## Migration Required in Phase 1 Plan 05 (deploy)

Plan 05 will:
1. Force-push `master` (current local branch) with the Astro 6 scaffold over `main` on the remote.
2. **Switch Pages source from `legacy` → `workflow` (GitHub Actions)** via:
   - GitHub UI: Repository → Settings → Pages → Source → "GitHub Actions"
   - Or API: `PUT /repos/Elsolarcg/planetapsilo/pages` with `{ "build_type": "workflow" }` (requires Pages admin scope; may need to be done in UI by the user)
3. Workflow file `.github/workflows/deploy.yml` using `withastro/action@v3` + `actions/deploy-pages@v4` will then take over.
4. Custom domain remains **none** (sticks with `elsolarcg.github.io/planetapsilo/`).
5. HTTPS enforced remains **true** (Pages auto-renews cert).

## Rollback Procedure (if force-push goes wrong)

```bash
# 1. Restore main from backup-v1
git fetch origin backup-v1
git push origin backup-v1:main --force-with-lease

# 2. Revert Pages source back to legacy (in GitHub UI: Settings → Pages → Source → "Deploy from a branch" → main → /)
# Or via API:
gh api -X PUT /repos/Elsolarcg/planetapsilo/pages \
  -f build_type=legacy \
  -f source[branch]=main \
  -f source[path]=/
```

## Verification

```bash
# Confirm backup-v1 is live on remote
git ls-remote --heads https://github.com/Elsolarcg/planetapsilo.git backup-v1
# Expected: 918be1d459ea0f388c39490aeaddbd241568f9ce  refs/heads/backup-v1

# Confirm current Pages config (re-run anytime)
gh api repos/Elsolarcg/planetapsilo/pages
```

---
*Snapshot taken by Phase 01 Plan 03 Task 1. Reference for Plan 05 deploy + emergency rollback.*
