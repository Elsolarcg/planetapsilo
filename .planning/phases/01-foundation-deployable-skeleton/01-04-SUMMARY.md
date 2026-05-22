---
phase: 01-foundation-deployable-skeleton
plan: 04
subsystem: ui

tags:
  - astro
  - tailwind-v4
  - baselayout
  - chrome-components
  - nav
  - footer
  - whatsapp-float
  - favicon
  - robots-txt
  - noindex
  - 404
  - wordmark
  - cosmic-gradient
  - header-blur

requires:
  - phase: 01-foundation-deployable-skeleton
    plan: 01
    provides: "Astro scaffold with locked `base: '/planetapsilo'` + `trailingSlash: 'ignore'` (astro.config.mjs)"
  - phase: 01-foundation-deployable-skeleton
    plan: 02
    provides: "Tailwind v4 wired + tokens.css (.hero-bg cosmic gradient, .noise-overlay, --font-display/--font-body, palette tokens) + global.css entry"

provides:
  - BaseLayout HTML shell with noindex gate, OG defaults, canonical, favicon link, preconnect to Google Fonts
  - Sticky transparent Nav with blur-on-scroll (D-09) + Fraunces 300 lowercase 0.08em tracking wordmark (D-06, D-07) + mobile hamburger drawer
  - Footer with brand line + year + dynamic noindex status string
  - WhatsAppFloat sticky CTA (stub wa.me/0000000000) with target=_blank + rel=noopener noreferrer (T-01-18 mitigation)
  - 4 page stubs (/, /acompanamiento, /retiros, /contacto) composing BaseLayout
  - Custom 404.astro with cósmico-amable tone ("Te perdiste en el universo de planetapsilo.") + link home
  - src/data/{site,nav,services,contact}.ts typed contract for Phase 2 to consume
  - public/favicon.svg (D-08 radial cosmic gradient) + public/og-default.svg + public/robots.txt (Disallow: /)
  - internal() / asset() BASE_URL normalization pattern for trailingSlash: 'ignore' Astro builds

affects:
  - 01-05 (deploy workflow + force-push — needs the dist/ output this plan produces)
  - 02-mvp-content (Phase 2 fills the BaseLayout props, replaces page stubs with real copy, wires contact data)
  - 03-legal-pass (LEGAL-12 flips site.indexable=true; BaseLayout will then stop emitting noindex meta)

tech-stack:
  added:
    - "BaseLayout.astro shell pattern"
    - "Layout chrome components in src/components/layout/"
    - "src/data/*.ts typed config contract"
  patterns:
    - "internal()/asset() helpers normalize import.meta.env.BASE_URL (which has NO trailing slash under trailingSlash: 'ignore') for all internal links and asset references"
    - "Phase 1 indexation gate: site.indexable boolean drives both noindex meta tags AND footer status string"
    - "Vanilla JS in Astro <script> blocks for chrome behavior (scroll blur, hamburger toggle) — 0 KB framework runtime"
    - "Google Fonts @import MUST be the first @import in global.css (Lightning CSS silently drops out-of-order @imports per spec)"

key-files:
  created:
    - src/layouts/BaseLayout.astro
    - src/components/layout/Nav.astro
    - src/components/layout/Footer.astro
    - src/components/layout/WhatsAppFloat.astro
    - src/data/site.ts
    - src/data/nav.ts
    - src/data/services.ts
    - src/data/contact.ts
    - src/pages/acompanamiento.astro
    - src/pages/retiros.astro
    - src/pages/contacto.astro
    - src/pages/404.astro
    - public/favicon.svg
    - public/og-default.svg
    - public/robots.txt
  modified:
    - src/pages/index.astro (replaced bare scaffold with hero composing BaseLayout)
    - src/styles/global.css (reordered @imports — fonts FIRST so Lightning CSS preserves them)

key-decisions:
  - "BASE_URL helper normalization: trim trailing slash from import.meta.env.BASE_URL then concatenate as `${baseTrimmed}/${path}` — needed because astro.config.mjs sets trailingSlash: 'ignore' which produces BASE_URL='/planetapsilo' with NO trailing slash, breaking naive `${baseUrl}path` concatenation."
  - "Google Fonts @import in global.css moved to top, before tailwindcss/tokens imports — Lightning CSS minifier silently dropped the font @import when it appeared after rule blocks in tokens.css, breaking Fraunces wordmark loading."
  - "404 home-link uses 'Vuelve al inicio' (Colombia tú form) rather than 'Volvé' (rioplatense vos form) — sketched in plan as 'Volvé' but corrected for ICP."
  - "Footer status string only renders while site.indexable === false — automatically disappears in Phase 3 after LEGAL-12 flips the flag."

