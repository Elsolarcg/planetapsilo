---
phase: 02-mvp-content-three-channel-contact
plan: 05
subsystem: ui
tags: [astro, contact-form, web3forms, channel-duo, contacto-page, habeas-data, honeypot, three-channel-funnel]

# Dependency graph
requires:
  - phase: 02-mvp-content-three-channel-contact
    plan: 01
    provides: "contact.web3formsKeyContacto + contact.calendlyUrl + waLink(prefill) helper"
  - phase: 02-mvp-content-three-channel-contact
    plan: 02
    provides: "Hero variant='interior' accepts title/lead/maxim/kicker + <slot />"
  - phase: 02-mvp-content-three-channel-contact
    plan: 04
    provides: "FormField (6 input types) + HabeasDataCheckbox + FormSuccess (variants retiros/contacto already shipped) + RetreatApplicationForm structural sibling"
provides:
  - "ContactForm.astro — 5-field general contact form for /contacto: name/email/whatsapp(opcional)/topic-select(4 opts)/message + Habeas Data + honeypot + Web3Forms POST + inline FormSuccess variant='contacto' swap"
  - "/contacto full page — 3 sections (Hero interior · Channel duo · ContactForm) with hidden inline success div; 2-button channel duo (Calendly + WhatsApp side-by-side ≥640px, stacked mobile) + SLA microcopy per channel"
  - "Anchor /contacto#form resolves to ContactForm section — target of home (Plan 02) + acompanamiento (Plan 03) tertiary CTAs"
affects:
  - "02-06 (copy-linter) — ContactForm + contacto.astro now ship; the linter must scan dist/contacto/index.html alongside the other 4 LOCKED pages; expects 'tratamiento' inside denial-clause (footer disclaimer) + Habeas Data context exempt"
  - "02-07 (Lighthouse audit) — /contacto now has ~600 bytes vanilla JS submit handler (same pattern as /retiros). Expect minimal impact, both pages share the same shape"
  - "03 (legal-pass) — LEGAL-09 replaces contact.web3formsKeyContacto placeholder with real Web3Forms key (Sofía/Juan generate at web3forms.com)"

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Form sibling pattern: ContactForm is a structural mirror of RetreatApplicationForm — only access_key, subject, from_name, fields, and FormSuccess variant differ; same vanilla JS submit handler shape (preventDefault → disable+spinner → fetch POST → 2xx swap+scrollIntoView → 4xx/5xx restore+inline error+WhatsApp fallback)"
    - "Channel duo card chrome: grid 1fr→1fr 1fr ≥640px with gap 32px/24px, per-channel card padding 32×24, bg --color-bg-elevated, radius 12px, border --color-chrome-border, min-height 160px, contents centered (flex column align-items center justify-content center gap 16px)"
    - "Optional field UX: WhatsApp field uses required={false} + label suffix '(opcional)' — explicit visual cue; no asterisk emitted (FormField .required span only renders when required={true})"
    - "D-15 Pitfall #9 mitigation: NEVER ship 3 equal CTA cards on /contacto — Calendly + WhatsApp = duo (2 cards), the form is a separate 'Si prefieres escribir' section below. Hierarchy: agenda > whatsapp >> form fallback."

key-files:
  created:
    - "src/components/forms/ContactForm.astro (205 líneas) — 5-field general contact form, sibling of RetreatApplicationForm with contacto access key + LOCKED subject + LOCKED FormSuccess variant"
  modified:
    - "src/pages/contacto.astro (63 → 127 líneas) — rewrite from Phase 1 stub (3-button CTA row) to 3-section composition (Hero interior + channel duo + ContactForm)"

