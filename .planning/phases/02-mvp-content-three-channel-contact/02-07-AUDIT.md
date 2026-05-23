---
phase: 02-mvp-content-three-channel-contact
plan: 07
task: 1
audit_date: 2026-05-23
status: Task 1 complete — Tasks 2 + 3 pending checkpoints
auditor: Claude (gsd-execute-plan executor)
build_commit_baseline: 9b38894 (prior to 02-07 Task 1)
---

# Phase 2 — Verification Audit Report

Audit corresponding to plan `02-07-PLAN.md`. Task 1 (automated audits) executed in full. Tasks 2 (real-device CTA verification) and Task 3 (Sofía's copy refinements) are checkpoint sections that this plan does not yet fill — they are intentionally left as placeholder headings at the bottom of this file.

---

## Build

| Check | Result |
|-------|--------|
| `rm -rf dist/` + `npm run build:check` | **OK** (exit 0) |
| `astro build` output | 7 pages built (`/`, `/acompanamiento`, `/contacto`, `/obras`, `/privacidad`, `/retiros`, `/404`) in 1.73s |
| `npm run lint:copy` (D-25 gate) | **OK** — scanned 7 HTML file(s); zero non-exempt PROHIBIDO matches |

Build is current and lint-clean.

---

## Noindex check

All 4 Phase-2 LOCKED pages + `/privacidad` carry the noindex gate per CONT-12 / Phase 1 `site.indexable: false` shell.

| File | `<meta name="robots" content="noindex,nofollow">` |
|------|---|
| `dist/index.html` | **OK** |
| `dist/acompanamiento/index.html` | **OK** |
| `dist/retiros/index.html` | **OK** |
| `dist/contacto/index.html` | **OK** |
| `dist/privacidad/index.html` | **OK** |

Phase 2 noindex gate preserved on all 5 pages. Removal is a Phase 3 LEGAL-12 task — explicitly deferred.

---

## Substance-leak check

Literal grep over `dist/` for substance names (regla glosario #3):

```bash
grep -rEi "\bpsilocibina\b|\bhongos\b|\bayahuasca\b" dist/
```

Result: **zero matches.** No substance-name leak in any built HTML file.

The lint script (which uses Unicode-aware boundaries with denial-clause exemptions for `terapia`/`tratamiento`/`diagnóstico`) already covers this in CI. The literal grep here is a redundant regression sweep — both gates green.

---

## LOCKED string regression

Spot-checks against the LOCKED strings table in `02-UI-SPEC.md` §Copywriting Contract. Every check is a `grep -q ... && OK || FAIL` against the relevant built HTML file.

### Home (`dist/index.html`)

| LOCKED string | Result |
|---------------|--------|
| Home H1 (D-03): `Acompañamiento y retiros para liderazgos que están reordenando.` | **OK** |
| Home máxima anchor (D-04): `La claridad no se conquista. Se recuerda.` | **OK** |
| Brand bio paragraph 1 (D-14): `planetapsilo es un espacio de exploración personal…` | **OK** (1 match) |
| Brand bio paragraph 2 (D-14): `Cada propuesta recibe a pocas personas…` | **OK** (1 match) |
| Footer global disclaimer (D-26): `No constituye terapia ni servicio de salud` | **OK** (2 matches — appears in footer + FAQ answer) |
| Footer noindex status (Phase 1 carry): `Sitio en construcción` | **OK** (1 match) |
| Primary CTA label: `Agenda una conversación` | **OK** (2 matches — hero + final CTABlock) |
| Home hero secondary CTA: `Explora los retiros` | **OK** (1 match) |
| Final CTABlock terciario: `Prefiero escribir un formulario` | **OK** |
| Secondary CTA: `Escribir por WhatsApp` (≥2 matches) | **OK** (2 matches — final CTABlock + WhatsAppFloat aria-label) |
| WhatsAppFloat sticky bubble (CONT-05) | **OK** (1 `wa-float` element) |

### /acompanamiento (`dist/acompanamiento/index.html`)

| LOCKED string | Result |
|---------------|--------|
| "Para quién" section heading | **OK** |
| Confidentiality one-liner (D-27): `Lo que se conversa aquí no sale de aquí` | **OK** (1 match) |
| Habeas Data (Ley 1581) — N/A on this page (no form) | n/a |

### /retiros (`dist/retiros/index.html`)

| LOCKED string | Result |
|---------------|--------|
| "Las tres fases" heading | **OK** |
| Confidentiality one-liner (D-27): `Lo que se conversa aquí no sale de aquí` | **OK** (1 match) |
| RetreatApplicationForm honeypot `name="botcheck"` (D-17) | **OK** (1 match) |
| RetreatApplicationForm Habeas Data `Ley 1581` (D-08) | **OK** (1 match) |
| **D-07 ASSERT — ZERO Calendly references on /retiros (application gate)** | **OK** (0 matches — gate enforced) |

### /contacto (`dist/contacto/index.html`)

| LOCKED string | Result |
|---------------|--------|
| Hero lead (D-15): `Tres formas de empezar. Elige la que te calce.` | **OK** |
| Channel duo (D-15) — Calendly `href` count | **OK** (2 — channel-duo button + FormSuccess `contacto` fallback) |
| Channel duo (D-15) — wa.me `href` count | **OK** (3 — channel-duo WhatsApp button + 4xx/5xx error-fallback link inside ContactForm + WhatsAppFloat sticky) |
| ContactForm honeypot `name="botcheck"` (D-17) | **OK** (1 match) |
| ContactForm Habeas Data `Ley 1581` (D-16) | **OK** (1 match) |

### /privacidad (`dist/privacidad/index.html`)

| LOCKED string | Result |
|---------------|--------|
| `próximamente` stub copy (D-26) | **OK** (2 matches — title + body) |

### Per-page meta (CONT-12)

| Page | `<title>` rendered | Expected (UI-SPEC) | Match |
|------|---------------------|---------------------|-------|
| `/` | `planetapsilo` | `planetapsilo` | **OK** |
| `/acompanamiento` | `Acompañamiento — planetapsilo` | `Acompañamiento — planetapsilo` | **OK** |
| `/retiros` | `Retiros — planetapsilo` | `Retiros — planetapsilo` | **OK** |
| `/contacto` | `Contacto — planetapsilo` | `Contacto — planetapsilo` | **OK** |
| `/privacidad` | `Privacidad — planetapsilo` | `Privacidad — planetapsilo` | **OK** |

Zero regressions across Plans 02–05 LOCKED strings.

---

## Reduced-motion coverage

CONT-13 / D-24 require every animated / transitioned surface to honor `prefers-reduced-motion: reduce`. Defense-in-depth is wired in BOTH:

- `src/styles/tokens.css:67` — global gate (`@property --cosmic-angle` + `cosmic-rotate` killed on reduce)
- `src/styles/global.css:55` — global gate (smooth-scroll + chrome transitions killed on reduce)

### Source-grep matrix

**Components that declare `transition:` or `animation:` (10 components):**

1. `src/components/ui/Button.astro`
2. `src/components/forms/RetreatApplicationForm.astro`
3. `src/components/layout/Nav.astro`
4. `src/components/layout/WhatsAppFloat.astro`
5. `src/components/forms/FormField.astro`
6. `src/components/forms/ContactForm.astro`
7. `src/components/sections/FAQ.astro`
8. `src/components/forms/FormSuccess.astro`
9. `src/components/layout/Footer.astro`
10. `src/components/forms/HabeasDataCheckbox.astro`

**Components that declare a scoped `prefers-reduced-motion: reduce` override (9 components):**

1. `src/components/ui/Button.astro`
2. `src/components/layout/WhatsAppFloat.astro`
3. `src/components/forms/FormSuccess.astro`
4. `src/components/forms/FormField.astro`
5. `src/components/sections/FAQ.astro`
6. `src/components/forms/ContactForm.astro`
7. `src/components/forms/RetreatApplicationForm.astro`
8. `src/components/layout/Footer.astro`
9. `src/components/forms/HabeasDataCheckbox.astro`

**Delta — components with animation/transition but NO scoped override:** 1

- `src/components/layout/Nav.astro` — Phase 1 component. Inspection: its `transition` declarations cover `background-color`, `backdrop-filter`, and `border-color` on `#site-header.scrolled` (≤200ms each), and these are explicitly covered by the **global** override at `global.css:55` which sets `* { transition-duration: 0.001ms !important }` on `prefers-reduced-motion: reduce`. **No scoped override needed for Nav** — global rule applies. Phase 1 design choice, intentional. Not a regression.

**Verifier conclusion:** every component with motion is gated EITHER by a scoped override OR by the global rule in `global.css:55`. CONT-13 source-coverage **PASS**.

Runtime DevTools emulation verification of the 4 specific checks listed in UI-SPEC §Motion lines 513–517 (frozen `.hero-bg`, no button-hover scale, snap FAQ chevron, static form-spinner dot) is part of **Task 2 (Real-device verification)** — the developer runs DevTools emulation alongside the device tests.

---

## Placeholder TODOs

Plan 01 left explicit TODO placeholders in `src/data/contact.ts` for 6 real values that Sofía/Juan must inject before public deploy. Current state (line-numbered against `src/data/contact.ts`):

| # | Field | Line | Current value | Status | Resolution gate |
|---|-------|------|---------------|--------|------------------|
| 1 | `whatsappNumber` | 21 | `'57XXXXXXXXXX'` | **PLACEHOLDER** | Sofía provides real number → Phase 2 deploy gate (or Phase 4 VAL-05 if WhatsApp Business migration first) |
| 2 | `calendlyUrl` | 24 | `'https://calendly.com/planetapsilo/conversacion-inicial'` | **PLACEHOLDER** (the URL pattern works, but the account/event-type does not exist yet) | Sofía provides real event URL → Phase 3 LEGAL-09 |
| 3 | `web3formsKeyContacto` | 26 | `'YOUR_CONTACTO_ACCESS_KEY'` | **PLACEHOLDER** | Juan creates Web3Forms project for general contact + injects key → Phase 2 deploy gate (forms will hard-fail at the Web3Forms endpoint until swapped) |
| 4 | `web3formsKeyRetiros` | 27 | `'YOUR_RETIROS_ACCESS_KEY'` | **PLACEHOLDER** | Juan creates Web3Forms project for retiros + injects key → Phase 2 deploy gate (same as #3) |
| 5 | `instagramUrl` | 29 | `'https://instagram.com/planetapsilo'` | **PLACEHOLDER-DEFAULT** (URL pattern works; handle may or may not be claimed yet) | Sofía confirms handle → Phase 2 deploy gate |
| 6 | `tiktokUrl` | 30 | `'https://tiktok.com/@planetapsilo'` | **PLACEHOLDER-DEFAULT** (same — handle may or may not be claimed yet) | Sofía confirms handle → Phase 2 deploy gate |

**Reading note on TODO comment count:** the raw `grep -nE "TODO:" src/data/contact.ts` returns **4 comment lines** because TODOs #3 + #4 share one comment ("replace `YOUR_*_ACCESS_KEY`") and TODOs #5 + #6 share another ("replace with Sofía's real IG and TikTok handles"). The 6-TODO count comes from counting the actual placeholder VALUES, which the comments group into 4 prose lines for readability.

**Deploy-blocking subset:**
- #1 `whatsappNumber` — blocks every WhatsApp deeplink (channel duo on /contacto, WhatsAppFloat global, CTABlock secundario on home + acompanamiento)
- #3 `web3formsKeyContacto` — blocks ContactForm submissions
- #4 `web3formsKeyRetiros` — blocks RetreatApplicationForm submissions

**Soft-deferrable subset (placeholder is functional but inaccurate):**
- #2 `calendlyUrl` — primary CTA button is currently a working `<a href>` to a non-existent event page; clicks will land on Calendly's 404. Phase 3 LEGAL-09 owns the real wire-up. Could be deployed as-is for Sofía's preview, but must be swapped before public indexation.
- #5, #6 — footer links go to non-existent or unclaimed handles. Cosmetic for now.

The plan asks "explicit listing whether resolved or still placeholder" — confirmed: **all 6 are still PLACEHOLDER** at the time of this audit. Task 2 (real-device CTA verification) cannot validate form submissions or Calendly bookings until at least #1/#3/#4 are swapped. This is called out explicitly in the Task 2 `what-built` block of `02-07-PLAN.md` ("The Web3Forms access keys MAY still be placeholder `YOUR_*_ACCESS_KEY` at this point. The developer must decide whether to swap-in real keys before this checkpoint OR after the manual verification…").

---

## Exempt-pattern sync

CONT-14 false-positive guard: the lint script's `EXEMPT_PATTERNS` array must have a matching prose row in `docs/copy-glossary.md §Exemptions`. Drift between the two files is a Phase 2 close-out gate.

### `scripts/copy-lint.mjs` EXEMPT_PATTERNS (4 regex)

```js
const EXEMPT_PATTERNS = [
  /no\s+(es|constituye)\s+terapia/i,
  /sin\s+(terapia|tratamiento|diagnóstico)/i,
  /tratamiento\s+de\s+(datos|mis\s+datos)\s+personales/i,
  /tratamiento\s+de\s+datos/i,
];
```

### `docs/copy-glossary.md §Exemptions` table (7 rows)

| Glossary row | Maps to lint regex | In-sync |
|--------------|--------------------|---------|
| `No constituye terapia ni servicio de salud` | `/no\s+(es\|constituye)\s+terapia/i` | **OK** |
| `No es terapia ni servicio de salud` | `/no\s+(es\|constituye)\s+terapia/i` | **OK** |
| `no es terapia` / `No es terapia` | `/no\s+(es\|constituye)\s+terapia/i` | **OK** |
| `sin terapia` / `sin tratamiento` / `sin diagnóstico` | `/sin\s+(terapia\|tratamiento\|diagnóstico)/i` | **OK** |
| `tratamiento de datos personales` | `/tratamiento\s+de\s+(datos\|mis\s+datos)\s+personales/i` + `/tratamiento\s+de\s+datos/i` | **OK** |
| `tratamiento de mis datos personales` | `/tratamiento\s+de\s+(datos\|mis\s+datos)\s+personales/i` | **OK** |
| `no constituye terapia` | `/no\s+(es\|constituye)\s+terapia/i` | **OK** |

**Sync verdict:** every regex in `EXEMPT_PATTERNS` has at least one matching glossary row, and every glossary row maps onto at least one regex. The two files are in lockstep. No drift detected.

The mapping ratio is 7 glossary rows → 4 regex (the regex are factored — one alternation pattern covers multiple prose phrasings). This is the intended structure documented in `docs/copy-glossary.md` line 73 ("Both the human-reviewable table above and the executable `EXEMPT_PATTERNS` array in the lint script MUST stay in sync").

---

## Lighthouse mobile

**Status: MANUAL — automated Lighthouse not runnable in this audit environment.**

`lighthouse` / `lighthouse-ci` are not installed in the sandbox, and Chromium / google-chrome are not present in `PATH`. Attempting `npx lighthouse@13.3.0` was blocked by the sandbox's missing-package install policy. The plan explicitly contemplates this fallback path: *"If automated Lighthouse is not available, the SUMMARY notes 'Lighthouse manual — developer runs locally'"*.

### Manual run instructions for the developer

Run from project root:

```bash
npm run build
npm run preview
# In another shell:
# 1. Open Chrome / Edge.
# 2. Navigate to http://localhost:4321/planetapsilo/
# 3. DevTools → Lighthouse panel → Mode: Navigation, Device: Mobile,
#    Categories: Performance + Accessibility + SEO, Throttling: simulated 4G (Lighthouse default mobile).
# 4. Click "Analyze page load".
# 5. Record the three scores.
# 6. Repeat for /planetapsilo/acompanamiento/, /planetapsilo/retiros/, /planetapsilo/contacto/.
```

### Target gates (CONT-15 / D-23)

| Metric | Threshold | Profile |
|--------|-----------|---------|
| Performance | ≥ 80 | Mobile (Moto G Power 4G) |
| Accessibility | ≥ 95 | Mobile |
| SEO | ≥ 90 | Mobile (note: SEO score may flag noindex — this is EXPECTED and not a real failure; the audit's "Crawlable links" / "Page is blocked from indexing" warning is the noindex gate working as designed. Manually verify the only deduction is the noindex one; everything else should be green.) |

### Pre-recorded scores

| Page | Performance | Accessibility | SEO | Run date | Notes |
|------|-------------|---------------|-----|----------|-------|
| `/` | _pending_ | _pending_ | _pending_ | _pending_ | Run locally; if SEO < 90 verify the deduction is exclusively the noindex flag |
| `/acompanamiento` | _pending_ | _pending_ | _pending_ | _pending_ | |
| `/retiros` | _pending_ | _pending_ | _pending_ | _pending_ | |
| `/contacto` | _pending_ | _pending_ | _pending_ | _pending_ | ContactForm requires keyboard nav check (a11y) |

**Confidence on the gates being met without running:** HIGH for Accessibility (palette contrast pre-verified in `02-UI-SPEC.md §Color`: cream-on-bg = 17.4:1 AAA; orange-on-bg button = 6.1:1 AA), MEDIUM-HIGH for Performance (zero JS framework, zero icon font, inline SVG, zero third-party runtime besides Web3Forms HTTP POST which doesn't load before user submit), MEDIUM for SEO (noindex gate will deduct points — manually confirm the deduction is exclusively that flag).

---

## Real-device verification (Task 2)

**Status: PENDING — checkpoint awaiting developer action.**

This section is intentionally a placeholder. Task 2 is a `checkpoint:human-verify gate="blocking"` step that requires the developer (and ideally Sofía) to physically test all CTAs on at least one iPhone and one Android device. The verification protocol is documented in detail in `02-07-PLAN.md` Task 2 `<how-to-verify>` and reproduced below for in-place capture.

### Verification protocol (executor-recommended order)

**iPhone Safari (or Chrome iOS):**

1. Open `https://elsolarcg.github.io/planetapsilo/` (or local `npm run preview` if deploy held). Confirm hero H1 + máxima visible above fold on iPhone 14 / Pro Max / SE viewports.
2. Tap WhatsAppFloat sticky bubble (bottom-right orange). Confirm WhatsApp app opens (if installed) or wa.me web fallback opens. Confirm prefill text reads `Hola planetapsilo, me interesa explorar`.
3. Tap `Agenda una conversación` primary CTA in home CTABlock. Confirm Calendly event page opens in new tab.
4. Tap `Prefiero escribir un formulario` tertiary. Confirm scroll lands on `/contacto#form` form section.
5. Open `/acompanamiento`. Tap WhatsApp CTA in final CTABlock. Confirm prefill reads `Hola planetapsilo, me interesa explorar el acompañamiento`.
6. Open `/retiros`. Confirm NO Calendly button anywhere on the page. Scroll to `#aplicacion`. Tap into form fields — confirm keyboard does not zoom (font-size 17px should prevent iOS zoom-on-focus).
7. Open `/contacto`. Fill ContactForm with test data (Nombre, Email, select Acompañamiento, message). Check Habeas Data box. Tap Enviar. Confirm spinner appears briefly, then success block `Mensaje recibido.` replaces the form.
8. Confirm Sofía's Web3Forms inbox receives the test submission (subject `Consulta general planetapsilo`). **If keys are still placeholder, skip step 8 and re-run AFTER swapping in real keys.**

**Android Chrome:**

1. Repeat steps 1–7 on an Android device.
2. Pay particular attention to the WhatsApp deeplink — Android handles wa.me differently (may prompt for app selection between WhatsApp + WhatsApp Business). Note any UX difference for Phase 4 polish notes.
3. Confirm tap targets feel right (min 44×44px per WCAG — Button padding 12×28 gives ~48px).

### Result capture template

For each CTA tested, append a row below:

| CTA | Device | Result (pass / fail / placeholder-blocked) | Notes |
|-----|--------|--------------------------------------------|-------|
| WhatsAppFloat sticky bubble | _e.g. iPhone 14, iOS 17.x_ | _pending_ | |
| Home primary `Agenda una conversación` | _pending_ | _pending_ | Will land on Calendly 404 until #2 TODO resolved |
| Home tertiary `Prefiero escribir un formulario` | _pending_ | _pending_ | |
| /acompanamiento WhatsApp CTA | _pending_ | _pending_ | |
| /retiros — confirm NO Calendly | _pending_ | _pending_ | source-grep already confirms; real-device confirms render |
| /retiros — application form keyboard (no iOS zoom) | _pending_ | _pending_ | |
| /contacto — channel duo Calendly | _pending_ | _pending_ | |
| /contacto — channel duo WhatsApp | _pending_ | _pending_ | |
| /contacto — ContactForm end-to-end submit | _pending_ | _pending_ | **placeholder-blocked until web3formsKeyContacto swapped** |
| Web3Forms inbox receipt | _pending_ | _pending_ | **placeholder-blocked until keys swapped** |

### Reduced-motion DevTools emulation (CONT-13 runtime check)

In parallel with the device tests, on a desktop browser:

| Check | Expected behavior under `prefers-reduced-motion: reduce` | Result |
|-------|-----------------------------------------------------------|--------|
| `.hero-bg` rotation | visually frozen (no `--cosmic-angle` change over 5s) | _pending_ |
| Primary CTA hover | no `scale(1.02)` transform | _pending_ |
| FAQ accordion summary click | chevron rotates instantly (no 200ms transition) | _pending_ |
| Form submit spinner | renders as static dot, not rotating | _pending_ |

---

## Sofía's copy refinements (Task 3)

**Status: PENDING — checkpoint awaiting Sofía's review.**

This section is intentionally a placeholder. Task 3 is a `checkpoint:human-verify gate="blocking"` step that requires walking Sofía through all 4 LOCKED pages and capturing any copy refinement proposals she wants applied before Phase 2 close. The walkthrough protocol is documented in detail in `02-07-PLAN.md` Task 3 `<how-to-verify>`.

### Capture template

**Per-page voice check:**

| Page | Sofía's voice verdict | Specific copy concerns |
|------|------------------------|-------------------------|
| `/` | _pending_ | máxima D-04 anchor confirmation; testimonial home version; brand-bio paragraph 3 (optional) |
| `/acompanamiento` | _pending_ | "para quién" framing; "qué pasa en un encuentro" bullets; testimonial ongoing |
| `/retiros` | _pending_ | 3-fases body (preparación/inmersión/integración) — NEVER substance per regla #3; suitability "sí / no" split; testimonial completed-3-fases |
| `/contacto` | _pending_ | channel duo SLA microcopy; ContactForm topic-select labels |

**Specific decisions Sofía owns (currently anchor-only):**

- D-04 máxima anchor `La claridad no se conquista. Se recuerda.` — confirm OR propose refinement (must pass glossary check before commit)
- 3 testimonial v1 placeholders authored by Claude — Sofía rewrites within glossary PERMITIDO
- 6 FAQ v1 answers authored by Claude — Sofía refines
- Brand bio paragraph 3 (optional) — Sofía drafts wording or skips

**Failure mode flag:** if Sofía proposes a structural change (new section, removed section, new page), DO NOT silently expand this checkpoint — flag as a sub-plan (e.g., `02-07.1-PLAN.md`).

### Applied refinements log

Once Sofía's proposals are in, log here per-change:

| Date | File | Diff (before → after) | Glossary check | Lint result |
|------|------|------------------------|----------------|-------------|
| _pending_ | _pending_ | _pending_ | _pending_ | _pending_ |

---

## Task 1 — Audit summary

| Audit step | Result |
|------------|--------|
| 1. Clean rebuild + lint chain | **PASS** |
| 2. noindex verification (5 pages) | **PASS** (5/5) |
| 3. PROHIBIDO substance leak | **PASS** (0 matches) |
| 4. LOCKED string regression (Plans 02–05) | **PASS** (all spot-checks green) |
| 5. Reduced-motion source-grep | **PASS** (9 scoped overrides + 1 globally-covered Nav.astro) |
| 6. TODO placeholder audit | **PASS — RECORDED** (6 placeholders, all PLACEHOLDER, deploy-blocking subset = 3) |
| 7. Exempt-pattern sync (lint ↔ glossary) | **PASS** (0 drift) |
| 8. Lighthouse mobile | **MANUAL — pending developer run** (sandbox lacks Chromium / lighthouse) |

**Task 1 verdict:** all automated assertions green. Task 2 (real-device) + Task 3 (Sofía approval) are the remaining gates before Phase 2 close.

**Phase 2 close-out unresolved gates:**

1. Real WhatsApp number (TODO #1) — REQUIRED before any meaningful real-device test
2. Real Web3Forms keys (TODOs #3, #4) — REQUIRED before form-submit step of Task 2
3. Real Calendly event URL (TODO #2) — soft-deferrable to Phase 3 LEGAL-09 if Sofía's preview is the only audience
4. Real IG / TikTok handles (TODOs #5, #6) — cosmetic; can ship as-is for Sofía's preview
5. Real-device CTA matrix populated (Task 2)
6. Sofía sign-off (Task 3)
7. Lighthouse mobile scores recorded for all 4 pages (Task 2 side-channel — developer runs locally)
