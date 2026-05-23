---
phase: 02-mvp-content-three-channel-contact
plan: 04
subsystem: ui
tags: [astro, form-primitives, web3forms, retreat-phases, retreat-application-form, retiros-page, habeas-data, honeypot]

# Dependency graph
requires:
  - phase: 02-mvp-content-three-channel-contact
    plan: 01
    provides: "contact.web3formsKeyRetiros + contact.calendlyUrl + waLink(prefill) helper + Button primitive (not consumed in this plan — primary CTA styles inlined in the form to keep the form self-contained)"
  - phase: 02-mvp-content-three-channel-contact
    plan: 02
    provides: "Hero (variant interior + lead/maxim props) + Testimonial + ConfidentialityLine + testimonials data (retiros context) + Service interface with confidentialityLine field"
  - phase: 02-mvp-content-three-channel-contact
    plan: 03
    provides: "services.ts CONFIDENTIALITY constant seeded into Retiros entry — Plan 04 consumes services.find(s => s.slug === 'retiros').confidentialityLine"
provides:
  - "FormField.astro — generic form field primitive supporting 6 input types (text/email/tel/textarea/select/radio), padding 12px 16px, radius 8px, font-size 17px (touch target ~48px WCAG 2.5.5)"
  - "HabeasDataCheckbox.astro — custom 20×20 Habeas Data consent checkbox with LOCKED Ley 1581 de 2012 label + /privacidad link via BASE_URL trimmed helper"
  - "FormSuccess.astro — inline post-submit success view with 2 LOCKED variants: retiros ('Recibimos tu aplicación.') + contacto ('Mensaje recibido.')"
  - "RetreatPhases.astro — 3-card grid section for Preparación / Inmersión / Integración (1col mobile / 3col >=768px)"
  - "RetreatApplicationForm.astro — 5-question application form (D-08 LOCKED fields) + Habeas Data + honeypot + Web3Forms POST + inline success swap (no redirect) — anchor #aplicacion"
  - "src/pages/retiros.astro — full /retiros page composing 6 LOCKED sections including the application form; NO Calendly anywhere (D-07 application gate)"
affects:
  - "02-05 (contacto) — will consume FormField + HabeasDataCheckbox + FormSuccess (variant='contacto') as the primitive layer for ContactForm; the exact same vanilla-JS submit handler pattern will be replicated with contact.web3formsKeyContacto"
  - "02-06 (copy-linter) — must exempt 'tratamiento de datos personales' in HabeasDataCheckbox + the Footer disclaimer's 'No constituye terapia' (both denial-clause + data-context contexts)"
  - "02-07 (Lighthouse audit) — /retiros now ships with vanilla JS in <script> block (~600 bytes) for form submit handler; expect minimal Lighthouse impact"
  - "03 (legal-pass) — LEGAL-09 replaces contact.web3formsKeyRetiros placeholder with real Web3Forms key (Sofía/Juan generate at web3forms.com)"

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Form primitive library convention: src/components/forms/{Name}.astro, all consume Phase 1 tokens.css + 200ms transitions guarded by prefers-reduced-motion local override"
    - "FormField type discriminator: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'radio' — single component handles 6 input shapes via conditional ternaries, no duplication"
    - "Honeypot pattern (Web3Forms native): <input type='text' name='botcheck' tabindex='-1' autocomplete='off' style='display:none' aria-hidden='true'> — T-02-11 mitigation"
    - "Vanilla JS submit handler in Astro <script> block — preventDefault → disable + spinner → fetch POST + FormData → 2xx swap form node with FormSuccess + scrollIntoView smooth; 4xx/5xx/network restore form + inline error with WhatsApp fallback link"
    - "Spinner respects prefers-reduced-motion via local @media (prefers-reduced-motion: reduce) { .spinner { animation: none; } } — UI-SPEC §Motion line 497"
    - "Application gate pattern (D-07): /retiros has NO Calendly anywhere — only the inline RetreatApplicationForm. The single primary CTA is the form's submit button itself."
    - "RetreatPhases card body describes FORMATO (días, naturaleza, círculos de palabra, comidas, meditación, integración) — NEVER substance (glosario regla #3)"

