---
phase: 02-mvp-content-three-channel-contact
plan: 03
subsystem: ui
tags: [astro, acompanamiento-page, hero-interior, testimonial-filter, ctablock-prefill, confidentiality-line, services-data]

# Dependency graph
requires:
  - phase: 02-mvp-content-three-channel-contact
    plan: 01
    provides: "contact.calendlyUrl + waLink(prefill) helper + Button primitive 3 variants + Footer/WhatsAppFloat"
  - phase: 02-mvp-content-three-channel-contact
    plan: 02
    provides: "Hero (variant interior + lead slot) + Testimonial + ConfidentialityLine + CTABlock + testimonials data (acompanamiento context) + Service interface (audience/outcomes/description/confidentialityLine optional fields)"
provides:
  - "/acompanamiento renders 7 LOCKED sections: Hero interior → Para quién → Qué pasa → Cómo funciona → Testimonial → ConfidentialityLine → CTABlock"
  - "services.ts Acompañamiento entry populated with audience, outcomes (4 bullets), description, confidentialityLine"
  - "services.ts Retiros entry seeded with confidentialityLine only (Plan 04 fills remaining fields)"
  - "Per-page meta on /acompanamiento: title='Acompañamiento — planetapsilo' + LOCKED description"
  - "CTABlock secondary prefill rotation (D-19) demonstrated: 'Hola planetapsilo, me interesa explorar el acompañamiento'"
  - "ProcesoSteps v1 (3 steps) authored within glosario PERMITIDO — Sofía refines wording later"
affects:
  - 02-04 (retiros) — consumirá el mismo patrón Hero interior + ConfidentialityLine + Testimonial filtrado por context='retiros'; services.ts Retiros campos description/audience/outcomes pendientes para Plan 04
  - 02-05 (contacto) — recibe inbound link desde la tertiary CTA `/contacto#form` del acompanamiento CTABlock
  - 02-06 (copy-linter) — debe exentar la cláusula-denial "No es terapia ni servicio de salud" en services.ts description (intencional, dentro del registro permitido)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Page-of-sections composition: importar 4 sections + 3 data modules + map data into JSX — todos los strings vienen de la capa de datos, ninguno hardcodeado en el JSX"
    - "Acompañamiento como primer consumer del Hero variant='interior' + lead slot — el slot del Hero queda vacío (sin CTA cluster en el hero), lead aparece bajo H1"
    - "BASE_URL trim para tertiary CTA interno: const baseTrimmed = import.meta.env.BASE_URL.replace(/\\/$/, '') + ${baseTrimmed}/contacto#form (Pitfall #13 carry)"
    - "PROHIBIDO scan: 0 ocurrencias de 'paciente' y 'tratamiento' en dist/acompanamiento/index.html — copy v1 limpio antes de linter Plan 06"
    - "Display-md italic role expandido al step subhead (4to rol sancionado por UI-SPEC §Typography: máxima/testimonial-quote/confidentiality/step-subhead)"
    - "List marker via ::before pseudo-element con content '◆' color orange-mystic — bullet personalizado dentro del UI-SPEC §Color §Reserved-for regla #4"

key-files:
  created: []
  modified:
    - "src/data/services.ts (31 → 49 líneas) — Acompañamiento gains description/audience/outcomes[4]/confidentialityLine; Retiros gains confidentialityLine only; CONFIDENTIALITY constant extracted"
    - "src/pages/acompanamiento.astro (42 → 194 líneas) — rewrite total componiendo 7 sections LOCKED + 3 proceso steps v1 + scoped styles para Para quién/Qué pasa/Cómo funciona"