key-decisions:
  - "Zero new design tokens. Channel duo card chrome reuses --color-bg-elevated + --color-chrome-border + 12px radius pattern established by RetreatPhases (Plan 04) and ServiceTeaser cards (Plan 02). The duo is intentionally heavier-chrome than the home tertiary CTAs to signal 'contact destinations'."
  - "Topic select default option is 'Acompañamiento' (first in the array) — per UI-SPEC §ContactForm note. Rationale: it's the highest-volume expected channel topic and lines up with how the home → acompanamiento → contacto funnel surfaces visitors here."
  - "ContactForm anchor id='form' lives on the outer <section> (NOT 'aplicacion' which is /retiros-exclusive). Differentiates the two forms' anchors per Plan 04 SUMMARY decision. Home + acompanamiento tertiary CTAs both already point to /planetapsilo/contacto#form."
  - "WhatsApp prefill on /contacto is 'Hola planetapsilo, quiero conversar' (D-19 contacto default) — distinct from /acompanamiento default ('me interesa explorar acompañamiento') and /retiros error fallback ('apliqué a un retiro y prefiero conversar antes')."
  - "Hero has NO CTA inside it — per UI-SPEC §'/contacto — 4 sections', CTAs live in the channel duo section immediately below. The hero lead 'Tres formas de empezar. Elige la que te calce.' is the conversion prompt."
  - "Channel duo button visual asymmetry preserved: Calendly is .cta-primary (orange bg + shadow + hover scale), WhatsApp is .cta-secondary (transparent + 1px border, text-primary color, no shadow). Same Button.primary/secondary visual contract as Phase 2 Plan 01 — inlined here to keep contacto.astro self-contained without importing Button."
  - "Per Plan 04 SUMMARY recommendation, the ContactForm directly imports the form primitives library (FormField/HabeasDataCheckbox/FormSuccess) — zero modifications needed to the existing components. FormSuccess variant='contacto' branch was already shipped by Plan 04 (LOCKED 'Mensaje recibido.' + Calendly fallback CTA)."

patterns-established:
  - "Three-channel contact funnel complete: /contacto serves all 3 channels (Calendly primary, WhatsApp secondary, ContactForm fallback) on a single page. Differentiates from /acompanamiento (uses CTABlock with Calendly primary + WhatsApp) and /retiros (application gate, NO Calendly anywhere — only RetreatApplicationForm)."
  - "Form sibling library — Plan 06+ can replicate the pattern: src/components/forms/{Name}Form.astro consuming FormField + HabeasDataCheckbox + FormSuccess, varying only fields + access_key + subject + variant. Pattern proven for retiros + contacto; would extend cleanly for obras consult form in Phase 02.1."
  - "Channel duo card chrome on /contacto is the visual destination pattern — heavier than home tertiary CTAs (no card chrome there) so visitors landing on /contacto can see immediately that THIS is where decisions get made."

requirements-completed:
  - CONT-04
  - CONT-12

# Metrics
duration: 2m 49s
completed: 2026-05-23
---

# Phase 2 Plan 05: /contacto + ContactForm Summary

**Cierra el three-channel contact funnel: ContactForm replica RetreatApplicationForm con 5 campos contacto + LOCKED access_key + subject + FormSuccess variant='contacto', y /contacto se reescribe a 3 secciones (Hero interior + channel duo de 2 botones + ContactForm). End-to-end: visitor que no eligió Calendly o WhatsApp tiene fallback form, y los 3 canales viven visibles juntos en /contacto.**

## Performance

- **Duration:** 2m 49s
- **Started:** 2026-05-23T01:50:15Z
- **Completed:** 2026-05-23T01:53:04Z (approx)
- **Tasks:** 2
- **Files modified:** 2 (1 created, 1 modified)

## Accomplishments

