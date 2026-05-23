---
phase: 02-mvp-content-three-channel-contact
plan: 01
subsystem: ui
tags: [astro, tailwind-v4, web3forms, calendly, whatsapp, contact-data, button-primitive, footer, privacy-stub]

# Dependency graph
requires:
  - phase: 01-foundation-deployable-skeleton
    provides: "tokens.css palette + fonts + reduced-motion gate; BaseLayout with title/description/ogImage props; Nav.astro internal() BASE_URL helper; WhatsAppFloat Phase 1 stub; Footer Phase 1 stub; site.ts indexable flag"
provides:
  - "contact.ts extended with web3formsKeyContacto + web3formsKeyRetiros + instagramUrl + tiktokUrl + waLink(prefill) helper (D-10, D-19)"
  - "Button.astro primitive — 3 LOCKED variants (primary/secondary/tertiary) — drop-in for Plans 02-05"
  - "Footer.astro expanded with social row + LOCKED disclaimer + /privacidad link (CONT-10, CONT-11, D-26)"
  - "WhatsAppFloat.astro rewired with waLink() + final aria-label (CONT-05)"
  - "/privacidad próximamente stub page (returns 200, inherits noindex from BaseLayout)"
affects:
  - 02-02 (home page) — consumes Button, contact.calendlyUrl, waLink, services
  - 02-03 (acompanamiento) — consumes Button, waLink, ConfidentialityLine
  - 02-04 (retiros + RetreatApplicationForm) — consumes contact.web3formsKeyRetiros
  - 02-05 (contacto + ContactForm) — consumes contact.web3formsKeyContacto, calendlyUrl, waLink
  - 02-06 (copy-linter) — must encode denial-clause exemption for Footer disclaimer + /privacidad body
  - 03 (legal-pass) — LEGAL-02 replaces /privacidad body, LEGAL-09 replaces Calendly placeholder

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "waLink(prefill) centralized URL-encoding helper (T-02-01 mitigation)"
    - "Button primitive with class:list variant binding + boolean external flag for target/rel"
    - "Footer composition: social-row + disclaimer + brand-line columns, all centered, flex-column gap 24px"
    - "Privacidad stub reuses 404 single-section shell at interior opacity (0.5) + 60vh min-height"
    - "Phase 2 components consume tokens only (zero new color/font/spacing tokens introduced)"

key-files:
  created:
    - "src/components/ui/Button.astro — CTA primitive (3 variants)"
    - "src/pages/privacidad.astro — Próximamente stub"
  modified:
    - "src/data/contact.ts — extended ContactConfig + waLink helper"
    - "src/components/layout/Footer.astro — social row + disclaimer + privacidad link"
    - "src/components/layout/WhatsAppFloat.astro — waLink() consumer + final aria-label"

key-decisions:
  - "Phase 2 introduces zero new design tokens — components consume Phase 1 tokens.css palette + font stack + --space-section + reduced-motion gate as-is"
  - "waLink() helper centralizes encodeURIComponent so accents/commas/punctuation always survive (T-02-01 mitigation pattern)"
  - "Web3Forms access keys are PUBLIC by design — keys baked into client HTML is the intended endpoint pattern (T-02-02 accepted); rate-limited at endpoint"
  - "Button secondary variant uses identical padding to primary (12px 28px) + box-sizing: border-box for matched outer dimensions — no -1px optical trick"
  - "Footer wordmark dropped from 24px (Phase 1) to 18px Fraunces 500 (UI-SPEC typography cap revision); weight + tracking carry identity"
  - "/privacidad stub copy explicitly references Ley 1581 de 2012 (Habeas Data) and 'tratamiento de datos personales' — data-context phrase the Plan 06 copy linter must exempt"
  - "All external CTAs (IG, TikTok, WhatsApp x2, Calendly) carry target=_blank + rel=noopener noreferrer (T-02-03 mitigation, Pitfall #15 carry)"
  - "Hover transitions use 200ms ease consistently; every transition is gated by prefers-reduced-motion: reduce per CONT-13"

patterns-established:
  - "CTA primitive: variant prop discriminator + class:list binding + external boolean → target/rel pair"
  - "WhatsApp deeplink construction: waLink(prefill) helper instead of manual ${number}?text=${prefill} string concat"
  - "Stub page composition: BaseLayout + section.<page>-stub + .hero-bg .noise-overlay aria-hidden=true + .container .stub-content text-align center"
  - "Footer expansion lattice: <social-row>, <disclaimer paragraph>, <brand-line with separators + noindex chip> — three centered rows separated by gap: 24px"