key-decisions:
  - "ProcesoSteps definido localmente en acompanamiento.astro (no en services.ts) — son específicos del flujo de acompañamiento y no se reutilizan en /retiros que tiene su propio 3-fases (Plan 04)"
  - "Hero lead viene de string LOCKED en la página (no de services.description) — services.description es 2 sentencias para Para quién/contexto; el hero lead es la 1ra sentencia truncada y editorial. Decisión: mantenerlos desacoplados para que Sofía pueda variar lead sin afectar el cuerpo"
  - "Step subhead usa font-style: italic + display-md — UI-SPEC §Typography reserva display-md italic a 4 roles: máxima, testimonial quote, confidentiality, **numbered-step subhead**. Esta página es la primera en consumir el 4to rol"
  - "Bullet marker '◆' via ::before — UI-SPEC §Color §Reserved-for rule #4 dice marker color orange-mystic. Usé ::before con position absolute + padding-left 28px en lugar de list-style-type + ::marker porque ::marker tiene soporte CSS inconsistente para color en algunos browsers"
  - "Tertiary CTA tertiary apunta a /planetapsilo/contacto#form con BASE_URL trim — sin trailing slash, Astro normaliza la ruta. Pattern consistente con BaseLayout.astro y CTABlock en home"
  - "WhatsApp prefill 'Hola planetapsilo, me interesa explorar el acompañamiento' — D-19 LOCKED rotation; aria-label más descriptivo 'Escribir a planetapsilo por WhatsApp sobre acompañamiento' para diferenciarlo del 'Escribir por WhatsApp' del WhatsAppFloat global"
  - "No se añade nuevo testimonio — el existente en testimonials.ts context='acompanamiento' (D., C-Level retail, 47 — Medellín) se consume directamente; Plan 02 lo dejó listo"

patterns-established:
  - "Page composition: BaseLayout + Hero(variant=interior) + custom content sections + Testimonial + ConfidentialityLine + CTABlock — patrón que /retiros (Plan 04) y /contacto (Plan 05) replicarán con sus respectivos shifts"
  - "Custom content sections (Para quién, Qué pasa, Cómo funciona) usan <section class='content-section narrow'> con padding-block: var(--space-section), max-width 42rem — alineado con BrandBio component pattern pero sin centrar texto"
  - "ProcesoSteps con grid 48px 1fr: step-num display-xl Fraunces 300 orange + step-body con h3 italic + p body-md — accesible (1 step = 1 <li>) y escaneable"
  - "Bullet marker custom via ::before — alternativa robusta a list-style-type, color orange-mystic respetado"

requirements-completed:
  - CONT-02
  - CONT-09
  - CONT-12

# Metrics
duration: 3m 10s
completed: 2026-05-23
---

# Phase 2 Plan 03: /acompanamiento Page Composition Summary

**Primera página interior (/acompanamiento) compuesta consumiendo el section library de Plan 02 — 7 sections LOCKED, copy v1 dentro del glosario PERMITIDO, CTABlock con prefill rotation por contexto (D-19), Service interface poblada con description/audience/outcomes/confidentialityLine.**

## Performance

- **Duration:** 3m 10s
- **Started:** 2026-05-23T01:31:50Z
- **Completed:** 2026-05-23T01:35:00Z
- **Tasks:** 2
- **Files modified:** 2 (0 created, 2 modified)

## Accomplishments

- **`src/data/services.ts`** evoluciona de 31 → 49 líneas. La entrada Acompañamiento gana 4 campos poblados:
  - `description` (2 sentences, incluye cláusula-denial "No es terapia ni servicio de salud")
  - `audience` (ICP description — C-Level negociando salida/venta, founders cuando el problema dejó de ser de equipo, nómadas digitales en piloto automático)
  - `outcomes` (4 bullets describiendo Qué pasa en un encuentro: conversación uno-a-uno sin protocolo clínico, encuentros recurrentes, trabajo desde la pregunta, sin diagnóstico)
  - `confidentialityLine` (constante CONFIDENTIALITY compartida — D-27 LOCKED string)
  - La entrada Retiros recibe sólo `confidentialityLine`; Plan 04 completa los demás campos
- **`src/pages/acompanamiento.astro`** reescrito de 42 → 194 líneas. Compone:
  - **Sección 1** Hero variant='interior' (min 60vh, opacity 0.5) con H1 'Acompañamiento' + lead body-lg 19px muted ("Conversaciones sostenidas para mentes que ya construyeron mucho y ahora necesitan ver desde otra altura.")
  - **Sección 2** Para quién — H2 display-lg 300 + paragraph desde `services.audience`
  - **Sección 3** Qué pasa en un encuentro — H2 + unordered list mapeando `services.outcomes`, list marker custom '◆' color orange-mystic via ::before
  - **Sección 4** Cómo funciona el proceso — H2 + 3-step numbered list, cada step con grid 48px+1fr: step-num orange display-xl + h3 Fraunces 500 italic display-md (4to rol sancionado del italic-only rule) + body-md descripción
  - **Sección 5** Testimonial filtrado por `context === 'acompanamiento'` (D., C-Level retail, 47 — Medellín) — quote LOCKED en testimonials.ts Plan 02
  - **Sección 6** ConfidentialityLine consumiendo `services.confidentialityLine` (D-27 LOCKED)
  - **Sección 7** CTABlock — primary Calendly external + secondary WhatsApp con `waLink('Hola planetapsilo, me interesa explorar el acompañamiento')` external + tertiary `/planetapsilo/contacto#form` internal
