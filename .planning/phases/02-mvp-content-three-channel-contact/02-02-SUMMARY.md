---
phase: 02-mvp-content-three-channel-contact
plan: 02
subsystem: ui
tags: [astro, sections, hero, brandbio, services-split, testimonial, faq, cta-block, confidentiality-line, home-page]

# Dependency graph
requires:
  - phase: 02-mvp-content-three-channel-contact
    plan: 01
    provides: "Button.astro 3 variants + contact.ts (calendlyUrl, waLink) + services.ts shape + Footer/WhatsAppFloat wired"
provides:
  - "Hero.astro — variant home/interior con kicker/title/maxim/lead props + slot"
  - "BrandBio.astro — bloque centrado 2-3 párrafos LOCKED"
  - "ServiceTeaser.astro — card H3 + teaser + tertiary Button CTA"
  - "ServicesSplit.astro — grid 1col/2col mapeando array services con internal() helper"
  - "Testimonial.astro — figure+blockquote semántico con quote/attribution/disclaimer"
  - "FAQ.astro — <details> nativo zero JS + chevron rotate-90 [open] con reduced-motion override"
  - "ConfidentialityLine.astro — frase única display-md italic centrada (D-27)"
  - "CTABlock.astro — compone hasta 3 Buttons (primary obligatorio + secondary/tertiary opcionales)"
  - "src/data/testimonials.ts — 3 testimonios placeholder (home/acompanamiento/retiros) con disclaimer LOCKED compartido"
  - "src/data/faqs.ts — 6 FAQs LOCKED (D-13) dentro de glosario PERMITIDO con cláusula-denial"
  - "src/data/services.ts — interfaz Service extendida con ctaLabel + campos opcionales para Plans 03/04"
  - "src/pages/index.astro — home compuesto con 6 secciones en orden LOCKED"
affects:
  - 02-03 (acompanamiento) — consumirá Hero variant=interior + BrandBio + ConfidentialityLine + Testimonial + CTABlock
  - 02-04 (retiros) — consumirá Hero variant=interior + ConfidentialityLine + Testimonial + RetreatPhases (NEW Plan 04)
  - 02-05 (contacto) — consumirá Hero variant=interior + CTABlock + ContactForm (NEW Plan 05)
  - 02-06 (copy-linter) — debe exentar cláusulas-denial en BrandBio P1+P2 y FAQ #1 ("No es terapia"/"No constituye terapia")

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Section component library — todos los nuevos components viven en src/components/sections/, todos consumen var(--space-section) para padding-block"
    - "Italic-only rule sobre display-md — máxima/testimonial-quote/confidentiality LOCKED al rol display-md italic para disambiguar overlap con display-lg en el rango clamp 26-30px"
    - "FAQ con <details>/<summary> nativo + chevron CSS rotate-90 [open] — cero JS, cero dependencias, accordion accesible por defecto"
    - "ServicesSplit con grid 1fr → repeat(2, 1fr) en min-width 640px — derivado de obras.astro (3col) capeado a 2col"
    - "CTABlock acepta primary/secondary/tertiary opcionales — algunas páginas (/retiros) omiten primary+secondary y usan solo application form"
    - "Inline hero CTA en index.astro replica visualmente las clases Button.primary/secondary (12px 28px, pill 999px, 17px Inter 500) sin importar Button — mantiene el slot del Hero liviano"
    - "Testimonial estructura semántica <figure><blockquote><figcaption> — accesibilidad por defecto, no requiere ARIA"

key-files:
  created:
    - "src/components/sections/Hero.astro (94 líneas) — variant discriminator + slot para CTA cluster"
    - "src/components/sections/BrandBio.astro (29 líneas) — centered max-width 42rem"
    - "src/components/sections/ConfidentialityLine.astro (28 líneas) — display-md italic centrada"
    - "src/components/sections/Testimonial.astro (62 líneas) — figure semántico"
    - "src/components/sections/ServiceTeaser.astro (45 líneas) — card con Button tertiary CTA"
    - "src/components/sections/ServicesSplit.astro (53 líneas) — grid responsive + internal() helper"
    - "src/components/sections/CTABlock.astro (60 líneas) — compose Button x 3"
    - "src/components/sections/FAQ.astro (95 líneas) — <details> zero JS + reduced-motion"
    - "src/data/testimonials.ts (37 líneas) — 3 testimonios placeholder + DISCLAIMER compartido"
    - "src/data/faqs.ts (37 líneas) — 6 FAQs dentro glosario"
  modified:
    - "src/data/services.ts (26 → 31 líneas) — interfaz Service con ctaLabel + campos opcionales"
    - "src/pages/index.astro (76 → 132 líneas) — rewrite total componiendo 6 secciones LOCKED"