- **`src/components/forms/ContactForm.astro`** entrega el form completo, sibling estructural exacto de `RetreatApplicationForm`:
  - H2 LOCKED "Si prefieres escribir" + 1-line lead "Cuéntanos en una línea y te respondemos. Funciona como un email — sin presión, sin compromiso."
  - 4 hidden inputs: `access_key=contact.web3formsKeyContacto` (key DIFERENTE a retiros — T-02-16 mitigation), `subject="Consulta general planetapsilo"`, `from_name="planetapsilo contact form"`, `botcheck` honeypot (tabindex=-1, display:none, autocomplete=off, aria-hidden=true) — posicionado ANTES de los visibles
  - 5 visible FormFields LOCKED (D-16): `name` (text, required), `email` (email, required), `whatsapp` (tel, **required=false** — único campo opcional, label suffix " (opcional)"), `topic` (select, required, 4 opts en orden LOCKED: `Acompañamiento` / `Retiros` / `Obras` / `Otra cosa`), `message` (textarea 2 rows, required)
  - HabeasDataCheckbox required (Ley 1581 gate)
  - Inline error block hidden por defecto con `role="alert"` y WhatsApp fallback link via `waLink('Hola planetapsilo, intenté el formulario y no funcionó')`
  - Submit button "Enviar mensaje" + SVG spinner inline (cancelado por `prefers-reduced-motion: reduce`)
  - SLA microcopy "Respondemos antes de 24h, normalmente el mismo día."
  - FormSuccess variant="contacto" como sibling node (hidden por defecto, LOCKED heading "Mensaje recibido." + Calendly fallback CTA)
  - Vanilla JS submit handler idéntico a Plan 04: `preventDefault` → disable + spinner + label "Enviando…" → `fetch(form.action, {method: 'POST', body: new FormData(form), headers: {Accept: 'application/json'}})` → `res.ok` ? swap nodes + `scrollIntoView({behavior: 'smooth', block: 'nearest'})` : restore form + show error block
  - Anchor `id="form"` en outer section (target del home + acompanamiento tertiary CTA `/contacto#form`)

- **`src/pages/contacto.astro`** reescrito de 63 → 127 líneas, eliminando el Phase 1 stub (3-button CTA row) por las 3 secciones LOCKED:
  1. **Hero variant=interior** con title "Contacto" + lead LOCKED "Tres formas de empezar. Elige la que te calce." (sin máxima, sin kicker, sin CTA inside hero)
  2. **Channel duo** — 2 cards side-by-side a ≥640px (grid 1fr 1fr, gap 24px), stacked en mobile (1fr, gap 32px). Card chrome: `padding 32px 24px`, `bg --color-bg-elevated`, `radius 12px`, `border 1px --color-chrome-border`, `min-height 160px`, contents centered (flex column align-items center justify-content center gap 16px).
     - **Card 1 (left, primary):** CTA orange "Agenda una conversación" → `contact.calendlyUrl` (target=_blank, rel=noopener), SLA "Espacios próximos esta semana"
     - **Card 2 (right, secondary):** CTA transparente con border "Escribir por WhatsApp" → `waLink('Hola planetapsilo, quiero conversar')` (target=_blank, rel=noopener), aria-label "Escribir a planetapsilo por WhatsApp", SLA "Respondemos antes de 24h"
  3. **ContactForm** componente (incluye su propio anchor `#form` y el inline success block hidden por defecto)

- **Per-page meta (CONT-12):** title="Contacto — planetapsilo" + LOCKED description "Tres formas de empezar una conversación con planetapsilo. Agenda directo, escríbenos por WhatsApp o déjanos un mensaje." + noindex inherited from BaseLayout (sigue Phase 1 gate).

## Task Commits

Cada task se commiteó atómicamente:

1. **Task 1: ContactForm.astro** — `5d40823` (feat) — 5-field form + honeypot + Web3Forms contacto endpoint + inline FormSuccess variant='contacto' swap
2. **Task 2: /contacto rewrite** — `f993bec` (feat) — 3-section composition con Hero interior + channel duo + ContactForm

**Plan metadata commit:** pendiente (incluirá este SUMMARY.md + STATE.md + ROADMAP.md + REQUIREMENTS.md)

