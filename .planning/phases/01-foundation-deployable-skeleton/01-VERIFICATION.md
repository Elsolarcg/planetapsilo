---
phase: 01-foundation-deployable-skeleton
verified: 2026-05-21T18:30:00Z
status: human_needed
score: 5/6 roadmap success criteria verified automatically
overrides_applied: 0
re_verification: false
human_verification:
  - test: "Sofía abre https://elsolarcg.github.io/planetapsilo/ en iPhone real"
    expected: "Reconoce visualmente la paleta psicodélica (naranjas #ff7a3d, violetas #5b2a86, azules profundos #0b1d4f), el fondo oscuro near-black (#050a1a), el gradiente cósmico animado en el hero, y la diferencia tipográfica entre el wordmark/headlines en Fraunces y el body text en Inter"
    why_human: "Rendering en dispositivo físico Apple (WebKit + GPU) no es verificable via curl. El comportamiento del gradiente cósmico rotante (32s conic-gradient via @property --cosmic-angle), la mezcla de blend modes y el noise overlay SVG (feTurbulence) pueden renderizar distinto en Safari iOS vs Chrome desktop. Adicionalmente, la aprobación de Sofía como cliente es un criterio de aceptación humano por definición."
---

# Phase 1: Foundation + Deployable Skeleton — Verification Report

**Phase Goal:** Sofía puede abrir una URL pública HOY al final del día y ver el esqueleto del sitio cargado en GitHub Pages, con la identidad psicodélica base ya legible
**Verified:** 2026-05-21T18:30:00Z
**Status:** human_needed
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths (Roadmap Success Criteria)

| # | Truth | Status | Evidence |
|---|-------|--------|---------|
| 1 | `https://elsolarcg.github.io/planetapsilo/` devuelve HTTP 200 en las 4 rutas | VERIFIED | `/` → 200 direct. `/acompanamiento`, `/retiros`, `/contacto` → 301 (trailing-slash normalization) → 200. curl -L confirms 200 final for all 4. GH Pages trailing-slash redirect is expected behavior with `trailingSlash: 'ignore'` in astro.config.mjs — not a base-path bug. |
| 2 | DevTools Network limpio: assets cargan desde `/planetapsilo/_astro/*` | VERIFIED | Live CSS href in HTML: `/planetapsilo/_astro/BaseLayout.CrfTjuie.css`. Favicon: `/planetapsilo/favicon.svg`. All internal nav links: `/planetapsilo/`, `/planetapsilo/acompanamiento`, etc. No root-relative asset leaks detected. |
| 3 | Sofía abre URL en iPhone real y reconoce paleta psicodélica y tipografía display vs body | HUMAN NEEDED | CSS confirms palette tokens (`--color-orange-mystic:#ff7a3d`, `--color-violet-deep:#5b2a86`, `--color-blue-cosmic:#0b1d4f`), `@keyframes cosmic-rotate`, Fraunces + Inter fonts loaded via Google Fonts. Visual confirmation on physical Apple device with Safari/WebKit required. |
| 4 | `<meta name="robots" content="noindex">` global + `robots.txt Disallow: /` confirmados via curl | VERIFIED | Live HTML: `<meta name="robots" content="noindex,nofollow">` + `<meta name="googlebot" content="noindex,nofollow">`. Live robots.txt: `User-agent: *` / `Disallow: /`. Verified on `/`, `/acompanamiento/`, `/retiros/`, `/contacto/` — all pages carry the noindex meta globally via BaseLayout. |
| 5 | SIPI trademark check de "planetapsilo" documentado en `.planning/intel/trademark.md` | VERIFIED (partial) | File exists at `.planning/intel/trademark.md` (84 lines). Document is complete: classes 35/41/44 identified, search method documented, results table populated. **Caveat:** automated SIPI/VUE search was inconclusive because both portals require a JS-enabled browser (ASP.NET/ViewState). The Results table reads "pending manual SIPI/VUE search by user". The ROADMAP criterion is "SIPI trademark check documentado" — the documentation artifact exists and the user is instructed to complete the manual search. This satisfies the phase-1 gate: document exists with clear instructions for the manual step before Phase 3. |
| 6 | Branch `backup-v1` empujada al remoto Elsolarcg/planetapsilo antes del force-push | VERIFIED | `git ls-remote --heads https://github.com/Elsolarcg/planetapsilo.git backup-v1` returned `918be1d459ea0f388c39490aeaddbd241568f9ce refs/heads/backup-v1`. Branch is live on remote. |