key-files:
  created:
    - "src/components/forms/FormField.astro (130 líneas) — 6-type form field primitive"
    - "src/components/forms/HabeasDataCheckbox.astro (78 líneas) — Ley 1581 consent checkbox with custom 20×20 box"
    - "src/components/forms/FormSuccess.astro (78 líneas) — inline post-submit replacement, 2 LOCKED variants"
    - "src/components/sections/RetreatPhases.astro (80 líneas) — 3-card grid, 1col mobile / 3col tablet+"
    - "src/components/forms/RetreatApplicationForm.astro (208 líneas) — 5-question form + honeypot + Web3Forms POST + inline success swap"
  modified:
    - "src/pages/retiros.astro (42 → 128 líneas) — rewrite from Phase 1 stub to 6-section composition with LOCKED copy + 3 phases v1 + suitability v1"

key-decisions:
  - "Zero new design tokens — all 5 new files consume Phase 1 tokens.css + Phase 2 Plan 01 patterns (Button-equivalent inline styles in the form, FormSuccess card chrome matching section card pattern)"
  - "D-07 application gate honored strictly: /retiros has 0 'calendly' string matches in dist/retiros/index.html. The Calendly CTA only appears as a FALLBACK inside FormSuccess variant='contacto' (the contacto variant) — NOT consumed on /retiros"
  - "Honeypot-only spam protection (D-17 Phase 2 disposition) — no Turnstile/hCaptcha in MVP; Web3Forms native 'botcheck' field is the gate. Plan defers stronger captcha to Phase 4 IF spam materializes after indexación (Phase 3+)"
  - "Form submit handler is vanilla JS in <script> block (pattern carried from src/components/layout/Nav.astro lines 126-147) — zero framework runtime added, ~600 bytes gzipped contribution to /retiros bundle"
  - "FormSuccess D-09 'replaces form node in-place' implemented via two sibling nodes (#retreat-form + #retreat-success) toggled via .hidden boolean — Astro emits both as static HTML at build time; the submit handler flips visibility. Avoids any client-side templating or innerHTML construction"
  - "Honeypot field placed BEFORE the visible fields in source order so bots that auto-fill all visible inputs trip the gate first — pattern recommended by Web3Forms docs and confirmed by D-17"
  - "Habeas Data checkbox required attribute (HTML5 native) is the form-submit gate for Ley 1581 — no JS validation needed; browser blocks submit if unchecked. Verified in build that input has `required` attribute"
  - "Suitability 'para quién sí / no' uses non-clinical language for the 'no' column (no 'depresión', 'ansiedad', 'TDAH', 'burnout' as conditions — PROHIBIDO words). Bullets reference 'servicio de salud', 'intervención clínica', 'crisis aguda', 'supervisión médica continua' as REFERRALS, not as treated conditions — within glosario regla #3"
  - "Phases body copy (Preparación/Inmersión/Integración) describes FORMATO exclusively — verified 0 matches for psilocibina/hongos/ayahuasca in dist/retiros/index.html"
  - "Anchor id='aplicacion' lives on the outer <section> of RetreatApplicationForm — both /acompanamiento and /contacto CTABlocks point to /contacto#form (a different anchor), so #aplicacion is reserved exclusively for /retiros's form"

patterns-established:
  - "Form primitive library: src/components/forms/ holds reusable form pieces (FormField, HabeasDataCheckbox, FormSuccess); Plan 05 will add ContactForm.astro in the same directory"
  - "Application-gate page pattern: /retiros NO Calendly + inline form at #aplicacion. Differentiates from /acompanamiento and /contacto which use CTABlock with Calendly primary"
  - "Web3Forms client-side form submission: hidden access_key + subject + from_name + honeypot → fetch POST → 2xx swap with success block + scroll → 4xx/5xx restore + inline error link to WhatsApp"
  - "Suitability 2-col grid: 1col mobile / 1fr 1fr at min-width 768px, color-coded via .col-yes (orange) and .col-no (muted) — pattern reusable for any 'for whom / not for whom' content"
  - "FormSuccess inline section card: padding 24px, border-radius 12px, background --color-bg-elevated, max-width 36rem centered — matches the chrome of other section cards (RetreatPhases, ServiceTeaser)"