patterns-established:
  - "Layout composition: every page in src/pages/*.astro imports BaseLayout and uses <BaseLayout title=… description=…><slot/></BaseLayout>"
  - "BASE_URL pattern: `const baseTrimmed = import.meta.env.BASE_URL.replace(/\\/$/, '')` then `${baseTrimmed}/${path}` for every internal link/asset"
  - "Chrome components live in src/components/layout/ and are imported only by BaseLayout (not by individual pages)"
  - "Typed data layer in src/data/*.ts exports both interface AND const value — Phase 2 fills values, never changes interface"
  - "Indexation gate is driven by a single boolean (site.indexable). Flipping it in src/data/site.ts is the only required code change for Phase 3 LEGAL-12 indexation removal."

requirements-completed:
  - FOUND-03
  - FOUND-05
  - FOUND-06
  - FOUND-07
  - FOUND-08
  - FOUND-09

duration: 5min
started: "2026-05-22T01:41:52Z"
completed: "2026-05-22T01:47:00Z"
---

# Phase 01 Plan 04: BaseLayout + Chrome + 4 Pages + 404 Summary

**Astro BaseLayout with noindex gate, Fraunces wordmark nav with blur-on-scroll, WhatsApp stub CTA, 4 page stubs + custom cosmic 404, and src/data typed contract — all under `/planetapsilo/` base path, every built HTML carries `<meta name="robots" content="noindex,nofollow">`, robots.txt disallows everything, build produces 5 pages in 1.4 s.**

## Performance

- **Duration:** 5 min (340 s)
- **Started:** 2026-05-22T01:41:52Z
- **Completed:** 2026-05-22T01:47:00Z
- **Tasks:** 3 (4 commits: 3 task commits + 1 mid-task bug-fix commit)
- **Files created:** 15
- **Files modified:** 2 (index.astro replaced, global.css @import reorder)

## Accomplishments

- Complete visible skeleton: a visitor on `http://localhost:4321/planetapsilo/` (and at the GH Pages URL after Plan 05 deploys) sees the Fraunces wordmark, transparent sticky header that blurs on scroll, the cosmic radial-gradient hero, the WhatsApp floating CTA, and a footer that explicitly states the site is still under noindex.
- **Phase 1 legal gate fully enforced end-to-end:** every page in `dist/` contains `<meta name="robots" content="noindex,nofollow">` AND `<meta name="googlebot" content="noindex,nofollow">`, plus `public/robots.txt` ships with `User-agent: *` / `Disallow: /` (verified via grep on every built HTML and via served HTTP request).
- **BASE_URL pitfall #13 neutralized:** every internal link in `dist/index.html` resolves to `/planetapsilo/<path>` — checked all four nav links (`/planetapsilo/`, `/planetapsilo/acompanamiento`, `/planetapsilo/retiros`, `/planetapsilo/contacto`), favicon (`/planetapsilo/favicon.svg`), CSS (`/planetapsilo/_astro/BaseLayout.BTVRN5PD.css`), and 404 home link (`/planetapsilo/`).
- **Typed contract for Phase 2:** four `src/data/*.ts` files export `SiteConfig`, `NavItem`, `ServicePlaceholder`, `ContactConfig` interfaces — Phase 2 will fill the values without changing the shapes.
- **Two real bugs auto-fixed during execution** (see Deviations below): BASE_URL concatenation and Google Fonts @import order. Both were caught by inspecting the first `npm run build` output before declaring Task 3 done.

## Task Commits

Each task was committed atomically; one mid-Task-3 bug-fix commit captured Rule 1 fixes separately from the page additions for clean history.

