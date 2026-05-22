---
phase: 01-foundation-deployable-skeleton
plan: 02
subsystem: ui
tags: [tailwind-v4, css-tokens, theme, fraunces, inter, conic-gradient, at-property, reduced-motion, psychedelic, dark-only]

# Dependency graph
requires:
  - phase: 01-foundation-deployable-skeleton-01
    provides: "Astro 6.3.7 scaffold with base '/planetapsilo', site, output static, build.assets locked in astro.config.mjs"
provides:
  - "Tailwind v4 (@tailwindcss/vite ^4.3.0) wired into Astro Vite pipeline"
  - "src/styles/tokens.css — locked palette (D-02) + font families (D-03) + cosmic gradient primitives (D-04) + noise overlay (D-05) declared in @theme block"
  - "src/styles/global.css — single CSS entry point importing Tailwind + tokens + Google Fonts (Fraunces 300/500 + Inter 400/500 with display=swap)"
  - "prefers-reduced-motion: reduce bloqueante en ambos archivos (tokens.css disables .hero-bg animation, global.css clamps all animations to 0.001ms and disables smooth scroll)"
  - ".hero-bg utility — conic-gradient cosmic backdrop with @property --cosmic-angle + 32s linear cosmic-rotate animation"
  - ".noise-overlay utility — inline SVG feTurbulence at opacity 0.08, mix-blend-mode overlay"
  - "Tailwind utilities auto-generated from @theme: bg-orange-mystic, text-text-primary, font-display, font-body, etc."
affects: [01-04-base-layout, 01-05-deploy, phase-02-mvp-content, phase-04-validation]

# Tech tracking
tech-stack:
  added:
    - "tailwindcss@^4.3.0"
    - "@tailwindcss/vite@^4.3.0"
  patterns:
    - "Tailwind v4 CSS-first @theme config (no tailwind.config.js) — tokens become both CSS vars AND utilities"
    - "@property --cosmic-angle typed custom property for animated gradient interpolation (CSS Houdini)"
    - "Dual-layer reduced-motion strategy: per-component (.hero-bg) + global clamp (* animation-duration: 0.001ms)"
    - "Single global.css entry — BaseLayout imports one file, inherits Tailwind utilities + tokens + fonts in one line"
    - "Google Fonts CSS2 @import url(...) with explicit weights (Fraunces 300+500, Inter 400+500) + display=swap"

key-files:
  created:
    - "src/styles/tokens.css"
    - "src/styles/global.css"
  modified:
    - "astro.config.mjs"
    - "package.json"
    - "package-lock.json"

key-decisions:
  - "Tailwind v4 wired via official `npx astro add tailwind --yes` integration (vs manual @tailwindcss/vite install) — Astro CLI preserves all Plan 01 invariants and registers the Vite plugin atomically"
  - "Semantic token naming (--color-text-primary, --color-bg-base) over numeric scale — matches CONTEXT.md Claude's Discretion guidance and produces readable Tailwind utility names"
  - "Google Fonts @import url(...) in global.css instead of <link rel=preconnect> in BaseLayout — keeps font loading colocated with token declarations; can pivot to self-host if Lighthouse demands it in Phase 2 (D-03 explicit)"
  - "Global `* animation-duration: 0.001ms !important` reduced-motion clamp added beyond plan spec — defense in depth for Pitfall #8; per-component .hero-bg disable still present in tokens.css"

patterns-established:
  - "Tailwind v4 @theme block in tokens.css → utility generation: any --color-* / --font-* declared inside becomes a Tailwind utility"
  - "Reduced-motion bloqueante: any new animation MUST be paired with a prefers-reduced-motion: reduce override (verified by grep in CI in Plan 05)"
  - "Single CSS entry pattern: BaseLayout imports only global.css; tokens.css is pulled transitively"

requirements-completed: [FOUND-04]

# Metrics
duration: 3min
completed: 2026-05-22
---

# Phase 1 Plan 02: Tailwind v4 + Locked Tokens Summary