requirements-completed:
  - CONT-03
  - CONT-09
  - CONT-12
  - CONT-13

# Metrics
duration: 4m 8s
completed: 2026-05-23
---

# Phase 2 Plan 04: Form Primitives + /retiros Application Form Summary

**Sienta el form primitive library (FormField, HabeasDataCheckbox, FormSuccess) + RetreatPhases section + RetreatApplicationForm con submit Web3Forms inline success swap, y compone /retiros completo con 6 secciones LOCKED — application-gate funcional sin Calendly (D-07), reusable directamente por Plan 05 ContactForm.**

## Performance

- **Duration:** 4m 8s
- **Started:** 2026-05-23T01:40:12Z
- **Completed:** 2026-05-23T01:44:20Z
- **Tasks:** 3
- **Files modified:** 6 (5 created, 1 modified)

## Accomplishments

- **`src/components/forms/FormField.astro`** parametriza 6 input shapes (text/email/tel/textarea/select/radio) en un solo primitive. Padding `12px 16px` (sm+xs + md), radius `8px`, font-size `1.0625rem` (17px), border `--color-chrome-border` idle → `--color-chrome-border-strong` hover → `--color-orange-mystic` focus con outline ring 2px (UI-SPEC §"Form field states"). Touch target computado ~48px (12+12+24 line-height) excede WCAG 2.5.5 (44×44). `prefers-reduced-motion: reduce` override local cancela el transition de border-color.

- **`src/components/forms/HabeasDataCheckbox.astro`** dibuja un checkbox 20×20 custom (HTML `<input type="checkbox">` con opacity:0 absoluto + sibling `<span class="checkmark">` que el `:checked` styling rellena con `--color-orange-mystic` y un SVG checkmark `--color-bg-base`). Label en `--font-body-xs` (13px) con la string LOCKED `Autorizo el tratamiento de mis datos personales conforme a la Ley 1581 de 2012 para que planetapsilo me contacte sobre esta consulta. Más detalle en Privacidad — próximamente.` y enlace a `/privacidad` vía `BASE_URL` trimmed helper. `required` attribute → bloquea submit nativo cuando unchecked.

- **`src/components/forms/FormSuccess.astro`** ejecuta el D-09 inline success swap. Variant discriminator: `retiros` muestra heading LOCKED "Recibimos tu aplicación." + body "Te respondemos en menos de 24h. Si prefieres conversar antes →" + tertiary link a WhatsApp vía `waLink('Hola planetapsilo, apliqué a un retiro y prefiero conversar antes')`. `contacto` variant muestra "Mensaje recibido." + Calendly fallback. Chrome de card: padding `24px`, radius `12px`, bg `--color-bg-elevated`, max-width `36rem`, centrado. Heading Fraunces 300 `--font-display-lg`, body Inter 400 17px line-height 1.65.

- **`src/components/sections/RetreatPhases.astro`** renderiza la grid de 3 fases. Mobile 1col, tablet+ (≥768px) 3col via `grid-template-columns: repeat(3, 1fr)`. Card padding `32px 24px`, bg `--color-bg-elevated`, radius `12px`, border `--color-chrome-border`. Phase name `<h3>` Fraunces 500 `--font-display-lg` (la regla H3 weight rule del UI-SPEC); body Inter 400 17px line-height 1.6 muted. Section heading `<h2>` Fraunces 300 `--font-display-lg` con margin-bottom 48px.