1. **Task 1: src/data/*.ts + favicon.svg + robots.txt + og-default.svg** — `474eb23` (feat)
2. **Task 2: BaseLayout + Nav/Footer/WhatsAppFloat chrome components** — `dfd2348` (feat)
3. **Task 3a (mid-task fix): BASE_URL concatenation + @import reorder** — `9805627` (fix)
4. **Task 3b: 4 page stubs + custom 404 composing BaseLayout** — `65068d2` (feat)

## Files Created / Modified

### Created (15)

| Path | Purpose |
|------|---------|
| `src/layouts/BaseLayout.astro` | HTML shell — head meta, noindex gate, OG defaults, canonical, favicon, fonts preconnect, Nav+slot+Footer+WhatsAppFloat |
| `src/components/layout/Nav.astro` | Sticky transparent header → blur(12px) when scrollY>50; Fraunces 300 lowercase wordmark tracking 0.08em; mobile fullscreen drawer |
| `src/components/layout/Footer.astro` | Brand line + year + dynamic "Sitio en construcción — sigue noindex" string driven by site.indexable |
| `src/components/layout/WhatsAppFloat.astro` | Fixed bottom-right CTA, target=_blank + rel=noopener noreferrer, prefers-reduced-motion safe |
| `src/data/site.ts` | `SiteConfig` interface + `site` const (indexable=false, year, OG defaults) |
| `src/data/nav.ts` | `NavItem[]` for Inicio, Acompañamiento, Retiros, Contacto |
| `src/data/services.ts` | `ServicePlaceholder[]` for acompanamiento + retiros (Phase 2 fills) |
| `src/data/contact.ts` | `ContactConfig` stubs (wa.me/0000000000, calendly '#') |
| `src/pages/acompanamiento.astro` | Service stub mentioning ICP, Phase 2 fills real legal-safe copy |
| `src/pages/retiros.astro` | Retiros stub naming three fases Preparación · Inmersión · Integración |
| `src/pages/contacto.astro` | Three-channel stub: Calendly + WhatsApp + Form CTAs |
| `src/pages/404.astro` | Cosmic-amable 404 with hero background + "Vuelve al inicio" |
| `public/favicon.svg` | D-08 radial cosmic gradient orange-mystic → violet-deep → blue-cosmic |
| `public/og-default.svg` | 1200×630 OG fallback with wordmark |
| `public/robots.txt` | `User-agent: *` / `Disallow: /` — Phase 1 indexation gate |

### Modified (2)

| Path | Change |
|------|--------|
| `src/pages/index.astro` | Replaced Plan 01 bare-scaffold stub with hero composing BaseLayout, cosmic-gradient `.hero-bg`, Fraunces kicker + headline |
| `src/styles/global.css` | Reordered `@import` directives — Google Fonts moved BEFORE tailwindcss/tokens imports so Lightning CSS preserves it in built CSS |

## Decisions Made

- **BASE_URL normalization pattern locked.** Plan-as-written assumed `import.meta.env.BASE_URL === '/planetapsilo/'`, but Astro 6 with `trailingSlash: 'ignore'` resolves it to `/planetapsilo` (no trailing slash). Established `baseTrimmed + '/' + path` pattern in Nav.astro `internal()` helper and BaseLayout `asset()` helper. Every future internal-link author MUST use one of these helpers, not bare concatenation. Documented in commit message of 9805627 so Phase 2/3 inherits the pattern.
- **Google Fonts @import must precede all other rules.** Plan 02 originally placed `@import url(fonts.googleapis.com)` after `@import "./tokens.css"`, which expands to rule blocks inline. Lightning CSS (Tailwind v4 minifier) silently dropped the now-out-of-order @import, breaking Fraunces loading on the deployed site. Reordered to fonts → tailwindcss → tokens. Confirmed `fonts.googleapis.com` survives in `dist/_astro/BaseLayout.*.css` after rebuild.
- **404 copy: "Vuelve al inicio" (tú form) instead of plan's "Volvé al inicio" (vos form).** Plan author noted this open question; ICP is Colombian C-Level so tú-form is correct. Locked.
- **Footer noindex status string is conditional on `site.indexable`** rather than hardcoded — automatically disappears in Phase 3 once LEGAL-12 flips the flag, no additional code change required.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Broken BASE_URL concatenation produced unreachable internal links**
- **Found during:** Task 3 (first build of full skeleton)
- **Issue:** Plan's `internal()` helper used `${baseUrl}${p.replace(/^\//, '')}`, assuming `BASE_URL` ends with `/`. In reality Astro under `trailingSlash: 'ignore'` resolves `BASE_URL` to `/planetapsilo` (no slash). First build emitted `<link href="/planetapsilofavicon.svg">`, `<a href="/planetapsiloacompanamiento">`, etc. — all 404 on GH Pages. Same bug in BaseLayout favicon link.
- **Fix:** Normalized helper: `const baseTrimmed = baseUrl.replace(/\/$/, ''); ${baseTrimmed}/${path}` with explicit handling of empty path → `${baseTrimmed}/`. Updated Nav.astro, BaseLayout.astro, and 404.astro home link.
- **Files modified:** src/components/layout/Nav.astro, src/layouts/BaseLayout.astro, src/pages/404.astro
- **Verification:** Rebuilt and grepped: `dist/index.html` now contains `/planetapsilo/favicon.svg`, `/planetapsilo/acompanamiento`, `/planetapsilo/retiros`, `/planetapsilo/contacto`, and `/planetapsilo/` (home link). HTTP smoke-test via `python3 -m http.server`: all five routes returned 200.
- **Committed in:** `9805627` (Task 3 mid-task fix commit)

**2. [Rule 1 - Bug] Google Fonts @import silently dropped by Lightning CSS, breaking Fraunces wordmark**
- **Found during:** Task 3 (build output warning + inspection of `dist/_astro/BaseLayout.*.css`)
- **Issue:** Plan 02's `global.css` placed `@import url(google fonts)` AFTER `@import "./tokens.css"`. `tokens.css` contains rule blocks (`.hero-bg`, `.noise-overlay`, `@keyframes`). Per CSS spec, `@import` must come before any rule block other than `@charset`/`@layer`. Lightning CSS (Tailwind v4's minifier) emitted a warning AND silently dropped the font @import from the built CSS. Result: Fraunces never loaded on the deployed site → wordmark D-06/D-07 target would fall back to serif. This violates the plan's wordmark acceptance criterion even though no Plan-04 file was the proximate cause.
- **Fix:** Moved `@import url(...)` for Google Fonts to be the FIRST `@import` in `global.css`, before `tailwindcss` and `./tokens.css`. Updated header comment to explain the ordering constraint and warn future authors.
- **Files modified:** src/styles/global.css
- **Verification:** Build now completes with zero warnings. `grep -o 'fonts.googleapis.com' dist/_astro/BaseLayout.*.css` returns a hit (was empty before fix).
- **Committed in:** `9805627` (Task 3 mid-task fix commit, alongside the BASE_URL fix)
- **Scope note:** Original bug was introduced in Plan 02 but only became visible / blocking in Plan 04 (when wordmark visibility became a deliverable). Applied Rule 3 (blocking issue prevents completing current task's wordmark deliverable).

---

**Total deviations:** 2 auto-fixed (both Rule 1 bugs; one with a Plan 02 origin, one in Plan 04 helper code).
**Impact on plan:** Both fixes were essential — without either, the Phase 1 success criteria (internal links resolve, wordmark renders) would silently fail in production. No scope creep — only mechanical fixes to make plan-authored functionality actually work. Plan deliverable count is unchanged.

## Issues Encountered

- **CSS @import ordering trap (resolved):** Lightning CSS in Tailwind v4 is stricter about `@import` placement than browsers are tolerant of. The warning was easy to miss because the build still exited 0. Documented in `global.css` header comment so Phase 2 doesn't reintroduce it when adding more font weights.
- **`npx serve` smoke-test failed silently (workaround):** First attempt to serve `dist/` via `npx serve` produced HTTP 000 / no output. Switched to `python3 -m http.server 4321 -d dist` for the smoke test — all routes returned 200. No actual deliverable impact; just a tooling note.

## Verification Results

### Built artifacts

```
dist/
├── 404.html
├── _astro/
├── acompanamiento/index.html
├── contacto/index.html
├── favicon.svg
├── index.html
├── og-default.svg
├── retiros/index.html
└── robots.txt
```

### Gates verified

| Gate | Result |
|------|--------|
| `npm run build` exits 0 (no warnings) | PASS |
| All 5 routes generated (index, acompanamiento, retiros, contacto, 404) | PASS |
| Every built HTML contains `noindex,nofollow` | PASS (2 hits per page: robots + googlebot) |
| `dist/robots.txt` ships `Disallow: /` | PASS |
| Favicon link resolves to `/planetapsilo/favicon.svg` | PASS (fixed mid-task) |
| All internal nav links use `/planetapsilo/<path>` (Pitfall #13) | PASS (fixed mid-task): `/`, `/acompanamiento`, `/retiros`, `/contacto` |
| 404 home link resolves to `/planetapsilo/` | PASS (fixed mid-task) |
| WhatsApp link is `https://wa.me/0000000000?text=Hola%20planetapsilo` | PASS (stub per CONTEXT.md Deferred) |
| WhatsApp link has `target="_blank" rel="noopener noreferrer"` (T-01-18) | PASS |
| Favicon SVG contains `radialGradient` (D-08) | PASS |
| Google Fonts URL present in built CSS | PASS (after @import reorder) |
| `python3 -m http.server` serves all 5 routes with HTTP 200 | PASS |
| Wordmark "planetapsilo" appears in served home (header + footer = 2 hits) | PASS |

### Locally-served preview

`cd dist && python3 -m http.server 4321` → routes accessible at:

- `http://localhost:4321/index.html`
- `http://localhost:4321/acompanamiento/index.html`
- `http://localhost:4321/retiros/index.html`
- `http://localhost:4321/contacto/index.html`
- `http://localhost:4321/404.html`
- `http://localhost:4321/robots.txt`
- `http://localhost:4321/favicon.svg`

For preview matching the GH Pages base path, use `npx astro preview` which serves under `/planetapsilo/`.

## Threat Surface Scan

No new threat surface introduced beyond what the plan's `<threat_model>` already documents (T-01-16 through T-01-21). All planned mitigations are in place:

- T-01-16 (index leak): noindex meta + robots Disallow — verified end-to-end.
- T-01-17 (BASE_URL): every internal link uses normalized BASE_URL helper — verified by grep.
- T-01-18 (tabnabbing): WhatsApp CTAs (footer float + Contacto page) both ship `target=_blank rel="noopener noreferrer"`.
- T-01-19 (real-channel leak): stubs only (wa.me/0000000000, calendly '#') — locked in src/data/contact.ts.
- T-01-20 (reduced-motion): `.hero-bg` honors `prefers-reduced-motion` via Plan 02 tokens.css; WhatsAppFloat hover-scale disabled under reduced-motion.
- T-01-21 (OG placeholder leak): accepted per plan; og-default.svg explicitly labeled placeholder.

## User Setup Required

None — no external service configuration required for this plan. (Phase 2 will require Sofía's real WhatsApp number + real Calendly URL when CONT-04/CONT-05 wire them; Phase 3 will require flipping `site.indexable=true` after abogado sign-off.)

## Next Phase Readiness

**Ready for Plan 01-05 (deploy workflow + force-push):**

- `dist/` is buildable, contains 5 HTML pages + robots.txt + favicon.svg + og-default.svg + _astro/ bundle.
- All assets reference the correct base path so the deployed GH Pages URL (`https://elsolarcg.github.io/planetapsilo/`) will resolve correctly.
- Wordmark + cosmic gradient + blur-on-scroll header all render under local preview.
- noindex gate is enforced at multiple layers (meta tag + robots.txt + footer status string) so the indexation risk during the public-but-pre-Phase-3 window is minimized.

**Phase 2 (MVP content) inherits:**

- BaseLayout `Props` contract (`title?`, `description?`, `ogImage?`) for per-page overrides.
- Typed `src/data/*.ts` contracts to fill with real copy.
- Component slots: footer needs CONT-10 social links + CONT-11 privacy link; WhatsAppFloat needs real number + microcopy (CONT-05); pages need real legal-safe copy from `docs/copy-glossary.md` (CONT-01..CONT-04).

**No blockers carried forward.** The two Rule 1 bugs were both resolved and verified within the plan.

## Self-Check: PASSED

All claims verified before this section was written:

- `[ -f src/layouts/BaseLayout.astro ]` → FOUND
- `[ -f src/components/layout/Nav.astro ]` → FOUND
- `[ -f src/components/layout/Footer.astro ]` → FOUND
- `[ -f src/components/layout/WhatsAppFloat.astro ]` → FOUND
- `[ -f src/data/site.ts && -f src/data/nav.ts && -f src/data/services.ts && -f src/data/contact.ts ]` → FOUND
- `[ -f src/pages/acompanamiento.astro && -f src/pages/retiros.astro && -f src/pages/contacto.astro && -f src/pages/404.astro ]` → FOUND
- `[ -f public/favicon.svg && -f public/robots.txt && -f public/og-default.svg ]` → FOUND
- `git log --all | grep 474eb23` → FOUND (Task 1)
- `git log --all | grep dfd2348` → FOUND (Task 2)
- `git log --all | grep 9805627` → FOUND (Task 3 fix)
- `git log --all | grep 65068d2` → FOUND (Task 3 pages)
- `grep "noindex" dist/index.html dist/404.html dist/acompanamiento/index.html dist/retiros/index.html dist/contacto/index.html` → MATCH on all 5
- `grep "Disallow: /" dist/robots.txt` → MATCH

---

*Phase: 01-foundation-deployable-skeleton*
*Plan: 04*
*Completed: 2026-05-22*