requirements-completed:
  - CONT-05
  - CONT-06
  - CONT-10
  - CONT-11

# Metrics
duration: 3m 52s
completed: 2026-05-23
---

# Phase 2 Plan 01: Foundation Setup Summary

**Real contact data + waLink helper + Button primitive (3 variants) + expanded Footer with social row & disclaimer + rewired WhatsAppFloat + /privacidad próximamente stub — six files that downstream Plans 02-05 inherit as a finished foundation.**

## Performance

- **Duration:** 3m 52s
- **Started:** 2026-05-23T01:11:27Z
- **Completed:** 2026-05-23T01:15:19Z
- **Tasks:** 5
- **Files modified:** 5 (2 created, 3 modified)

## Accomplishments

- `contact.ts` extended from 17-line stub to a typed `ContactConfig` carrying Web3Forms keys (2x), Instagram + TikTok URLs, Calendly placeholder, and a `waLink(prefill)` helper that URL-encodes via `encodeURIComponent` (T-02-01 mitigation)
- `Button.astro` primitive created at `src/components/ui/Button.astro` with three LOCKED variants matching UI-SPEC §"Button variants" exactly: primary (orange fill, pill 999px, padding 12px 28px, hover scale(1.02)), secondary (transparent + 1px cream border, identical outer dims via border-box), tertiary (text link, underline-offset 4px, muted → orange hover) — drop-in ready for Plans 02-05
- `Footer.astro` expanded from 56-line brand-line stub to a centered three-row layout: social row (IG + TikTok with target=_blank + rel=noopener noreferrer + Spanish aria-labels) → LOCKED disclaimer paragraph ("No constituye terapia ni servicio de salud…") → brand line (wordmark + year + privacidad link + conditional noindex chip preserved)
- `WhatsAppFloat.astro` rewired to consume `waLink('Hola planetapsilo, me interesa explorar')` instead of manual string concat, and aria-label changed from Phase 1 stub ("Abrir WhatsApp (stub — Phase 2 conecta número real)") to final "Escribir por WhatsApp" per UI-SPEC §Secondary CTA; style block left untouched (Phase 1 lock preserved)
- `/privacidad` stub page renders with H1 "Política de privacidad — próximamente.", body referencing Ley 1581 de 2012, two tertiary CTAs (WhatsApp via waLink + home link via BASE_URL helper), and inherits BaseLayout's noindex meta — built output at `dist/privacidad/index.html` confirmed

## Task Commits

Each task was committed atomically:

1. **Task 1: Extend contact.ts** — `b31b82f` (feat) — ContactConfig + waLink helper, 4 TODOs flagged
2. **Task 2: Create Button.astro primitive** — `f1ef043` (feat) — 3 variants, reduced-motion override, external prop
3. **Task 3: Expand Footer** — `ba292bc` (feat) — social row + LOCKED disclaimer + privacidad link + wordmark revision
4. **Task 4: Rewire WhatsAppFloat** — `bb8932d` (fix) — waLink() consumer + final aria-label, style block untouched
5. **Task 5: /privacidad stub** — `37d2854` (feat) — Próximamente body + Ley 1581 reference + two tertiary CTAs

**Plan metadata commit:** pending (will include this SUMMARY.md, STATE.md, ROADMAP.md, REQUIREMENTS.md)

## Files Created/Modified

### Created
- `src/components/ui/Button.astro` (98 lines) — 3-variant CTA primitive (primary/secondary/tertiary) with focus-visible ring, hover transforms, and reduced-motion override
- `src/pages/privacidad.astro` (102 lines) — Single-section stub over hero gradient, BaseLayout-wrapped, 200 OK build output

### Modified
- `src/data/contact.ts` (27 → 38 lines) — ContactConfig interface gained 4 fields (web3formsKeyContacto, web3formsKeyRetiros, instagramUrl, tiktokUrl); `waLink(prefill)` exported; 4 TODO markers added for Sofía-supplied values
- `src/components/layout/Footer.astro` (56 → 149 lines) — Social row + LOCKED disclaimer + privacy link added; wordmark dropped to 18px Fraunces 500
- `src/components/layout/WhatsAppFloat.astro` (44 → 45 lines) — Frontmatter swapped to `import { waLink }` + helper call; aria-label finalized; style block byte-identical to Phase 1

## Pending User-Supplied Values (4 TODOs)

The following placeholders remain in `src/data/contact.ts` flagged with `// TODO:` comments. Sofía/Juan replace before deploy:

| Field | Current value | Required from |
|-------|---------------|---------------|
| `contact.whatsappNumber` | `'57XXXXXXXXXX'` | Sofía — Colombian WhatsApp number format `57XXXXXXXXXX` (no `+`, no spaces) |
| `contact.calendlyUrl` | `'https://calendly.com/planetapsilo/conversacion-inicial'` | Sofía — real Calendly event-type link (Phase 3 LEGAL-09) |
| `contact.web3formsKeyContacto` | `'YOUR_CONTACTO_ACCESS_KEY'` | Sofía/Juan — generate at web3forms.com |
| `contact.web3formsKeyRetiros` | `'YOUR_RETIROS_ACCESS_KEY'` | Sofía/Juan — generate at web3forms.com |
| `contact.instagramUrl` + `tiktokUrl` | `https://instagram.com/planetapsilo` + `https://tiktok.com/@planetapsilo` | Sofía — confirm handles (currently default planetapsilo handle) |

These placeholders are visible in the built HTML (e.g., `dist/index.html` contains `https://wa.me/57XXXXXXXXXX?text=Hola%20planetapsilo,…`) — by design while site is `noindex`. Build passes regardless.

## Button Primitive API Summary

```astro
<Button
  variant="primary | secondary | tertiary"  /* LOCKED 3 variants */
  href="https://..."                         /* string, required */
  label="Visible label"                      /* string, required */
  external                                   /* boolean, sets target=_blank + rel=noopener noreferrer */
  ariaLabel="optional override"              /* string, optional */
/>
```

Downstream usage (Plans 02-05): `import Button from '../components/ui/Button.astro'`.

## Footer Expansion Delta

- Lines added: +103 (56 → 149)
- New sub-blocks: `.social-row` (IG + TikTok), `.disclaimer` (LOCKED paragraph), `.privacy-link` (within `.brand-line`)
- Tokens consumed: `--color-text-primary`, `--color-text-muted`, `--color-text-subtle`, `--color-chrome-border`, `--color-orange-mystic`, `--font-display-sm` (18px), `--font-body-xs` (13px), `--font-body-sm` (14px), `--space-section`
- Zero new design tokens introduced — pure consumption of Phase 1 token set

## /privacidad Stub — Deferred Items for Phase 3 LEGAL-02