- **`src/components/forms/RetreatApplicationForm.astro`** entrega el form completo:
  - H2 "Aplica para un próximo retiro" + 1-line lead "Recibimos pocas aplicaciones por convocatoria…"
  - 4 hidden inputs: `access_key=contact.web3formsKeyRetiros`, `subject="Aplicación retiro planetapsilo"`, `from_name="planetapsilo retiros form"`, `botcheck` (honeypot tabindex=-1 display:none autocomplete=off aria-hidden=true) — posicionado ANTES de los visibles para que bots tropiecen primero
  - 6 visible FormFields LOCKED (D-08): `name` (text), `email` (email), `whatsapp` (tel, help "Incluye indicativo (+57…)"), `referral` (text), `motivation` (textarea 3 rows, help "Una o dos líneas bastan."), `priorExperience` (radio 3 options "Sí" / "No" / "Prefiero no responder")
  - HabeasDataCheckbox required
  - Inline error block (hidden por defecto, role="alert") con WhatsApp fallback link al fail
  - Submit button "Enviar aplicación" + SVG spinner inline (hidden por defecto, 800ms linear infinite, cancelado por prefers-reduced-motion)
  - SLA microcopy "Respondemos antes de 24h, normalmente el mismo día."
  - FormSuccess variant="retiros" como sibling node (hidden por defecto)
  - Vanilla JS `<script>` handler: preventDefault → disable submit + label "Enviando…" + show spinner → `fetch(form.action, {method: 'POST', body: new FormData(form), headers: {Accept: 'application/json'}})` → `res.ok` swap nodes + `scrollIntoView({behavior: 'smooth', block: 'nearest'})` → else throw + restore form + show error block
  - Anchor `id="aplicacion"` en outer section

- **`src/pages/retiros.astro`** reescrito de 42 → 128 líneas componiendo las 6 secciones LOCKED:
  1. **Hero variant=interior** con title "Retiros", maxim LOCKED "La pausa real no se improvisa.", lead "Tres fases. Pocas personas por convocatoria. Aplicación previa obligatoria."
  2. **RetreatPhases** con 3 fases v1 by Claude (Preparación / Inmersión / Integración) — describen formato (días en naturaleza, círculos de palabra, alimentación consciente, meditación, encuentros uno-a-uno post-experiencia) — NUNCA sustancia.
  3. **Suitability "Para quién es y para quién no"** — 2-col grid (1col mobile / 2col ≥768px), col-yes orange + col-no muted, 4 bullets cada uno. Non-clinical language: el "no" referencia "servicio de salud", "intervención clínica", "crisis aguda", "supervisión médica" como REFERRAL a otros recursos, NO como condiciones tratadas.
  4. **Testimonial filtered context='retiros'** — A., founder e-commerce, 38 — Bogotá (LOCKED en testimonials.ts Plan 02).
  5. **ConfidentialityLine** consumiendo `services.confidentialityLine` (D-27 LOCKED string sembrado por Plan 03).
  6. **RetreatApplicationForm** inline en `#aplicacion`.

- **Per-page meta (CONT-12):** title="Retiros — planetapsilo" + LOCKED description "Retiros en tres fases — Preparación, Inmersión, Integración — para liderazgos que necesitan una pausa profunda. Aplicación previa obligatoria." + noindex inherited from BaseLayout.

## Task Commits

Cada task se commiteó atómicamente:

1. **Task 1: Form primitives + RetreatPhases** — `15a287c` (feat) — FormField + HabeasDataCheckbox + FormSuccess + RetreatPhases (4 archivos)
2. **Task 2: RetreatApplicationForm** — `072b9d9` (feat) — 5-field form + honeypot + Web3Forms POST + inline success swap
3. **Task 3: /retiros 6-section composition** — `2b18fa2` (feat) — rewrite total componiendo Hero+Phases+Suitability+Testimonial+Confidentiality+Form

**Plan metadata commit:** pendiente (incluirá este SUMMARY.md + STATE.md + ROADMAP.md + REQUIREMENTS.md)

## Files Created/Modified

### Created (5)

- `src/components/forms/FormField.astro` — 130 líneas; 6-type form field primitive consumido por RetreatApplicationForm + (Plan 05) ContactForm
- `src/components/forms/HabeasDataCheckbox.astro` — 78 líneas; Ley 1581 consent checkbox con custom 20×20 box + privacidad link
- `src/components/forms/FormSuccess.astro` — 78 líneas; inline post-submit success card, 2 variants (retiros/contacto)
- `src/components/sections/RetreatPhases.astro` — 80 líneas; 3-card grid Preparación/Inmersión/Integración
- `src/components/forms/RetreatApplicationForm.astro` — 208 líneas; full 5-question application form + honeypot + Web3Forms POST + inline success swap + vanilla JS handler

### Modified (1)

- `src/pages/retiros.astro` (42 → 128 líneas) — rewrite total de Phase 1 stub a 6-section composition LOCKED

## LOCKED strings landed in dist/retiros/index.html

Verificado via grep contra `dist/retiros/index.html` post-build:

| LOCKED string | Verificado |
|---|---|
| `<title>Retiros — planetapsilo</title>` | sí |
| `<meta name="description" content="Retiros en tres fases — Preparación, Inmersión, Integración — para liderazgos que necesitan una pausa profunda. Aplicación previa obligatoria.">` | sí |
| `<meta name="robots" content="noindex,nofollow">` (Phase 1 gate preservado) | sí |
| H1 `<h1>Retiros</h1>` (con scoped class atributo de Hero.astro) | sí |
| Máxima "La pausa real no se improvisa." | sí |
| Hero lead "Tres fases. Pocas personas por convocatoria. Aplicación previa obligatoria." | sí |
| H2 "Las tres fases" (RetreatPhases) | sí |
| 3 phase names: `Preparación`, `Inmersión`, `Integración` (3 ocurrencias cada uno via `grep -o`) | sí |
| H2 "Para quién es y para quién no" | sí |
| 2 col headings "Es para ti si" + "No es para ti si" | sí |
| Testimonial quote LOCKED ("La integración me cambió más que la inmersión…") | sí |
| Testimonial attribution "A., founder e-commerce, 38 — Bogotá" | sí |
| Testimonial disclaimer LOCKED (Phase 2 ilustrativo) | sí |
| Confidentiality "Lo que se conversa aquí no sale de aquí. Trabajamos con discreción profesional y archivamos sólo lo mínimo necesario." | sí |
| H2 "Aplica para un próximo retiro" (RetreatApplicationForm) | sí |
| Hidden field `value="Aplicación retiro planetapsilo"` (Web3Forms subject) | sí |
| Form `action="https://api.web3forms.com/submit"` | sí |
| `id="aplicacion"` (form anchor) | sí |
| `name="botcheck"` + `tabindex="-1"` + `style="display:none"` (honeypot) | sí |
| 6 visible fields names: `name`, `email`, `whatsapp`, `referral`, `motivation`, `priorExperience` | sí |
| `name="habeasData"` with `required` attribute | sí |
| SLA microcopy "Respondemos antes de 24h, normalmente el mismo día." | sí |

**Build output size:** dist/retiros/index.html = **19,093 bytes** (~19 KB). Bien debajo del cap de 80 KB del verification gate (~CONT-15 perf gate).

## D-07 Application Gate Verification (CRITICAL)

UI-SPEC §"/retiros — 6 sections" y glosario regla #7 prohíben CUALQUIER Calendly CTA en `/retiros`:

```
$ grep -oi "calendly" dist/retiros/index.html | wc -l
0
```

**Cero matches case-insensitive.** D-07 cumplido. Application gate enforced.

## PROHIBIDO Substance Scan (glosario regla #3)

```
$ grep -oi "psilocibina" dist/retiros/index.html | wc -l
0
$ grep -oi "hongos"      dist/retiros/index.html | wc -l
0
$ grep -oi "ayahuasca"   dist/retiros/index.html | wc -l
0
```

**Cero matches reales.** Las 3 fases describen formato (días, naturaleza, círculos de palabra, comidas, meditación, integración) exclusivamente.

**Observación no-bloqueante:** el regex literal del plan `psilo` (no `psilocibina`) en la verify clause sí matchea — pero los 32 hits son TODOS para `planetapsilo` (la marca). Es un bug del regex del plan, no del copy. Documentado para que el verifier no se confunda.

**Footer disclaimer (`No constituye terapia ni servicio de salud`):** sigue presente en dist/retiros (heredado del Footer global), contiene `terapia` dentro de denial-clause LOCKED — exempto por Plan 06 copy linter.

## Open Items for Sofía (refinement / decisions)