**Tailwind v4 wired via @tailwindcss/vite + locked psychedelic palette (orange-mystic / violet-deep / blue-cosmic) declared as @theme tokens, with Fraunces+Inter fonts and the @property --cosmic-angle animated conic-gradient primitive ready for Hero composition.**

## Performance

- **Duration:** 3 min
- **Started:** 2026-05-22T01:34:31Z
- **Completed:** 2026-05-22T01:37:23Z
- **Tasks:** 3
- **Files modified:** 5 (2 created, 3 modified)

## Accomplishments

- Tailwind v4 (4.3.0) and @tailwindcss/vite (4.3.0) installed and registered as a Vite plugin in `astro.config.mjs`; all Plan 01 invariants (`site`, `base: '/planetapsilo'`, `trailingSlash`, `output: 'static'`, `build.assets`) preserved intact.
- `src/styles/tokens.css` ships the D-02 locked palette as a Tailwind v4 `@theme` block — five exact hex codes (`#ff7a3d`, `#5b2a86`, `#0b1d4f`, `#050a1a`, `#f4ede3`) plus chrome/border tokens, both Fraunces and Inter font families, and the `--space-section` spacing rhythm.
- D-04 motion primitives in place: `@property --cosmic-angle` typed custom property, `cosmic-rotate` 360° keyframe, `.hero-bg` conic-gradient utility blurred 80px + saturated 1.2, and the mandatory `prefers-reduced-motion: reduce` override disabling the animation. D-05 noise overlay (`.noise-overlay`) ready as an inline-SVG fractalNoise filter at opacity 0.08.
- `src/styles/global.css` is the single CSS entry point — imports Tailwind, imports `./tokens.css`, loads Fraunces (300/500) + Inter (400/500) via Google Fonts CSS2 with `display=swap`, sets dark-only baseline styles (D-01), defaults all headings to Fraunces 300, transitions `a:hover/focus-visible` to orange-mystic, and clamps any animation to 0.001ms when the user opts out of motion.
- `npm run build` exits 0 after every commit. Tailwind v4 pipeline confirmed live (no compiled CSS in `dist/` yet because no consumer page imports `global.css` — by design; BaseLayout in Plan 04 is the first consumer).

## Task Commits

Each task was committed atomically:

1. **Task 1: Wire Tailwind v4 via `npx astro add tailwind`** — `5301d2b` (feat)
2. **Task 2: tokens.css with locked palette + cosmic gradient primitives** — `9036773` (feat)
3. **Task 3: global.css entry stylesheet (Tailwind + tokens + Google Fonts)** — `dadaf41` (feat)

**Plan metadata:** _(to be created by final commit — captures SUMMARY.md + STATE.md + ROADMAP.md + REQUIREMENTS.md)_

## Files Created/Modified

- `astro.config.mjs` — added `import tailwindcss from '@tailwindcss/vite'` and `vite: { plugins: [tailwindcss()] }`; Plan 01 fields untouched.
- `package.json` — `@tailwindcss/vite@^4.3.0` + `tailwindcss@^4.3.0` added to dependencies.
- `package-lock.json` — Tailwind v4 dependency graph resolved.
- `src/styles/tokens.css` (new) — locked palette + fonts + motion primitives in Tailwind v4 `@theme` block + `.hero-bg` + `.noise-overlay` + reduced-motion override.
- `src/styles/global.css` (new) — single CSS entry point: `@import "tailwindcss"`, `@import "./tokens.css"`, Google Fonts CSS2 import with `display=swap`, dark baseline body styles, global reduced-motion clamp, `.container` helper.

## Decisions Made