- **Per-page meta CONT-12:** title='Acompañamiento — planetapsilo' + LOCKED description ("Encuentros uno-a-uno para C-Level, founders y nómadas digitales que están reordenando algo importante. No es terapia — es acompañamiento no clínico.") + noindex inherited from BaseLayout
- **ProcesoSteps v1** (3 steps Claude-authored dentro del glosario PERMITIDO):
  1. "Una conversación inicial" — 30 minutos sin compromiso para saber si calzan
  2. "Encuentros sostenidos" — semanales/quincenales/mensuales, 60-90 min, online o presencial en Bogotá
  3. "Revisión cada cierto tiempo" — pausa para mirar el proceso, decisión de cierre en manos del consultante

## Task Commits

Cada task se commiteó atómicamente:

1. **Task 1: Extend services.ts** — `aa6efd7` (feat) — Acompañamiento gains description/audience/outcomes[4]/confidentialityLine; Retiros gains confidentialityLine; CONFIDENTIALITY constant extracted
2. **Task 2: Rewrite acompanamiento.astro composing 7 sections** — `c8d8c09` (feat) — 7-section composition with LOCKED copy + procesoSteps v1 + scoped styles

**Plan metadata commit:** pendiente (incluirá este SUMMARY.md + STATE.md + ROADMAP.md + REQUIREMENTS.md)

## Files Modified

### Modified (2)

- `src/data/services.ts` (31 → 49 líneas) — Acompañamiento entry expandida con 4 campos poblados; Retiros entry recibe confidentialityLine seed; CONFIDENTIALITY constant compartida entre ambos servicios
- `src/pages/acompanamiento.astro` (42 → 194 líneas) — rewrite total componiendo 7 sections LOCKED; nueva sección frontmatter con imports + data filter + procesoSteps; scoped styles para .content-section .narrow + bullets ::before marker + .steps grid layout

## LOCKED strings landed in dist/acompanamiento/index.html

Verificado via grep contra `dist/acompanamiento/index.html` post-build:

| LOCKED string | Verificado |
|---|---|
| `<title>Acompañamiento — planetapsilo</title>` | sí |
| `<meta name="description" content="Encuentros uno-a-uno para C-Level, founders y nómadas digitales que están reordenando algo importante. No es terapia — es acompañamiento no clínico.">` | sí |
| `<meta name="robots" content="noindex,nofollow">` (Phase 1 gate preservado) | sí |
| H1 `<h1 data-astro-cid-...>Acompañamiento</h1>` (con scoped class atributo) | sí |
| Hero lead "Conversaciones sostenidas para mentes que ya construyeron mucho y ahora necesitan ver desde otra altura." | sí |
| H2 #1 "Para quién" | sí |
| Audience paragraph "Pensado para C-Level que están negociando una venta..." | sí |
| H2 #2 "Qué pasa en un encuentro" | sí |
| 4 outcome bullets (mapped from services.outcomes) | sí |
| H2 #3 "Cómo funciona el proceso" | sí |
| 3 step subheads (h3 italic): "Una conversación inicial" / "Encuentros sostenidos" / "Revisión cada cierto tiempo" | sí |
| Testimonial quote LOCKED ("Llevábamos cuatro encuentros cuando entendí que el problema no era de equipo. Era una pregunta que yo no me estaba haciendo.") | sí |
| Testimonial attribution "D., C-Level retail, 47 — Medellín" | sí |
| Testimonial disclaimer LOCKED (Phase 2 ilustrativo) | sí |
| Confidentiality "Lo que se conversa aquí no sale de aquí. Trabajamos con discreción profesional y archivamos sólo lo mínimo necesario." | sí |
| CTA primary "Agenda una conversación" → `https://calendly.com/planetapsilo/conversacion-inicial` target=_blank rel=noopener noreferrer | sí |
| CTA secondary "Escribir por WhatsApp" → `https://wa.me/57XXXXXXXXXX?text=Hola%20planetapsilo%2C%20me%20interesa%20explorar%20el%20acompa%C3%B1amiento` target=_blank rel=noopener noreferrer aria-label específico | sí |
| CTA tertiary "Prefiero escribir un formulario" → `/planetapsilo/contacto#form` (BASE_URL aplicado) | sí |