## Files Created/Modified

### Created (1)

- `src/components/forms/ContactForm.astro` — 205 líneas; 5-field general contact form (sibling de RetreatApplicationForm)

### Modified (1)

- `src/pages/contacto.astro` (63 → 127 líneas) — rewrite total de Phase 1 stub a 3-section composition LOCKED

## LOCKED strings landed in dist/contacto/index.html

Verificado via grep contra `dist/contacto/index.html` post-build (17,807 bytes):

| LOCKED string | Verificado |
|---|---|
| `<title>Contacto — planetapsilo</title>` | sí |
| `<meta name="description" content="Tres formas de empezar una conversación con planetapsilo. Agenda directo, escríbenos por WhatsApp o déjanos un mensaje.">` | sí |
| `<meta name="robots" content="noindex,nofollow">` (Phase 1 gate preservado) | sí |
| H1 `<h1>Contacto</h1>` (con scoped class atributo de Hero.astro) | sí |
| Hero lead "Tres formas de empezar. Elige la que te calce." | sí |
| Channel duo button 1: "Agenda una conversación" (Calendly primary) | sí |
| Channel duo button 2: "Escribir por WhatsApp" (WhatsApp secondary) | sí |
| SLA microcopy "Espacios próximos esta semana" (Calendly) | sí |
| SLA microcopy "Respondemos antes de 24h" (WhatsApp) | sí |
| WhatsApp deeplink prefill encoded: `Hola%20planetapsilo%2C%20quiero%20conversar` (via waLink helper) | sí |
| H2 "Si prefieres escribir" (ContactForm heading) | sí |
| Form `action="https://api.web3forms.com/submit"` | sí |
| Hidden field `value="Consulta general planetapsilo"` (Web3Forms subject) | sí |
| `id="form"` (form anchor — target del home + acompanamiento tertiary CTA) | sí |
| `name="botcheck"` + `tabindex="-1"` + `style="display:none"` (honeypot — T-02-17 mitigation) | sí |
| 5 visible fields names: `name`, `email`, `whatsapp`, `topic`, `message` (5 unique matches en grep) | sí |
| 4 topic select options: `<option value="Acompañamiento">`, `<option value="Retiros">`, `<option value="Obras">`, `<option value="Otra cosa">` | sí |
| `name="habeasData"` with `required` attribute (Ley 1581 submit gate) | sí |
| SLA microcopy form "Respondemos antes de 24h, normalmente el mismo día." | sí |
| Submit label "Enviar mensaje" | sí |

**Build output size:** dist/contacto/index.html = **17,807 bytes** (~17.4 KB). Bien debajo del cap de 80 KB del verification gate.

## ContactForm vs RetreatApplicationForm — Delta exacto

Diff `grep -E 'access_key|subject|FormSuccess variant|name="'` entre los 2 archivos:

| Aspecto | ContactForm | RetreatApplicationForm |
|---|---|---|
| `access_key` value | `contact.web3formsKeyContacto` | `contact.web3formsKeyRetiros` |
| `subject` value | `Consulta general planetapsilo` | `Aplicación retiro planetapsilo` |
| `from_name` value | `planetapsilo contact form` | `planetapsilo retiros form` |
| Field count | 5 | 6 |
| WhatsApp required | `required={false}` (opcional) | `required={true}` |
| Topic field | `<FormField type="select" name="topic" options={['Acompañamiento', 'Retiros', 'Obras', 'Otra cosa']}>` | (no existe) |
| Message field | `<FormField type="textarea" name="message" rows={2}>` | `<FormField type="textarea" name="motivation" rows={3} helpText="Una o dos líneas bastan.">` |
| Referral field | (no existe) | `<FormField type="text" name="referral">` |
| Prior experience field | (no existe) | `<FormField type="radio" name="priorExperience" options={['Sí', 'No', 'Prefiero no responder']}>` |
| FormSuccess variant | `<FormSuccess variant="contacto" />` | `<FormSuccess variant="retiros" />` |
| Outer anchor | `id="form"` (matchea `/contacto#form` desde home + acompanamiento) | `id="aplicacion"` (matchea `/retiros#aplicacion`) |
| Submit label | "Enviar mensaje" | "Enviar aplicación" |
| Error fallback prefill | "Hola planetapsilo, intenté el formulario y no funcionó" | "Hola planetapsilo, intenté la aplicación a retiros y no funcionó" |