key-decisions:
  - "Cero nuevos design tokens — todos los components consumen Phase 1 tokens + Phase 2 Plan 01 Button primitive como-está, sin tocar tokens.css ni global.css"
  - "Italic reservado al rol display-md (máxima/quote/confidentiality) — el clamp overlap entre display-md (20–30px) y display-lg (26–32px) se disambigua exclusivamente con italic 300, regla CRITICAL del UI-SPEC"
  - "FAQ usa <details>/<summary> nativo + chevron CSS — sin librería de accordion, sin runtime JS, cumple zero-JS-by-default y reduced-motion sin esfuerzo"
  - "Inline hero CTA pattern en index.astro: en lugar de importar Button dos veces más en el slot del Hero, se replican las reglas visuales (border-radius, padding, font-size, transitions) inline — el Plan 07 audit podrá confirmar paridad pixel-perfect con la primitiva Button"
  - "ServicesSplit usa min-width: 640px (Tailwind sm breakpoint) para activar 2col — coincide con UI-SPEC §Breakpoints tablet=640px"
  - "Cap el cap del grid de obras (3col) a 2col en ServicesSplit — el home services-split sólo tiene 2 cards (Acompañamiento/Retiros) y 3col haría columnas raquíticas"
  - "Title del home omitido del prop title → BaseLayout cae al site.name (planetapsilo) sin sufijo '— planetapsilo'; cumple UI-SPEC §Per-page meta home row"
  - "Disclaimer DISCLAIMER constante compartida entre los 3 testimonios — Phase 3 LEGAL-07 reemplazará por consentidos reales y la constante desaparece"
  - "ServicesSplit lo importa Hero pero el internal() helper se define localmente en cada componente que tiene links internos (Pitfall #13 carry) — no se elevó a global helper para mantener autonomía del componente"

patterns-established:
  - "Section component library convention: src/components/sections/{Name}.astro, todos consumen var(--space-section), todos con Props interface tipado, todos zero JS salvo lo estrictamente necesario"
  - "Hero variant discriminator: 'home' (100vh / 0.85 opacity / máxima slot) vs 'interior' (60vh / 0.5 opacity / lead slot)"
  - "Page-of-sections composition: import sections + import data + map data → JSX → cada section recibe slice tipado del data"
  - "Reduced-motion gate por componente con motion: cada .astro que define transition/animation incluye su propio @media (prefers-reduced-motion: reduce) override — defense in depth sobre el override global de global.css"

requirements-completed:
  - CONT-01
  - CONT-06
  - CONT-07
  - CONT-08
  - CONT-12

# Metrics
duration: 4m 58s
completed: 2026-05-23
---

# Phase 2 Plan 02: Section Component Library + Home Page Composition Summary

**Section component library (8 nuevos componentes en src/components/sections/) + 2 nuevos data modules (testimonials, faqs) + services.ts extendido + index.astro reescrito componiendo las 6 secciones LOCKED del home — sienta el catálogo de piezas off-the-shelf que los Plans 03-05 importan directamente para acompañamiento, retiros y contacto.**

## Performance

- **Duration:** 4m 58s
- **Started:** 2026-05-23T01:20:03Z
- **Completed:** 2026-05-23T01:25:01Z
- **Tasks:** 3
- **Files modified:** 12 (10 created, 2 modified)

## Accomplishments