| Ítem | Decisión | Cuándo |
|---|---|---|
| Máxima de /retiros wording | Anchor: "La pausa real no se improvisa." — derivada del BrandBio P2 LOCKED. Sofía puede ajustar mantenida la longitud (1 línea, registro filosófico) y el glosario | Cualquier momento antes de Phase 2 close |
| 3 phases body text wording | v1 por Claude dentro glosario PERMITIDO. Sofía puede reescribir cada body manteniendo: Preparación = pre-screen + ajuste expectativas + prácticas suaves, Inmersión = días en naturaleza + círculos + comidas + meditación, Integración = encuentros post-experiencia. Array `phases` en `src/pages/retiros.astro` líneas 23-37 | Cualquier momento antes de Phase 2 close |
| Suitability "Para quién es y para quién no" 4+4 bullets | v1 por Claude dentro glosario; el "no" usa lenguaje non-clinical (referral a "servicio de salud", "intervención clínica", "crisis aguda") en lugar de nombrar condiciones. Sofía puede pulir matizando | Cualquier momento |
| Web3Forms access key real | `YOUR_RETIROS_ACCESS_KEY` placeholder en `src/data/contact.ts` — Sofía/Juan generan key real en web3forms.com y reemplazan ANTES del deploy a producción real (Phase 3 LEGAL-09 confirma) | Pre-deploy (Phase 3) |
| WhatsApp number real (`57XXXXXXXXXX`) | placeholder en `contact.ts` — Sofía proporciona número Business o personal antes del deploy. Aparece en FormSuccess retiros fallback CTA + error block fallback link | Pre-deploy (Phase 3 / Phase 4 VAL-05) |
| Testimonio retiros real | Placeholder LOCKED en testimonials.ts Plan 02 — Phase 3 LEGAL-07 lo reemplaza con consentido real | Phase 3 |

## Deviations from Plan

Plan ejecutado fielmente. Las 3 tasks landearon con el contenido LOCKED que el `<action>` block dicta. Las acceptance criteria pasaron en el primer build. Cero auto-fixes Rule 1/2/3 requeridos.

### Auto-fixed Issues

Ninguno — sin Rule 1/2/3 activations. El plan estaba completo y self-contained.

### No-Rule observaciones (verify-clause artifacts, no bloqueantes)

**1. [No-Rule observación] `grep -c 'name="' RetreatApplicationForm.astro` devuelve 10 en lugar de >= 11**

- **Encontrado en:** Task 2 acceptance criteria — `grep -c 'name="' src/components/forms/RetreatApplicationForm.astro` returns 10
- **Hecho:** El conteo de 10 viene de 4 hidden (access_key, subject, from_name, botcheck) + 6 visible FormFields (name, email, whatsapp, referral, motivation, priorExperience). La criteria del plan asume "11+" porque cuenta `habeasData` adicionalmente, pero ese `name="habeasData"` vive dentro del componente `<HabeasDataCheckbox />` importado, no en el archivo source de RetreatApplicationForm
- **Semántica:** En el HTML built (dist/retiros/index.html) los 11 names sí aparecen — verificable con `grep -o 'name="[^"]*"' dist/retiros/index.html` (incluye `name="habeasData"` proveniente de HabeasDataCheckbox.astro). El conteo source-level es 10 porque cada primitive vive en su propio archivo
- **Fix:** Ninguno — la arquitectura modular requiere que `habeasData` viva en su propio component. La criteria del plan asumió componente monolítico
- **Files:** `src/components/forms/RetreatApplicationForm.astro` (10 names en source), `dist/retiros/index.html` (11 names en built HTML)

**2. [No-Rule observación] `grep "psilo" dist/retiros/index.html` matchea 32 veces — todos `planetapsilo`**

- **Encontrado en:** Task 3 acceptance criteria — `! grep -i "psilocibina\|hongos\|ayahuasca\|psilo" dist/retiros/index.html`
- **Hecho:** El regex literal incluye `psilo` (4 letras) que colisiona con la marca `planetapsilo`. Los 32 hits son todos para el wordmark de la marca (Nav, Footer, brand line) — `psilocibina` standalone tiene 0 ocurrencias reales
- **Semántica:** Las 3 sustancias prohibidas LITERALES (psilocibina, hongos, ayahuasca) están en 0. El regex del plan tenía un bug menor (debió usar `psilocibina` completo o `\bpsilo\b` con word-boundary). El copy cumple regla #3 al 100%
- **Fix:** Ninguno — el copy es correcto. La regex del plan se documenta como falso positivo. Plan 06 (copy-linter) escribirá un linter más robusto que excluya el brand name del scan
- **Files:** `dist/retiros/index.html`, `src/pages/retiros.astro`