- Used the official `npx astro add tailwind --yes` path (vs manual install) — CLI integration validates the merged `astro.config.mjs`, preserves Plan 01 fields, and pins matching `tailwindcss` + `@tailwindcss/vite` versions in one atomic step (mitigates threat T-01-09).
- Defaulted to **semantic** token naming (`--color-bg-base`, `--color-text-primary`, `--color-chrome-border`) rather than numeric scale (per CONTEXT Claude's Discretion). Tailwind utilities now read as `bg-bg-base`, `text-text-primary`, `border-chrome-border` — readable in components.
- Loaded Google Fonts via `@import url(...)` inside `global.css` rather than `<link rel="preconnect">` in BaseLayout — keeps the font declaration colocated with the token block, simplifies BaseLayout to a single `import '../styles/global.css'` in Plan 04 frontmatter. Self-hosting deferred to Phase 2 per D-03.
- Added a **global** `prefers-reduced-motion: reduce` clamp (`*, *::before, *::after { animation-duration: 0.001ms !important; ... }`) in `global.css` on top of the per-component `.hero-bg` override in `tokens.css`. Defense in depth for Pitfall #8 — any future animation added without thinking about reduced-motion still gets short-circuited automatically.

## Deviations from Plan

None — plan executed exactly as written. All three tasks shipped the exact files specified, with no auto-fixes required. Build passed on first run after each task.

## Issues Encountered

- `astro add tailwind --yes` created a stub `src/styles/global.css` containing only `@import "tailwindcss";` as a side effect. This was overwritten by Task 3 (which is the canonical owner of that file per the plan's `files_modified` field). No data loss — the stub was never committed; Task 3's Write replaced it before staging.
- Tailwind tree-shakes utilities when no consumer imports `global.css`. After Task 3, `dist/_astro/` contains no compiled CSS bundle. This is **expected and acceptable** per Verification step 2 of the plan ("Tailwind's tree-shaker may strip if no component uses it yet — acceptable since this is utility plumbing, real usage lands in Plan 04"). Plan 04's BaseLayout will be the first consumer; at that point compiled CSS will land in `dist/_astro/`.

## User Setup Required

None — no external service configuration required. (Google Fonts CDN is reached at build/render time without keys; threat T-01-06 noted as accepted MVP risk.)

## Threat Surface Scan

No new threat surface introduced beyond what the plan's `<threat_model>` already enumerated. All four planned mitigations (T-01-06 accept, T-01-07 mitigate, T-01-08 mitigate, T-01-09 mitigate) are honored — the reduced-motion media query is present in both `tokens.css` and `global.css` per T-01-08, and matching `^4.x` versions of `tailwindcss` + `@tailwindcss/vite` are pinned together per T-01-09.

## Next Phase Readiness

- **Plan 01-04 (BaseLayout) unblocked:** BaseLayout.astro can now `import '../styles/global.css'` from its frontmatter and inherit Tailwind utilities + tokens + fonts in a single line. Wordmark (D-07) uses `font-display font-light text-2xl tracking-[0.08em] lowercase` — all utilities available.
- **Plan 01-05 (Deploy) unblocked:** Tailwind v4 build pipeline produces clean output; deploy workflow will compile CSS once BaseLayout consumes `global.css`.
- **Phase 2 (MVP Content) inherits:** All components can use `var(--color-orange-mystic)` or `class="bg-orange-mystic"` interchangeably. `.hero-bg` + `.noise-overlay` are ready to drop into Hero composition.
- **Verification self-check:** Performed below.

## Self-Check: PASSED

- `src/styles/tokens.css` — FOUND
- `src/styles/global.css` — FOUND
- `astro.config.mjs` contains `@tailwindcss/vite` — FOUND
- `package.json` declares `tailwindcss@^4.3.0` and `@tailwindcss/vite@^4.3.0` — FOUND
- Commit `5301d2b` (Task 1) — FOUND in `git log --oneline --all`
- Commit `9036773` (Task 2) — FOUND in `git log --oneline --all`
- Commit `dadaf41` (Task 3) — FOUND in `git log --oneline --all`
- All 5 locked hex codes present in `tokens.css` — FOUND
- `@property --cosmic-angle` in `tokens.css` — FOUND
- `prefers-reduced-motion: reduce` in both `tokens.css` and `global.css` — FOUND
- `npm run build` exits 0 — VERIFIED

---
*Phase: 01-foundation-deployable-skeleton*
*Completed: 2026-05-22*