**Build output size:** dist/acompanamiento/index.html = **12,709 bytes** (~12.7 KB). Bien debajo del cap de 80 KB del verification gate.

## Section Order — LOCKED Match against UI-SPEC

UI-SPEC §"/acompanamiento — 7 sections" requires this exact sequence:

| # | Section | Component | Variant | Source data |
|---|---------|-----------|---------|-------------|
| 1 | Hero short | `Hero.astro` | `interior` | LOCKED in-page (title + lead) |
| 2 | Para quién | inline `<section>` | n/a | `services.audience` (Task 1) |
| 3 | Qué pasa en un encuentro | inline `<section>` + `<ul>` | n/a | `services.outcomes[4]` (Task 1) |
| 4 | Cómo funciona el proceso | inline `<section>` + `<ol>` | n/a | `procesoSteps[3]` local (Task 2) |
| 5 | Testimonial contextual | `Testimonial.astro` | n/a | `testimonials.find(t => t.context === 'acompanamiento')` |
| 6 | Confidentiality one-liner | `ConfidentialityLine.astro` | n/a | `services.confidentialityLine` (Task 1) |
| 7 | CTABlock | `CTABlock.astro` | 3 niveles | LOCKED hrefs/labels in-page |

Verified: 7 `<section>` elements in built HTML in this exact order.

## Open Items for Sofía (refinement / decisions)

| Ítem | Decisión | Cuándo |
|---|---|---|
| Hero lead wording | Anchor: "Conversaciones sostenidas para mentes que ya construyeron mucho y ahora necesitan ver desde otra altura." — derivado de services.description; Sofía puede ajustar mantenida la longitud (1 frase) y el glosario | Cualquier momento antes de Phase 2 close |
| ProcesoSteps (Sección 4) wording | Los 3 steps son v1 por Claude dentro del glosario PERMITIDO. Sofía puede reescribirlos respetando: paso 1 = pre-screen de fit, paso 2 = cadencia + duración + modalidad, paso 3 = revisión periódica. El array `procesoSteps` está en líneas 22-37 de `src/pages/acompanamiento.astro` | Cualquier momento antes de Phase 2 close |
| Audience paragraph wording (Sección 2) | Sofía puede pulir la frase final ("empiezan a notar el costo") si quiere matizar — el resto describe los 3 segmentos ICP correctamente | Cualquier momento |
| 4 outcomes bullets (Sección 3) | v1 por Claude — Sofía puede reescribir 2 bullets si quiere personalizar más. Las 4 entradas viven en `src/data/services.ts` líneas 22-27 | Cualquier momento |
| Testimonial wording | El testimonio de D. (C-Level retail, 47 — Medellín) sigue siendo placeholder (Plan 02 lo dejó así). Phase 3 LEGAL-07 lo reemplaza con consentido real | Phase 3 |
| Calendly URL real | `https://calendly.com/planetapsilo/conversacion-inicial` sigue placeholder — Phase 3 LEGAL-09 conecta el evento real | Phase 3 |

## Deviations from Plan

Plan ejecutado exactamente como escrito. Las 2 tasks landearon con el contenido LOCKED que el `<action>` block dicta. Las acceptance criteria pasaron en el primer build. Cero auto-fixes Rule 1/2/3 requeridos.

### Auto-fixed Issues

Ninguno — sin Rule 1/2/3 activations. El plan estaba completo y self-contained.

### No-Rule observaciones (verify-clause artifacts, no bloqueantes)

**1. [No-Rule observación] Conteo `ctaLabel:` via grep -c incluye declaración de interfaz**

- **Encontrado en:** Task 1 al ejecutar la verify clause `[ "$(grep -c 'ctaLabel:' src/data/services.ts)" = "2" ]`
- **Hecho:** `grep -c "ctaLabel:" src/data/services.ts` devuelve **3** porque cuenta también la línea de la interfaz TypeScript `ctaLabel: string;`
- **Semántica:** Los conteos reales de **datos** son 2 (una por entrada de service); la criteria se cumple por completo a nivel de contenido — Plan 02 documentó este mismo artefacto regex
- **Fix:** Ninguno — el archivo tiene el shape exacto que el plan dicta. La verify regex era demasiado laxa
- **Files:** `src/data/services.ts`