- **Hero.astro** parametriza el patrón inline del Phase 1 (`src/pages/index.astro` líneas 13–74) en un componente con variant discriminator: `home` (min 100vh / opacity 0.85 / kicker + máxima slot) vs `interior` (min 60vh / opacity 0.5 / lead slot). Acepta `<slot />` para que las páginas inserten su propio CTA cluster (el home lo aprovecha para el dual CTA inline).
- **BrandBio.astro** centra hasta N párrafos en max-width 42rem con `body-md 17px / line-height 1.7`. Recibe `paragraphs: string[]`. El home le pasa los 2 párrafos LOCKED P1+P2 del UI-SPEC; el párrafo 3 opcional queda diferido hasta que Sofía lo redacte.
- **ConfidentialityLine.astro** renderiza una sola frase en Fraunces 300 italic display-md centrada muted, padding-block `--space-section`. Pensado para `/acompanamiento` y `/retiros` (Plans 03/04) — el home no la consume.
- **Testimonial.astro** usa `<figure><blockquote><figcaption>` semántico (accesibilidad por defecto). Quote en Fraunces 300 italic display-md, attribution en Inter 500 body-sm 14px, disclaimer en Inter 400 body-xs 13px. Disclaimer es opcional pero presente en Phase 2 (todo testimonio es placeholder).
- **ServiceTeaser.astro** card con padding 32×24, background `--color-bg-elevated`, border-radius 12px, border 1px chrome. H3 en Fraunces 500 display-lg (la regla H2-vs-H3 carries weight 300 vs 500 al mismo tamaño). CTA tertiary delegada al Button primitive del Plan 01.
- **ServicesSplit.astro** mapea un array de servicios sobre ServiceTeaser. Grid 1fr en mobile → `repeat(2, 1fr)` en `min-width: 640px` (breakpoint tablet del UI-SPEC). Define `internal()` helper localmente para componer `${BASE_URL}/${slug}` sin importar de Nav.
- **CTABlock.astro** acepta `primary` (obligatorio) + `secondary` opcional + `tertiary` opcional, renderiza cada uno como instancia de Button. Layout flex con gap 32px en desktop, gap 16px vertical en mobile (<640px). Cada slot opcional permite a /retiros (sin Calendly+WhatsApp) y a /contacto (3 niveles completos) compartir el mismo componente.
- **FAQ.astro** entrega accordion `<details><summary>` nativo cero JS. Chevron es inline SVG 16×16 que rota 90° via `[open] .chevron { transform: rotate(90deg) }` con transición 200ms ease y `@media (prefers-reduced-motion: reduce) { .chevron { transition: none; } }` override local. Color del chevron cambia a `--color-orange-mystic` cuando está open. Summary tipografía: Fraunces 500 clamp(20px → 26px), focus-visible ring 2px orange con offset 4px.
- **testimonials.ts** declara 3 testimonios placeholder con `context` discriminator ('home' / 'acompanamiento' / 'retiros') + quote + attribution + disclaimer. Disclaimer es una constante `DISCLAIMER` compartida (LOCKED string del UI-SPEC). El home filtra `t.context === 'home'`; los Plans 03/04 harán filtros equivalentes para sus contextos.
- **faqs.ts** declara 6 FAQs LOCKED (D-13): encuadre legal, confidencialidad, fit personal, qué pasa en un encuentro, duración del proceso, acompañamiento vs retiro. Las respuestas respetan el glosario `docs/copy-glossary.md` — incluyen cláusula-denial "No constituye terapia ni servicio de salud" en FAQ #1 que el linter del Plan 06 exentará.
- **services.ts** evoluciona la interfaz: `ServicePlaceholder` → `Service` con campos obligatorios `slug/label/teaser/ctaLabel` y opcionales `description/audience/outcomes/confidentialityLine` (Plans 03/04 los consumirán). Teasers reescritos con copy real, ctaLabels LOCKED "Conocer el acompañamiento" y "Conocer los retiros".
- **src/pages/index.astro** reescrito por completo: importa 6 componentes de section + 4 data modules + contact.ts. Compone Hero (variant=home, dual CTA inline en slot) → BrandBio → ServicesSplit → Testimonial (filtrado home) → FAQ → CTABlock (primary Calendly + secondary WhatsApp con waLink + tertiary form-link a /contacto#form). El `title` prop se omite intencionalmente para que `BaseLayout` caiga al `site.name` y emita `<title>planetapsilo</title>` sin sufijo (CONT-12 home row).

## Task Commits

Cada task se commiteó atómicamente:

1. **Task 1: Hero + BrandBio + ConfidentialityLine + Testimonial** — `9a13694` (feat) — 4 componentes presentacionales zero JS
2. **Task 2: ServiceTeaser + ServicesSplit + CTABlock + FAQ + extend services + add faqs** — `3087215` (feat) — 4 components + 2 data files
3. **Task 3: testimonials data + rewrite index.astro composing 6 sections** — `b53fc10` (feat) — home compuesto y renderizando todas las strings LOCKED

**Plan metadata commit:** pendiente (incluirá este SUMMARY.md + STATE.md + ROADMAP.md + REQUIREMENTS.md)

## Files Created/Modified

### Created (10)

- `src/components/sections/Hero.astro` — 94 líneas; Props discriminator + slot para CTA cluster
- `src/components/sections/BrandBio.astro` — 29 líneas; centered 42rem
- `src/components/sections/ConfidentialityLine.astro` — 28 líneas; display-md italic single line
- `src/components/sections/Testimonial.astro` — 62 líneas; figure+blockquote semántico
- `src/components/sections/ServiceTeaser.astro` — 45 líneas; card con Button tertiary
- `src/components/sections/ServicesSplit.astro` — 53 líneas; grid 1/2 col + internal() helper
- `src/components/sections/CTABlock.astro` — 60 líneas; compose Button x 3 con primary obligatorio
- `src/components/sections/FAQ.astro` — 95 líneas; <details> zero JS + reduced-motion override
- `src/data/testimonials.ts` — 37 líneas; 3 placeholders + DISCLAIMER compartido
- `src/data/faqs.ts` — 37 líneas; 6 FAQs dentro glosario PERMITIDO

### Modified (2)

- `src/data/services.ts` (26 → 31 líneas) — interfaz Service extendida; teasers reescritos; ctaLabel LOCKED por card
- `src/pages/index.astro` (76 → 132 líneas) — rewrite total componiendo Hero→BrandBio→ServicesSplit→Testimonial→FAQ→CTABlock; inline dual CTA en hero slot

## LOCKED strings landed in dist/index.html

Verificado via grep contra `dist/index.html` post-build:

| LOCKED string | Verificado |
|---|---|
| H1 home: `Acompañamiento y retiros para liderazgos que están reordenando.` | sí |
| Máxima: `La claridad no se conquista. Se recuerda.` | sí |
| Brand bio P1 (con cláusula-denial "No es terapia ni servicio de salud") | sí |
| Brand bio P2 ("Cada propuesta recibe a pocas personas...") | sí |
| ServiceTeaser CTA Acompañamiento: `Conocer el acompañamiento` | sí |
| ServiceTeaser CTA Retiros: `Conocer los retiros` | sí |
| Testimonial home quote: `Vine reordenando una venta y salí con algo más vivo que un plan.` | sí |
| Testimonial home attribution: `M., founder fintech, 41 — Bogotá` | sí |
| Testimonial disclaimer LOCKED (Phase 2 ilustrativo) | sí |
| FAQ heading: `Preguntas frecuentes` | sí |
| 6 `<details>` elements (FAQ items) | sí (6 conteos via `grep -o`) |
| CTABlock primary: `Agenda una conversación` (→ contact.calendlyUrl, external) | sí |
| CTABlock secondary: `Escribir por WhatsApp` (→ waLink prefill LOCKED, external) | sí |
| CTABlock tertiary: `Prefiero escribir un formulario` (→ /planetapsilo/contacto#form interno) | sí |
| Hero secondary CTA: `Explora los retiros` (→ /planetapsilo/retiros interno) | sí |
| `<title>planetapsilo</title>` (sin sufijo — CONT-12 home row) | sí |
| `<meta name="description" content="Acompañamiento y retiros para liderazgos..."` | sí |
| `<meta name="robots" content="noindex,nofollow">` (Phase 1 gate preservado) | sí |

**HTML size:** dist/index.html = **14,300 bytes** (~14 KB). Bien debajo del cap de 80 KB del verification gate.

## Open Items for Sofía (refinement / decisions)

| Ítem | Decisión | Cuándo |
|---|---|---|
| Máxima wording (D-04) | El anchor `La claridad no se conquista. Se recuerda.` puede refinarse — Sofía propone wording final dentro del glosario PERMITIDO antes del cierre de Phase 2 | Cualquier momento antes de Phase 2 close |
| Testimonios reales (D-11) | Los 3 testimonios actuales son ilustrativos. Phase 3 LEGAL-07 los reemplaza por testimonios reales con consentimiento escrito archivado. Sofía debe recolectar y consentir antes de removingq `noindex` | Phase 3 |
| Brand bio P3 (D-14, opcional) | El UI-SPEC menciona "Slot for Sofía's optional 3rd párrafo". Actualmente el home renderiza sólo P1+P2 LOCKED. Si Sofía escribe un P3 dentro del glosario, añadirlo al array `brandBioParagraphs` en `index.astro` | Cualquier momento antes de Phase 2 close |
| FAQ #1 wording (legal) | La respuesta de FAQ #1 contiene el denial "No constituye terapia ni servicio de salud" — copy v1 dentro del glosario; flagged for abogado review en Phase 3 LEGAL-01 | Phase 3 |
| ctaLabel uniformity check | Service cards usan "Conocer el acompañamiento" / "Conocer los retiros" — LOCKED en UI-SPEC. Si Sofía prefiere "Explorar" en lugar de "Conocer", se cambia en `services.ts` (un solo lugar) | Cualquier momento |

## Lighthouse Estimate (no Lighthouse run local — pendiente CI o run manual)

Sin Chrome headless en este entorno, no se generó Lighthouse score localmente. Estimación basada en la arquitectura:

- **Performance:** estimado **95-100** mobile. dist/index.html son ~14 KB, una sola hoja CSS de BaseLayout, una hoja CSS scoped del home (~3 KB), cero JS framework runtime (sólo el script vanilla del Nav drawer), fuentes Fraunces + Inter via `display=swap`, una sola imagen (favicon SVG).
- **Accessibility:** estimado **95-100**. Contrast ratios verificados en UI-SPEC §"Contrast verification" (cream sobre dark navy = 17.4:1 AAA, orange button text = 6.1:1 AA). `<figure><blockquote>` para testimonios. `<details><summary>` nativo. Focus-visible rings 2px en todos los CTAs y FAQ summary. aria-labels en CTAs externos. Skip-link y lang="es" ya provistos por Phase 1 BaseLayout.
- **SEO:** estimado **90-100** *cuando se remueva el noindex* (Phase 3 LEGAL-12). Actualmente el `<meta robots noindex,nofollow>` baja el score por design — esto es esperado y correcto hasta Phase 3.
- **Best Practices:** estimado **100**. HTTPS asumido en GH Pages, todos los externos llevan `target="_blank" rel="noopener noreferrer"`, no hay `<img>` sin width/height (no hay imágenes en el home más allá del favicon), no console.errors esperados.

Verifier (`/gsd-verify`) podrá correr Lighthouse cuando llegue su turno y validar contra los gates CONT-15 (≥80 perf / ≥95 a11y / ≥90 SEO mobile).

## Deviations from Plan

Plan ejecutado fielmente. Tres detalles no-bloqueantes a registrar:

### Auto-fixed nada (sin Rule 1-3 activations)

Ningún Rule 1/2/3 se aplicó — el plan estaba completo y sin bugs latentes.

### Inconsistencias menores entre verify-regex y semántica (no bloqueantes)

**1. [No-Rule observación] Conteo de `question:` y `ctaLabel:` incluye declaración de interfaz**

- **Encontrado en:** Tasks 2 y 3 al ejecutar las cláusulas `<verify>` del plan
- **Hecho:** Las regex `grep -c "question:" src/data/faqs.ts` y `grep -c "ctaLabel:" src/data/services.ts` cuentan también las líneas de la interfaz TypeScript (`question: string;` y `ctaLabel: string;`), dando 7 y 3 respectivamente en lugar de 6 y 2 que pide la acceptance criteria
- **Semántica:** Los conteos reales de **datos** son `grep -cE "question:\s+'"` = 6 y `grep -cE "ctaLabel:\s+'"` = 2 — la criteria se cumple por completo a nivel de contenido
- **Fix:** Ninguno — los archivos tienen el shape exacto que el plan dicta (interfaz + array); la regex del verify era simplemente demasiado laxa. Documentado aquí para que el verifier no se confunda.
- **Files:** `src/data/faqs.ts`, `src/data/services.ts`

**2. [No-Rule observación] `<details` count via `grep -c` cuenta líneas, no ocurrencias**

- **Encontrado en:** Task 3 al ejecutar la verify clause `[ "$(grep -c '<details' dist/index.html)" = "6" ]`
- **Hecho:** Astro emite HTML compacto en una sola línea. `grep -c` cuenta **líneas** que matchean, no **ocurrencias** — dio 1 en lugar de 6
- **Semántica:** `grep -o "<details" dist/index.html | wc -l` retorna **6** ocurrencias — los 6 FAQ items están presentes en el output
- **Fix:** Ninguno — la criteria se cumple por contenido; el regex del verify simplemente no soporta HTML one-line
- **Files:** `dist/index.html`

**3. [No-Rule observación] Conteo agregado `prefers-reduced-motion` en src/components/sections/*.astro = 1**

- **Encontrado en:** Verification overall del plan (paso 4: "returns >= 2")
- **Hecho:** Sólo `FAQ.astro` declara `@media (prefers-reduced-motion: reduce)` localmente — los otros 7 components no tienen transitions/animations que necesiten override (son presentacionales puros sin hover effects)
- **Semántica:** El bundle CSS final (`dist/_astro/*.css`) contiene 2 instancias separadas: una en BaseLayout (cubre Button primitive del Plan 01) y otra en el bundle scoped del home (cubre tanto el FAQ chevron como el inline CTA del Hero slot). El override existe donde tiene que existir
- **Fix:** Ninguno — agregar @media bloques "vacíos" a components sin motion sería cargo-cult. Documentado aquí para que el verifier sepa la razón
- **Files:** `src/components/sections/FAQ.astro` (única instancia), `dist/_astro/BaseLayout.D6A3JV4y.css` + `dist/_astro/index.BvSXMUvK.css` (2 instancias bundleadas)

## Issues Encountered

Ninguno bloqueante. El plan estaba self-contained y todos los componentes compilaron en el primer build. Las 3 inconsistencias arriba son artefactos de regex-en-verify-clause, no de implementación.

## Verification Gates

1. ✓ `npm run build` exits 0 sin warnings (7 pages en ~1.5s)
2. ✓ `dist/index.html` contiene todas las strings LOCKED (H1, máxima, BrandBio P1+P2, ServiceTeaser CTAs, testimonial quote+attribution+disclaimer, 6 FAQs, CTABlock primary+secondary+tertiary)
3. ✓ `dist/index.html` contiene `<title>planetapsilo</title>` (sin sufijo) + description LOCKED + robots noindex preservado
4. ✓ `dist/index.html` size = 14,300 bytes (<80 KB cap)
5. ✓ Las otras 4 pages siguen building correctamente (`/acompanamiento`, `/retiros`, `/contacto`, `/obras`, `/privacidad` todos OK)
6. ✓ 6 secciones importadas en `src/pages/index.astro` (Hero, BrandBio, ServicesSplit, Testimonial, FAQ, CTABlock)
7. ✓ `<details>` count en dist/index.html = 6 (vía `grep -o`)
8. ✓ `dist/_astro/*.css` contiene 2 instancias de `prefers-reduced-motion`
9. ✓ Tertiary form-link apunta a `/planetapsilo/contacto#form` (BASE_URL aplicado)

## Threat Surface Scan

Todos los archivos creados/modificados encajan con el threat model en `02-02-PLAN.md` §`<threat_model>`. Las 3 entradas STRIDE están mitigadas:

- **T-02-05 (Spoofing CTA labels — accept):** Labels LOCKED en data/services.ts y hardcoded en el array; ningún user input puede aparecer como label.
- **T-02-06 (Information Disclosure testimonial placeholders — mitigate):** Disclaimer LOCKED renderizado en cada Testimonial card; verificado presente en `dist/index.html`.
- **T-02-07 (Tampering external Calendly + WhatsApp CTAs — mitigate):** Hero usa `target="_blank" rel="noopener noreferrer"` inline en su slot; CTABlock delega a Button que setea ambos cuando `external=true`. Verificado presente.
- **T-02-08 (Repudiation FAQ #1 legal denial — mitigate):** Phase 2 v1 dentro de glosario PERMITIDO; flagged para abogado review en Phase 3 LEGAL-01. El linter exemption (Plan 06) maneja el false-positive.

No se introducen `threat_flag:` nuevos — cero endpoints de red nuevos, cero auth paths nuevos, cero file access patterns nuevos, cero cambios de schema en boundaries.

## Known Stubs

| Stub | File | Por qué |
|------|------|---------|
| 3 testimonios placeholder (con disclaimer LOCKED) | `src/data/testimonials.ts` | Por diseño — Phase 3 LEGAL-07 los reemplaza con consentidos reales. El disclaimer LOCKED comunica al visitante que son ilustrativos. |
| BrandBio P3 opcional (no renderizado) | `src/pages/index.astro` línea ~27 (array de 2 elementos en lugar de 3) | Por diseño — Sofía escribirá el P3 luego dentro del glosario. La acceptance criteria del plan no requiere P3. |
| Máxima wording (anchor) | `src/pages/index.astro` línea ~40 | Por diseño — D-04 dice anchor wording locked, redacción final abierta a Sofía. Anchor está vivo, refinable sin breaking change. |

Todos los stubs están trackeados en este SUMMARY + en STATE.md + en PROJECT.md Active requirements (Phase 3 gate abogado).

## Self-Check: PASSED

**Archivos verificados que existen:**

- `src/components/sections/Hero.astro` — FOUND
- `src/components/sections/BrandBio.astro` — FOUND
- `src/components/sections/ConfidentialityLine.astro` — FOUND
- `src/components/sections/Testimonial.astro` — FOUND
- `src/components/sections/ServiceTeaser.astro` — FOUND
- `src/components/sections/ServicesSplit.astro` — FOUND
- `src/components/sections/CTABlock.astro` — FOUND
- `src/components/sections/FAQ.astro` — FOUND
- `src/data/testimonials.ts` — FOUND
- `src/data/faqs.ts` — FOUND
- `src/data/services.ts` — FOUND (modified)
- `src/pages/index.astro` — FOUND (modified)
- `dist/index.html` — FOUND (post-build, 14,300 bytes)

**Commits verificados en git log:**

- `9a13694` — FOUND
- `3087215` — FOUND
- `b53fc10` — FOUND

## Next Plan Readiness

Plans 02-03 (acompañamiento), 02-04 (retiros), 02-05 (contacto) pueden:

- `import Hero from '../components/sections/Hero.astro'` con `variant="interior"` para sus heros cortos
- `import BrandBio, ConfidentialityLine, Testimonial, CTABlock from '../components/sections/'` directamente
- `import { testimonials } from '../data/testimonials'` y filtrar por `t.context === 'acompanamiento'` o `'retiros'` según corresponda
- `import { services } from '../data/services'` y consumir `description/audience/outcomes/confidentialityLine` (Plan 03 los popula con copy real de Sofía)
- Confiar en que el home `/` ya está renderizando 6 secciones LOCKED end-to-end — los siguientes plans son pura composición off-the-shelf de los mismos components

Sin blockers para Plan 03. Plan 04 necesitará crear adicionalmente `RetreatPhases.astro` (3-card grid Preparación/Inmersión/Integración). Plan 05 necesitará `ContactForm.astro` + `RetreatApplicationForm.astro` + primitives de form (`FormField`, `HabeasDataCheckbox`, `FormSuccess`).

---
*Phase: 02-mvp-content-three-channel-contact*
*Completed: 2026-05-23*