**3. [No-Rule observación] `grep -q "<meta name=\"robots\" content=\"noindex,nofollow\">" dist/retiros/index.html` matchea correctamente**

- **Verificado:** BaseLayout emite `<meta name="robots" content="noindex,nofollow">` cuando `site.indexable === false`. Verificación passed sin issue
- **Files:** `dist/retiros/index.html`

## Authentication Gates Encountered

Ninguno. No hay paths que requieran auth en este plan. Web3Forms access_key es público por diseño (T-02-15 acceptado en Plan 01).

## Issues Encountered

Ninguno. El plan estaba self-contained y los components de Plans 01-03 estaban listos en sus APIs exactos (Hero variant='interior' con maxim+lead, Testimonial quote/attribution/disclaimer, ConfidentialityLine text, contact.web3formsKeyRetiros placeholder, waLink helper, services.find('retiros').confidentialityLine seeded by Plan 03).

## Verification Gates (All Passed)

1. ✓ `npm run build` exits 0 sin warnings (7 pages en ~2.4s)
2. ✓ `dist/retiros/index.html` contiene todas las strings LOCKED (title, description, robots, H1+máxima+lead, 3 phase names body, suitability 4+4 bullets, testimonio quote+attribution+disclaimer, confidentiality, form H2+lead+5 fields+habeas+honeypot+SLA)
3. ✓ `dist/index.html` (home) sigue intacto — `<title>planetapsilo</title>` + H1 LOCKED + máxima preserved (regression check)
4. ✓ `dist/acompanamiento/index.html` sigue intacto — title "Acompañamiento — planetapsilo" + Hero lead "Conversaciones sostenidas…" preserved (regression check)
5. ✓ `dist/retiros/index.html` size = 19,093 bytes (<80 KB cap)
6. ✓ 0 ocurrencias de las 3 sustancias prohibidas reales (psilocibina, hongos, ayahuasca) en dist/retiros (glosario regla #3)
7. ✓ 0 ocurrencias case-insensitive de `calendly` en dist/retiros (D-07 application gate)
8. ✓ `id="aplicacion"` presente en dist/retiros (form anchor)
9. ✓ `botcheck` hidden field con `style="display:none"` presente en dist/retiros (T-02-11 mitigation)
10. ✓ Form `action="https://api.web3forms.com/submit"` presente en dist/retiros
11. ✓ Hidden field `value="Aplicación retiro planetapsilo"` presente en dist/retiros (subject)
12. ✓ Spinner `<svg class="spinner">` + `@media (prefers-reduced-motion: reduce) { .spinner { animation: none; } }` ambos presentes (CONT-13 motion gate)
13. ✓ HabeasDataCheckbox `required` attribute presente en dist/retiros (Ley 1581 submit gate)

## Threat Surface Scan

Todos los archivos creados/modificados encajan con el threat model en `02-04-PLAN.md` §`<threat_model>`. Las 5 entradas STRIDE están mitigadas/aceptadas como documentadas:

- **T-02-11 (Tampering — form POST sin honeypot detection — mitigate):** Hidden `botcheck` field con `display:none`, `tabindex=-1`, `autocomplete=off`, `aria-hidden=true` posicionado antes de los visibles. Verificado presente en dist/retiros.
- **T-02-12 (Information Disclosure — XSS via input echo en FormSuccess — mitigate):** FormSuccess renderiza copy LOCKED ÚNICAMENTE — verificado en FormSuccess.astro source que no hay interpolación de user input (`{name}` etc.). El componente solo emite las strings hardcodeadas del frontmatter.
- **T-02-13 (Tampering — XSS via radio/select option from URL — accept):** Options son strings hardcodeados en Astro frontmatter (`['Sí', 'No', 'Prefiero no responder']`); ninguna URL params se parsea ni se renderiza.
- **T-02-14 (Repudiation — usuario niega submit — accept):** Web3Forms guarda historia 30 días (fuente de auditoría). HabeasDataCheckbox `required` actúa como gate explícito de consentimiento Ley 1581 ANTES del submit.
- **T-02-15 (DoS — spam attack drain Web3Forms quota — mitigate):** Web3Forms free tier = unlimited submissions. Honeypot deployed. D-17 difiere Turnstile/hCaptcha a Phase 4 IF spam materializes post-indexación.

No se introducen `threat_flag:` nuevos — cero endpoints de red nuevos (Web3Forms ya documentado en Plan 01), cero auth paths nuevos, cero file access patterns nuevos, cero cambios de schema en boundaries de confianza.

## Known Stubs

| Stub | File | Por qué |
|------|------|---------|
| `contact.web3formsKeyRetiros = 'YOUR_RETIROS_ACCESS_KEY'` | `src/data/contact.ts` (Plan 01) | Por diseño — Sofía/Juan generan key real en web3forms.com y reemplazan antes del deploy. Plan 01 acceptance criteria explicitly require placeholder. Mientras sitio sigue noindex, no es bloqueante |
| `contact.whatsappNumber = '57XXXXXXXXXX'` | `src/data/contact.ts` (Plan 01) | Pending Sofía — Phase 4 VAL-05 evalúa Business número. Aparece en FormSuccess retiros fallback CTA + error block |
| 3 phases body wording v1 | `src/pages/retiros.astro` líneas 23-37 | Por diseño — Claude v1 dentro glosario PERMITIDO; Sofía refina cuando tenga tiempo. Funcionalmente completas (describen formato, no sustancia) |
| Suitability 4+4 bullets wording v1 | `src/pages/retiros.astro` líneas 54-79 | Claude v1 dentro glosario; Sofía refina si quiere personalizar |
| Máxima retiros wording ("La pausa real no se improvisa.") | `src/pages/retiros.astro` línea 41 | Derivada de BrandBio P2 LOCKED; Sofía puede ajustar dentro glosario |
| Testimonio retiros (A., founder e-commerce) | `src/data/testimonials.ts` (Plan 02) | Placeholder LOCKED — Phase 3 LEGAL-07 lo reemplaza con consentido real |
| Hero lead "Tres fases. Pocas personas por convocatoria. Aplicación previa obligatoria." | `src/pages/retiros.astro` línea 42 | Anchor wording, abierto a Sofía |

Todos trackeados en STATE.md blockers y PROJECT.md Active requirements.

## Self-Check: PASSED

**Archivos verificados que existen:**

- `src/components/forms/FormField.astro` — FOUND
- `src/components/forms/HabeasDataCheckbox.astro` — FOUND
- `src/components/forms/FormSuccess.astro` — FOUND
- `src/components/forms/RetreatApplicationForm.astro` — FOUND
- `src/components/sections/RetreatPhases.astro` — FOUND
- `src/pages/retiros.astro` — FOUND (modified)
- `dist/retiros/index.html` — FOUND (post-build, 19,093 bytes)
- `.planning/phases/02-mvp-content-three-channel-contact/02-04-SUMMARY.md` — FOUND (this file)

**Commits verificados en git log:**

- `15a287c` — FOUND (Task 1: form primitives + RetreatPhases)
- `072b9d9` — FOUND (Task 2: RetreatApplicationForm)
- `2b18fa2` — FOUND (Task 3: /retiros page composition)

## Next Plan Readiness

Plan 05 (contacto + ContactForm) puede:

- `import FormField from '../components/forms/FormField.astro'` y consumir los 6 input types (especialmente `select` para el campo `topic` con 4 options Acompañamiento/Retiros/Obras/Otra cosa)
- `import HabeasDataCheckbox from '../components/forms/HabeasDataCheckbox.astro'` directamente — la label LOCKED Ley 1581 es la misma para ambos forms
- `import FormSuccess from '../components/forms/FormSuccess.astro'` con `variant="contacto"` — el copy LOCKED "Mensaje recibido." + Calendly fallback ya está implementado
- Replicar el patrón vanilla JS submit handler de `RetreatApplicationForm.astro` (líneas 169-205) con el access_key `contact.web3formsKeyContacto` + subject "Consulta general planetapsilo"
- Confiar en que `/retiros` ya sirve de plantilla para el ContactForm: anchor `#form` en outer section, hidden inputs orden, honeypot orden, error block + WhatsApp fallback link pattern, success swap pattern — todo directamente transferible

Sin blockers para Plan 05.

---
*Phase: 02-mvp-content-three-channel-contact*
*Completed: 2026-05-23*