**2. [No-Rule observación] `<h1>Acompañamiento</h1>` no matchea exact-string en dist por scoped-CSS attribute**

- **Encontrado en:** Task 2 acceptance criteria — `grep -q "<h1>Acompañamiento</h1>" dist/acompanamiento/index.html` falla
- **Hecho:** Astro emite `<h1 data-astro-cid-anhloy43>Acompañamiento</h1>` (con el atributo de scoped CSS que Hero.astro inyecta), no `<h1>Acompañamiento</h1>` exacto
- **Semántica:** El semantic check `grep -qE "<h1[^>]*>Acompañamiento</h1>"` matchea correctamente. El H1 está presente, correctamente etiquetado, exactamente con el texto LOCKED. Plan 02 documentó la misma observación para todas sus H2/H3 con scoped-class attributes
- **Fix:** Ninguno — la acceptance criteria se cumple semánticamente. La regex del plan no contempla los atributos de scoped CSS que Astro añade automáticamente
- **Files:** `dist/acompanamiento/index.html`

**3. [No-Rule observación] `<h2` count via `grep -c` devuelve 1 (Astro HTML compacto en una línea)**

- **Encontrado en:** Task 2 acceptance criteria — `grep -c "<h2" dist/acompanamiento/index.html` devuelve 1 en lugar de 3
- **Hecho:** Astro emite HTML compacto en una sola línea. `grep -c` cuenta **líneas** que matchean, no **ocurrencias**
- **Semántica:** `grep -o "<h2" dist/acompanamiento/index.html | wc -l` devuelve **3** (Para quién, Qué pasa, Cómo funciona). Plan 02 documentó este mismo artefacto para `<details>` y otros conteos
- **Fix:** Ninguno — la criteria se cumple por contenido
- **Files:** `dist/acompanamiento/index.html`

## Authentication Gates Encountered

Ninguno. No hay paths que requieran auth en este plan.

## Issues Encountered

Ninguno. El plan estaba self-contained y todos los componentes consumidos de Plan 02 estaban listos en su API exacto (Hero variant='interior' + lead, Testimonial quote/attribution/disclaimer, ConfidentialityLine text, CTABlock primary/secondary/tertiary con `external` flag y `ariaLabel` opcional).

## Verification Gates (All Passed)

1. ✓ `npm run build` exits 0 sin warnings (7 pages en ~1.5s)
2. ✓ `dist/acompanamiento/index.html` contiene todas las strings LOCKED (title, description, robots, H1, hero lead, 3 H2s, audience paragraph, 4 outcomes bullets, 3 step subheads, testimonial quote+attribution+disclaimer, confidentiality, 3 CTABlock buttons con hrefs correctos)
3. ✓ `dist/index.html` home page sigue intacto (regression check — H1 + máxima + testimonio home + título sin sufijo)
4. ✓ `dist/acompanamiento/index.html` size = 12,709 bytes (<80 KB cap)
5. ✓ 0 ocurrencias de PROHIBIDO words "paciente" / "tratamiento" en dist/acompanamiento/index.html
6. ✓ 3 `<h2>` elements (Para quién, Qué pasa, Cómo funciona) via `grep -o`
7. ✓ 3 `<h3>` elements (step subheads) via `grep -o`
8. ✓ 7 `<section>` elements (Hero + 3 content + Testimonial + Confidentiality + CTABlock)
9. ✓ 5 `rel="noopener noreferrer"` en dist/acompanamiento (Cal+WA from CTABlock, WhatsAppFloat global, IG+TikTok footer)
10. ✓ Tertiary form-link apunta a `/planetapsilo/contacto#form` (BASE_URL aplicado)
11. ✓ WA secondary URL contiene prefill URL-encoded `me%20interesa%20explorar%20el%20acompa%C3%B1amiento` (D-19 rotation por contexto)
12. ✓ CSS bundles preservan 3 instancias de `prefers-reduced-motion` (BaseLayout + page-scoped)

## Threat Surface Scan

Todos los archivos modificados encajan con el threat model en `02-03-PLAN.md` §`<threat_model>`. Las 2 entradas STRIDE están mitigadas:

- **T-02-09 (Repudiation copy clínico — mitigate):** Copy v1 dentro del glosario PERMITIDO; cláusula-denial "No es terapia ni servicio de salud" intencional en services.description; 0 ocurrencias de "paciente"/"tratamiento" en dist/acompanamiento. Plan 06 lint exempts la cláusula-denial.
- **T-02-10 (Tampering WhatsApp prefill rotation — mitigate):** El prefill 'Hola planetapsilo, me interesa explorar el acompañamiento' se pasa a `waLink()` (Plan 01) que centraliza `encodeURIComponent`. El prefill es literal hardcodeado en el `.astro` source, ningún user input lo construye. Verificado URL-encoded correctamente en dist.

No se introducen `threat_flag:` nuevos — cero endpoints de red nuevos, cero auth paths nuevos, cero file access patterns nuevos, cero cambios de schema en boundaries de confianza.

## Known Stubs

| Stub | File | Por qué |
|------|------|---------|
| Testimonio context='acompanamiento' (D., C-Level retail) sigue placeholder con disclaimer LOCKED | `src/data/testimonials.ts` (Plan 02 created) | Por diseño — Phase 3 LEGAL-07 lo reemplaza con consentido real. Disclaimer presente comunica al visitante que es ilustrativo. |
| ProcesoSteps v1 wording | `src/pages/acompanamiento.astro` líneas 22-37 | Por diseño — Claude v1 dentro glosario; Sofía refina cuando tenga tiempo. Funcionalmente completos. |
| Hero lead wording | `src/pages/acompanamiento.astro` línea 47 | Anchor wording, abierto a refinement por Sofía. |
| 4 outcomes bullets wording | `src/data/services.ts` líneas 22-27 | Claude v1 dentro glosario; Sofía refina si quiere personalizar |
| Audience paragraph wording | `src/data/services.ts` línea 21 | Claude v1 dentro glosario; Sofía refina |
| Calendly URL `https://calendly.com/planetapsilo/conversacion-inicial` | `src/data/contact.ts` (Plan 01) | Placeholder — Phase 3 LEGAL-09 conecta evento real |
| WhatsApp number `57XXXXXXXXXX` | `src/data/contact.ts` (Plan 01) | Pending Sofía — Phase 4 VAL-05 evalúa Business número |

Todos trackeados en STATE.md blockers y PROJECT.md Active requirements.

## Self-Check: PASSED

**Archivos verificados que existen:**

- `src/data/services.ts` — FOUND (modified, 49 líneas)
- `src/pages/acompanamiento.astro` — FOUND (modified, 194 líneas)
- `dist/acompanamiento/index.html` — FOUND (post-build, 12,709 bytes)
- `.planning/phases/02-mvp-content-three-channel-contact/02-03-SUMMARY.md` — FOUND (this file)

**Commits verificados en git log:**

- `aa6efd7` — FOUND (Task 1: extend services.ts)
- `c8d8c09` — FOUND (Task 2: rewrite acompanamiento.astro)

## Next Plan Readiness

Plan 04 (retiros) puede:

- `import Hero from '../components/sections/Hero.astro'` con `variant="interior"` para el hero short del /retiros (mismo patrón que /acompanamiento)
- `import Testimonial from '...'` y filtrar por `t.context === 'retiros'` — el testimonio (A., founder e-commerce, 38 — Bogotá) ya está LOCKED en testimonials.ts Plan 02
- `import ConfidentialityLine from '...'` consumiendo `services.confidentialityLine` (Plan 03 seeded la constante para retiros también)
- Crear `RetreatPhases.astro` (3-card grid Preparación/Inmersión/Integración) — NEW component scoped al Plan 04
- Importar `services.find(s => s.slug === 'retiros')` — Plan 04 expandirá los campos description/audience/outcomes para retiros (Plan 03 dejó retiros con sólo confidentialityLine)
- Confiar en que `/acompanamiento` sirve de plantilla: page composition pattern (BaseLayout + Hero interior + custom sections + Testimonial filtrado + ConfidentialityLine + CTABlock/FormSection) es directamente transferible

Plan 05 (contacto) puede confiar en que la tertiary CTA del CTABlock acompanamiento apunta a `/planetapsilo/contacto#form` — el anchor `#form` debe existir en /contacto cuando Plan 05 cree el ContactForm.

Sin blockers para Plan 04.

---
*Phase: 02-mvp-content-three-channel-contact*
*Completed: 2026-05-23*