**Mismo shape exacto en:** submit handler vanilla JS, spinner SVG, error block role="alert", SLA microcopy "Respondemos antes de 24h, normalmente el mismo día.", honeypot field, HabeasDataCheckbox, hidden inputs ordering, CSS chrome (.cta + .cta-primary + .form-error styles).

## Channel Duo Layout

```
Mobile (<640px):                Tablet+ (≥640px):
┌─────────────────────────┐    ┌──────────┬──────────┐
│ Agenda una conversación │    │ Agenda   │ Escribir │
│ Espacios próximos esta  │    │ una con- │ por      │
│ semana                  │    │ versac.  │ WhatsApp │
└─────────────────────────┘    │ Espacios │ Respond. │
┌─────────────────────────┐    │ próx.    │ antes 24h│
│ Escribir por WhatsApp   │    └──────────┴──────────┘
│ Respondemos antes 24h   │
└─────────────────────────┘
```

D-15 (Pitfall #9): 2 cards, not 3. Calendly primary (orange filled) destaca claramente sobre WhatsApp secondary (transparent borde) — visitor scan a 30s ve "agendar primero, WhatsApp segundo, formulario abajo de fallback".

## Three-Channel Funnel — End-to-End Verification

| Canal | /home tertiary CTA target | /acompanamiento CTA target | /retiros | /contacto |
|---|---|---|---|---|
| **Calendly** | (no direct on home — funnel goes /acompanamiento or /contacto) | CTABlock primary "Agenda una conversación" | NO (D-07 application gate) | Channel duo card 1 (orange primary) |
| **WhatsApp** | WhatsAppFloat fab + footer link | CTABlock secondary "Escribir por WhatsApp" | NO (application form only) | Channel duo card 2 (transparent secondary) |
| **Web3Forms** | Tertiary CTA "Escríbenos →" /contacto#form | Tertiary "¿Prefieres escribir?" /contacto#form | RetreatApplicationForm inline #aplicacion (DIFFERENT key: web3formsKeyRetiros) | ContactForm inline #form (web3formsKeyContacto) |

**3-channel jerarquía visible:** home → soft funnel a Calendly o WhatsApp o /contacto. /contacto = único punto donde los 3 canales conviven en una sola pantalla. /retiros = application gate (ningún Calendly, solo form propio).

## Open Items for Sofía (refinement / decisions)

| Ítem | Decisión | Cuándo |
|---|---|---|
| Web3Forms access key `web3formsKeyContacto` real | `YOUR_CONTACTO_ACCESS_KEY` placeholder en `src/data/contact.ts` — Sofía/Juan generan key real en web3forms.com **DIFERENTE** a retiros (T-02-16: inboxes separadas) | Pre-deploy (Phase 3 LEGAL-09) |
| Web3Forms access key `web3formsKeyRetiros` real | (todavía pending desde Plan 04) — Sofía/Juan generan key real en web3forms.com | Pre-deploy (Phase 3 LEGAL-09) |
| Calendly URL real | `https://calendly.com/planetapsilo/conversacion-inicial` placeholder en `contact.ts` — Sofía configura event-type real y reemplaza | Pre-deploy (Phase 3 LEGAL-09) |
| WhatsApp number real (`57XXXXXXXXXX`) | placeholder en `contact.ts` — Sofía proporciona número Business o personal antes del deploy. Aparece en channel duo + WhatsAppFloat + error block fallback link | Pre-deploy (Phase 3 / Phase 4 VAL-05) |
| Topic select default a "Acompañamiento" | OK (orden actual matchea D-16) — Sofía puede reordenar si en producción Retiros o Obras dominan el volumen | Phase 4 post-validación |

## Deviations from Plan

Plan ejecutado fielmente. Las 2 tasks landearon con el contenido LOCKED que el `<action>` block dicta. Las acceptance criteria pasaron en el primer build. Cero auto-fixes Rule 1/2/3 requeridos.

### Auto-fixed Issues

Ninguno — sin Rule 1/2/3 activations. El plan estaba completo y self-contained, los componentes de Plan 04 estaban en su API exacta (`FormSuccess variant='contacto'` ya shipped, `FormField` `type="select"` con `options` array funciona, `HabeasDataCheckbox` reusable as-is).

### No-Rule observaciones (verify-clause artifacts, no bloqueantes)

**1. [No-Rule observación] El `<section>` count en dist/contacto = 3 (Hero + channel-duo + contact-form), no 4 como sugiere literal del plan "4 sections"**

- **Encontrado en:** Task 2 acceptance criteria — el plan dice "4 sections" en UI-SPEC §"/contacto — 4 sections"
- **Hecho:** El plan §behavior aclara explícitamente: "Inline success state is part of ContactForm — no separate section". El 4to "section" conceptual es el inline FormSuccess swap (`<div id="contact-success" hidden>`) que vive DENTRO de la ContactForm section, no como section independiente
- **Semántica:** Las 3 `<section>` HTML emergentes (Hero hero--interior + channel-duo + contact-form-section) más el sibling div `#contact-success` cubren las 4 "secciones" del plan. Funcionalmente correcto
- **Fix:** Ninguno — el plan es explícito de que FormSuccess no es section separada
- **Files:** `dist/contacto/index.html`

**2. [No-Rule observación] `grep -oE '<option value="..."'` literal en initial verification falló silently — el rendering Astro mete `data-astro-cid-*` entre value y `>`**

- **Encontrado en:** verificación intermedia (no estaba en acceptance criteria explícita del plan)
- **Hecho:** Astro inyecta `data-astro-cid-nn45c2qd` (CSS scoping) en cada `<option>`. El render real es `<option value="Acompañamiento" data-astro-cid-nn45c2qd>Acompañamiento</option>` — el regex inicial buscaba `<option value="X">` (con `>` inmediato después de la quote), que no matchea por el atributo extra
- **Semántica:** Las 4 options están presentes (`grep -oE 'value="(Acompañamiento|Retiros|Obras|Otra cosa)"' dist/contacto/index.html` retorna 4 matches). El regex de verificación se ajustó pero el output es correcto al 100%
- **Fix:** Ninguno — es un artifact de cómo Astro emite component-scoped CSS. Linter robusto (Plan 06) usará regex tolerante a atributos intermedios
- **Files:** `dist/contacto/index.html`

## Authentication Gates Encountered

Ninguno. No hay paths que requieran auth en este plan. Web3Forms access_key es público por diseño (T-02-18 acceptado).

## Issues Encountered

Ninguno. El plan estaba self-contained y los components de Plans 01-04 estaban listos en sus APIs exactos:
- `contact.web3formsKeyContacto` placeholder ya seedeado en Plan 01
- `FormField type='select'` con `options` array funciona out-of-box
- `FormSuccess variant='contacto'` branch ya shipped por Plan 04
- `HabeasDataCheckbox` reusable as-is (label LOCKED Ley 1581 es la misma para retiros y contacto)
- Patrón vanilla JS submit handler de Plan 04 directamente transferible (sólo cambiar selectors `retreat-*` → `contact-*` y submit label)

## Verification Gates (All Passed)

1. ✓ `npm run build` exits 0 sin warnings (7 pages en ~1.8s) — pre + post-Task 1 + post-Task 2 builds limpias
2. ✓ `dist/contacto/index.html` contiene todas las strings LOCKED (title, description, robots, H1, Hero lead, 2 channel duo buttons + 2 SLA microcopy, ContactForm H2 + lead, 5 fields, 4 topic options, habeasData required, honeypot botcheck, Web3Forms action + subject, anchor #form, SLA form, submit label)
3. ✓ `dist/contacto/index.html` size = 17,807 bytes (<80 KB cap)
4. ✓ Anchor `id="form"` presente y reachable desde home + acompanamiento tertiary CTAs (verificado `href="/planetapsilo/contacto#form"` en dist/index.html + dist/acompanamiento/index.html)
5. ✓ Channel duo render verificado: 2 cards (Calendly primary + WhatsApp secondary), grid 1fr 1fr ≥640px, stacked en mobile (1fr)
6. ✓ ContactForm vs RetreatApplicationForm diff verificado: SOLO difieren en access_key, subject, from_name, fields shape, FormSuccess variant — mismo submit handler shape, mismo CSS chrome, mismo error block pattern
7. ✓ Regression check: dist/index.html (home), dist/acompanamiento/index.html, dist/retiros/index.html, dist/obras/index.html siguen building (7 pages totales)
8. ✓ Spinner `<svg class="spinner">` + `@media (prefers-reduced-motion: reduce) { .spinner { animation: none; } }` ambos presentes en ContactForm (CONT-13 motion gate)
9. ✓ HabeasDataCheckbox `name="habeasData"` con `required` attribute presente en dist/contacto (Ley 1581 submit gate)
10. ✓ Web3Forms `value="Consulta general planetapsilo"` (subject) presente en dist/contacto (T-02-16 mitigation — distinto a retiros subject)
11. ✓ 4 topic options renderizadas con value attribute: Acompañamiento / Retiros / Obras / Otra cosa
12. ✓ WhatsApp prefill encodeado correctamente: `Hola%20planetapsilo%2C%20quiero%20conversar` (D-19 contacto default)

## Threat Surface Scan

Todos los archivos creados/modificados encajan con el threat model en `02-05-PLAN.md` §`<threat_model>`. Las 4 entradas STRIDE están mitigadas/aceptadas como documentadas:

- **T-02-16 (Spoofing — wrong key shipped, inbox triage broken — mitigate):** Hidden subject "Consulta general planetapsilo" verificado en dist/contacto. access_key=`contact.web3formsKeyContacto` (DIFERENTE de `web3formsKeyRetiros`). Sofía inbox triage keyed off subject string. Acceptance criterion explicit.
- **T-02-17 (Tampering — honeypot bypass — mitigate):** Hidden `botcheck` field con `display:none`, `tabindex=-1`, `autocomplete=off`, `aria-hidden=true`. Posicionado ANTES de los visibles. Web3Forms native rejection. Verificado en dist.
- **T-02-18 (Information Disclosure — email captured client-side — accept):** Captured ONLY into Web3Forms (HTTPS); never persisted client-side. HabeasDataCheckbox `required` = mandatory consent Ley 1581 ANTES del submit.
- **T-02-19 (DoS — channel duo broken sin real URLs — mitigate):** `calendlyUrl` + `whatsappNumber` consumidos desde `contact.ts` con placeholders TODO. Plan 07 verifica real values pre-Phase-3-deploy. Mientras tanto el sitio sigue noindex (Phase 1 gate).

No se introducen `threat_flag:` nuevos — cero endpoints de red nuevos (Web3Forms ya documentado en Plan 01), cero auth paths nuevos, cero file access patterns nuevos, cero cambios de schema en boundaries de confianza. Reutiliza endpoint Web3Forms ya threat-modeled en Plans 01 + 04.

## Known Stubs

| Stub | File | Por qué |
|------|------|---------|
| `contact.web3formsKeyContacto = 'YOUR_CONTACTO_ACCESS_KEY'` | `src/data/contact.ts` (Plan 01) | Por diseño — Sofía/Juan generan key real en web3forms.com (key DISTINTA a retiros, T-02-16 mitigation). Pre-deploy Phase 3 LEGAL-09 |
| `contact.web3formsKeyRetiros = 'YOUR_RETIROS_ACCESS_KEY'` | `src/data/contact.ts` (Plan 01) | (Heredado de Plan 04) — pre-deploy Phase 3 LEGAL-09 |
| `contact.calendlyUrl = 'https://calendly.com/planetapsilo/conversacion-inicial'` | `src/data/contact.ts` (Plan 01) | Placeholder URL — Sofía configura event-type real. Aparece en channel duo card 1 + FormSuccess variant='contacto' fallback CTA. Pre-deploy Phase 3 LEGAL-09 |
| `contact.whatsappNumber = '57XXXXXXXXXX'` | `src/data/contact.ts` (Plan 01) | Pending Sofía — Phase 4 VAL-05 evalúa Business número. Aparece en channel duo card 2 + WhatsAppFloat + ContactForm error block fallback link |

Todos trackeados en STATE.md blockers y PROJECT.md Active requirements. La nota crítica: los 4 stubs son TODOS bloqueantes para Phase 3 deploy real, pero NO bloqueantes para Phase 2 close (sitio sigue noindex hasta Phase 3 LEGAL pass).

## Self-Check: PASSED

**Archivos verificados que existen:**

- `src/components/forms/ContactForm.astro` — FOUND
- `src/pages/contacto.astro` — FOUND (modified)
- `dist/contacto/index.html` — FOUND (post-build, 17,807 bytes)
- `.planning/phases/02-mvp-content-three-channel-contact/02-05-SUMMARY.md` — FOUND (this file)

**Commits verificados en git log:**

- `5d40823` — FOUND (Task 1: ContactForm.astro)
- `f993bec` — FOUND (Task 2: /contacto 3-section composition)

## Next Plan Readiness

Plan 06 (copy-linter Node script) puede:

- Escanear las 4 LOCKED pages built: `dist/index.html`, `dist/acompanamiento/index.html`, `dist/retiros/index.html`, `dist/contacto/index.html`
- Aplicar glosario regla #3 (PROHIBIDO substances) — Plan 04 ya dejó claro que regex `psilo` necesita word-boundary para no falsa-positivar la marca `planetapsilo`
- Exempt contexts: Footer denial-clause ("No constituye terapia ni servicio de salud") + HabeasDataCheckbox label ("Autorizo el tratamiento de mis datos personales...") — ambos containen palabras técnicas dentro de contexto legal/disclaimer
- Verificar todos los hrefs internos resuelven (no 404s) — `/contacto#form`, `/retiros#aplicacion`, `/acompanamiento`, etc.
- Verificar todas las 4 pages tienen el meta robots noindex (Phase 1 gate hasta LEGAL-12)

Plan 07 (Lighthouse + final phase verification) puede:

- Audit las 4 pages — score Performance ≥95, Accessibility ≥95, Best Practices 100
- Verificar real values en `contact.ts` están pendientes (los 4 TODOs siguen presentes)
- Confirmar que /contacto + /retiros ambos tienen ~600 bytes vanilla JS submit handler — bundle impact mínimo
- Smoke test channel duo + form submit (puppeteer/headless si está en scope)

Sin blockers para Plans 06 + 07. **Phase 2 está content-complete:** las 4 LOCKED pages (home + acompanamiento + retiros + contacto) ya viven con copy LOCKED, formularios funcionales, channel duo, application gate, footer disclaimer global. Plans 06 + 07 son pure tooling/verification.

---
*Phase: 02-mvp-content-three-channel-contact*
*Completed: 2026-05-23*