The current body is a 1-paragraph "próximamente" notice. Phase 3 LEGAL-02 will:
- Replace body with abogado-reviewed full Habeas Data text (Ley 1581 de 2012 + Decree 1377/2013 compliance)
- Add cookie disclosure if Phase 4 analytics (Plausible/Umami) lands
- Add explicit Habeas Data rights enumeration (acceso, rectificación, supresión, revocatoria)
- Add Data Protection Officer contact (if applicable per Sofía's setup)
- Add data retention period statement

The current copy explicitly says "los datos que dejes en cualquier formulario sólo se usan para responderte sobre tu consulta" — this is the Phase 2 stub-level commitment, NOT a substitute for the legal policy. Site remains `noindex` until LEGAL-12 flips the flag.

## Decisions Made

- **No new design tokens.** Every padding/color/font value in Button + Footer + privacidad consumes existing Phase 1 tokens or sanctioned non-snap values (`clamp` for type, `12px` = sm+xs composition for button Y-padding). Plan executed with zero edits to `tokens.css` or `global.css` as UI-SPEC mandates.
- **waLink centralization.** Chose option (a) from PATTERNS.md — rewire WhatsAppFloat to use `waLink()` instead of keeping both `whatsappPrefill` and `waLink`. `whatsappPrefill` is retained in the interface for backward compat in case any Phase 1 caller still reads it, but no current caller does.
- **Tertiary CTA in /privacidad.** The page uses inline `.cta-tertiary` styles (not the Button component) because Button is not yet wired into pages — and inlining the same token-based style keeps the page self-sufficient and reuses identical token values. When Plan 02 ships Button consumers across pages, /privacidad could be refactored to import Button — but it's not in scope here.
- **Wordmark size revision.** Followed UI-SPEC §"Reused Phase 1 components" → Nav.astro wordmark dropped from 24px to 18px Fraunces 500. Footer wordmark followed for visual consistency. **Note:** Nav.astro itself is unchanged in this plan because UI-SPEC lists it as "Reused Phase 1 components" with the revision applied to wordmark token treatment, not the file edits — Plan 02 or a focused follow-up will refresh Nav if visual regression is detected against the new UI-SPEC.

## Deviations from Plan

None — plan executed exactly as written. All 5 tasks landed with the LOCKED contents specified in `<action>` blocks. All acceptance criteria gates passed on first build. Zero auto-fixes required.

## Issues Encountered

None. The Phase 1 scaffold provided a clean foundation: BaseLayout already wires noindex meta and BASE_URL helpers, tokens.css already declares all colors + reduced-motion gates, and the WhatsAppFloat style block was preserved byte-for-byte from Phase 1 as the plan required.

## Verification Gates (All 6 Passed)

1. ✓ `npm run build` exits 0 with no warnings (7 pages built in ~1.4s)
2. ✓ `dist/index.html` contains LOCKED disclaimer + WhatsApp URL with placeholder `57XXXXXXXXXX`
3. ✓ `dist/privacidad/index.html` exists with H1 + Ley 1581 + `<meta name="robots" content="noindex,nofollow">`
4. ✓ `dist/_astro/BaseLayout.D6A3JV4y.css` contains 4 distinct `prefers-reduced-motion: reduce` rules (hero-bg, scroll-behavior, social-row+privacy-link, wa-float)
5. ✓ `dist/` has 29 `rel="noopener noreferrer"` occurrences across pages (minimum required: 4 — Footer IG + TikTok + WhatsAppFloat + privacidad WhatsApp CTA)
6. ✓ `grep -r "import Button" src/pages/` returns 0 (expected — Button is a primitive consumed by Plans 02-05, not by any page in this plan)

## Lighthouse Impact

Local `npm run build` produced no warnings, no new CSS asset (`BaseLayout.D6A3JV4y.css` is the single shared CSS file with scoped component styles inlined), and no new font/script requests. Page count went from 6 → 7 (added `/privacidad`). Expected Lighthouse impact: negligible (the new page is a 1-section static render with the same hero gradient asset and font stack as existing pages).

## Threat Surface Scan

All file additions match the threat model in `02-01-PLAN.md` §`<threat_model>`. No new threat flags introduced. The 4 STRIDE entries (T-02-01 through T-02-04) are mitigated/accepted as documented:
- T-02-01 (URL prefill tampering) — mitigated by `waLink` + `encodeURIComponent`
- T-02-02 (Web3Forms keys in HTML) — accepted (intended pattern), documented in `contact.ts` comment
- T-02-03 (tabnabbing) — mitigated by `target=_blank + rel=noopener noreferrer` on every external `<a>`
- T-02-04 (stub privacy claim) — accepted (Phase 3 replaces); site `noindex` while stub lives

No `threat_flag:` entries to report — zero unplanned network endpoints, auth paths, file access patterns, or schema changes introduced.

## Known Stubs

| Stub | File | Why |
|------|------|-----|
| 4 × TODO placeholders | `src/data/contact.ts` lines 20, 23, 25, 28 | Intentional — flagged for Sofía/Juan to replace before deploy. Plan acceptance criteria explicitly requires `grep -c TODO returns 4`. |
| `/privacidad` body copy | `src/pages/privacidad.astro` | By design — Phase 3 LEGAL-02 replaces with abogado-reviewed Habeas Data. Site `noindex` keeps the stub from being indexed. |

All stubs are tracked in PROJECT.md Active requirements + STATE.md blockers (Phase 3 abogado gate, Phase 4 WhatsApp Business decision).

## Self-Check: PASSED

**Files verified to exist:**
- `src/data/contact.ts` — FOUND
- `src/components/ui/Button.astro` — FOUND
- `src/components/layout/Footer.astro` — FOUND
- `src/components/layout/WhatsAppFloat.astro` — FOUND
- `src/pages/privacidad.astro` — FOUND
- `dist/privacidad/index.html` — FOUND (post-build)

**Commits verified in git log:**
- `b31b82f` — FOUND
- `f1ef043` — FOUND
- `ba292bc` — FOUND
- `bb8932d` — FOUND
- `37d2854` — FOUND

## Next Plan Readiness

Plans 02-05 can now:
- `import Button from '../components/ui/Button.astro'` for every CTA across home, acompanamiento, retiros, contacto
- `import { contact, waLink } from '../data/contact'` for Calendly URL, Web3Forms keys (per form), social URLs, WhatsApp deeplink construction
- Trust that the Footer renders the full social row + LOCKED disclaimer on every page (BaseLayout already includes Footer)
- Trust that WhatsAppFloat is wired to the real `waLink()` helper on every page

No blockers for Plan 02 (home page composition). Plan 02 should expect to consume Button + contact.calendlyUrl + waLink + (eventually) services/testimonials/faqs data layers — the latter three are Plan 02's own task scope.

---
*Phase: 02-mvp-content-three-channel-contact*
*Completed: 2026-05-23*