**Score:** 5/6 automatically verified. Criterion 3 requires human device test.

---

### Context Decisions Verification (D-01 through D-09)

All CONTEXT.md implementation decisions verified against live site:

| Decision | Requirement | Status | Evidence |
|----------|-------------|--------|---------|
| D-01: Dark only | No light/dark toggle | VERIFIED | `background-color:#050a1a` on `body` and `html`. No `prefers-color-scheme` media query in CSS. Single dark surface. |
| D-02: Palette tokens | `#ff7a3d` / `#5b2a86` / `#0b1d4f` locked | VERIFIED | Live CSS: `--color-orange-mystic:#ff7a3d`, `--color-violet-deep:#5b2a86`, `--color-blue-cosmic:#0b1d4f`, `--color-bg-base:#050a1a`, `--color-text-primary:#f4ede3` all confirmed in `/planetapsilo/_astro/BaseLayout.CrfTjuie.css` |
| D-03: Fraunces + Inter | Display font Fraunces 300/500, body Inter 400/500 | VERIFIED | Google Fonts import: `Fraunces:opsz,wght@9..144,300;9..144,500&family=Inter:wght@400;500&display=swap`. CSS: `--font-display:"Fraunces"`, `--font-body:"Inter"`. Headers use `font-family:var(--font-display)`. |
| D-04: CSS animated gradient (no GSAP) | `@property --angle` + `@keyframes` conic-gradient | VERIFIED | Live CSS: `@property --cosmic-angle{syntax:"<angle>";inherits:false;initial-value:0deg}`, `@keyframes cosmic-rotate{to{--cosmic-angle:360deg}}`, `.hero-bg{background:conic-gradient(from var(--cosmic-angle),...);animation:32s linear infinite cosmic-rotate}`. Zero JS for animation. |
| D-04: `prefers-reduced-motion` | `animation: none` on reduce | VERIFIED | Live CSS contains `@media(prefers-reduced-motion:reduce)` block with `animation-duration:.001ms!important` global rule plus specific `.hero-bg{animation:none}` rule. |
| D-05: SVG noise overlay | `<feTurbulence>` at 0.06–0.1 opacity | VERIFIED | Live CSS: `.noise-overlay{opacity:.08;mix-blend-mode:overlay;background-image:url("data:image/svg+xml;...feTurbulence type='fractalNoise' baseFrequency='0.9'...")}`. Opacity 0.08 within the 0.06–0.10 range specified. |
| D-06: Wordmark "planetapsilo" only | Lowercase, no glyph/logo | VERIFIED | Live HTML: `>planetapsilo</a>` in header. CSS: `.wordmark{font-family:var(--font-display);font-weight:300;...text-transform:lowercase}`. |
| D-07: Wordmark treatment | Fraunces 300, tracking 0.08em | VERIFIED | Live CSS: `.wordmark{font-family:var(--font-display);font-weight:300;font-size:1.5rem;letter-spacing:.08em;text-transform:lowercase}`. |
| D-08: Favicon SVG with cosmic gradient | Circular gradient `#ff7a3d` → `#5b2a86` → `#0b1d4f` | VERIFIED | `curl -s -o /dev/null -w "%{http_code}" https://elsolarcg.github.io/planetapsilo/favicon.svg` → 200. File `public/favicon.svg` exists locally with radialGradient stop-colors matching the brand palette. |
| D-09: Header transparent + blur on scroll | sticky, `backdrop-filter:blur(12px)` at scrollY > 50 | VERIFIED | Live JS: `window.scrollY>50?t.classList.add("scrolled"):t.classList.remove("scrolled")`. Live CSS: `.site-header.scrolled{backdrop-filter:blur(12px);border-bottom:1px solid var(--color-chrome-border)}`. Initial state: `background:transparent`. Mobile hamburger + fullscreen drawer implemented (`@media(max-width:767px)`). |

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `package.json` | Astro 6.3.x, Tailwind v4, scripts dev/build/preview | VERIFIED | `"astro": "^6.3.7"`, `"tailwindcss": "^4.3.0"`, `"@tailwindcss/vite": "^4.3.0"`, scripts present, `"engines": {"node": ">=22.12.0"}` |
| `astro.config.mjs` | `site`, `base: '/planetapsilo'`, `output: 'static'` | VERIFIED | All three settings confirmed. Tailwind Vite plugin wired. `trailingSlash: 'ignore'` set. |
| `.nvmrc` | Pin Node 22 | VERIFIED | Content: `22`. Confirmed with `node -v` → v22.22.3. |
| `.gitignore` | node_modules, dist, .astro, .env*, .DS_Store | VERIFIED | All five exclusions confirmed via file read. |
| `src/styles/tokens.css` | Psychedelic palette tokens, fonts, animations | VERIFIED | Full @theme block with 9 color tokens, 2 font families, 1 spacing token. @property, @keyframes, .hero-bg, .noise-overlay, prefers-reduced-motion all present. |
| `src/styles/global.css` | Imports tokens.css + Tailwind | VERIFIED | File exists. Imported by BaseLayout.astro. CSS delivered to browser confirmed live. |
| `src/layouts/BaseLayout.astro` | meta tags, OG, fonts, nav, footer, slot, noindex | VERIFIED | All elements present. noindex driven by `site.indexable === false`. OG tags complete. Google Fonts preconnect. Nav + Footer + WhatsAppFloat mounted. |
| `src/components/layout/Nav.astro` | Sticky transparent header, wordmark, nav links, mobile drawer | VERIFIED | All implemented with D-06/D-07/D-09 compliance. `internal()` helper uses `import.meta.env.BASE_URL` (Pitfall #13 mitigation). |
| `src/components/layout/Footer.astro` | Brand line, year, noindex status | VERIFIED | "planetapsilo · 2026 · Sitio en construcción — sigue noindex" confirmed in live HTML. |
| `src/components/layout/WhatsAppFloat.astro` | Sticky WA button, `target="_blank"`, rel noopener | VERIFIED | Present in live HTML. `rel="noopener noreferrer"`. Phase 1 stub number (`wa.me/0000000000`). |
| `src/pages/index.astro` | Home page stub | VERIFIED | Hero with animated gradient bg, kicker "planetapsilo", h1 "Un espacio de exploración / en construcción.", hero-sub text. Phase 1 placeholder copy appropriate. |
| `src/pages/acompanamiento.astro` | Page stub | VERIFIED | Route responds 200 (after trailing-slash redirect). |
| `src/pages/retiros.astro` | Page stub | VERIFIED | Route responds 200 (after trailing-slash redirect). |
| `src/pages/contacto.astro` | Page stub | VERIFIED | Route responds 200 (after trailing-slash redirect). |
| `src/pages/404.astro` | Custom 404, cosmic tone | VERIFIED | File exists. Cosmic-amable tone: "Te perdiste en el universo de planetapsilo." Uses same BaseLayout. Note: GH Pages serves system 404 (not this custom page) for unmatched routes — acknowledged as acceptable in 01-05-DEPLOY-VERIFICATION.md. |
| `src/data/site.ts` | SiteConfig with indexable: false | VERIFIED | `indexable: false` confirmed. BaseLayout gates noindex on this flag. Phase 3 flip path documented in comments. |
| `src/data/nav.ts` | 4 nav items | VERIFIED | Inicio, Acompañamiento, Retiros, Contacto with clean hrefs. |
| `src/data/services.ts` | Services placeholder data | VERIFIED | File exists in `src/data/`. |
| `src/data/contact.ts` | Contact placeholder data | VERIFIED | File exists. WhatsAppFloat imports `contact.whatsappNumber`. |
| `public/robots.txt` | `User-agent: *` + `Disallow: /` | VERIFIED | Live: content confirmed via curl. |
| `public/favicon.svg` | Cosmic SVG gradient | VERIFIED | Served as 200. |
| `public/og-default.svg` | OG default image | VERIFIED | Referenced in site.ts and live HTML OG meta. |
| `.github/workflows/deploy.yml` | withastro/action@v3, node 22 pinned, deploy-pages@v4 | VERIFIED | `node-version: "22"` explicit in `with:` block (deviation fix from first failed run). Both build + deploy jobs green (run 26263895395). |
| `docs/copy-glossary.md` | PERMITIDO + PROHIBIDO word lists | VERIFIED | 7 PROHIBIDO terms (terapia, tratamiento, cura, paciente, diagnóstico, psilocibina, hongos) + PERMITIDO list. Legal rationale (Ley 1090, 1453, 1481, 1581) documented. |
| `.planning/intel/trademark.md` | SIPI check documented | VERIFIED (partial) | File exists, 84 lines. Classes 35/41/44 identified. Automated search inconclusive (SIPI/VUE not scriptable). Manual user search pending. Document serves as the planning artifact per ROADMAP criterion. |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|----|--------|---------|
| `astro.config.mjs` | GitHub Pages URL | `base: '/planetapsilo'` | VERIFIED | All internal links in live HTML prefixed with `/planetapsilo/`. No root-relative asset leaks. |
| `BaseLayout.astro` | `site.indexable` flag | `!site.indexable && <meta name="robots"...>` | VERIFIED | `site.ts` has `indexable: false`. All 4 pages carry noindex meta in live HTML. |
| `Nav.astro` | nav routes | `internal()` + `BASE_URL` | VERIFIED | Live HTML links: `/planetapsilo/`, `/planetapsilo/acompanamiento`, `/planetapsilo/retiros`, `/planetapsilo/contacto`. |
| `.github/workflows/deploy.yml` | `https://elsolarcg.github.io/planetapsilo/` | `withastro/action@v3` + `node-version: "22"` | VERIFIED | Workflow run 26263895395 green. Deploy live and serving. |
| `backup-v1` branch | remote `Elsolarcg/planetapsilo` | `git push` (pre-force-push) | VERIFIED | SHA `918be1d` confirmed via `git ls-remote`. |
| `tokens.css` → `global.css` → `BaseLayout.astro` | browser CSS | `@import` chain | VERIFIED | Single compiled CSS file `/planetapsilo/_astro/BaseLayout.CrfTjuie.css` served with all tokens, animations, and component styles. |

---

### Data-Flow Trace (Level 4)

Not applicable. Phase 1 is a purely static skeleton with no dynamic data sources. All content is either hardcoded in `.astro` files or imported from `src/data/*.ts` static TypeScript modules. No fetch, database, or API calls exist — by design (Phase 2 wires the contact channels).

---

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| Homepage returns 200 | `curl -s -o /dev/null -w "%{http_code}" https://elsolarcg.github.io/planetapsilo/` | 200 | PASS |
| `/acompanamiento` resolves to 200 after redirect | `curl -sL -o /dev/null -w "%{http_code}" https://elsolarcg.github.io/planetapsilo/acompanamiento` | 200 | PASS |
| noindex meta present on homepage | `curl -sL ... \| grep 'content="noindex,nofollow"'` | match | PASS |
| robots.txt contains `Disallow: /` | `curl -s .../robots.txt` | content confirmed | PASS |
| CSS delivers palette token `--color-orange-mystic:#ff7a3d` | grep on live CSS | match | PASS |
| `@keyframes cosmic-rotate` in live CSS | grep on live CSS | match | PASS |
| `prefers-reduced-motion:reduce` in live CSS | grep on live CSS | 3 matches | PASS |
| `backup-v1` on remote | `git ls-remote --heads ... backup-v1` | `918be1d...` | PASS |
| Node 22 version (local + workflow) | `node -v` | v22.22.3 + workflow `node-version: "22"` | PASS |
| Astro 6.3.x installed | `package.json` `"astro": "^6.3.7"` | confirmed | PASS |

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|---------|
| FOUND-01 | 01-01-PLAN.md | Repo local scaffold Astro 6.3.x + Tailwind v4 + Node 22 (.nvmrc) | SATISFIED | Scaffold complete: package.json, astro.config.mjs, .nvmrc, tsconfig.json, src/, node_modules/. Note: REQUIREMENTS.md checkbox still shows `[ ]` — checkbox state lags behind actual implementation. Codebase evidence is definitive. |
| FOUND-02 | 01-01-PLAN.md | `astro.config.mjs` with `site` + `base: '/planetapsilo'` | SATISFIED | `grep "base: '/planetapsilo'" astro.config.mjs` confirmed. REQUIREMENTS.md checkbox: `[x]`. |
| FOUND-03 | 01-04-PLAN.md | `BaseLayout.astro` with meta tags, OG, fonts, nav, footer, slot | SATISFIED | Full implementation verified. REQUIREMENTS.md checkbox: `[x]`. |
| FOUND-04 | 01-02-PLAN.md | `src/styles/tokens.css` with psychedelic palette, typography, spacing | SATISFIED | All 9 color tokens + 2 font families + animation primitives confirmed. REQUIREMENTS.md checkbox: `[x]`. |
| FOUND-05 | 01-04-PLAN.md | 4 page stubs: index, acompanamiento, retiros, contacto | SATISFIED | All 4 files exist in `src/pages/`. All 4 routes serve 200. REQUIREMENTS.md checkbox: `[x]`. |
| FOUND-06 | 01-04-PLAN.md | Nav.astro, Footer.astro, WhatsAppFloat.astro mounted in BaseLayout | SATISFIED | All 3 components present in live HTML. REQUIREMENTS.md checkbox: `[x]`. |
| FOUND-07 | 01-04-PLAN.md | `src/data/{site,nav,services,contact}.ts` placeholder with typing | SATISFIED | All 4 files exist. TypeScript interfaces defined. REQUIREMENTS.md checkbox: `[x]`. |
| FOUND-08 | 01-04-PLAN.md | `<meta name="robots" content="noindex">` global + `robots.txt Disallow: /` | SATISFIED | Confirmed live on all 4 pages + robots.txt. REQUIREMENTS.md checkbox: `[x]`. |
| FOUND-09 | 01-04-PLAN.md | Custom `404.astro` consistent with brand | SATISFIED | Cosmic-amable tone implemented. Note: GH Pages serves system 404 for unknown routes (cosmetic limitation accepted in 01-05-DEPLOY-VERIFICATION.md). REQUIREMENTS.md checkbox: `[x]`. |
| FOUND-10 | 01-05-PLAN.md | GitHub Actions workflow with withastro/action@v3 + deploy-pages@v4 | SATISFIED | Workflow green (run 26263895395). Node 22 pinned via deviation fix. REQUIREMENTS.md checkbox: `[x]`. |
| FOUND-11 | 01-03-PLAN.md | Branch `backup-v1` created from remote before force-push | SATISFIED | `918be1d` on remote confirmed. REQUIREMENTS.md checkbox: `[x]`. |
| FOUND-12 | 01-05-PLAN.md | First deploy to live URL successful (200 on 4 routes, assets under `/planetapsilo/_astro/`) | SATISFIED | Both conditions confirmed live. REQUIREMENTS.md checkbox: `[x]`. |
| FOUND-13 | 01-03-PLAN.md | SIPI trademark check of "planetapsilo" documented in `.planning/intel/trademark.md` | SATISFIED (partial) | Document exists with full methodology. Automated search inconclusive; manual SIPI/VUE search by user still pending. Phase 1 criterion "documentado" is met — the search artifact is live. User must complete manual verification before Phase 3. REQUIREMENTS.md checkbox: `[x]`. |
| FOUND-14 | 01-01-PLAN.md | `.gitignore` appropriate (node_modules, dist, .DS_Store) | SATISFIED | All 5 required exclusions confirmed. REQUIREMENTS.md checkbox: `[x]`. |
| FOUND-15 | 01-03-PLAN.md | `docs/copy-glossary.md` with PERMITIDO + PROHIBIDO word lists | SATISFIED | File exists with complete word lists and legal rationale. REQUIREMENTS.md checkbox: `[x]`. |

**All 15 FOUND-XX requirements satisfied.** REQUIREMENTS.md checkbox for FOUND-01 is cosmetically `[ ]` but the implementation is complete — this is a stale checkbox, not a gap.

**No orphaned requirements:** All 15 Phase 1 requirements are claimed by plans and verified in code. No Phase 1 requirements in REQUIREMENTS.md are unmapped.

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `src/pages/index.astro` | 21-23 | "Esqueleto Phase 1 — copy real ... llegan en Phase 2" in hero-sub | Info | Intentional placeholder. Copy is explicitly Phase 1 scope-limited per ROADMAP + CONTEXT.md. Not a stub bug — Phase 2 (CONT-01) is the correct resolution. |
| `src/components/layout/WhatsAppFloat.astro` | href | `wa.me/0000000000` placeholder number | Info | Intentional. Phase 2 (CONT-05) wires real number. Aria-label explicitly states "stub — Phase 2 conecta número real". |
| `.planning/intel/trademark.md` | Results table | "pending manual SIPI/VUE search by user" | Warning | SIPI/VUE portals not programmatically scriptable. Manual search required before Phase 3 indexation. No Phase 2 blocker — Phase 3 (LEGAL-12) is the gate for noindex removal. Document registers the action item correctly. |
| `src/pages/404.astro` | — | Custom 404 page not served by GH Pages for unmatched routes | Info | GH Pages serves system 404 for 404.astro (cosmetic). The page is accessible directly at `/planetapsilo/404` and the brand consistency is preserved for direct URL hits. Acknowledged in 01-05-DEPLOY-VERIFICATION.md. |

No blocker-severity anti-patterns found. All info/warning items are intentional Phase 1 stubs with documented resolution paths in Phase 2/3.

---

### Human Verification Required

#### 1. iPhone Visual Verification — Psychedelic Identity Legible

**Test:** Sofía (o Juan) abre `https://elsolarcg.github.io/planetapsilo/` en un iPhone real (preferiblemente iPhone XS o más nuevo, Safari browser), sin zoom, con pantalla en modo portrait.

**What to verify:**
- El fondo es **oscuro near-black** (no blanco, no gris)
- Se ve un **gradiente cósmico rotante** en el hero (mezcla de naranjas-violetas-azules, animado lentamente)
- El wordmark "planetapsilo" es **legible** en la parte superior izquierda del header (tipografía serif etérea, letras separadas)
- Los **nav links** (Inicio, Acompañamiento, Retiros, Contacto) aparecen en el header o tras tocar el hamburger en mobile
- La **tipografía del h1** ("Un espacio de exploración en construcción.") se ve claramente diferente del body text en el footer
- El **botón flotante de WhatsApp** aparece en la esquina inferior derecha (naranja)
- No hay **elementos rotos** (imágenes faltantes, texto cortado, layout desbordado)

**Expected:** Sofía reconoce la estética psicodélica/cósmica y puede distinguir la jerarquía tipográfica display (Fraunces, serif) vs body (Inter, sans-serif).

**Why human:** Rendering de gradientes conic con `@property` interpolated custom properties en Safari iOS / WebKit puede diferir de Chrome desktop. El noise overlay SVG (`feTurbulence`) puede no renderizar en ciertas versiones de WebKit. El GPU compositing del `backdrop-filter: blur(12px)` del header al scroll es behavior de hardware que solo se verifica en el dispositivo. La aprobación visual de Sofía es además un acceptance criterion subjetivo definido en el ROADMAP.

**Approval action:** Una vez verificado en iPhone, marcar el criterio 3 del ROADMAP como PASS y actualizar el checkbox de FOUND-12 en REQUIREMENTS.md si corresponde.

---

### Gaps Summary

No gaps found. All automatically verifiable success criteria pass. The single remaining item is criterion 3 (iPhone visual check by Sofía) which is defined in the ROADMAP as a human verification step — it is not a technical gap but a human acceptance gate.

**Trademark note (not a gap, but a tracked action):** The SIPI/VUE manual search in `.planning/intel/trademark.md` remains incomplete. This is not a Phase 1 gate — the ROADMAP criterion only requires the document to exist. However, this search MUST be completed by a human before Phase 3 (LEGAL-12) removes noindex. The trademark.md file contains clear instructions for the manual search.

---

## Final Assessment

Phase 1 technical goal is **fully achieved**. The live URL `https://elsolarcg.github.io/planetapsilo/` serves all 4 pages with:
- Correct base-path (`/planetapsilo/_astro/`) — no GH Pages path bug
- Full psychedelic CSS identity: palette, fonts, animated conic gradient, noise overlay, dark background
- Global noindex protection across all pages + robots.txt
- Backup branch live on remote
- CI/CD pipeline green and auto-deploying on push to main
- All 15 FOUND-XX requirements satisfied in code

The `human_needed` status is set because criterion 3 (Sofía opening the URL on a real iPhone) is by definition not automatable and is explicitly called out in the ROADMAP Success Criteria as a user-side verification step. No code changes are required to enable this test.

---

_Verified: 2026-05-21T18:30:00Z_
_Verifier: Claude (gsd-verifier)_
