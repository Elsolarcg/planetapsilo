# Roadmap: planetapsilo

## Overview

planetapsilo evoluciona en cinco fases dependency-ordered, no feature-grouped. Phase 1 entrega un esqueleto desplegado HOY (URL live en GitHub Pages, base-path verificado, todavía con noindex) — el gate más importante: Sofía debe ver algo concreto al final del día. Phase 2 rellena ese esqueleto con copy legal-safe y los tres canales de contacto (Calendly + WhatsApp + Web3Forms) — el sitio queda usable detrás de noindex. Phase 3 es el gate a público: revisión legal de abogado colombiano, Habeas Data, bio narrativa "la guía", testimonios reales, photos de cuadros y remoción del noindex. Phase 4 captura leads tibios con newsletter, decisión de pricing y pulido de conversión sobre un sitio ya indexado. Phase 5 expande hacia tienda de arte, podcast, yoga, bilingüe y blog — cada sub-fase es independiente y se planeará en detalle cuando su blocker externo (cert de yoga, photo session, proveedor de pagos, GDPR) se libere.

Coarse granularity deliberada: el proyecto está explorando y validando, mejor avanzar en bloques anchos que micro-planear. La granularidad de cada fase aumenta a medida que se acerca su ejecución (Phase 1 ya tiene 15 REQ-IDs específicos; Phase 5 está intencionalmente como una sola fase con sub-fases pendientes de research).

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3, 4, 5): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED) — none yet

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation + Deployable Skeleton** - Astro 6 + Tailwind v4 + GitHub Pages live con base path verificado, noindex, 4 page stubs y CI/CD funcionando
- [ ] **Phase 2: MVP Content + Three-Channel Contact** - Copy legal-safe en 4 páginas, Calendly LINK + WhatsApp + Web3Forms wired, Lighthouse ≥80 mobile, sigue noindex
- [ ] **Phase 3: Legal Pass + Trust Signals + Indexación** - Abogado firma copy + Habeas Data + bio narrativa + testimonios reales + remoción de noindex + Search Console
- [ ] **Phase 4: Validación + Newsletter + Operative Polish** - Newsletter, pricing decision, GSAP polish, analytics cookieless, iteración basada en leads reales
- [ ] **Phase 5: Expansion (Tienda / Podcast / Yoga / Bilingüe / Blog)** - Sub-fases independientes que se desbloquean por external blockers (split en sub-phases cuando llegue su momento)

## Phase Details

### Phase 1: Foundation + Deployable Skeleton
**Goal**: Sofía puede abrir una URL pública HOY al final del día y ver el esqueleto del sitio cargado en GitHub Pages, con la identidad psicodélica base ya legible
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-07, FOUND-08, FOUND-09, FOUND-10, FOUND-11, FOUND-12, FOUND-13, FOUND-14, FOUND-15
**Success Criteria** (what must be TRUE):
  1. `https://elsolarcg.github.io/planetapsilo/` devuelve HTTP 200 en las 4 rutas (`/`, `/acompanamiento`, `/retiros`, `/contacto`)
  2. DevTools Network limpio: todos los assets cargan desde `/planetapsilo/_astro/*` (base-path bug catched antes de Phase 2)
  3. Sofía abre la URL en iPhone real y reconoce visualmente la paleta psicodélica (naranjas/violetas/azules profundos) y la tipografía display vs body
  4. `<meta name="robots" content="noindex">` global + `public/robots.txt Disallow: /` confirmados via curl — el sitio existe pero Google no lo indexa
  5. SIPI trademark check de "planetapsilo" documentado en `.planning/intel/trademark.md` — si colide, queda registrado para decisión de re-branding antes de Phase 3
  6. Branch `backup-v1` empujada al remoto Elsolarcg/planetapsilo antes del force-push (rollback safety net)
**UI hint**: yes
**Research hint**: no (research ya cubierto en STACK + ARCHITECTURE — Astro scaffold + GH Pages mechanics son patrón estándar)
**Time estimate (informational)**: ~30-45 min ejecución directa
**External blockers**: ninguno
**Plans**: 5 plans
  - [ ] 01-01-PLAN.md — Astro 6 scaffold + Node 22 pin + base path config + .gitignore (FOUND-01, FOUND-02, FOUND-14)
  - [ ] 01-02-PLAN.md — Tailwind v4 wiring + locked palette tokens + Fraunces/Inter fonts + animated cosmic gradient primitives (FOUND-04)
  - [ ] 01-03-PLAN.md — backup-v1 branch push + SIPI trademark check + copy glossary docs (FOUND-11, FOUND-13, FOUND-15)
  - [ ] 01-04-PLAN.md — BaseLayout + Nav/Footer/WhatsAppFloat + 4 page stubs + 404 + favicon + noindex + robots.txt (FOUND-03, FOUND-05, FOUND-06, FOUND-07, FOUND-08, FOUND-09)
  - [ ] 01-05-PLAN.md — GitHub Actions deploy workflow + force-push + Pages activation + live URL verification (FOUND-10, FOUND-12)

### Phase 2: MVP Content + Three-Channel Contact
**Goal**: El esqueleto desplegado queda usable end-to-end: un visitante del ICP puede entender la propuesta en <30s y dejar contacto por cualquiera de los tres canales, todo detrás de noindex (zona de iteración segura sin commit a Google cache)
**Depends on**: Phase 1 deploy verificado (base-path funcional + noindex confirmado + URL live)
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06, CONT-07, CONT-08, CONT-09, CONT-10, CONT-11, CONT-12, CONT-13, CONT-14, CONT-15, CONT-16
**Success Criteria** (what must be TRUE):
  1. Visitante en iPhone real puede leer el hero, entender la propuesta de valor en <30s, y elegir entre Calendly link, WhatsApp pre-cargado o Web3Forms — los tres canales funcionan end-to-end (WhatsApp abre app, Calendly abre evento, formulario envía a inbox real)
  2. `/retiros` describe la estructura tres-fases (Preparación / Inmersión / Integración) sin mencionar ninguna sustancia, sin precio, con application gate (formulario aplicación, NO Calendly directo)
  3. Copy linter contra `docs/copy-glossary.md` pasa con cero palabras prohibidas en las 4 páginas (terapia, tratamiento, cura, paciente, psilocibina, hongos, garantizado)
  4. Lighthouse Mobile ≥ 80 performance, ≥ 95 accesibilidad, ≥ 90 SEO en las 4 páginas (Moto G Power 4G profile)
  5. `prefers-reduced-motion: reduce` desactiva animaciones de fondo — verificable en DevTools rendering panel
  6. Sofía aprueba el copy de las 4 páginas y la jerarquía visual antes de marcar la fase como completa (sigue noindex)
**Plans**: TBD
**UI hint**: yes
**Research hint**: no (research ya cubierto en FEATURES + PITFALLS — premium-ICP playbook + glosario crystallized)
**Time estimate (informational)**: ~45-90 min ejecución directa
**External blockers**: ninguno (formulario apunta a Web3Forms con disclaimer temporal + `/privacidad próximamente`; abogado no bloquea este phase, solo Phase 3)

### Phase 3: Legal Pass + Trust Signals + Indexación
**Goal**: El sitio pasa de "MVP interno detrás de noindex" a "público indexable" mediante revisión legal del abogado colombiano + sustitutos de trust (bio narrativa de "la guía", testimonios reales consentidos, manifiesto, photos de cuadros de Sofía) + remoción del meta robots
**Depends on**: Phase 2 copy estable + disponibilidad del abogado colombiano (Ley 1090 + Ley 1581 + Ley 1453) + photo session de cuadros + 3 testimonios consentidos por escrito
**Requirements**: LEGAL-01, LEGAL-02, LEGAL-03, LEGAL-04, LEGAL-05, LEGAL-06, LEGAL-07, LEGAL-08, LEGAL-09, LEGAL-10, LEGAL-11, LEGAL-12, LEGAL-13, LEGAL-14, LEGAL-15
**Success Criteria** (what must be TRUE):
  1. Abogado colombiano firma por escrito la aprobación del glosario PERMITIDO/PROHIBIDO, página `/privacidad` (Habeas Data Ley 1581), disclaimer global de footer, disclaimer de servicios, bio narrativa "la guía" (con disclaimer separador frente a credencial Andes), y suitability paragraph en `/retiros`
  2. `<meta name="robots">` removido + `public/robots.txt` actualizado para permitir crawl + sitemap auto-generado (`@astrojs/sitemap`) enviado a Google Search Console — Search Console verifica indexación de las 4 rutas
  3. 3 testimonios reales con consentimiento escrito archivado (formato "M., Bogotá" + disclaimer "experiencia individual no garantiza resultados") sustituyen los placeholders de Phase 2
  4. Calendly real conectado al calendario de Sofía con 2-3 qualifier preguntas + página de confirmación branded; Web3Forms con auto-responder configurado + SLA documentado <24h
  5. Photos de cuadros propios de Sofía integradas (hero + secciones de transición) — sustituyen cualquier imagen stock o placeholder; refuerzan el visual craft como trust substitute
  6. Sitio público pasa el test "¿parece estafa?" — un C-Level que llega vía IG/TikTok ve manifiesto + bio narrativa + testimonios + visual craft + SLA humano y deja contacto sin fricción legal
**Plans**: TBD
**UI hint**: no (es trabajo principalmente de copy, legal y trust signals; el UI base ya está estable desde Phase 2)
**Research hint**: yes — `/gsd-research-phase 3` recomendado antes de planear. Buscar: (a) plantillas Habeas Data colombianas validadas; (b) phrasing de bio narrativa "la guía" con disclaimer separador para credencial Andes; (c) waiver/consent/screening templates para retiros (no-MVP pero útil tener listos). Consulta abogado real obligatoria.
**Time estimate (informational)**: multi-día (gated por external — abogado + photo session + testimonios consentidos)
**External blockers**: disponibilidad de abogado colombiano (CRITICAL); photo session de cuadros (HIGH); 3 testimonios reales con consentimiento escrito (HIGH); Calendly account de Sofía conectado al calendario real (MEDIUM)

### Phase 4: Validación + Newsletter + Operative Polish
**Goal**: Convertir el sitio público recién indexado en una máquina de validación: capturar leads tibios vía newsletter, iterar copy en base a primeros leads procesados, decidir estrategia de pricing y pulir conversión sin tocar la arquitectura
**Depends on**: Phase 3 con noindex removido + Search Console activo + primera ola de leads reales entrando (≥5 conversaciones procesadas via Calendly/WhatsApp/form) para informar la iteración
**Requirements**: VAL-01, VAL-02, VAL-03, VAL-04, VAL-05, VAL-06, VAL-07, VAL-08, VAL-09 (v2 — actualmente listadas en REQUIREMENTS.md sección Validation & Polish)
**Success Criteria** (what must be TRUE):
  1. Newsletter "lista de espera de retiros" live (Mailchimp / ConvertKit / Buttondown free tier) con al menos un opt-in real entrando — Sofía recibe notificación en su inbox
  2. Decisión de pricing tomada y aplicada: `/acompanamiento` muestra rango "desde $X" (retiros siguen con application gate, sin precio visible) — basada en research de benchmarks Colombia
  3. Analytics cookieless (Plausible/Umami) entregan dashboard de fuente-a-conversión legible — Sofía y Juan pueden ver de qué canal (IG/TikTok/orgánico/directo) viene cada lead
  4. ≥5-10 leads procesados end-to-end con show-up rate Calendly ≥70% — la copy del sitio convierte sin filtrar el ICP equivocado
  5. WhatsApp Business activado en número dedicado (no personal de Sofía) — separación clara entre vida personal y comercial
  6. FAQ refinement aplicado: las 3 preguntas más comunes de los primeros leads están respondidas pre-Calendly (reducción de fricción medible)
**Plans**: TBD
**UI hint**: partial (GSAP scroll animations + dashboard de analytics; el UI base estable desde Phase 2)
**Research hint**: yes — `/gsd-research-phase 4` recomendado. Buscar: pricing benchmarks Colombia para acompañamiento C-Level + comparativa Mailchimp/ConvertKit/Buttondown free tier + WhatsApp Business migration path desde número personal.
**Time estimate (informational)**: semanas de iteración (gated por flujo real de leads — no es ejecución directa)
**External blockers**: flujo orgánico de leads desde Phase 3 (CRITICAL para iteración informada); decisión de Sofía sobre número WhatsApp Business dedicado; presupuesto opcional para tier pagado de newsletter si free se queda corto

### Phase 5: Expansion (Tienda / Podcast / Yoga / Bilingüe / Blog)
**Goal**: Expandir planetapsilo desde "sitio de validación + lead capture" hacia un ecosistema completo de productos y contenido — sin reescribir arquitectura. Cada sub-fase tiene blocker externo propio y se planea en detalle (split a sub-phases formales) cuando llegue su momento. **Esta fase NO se ejecuta como bloque monolítico; se subdivide on-demand.**
**Depends on**: Phase 4 con funnel validado (≥10 leads procesados + show-up >70% + newsletter activo) — solo entonces tiene sentido invertir en expansión
**Requirements**:
  - **Sub-phase 5a (Tienda)**: TIENDA-01, TIENDA-02, TIENDA-03, TIENDA-04, TIENDA-05
  - **Sub-phase 5b (Podcast)**: POD-01, POD-02, POD-03, POD-04, POD-05
  - **Sub-phase 5c (Yoga)**: YOGA-01
  - **Sub-phase 5d (Bilingüe ES/EN)**: I18N-01, I18N-02, I18N-03, I18N-04, I18N-05
  - **Sub-phase 5e (Blog)**: BLOG-01, BLOG-02, BLOG-03, BLOG-04
**Success Criteria** (what must be TRUE — high level, refinable cuando cada sub-phase se planee):
  1. Cada sub-phase se split formalmente a una fase numerada propia (5.1, 5.2, etc.) cuando su blocker externo se libere — no se ejecuta nada sin un research-phase dedicado primero
  2. La arquitectura Astro existente (content collections, file-based routing) absorbe cada sub-phase como addition pura — sin reescritura de Phase 1-4
  3. Cada sub-phase mantiene la coherencia visual y de copy ya validada en Phase 2-3 (paleta, tipografía, glosario PERMITIDO/PROHIBIDO)
  4. Sofía aprueba explícitamente el orden y la prioridad de cada sub-phase antes de iniciarla — el orden es flexible post-Phase 4
**Plans**: TBD (split on-demand a sub-fases 5.1, 5.2, 5.3, 5.4, 5.5 según prioridad)
**UI hint**: yes (cada sub-phase añade UI nueva — tienda grid + checkout, podcast feed embed, yoga landing, mirror i18n, blog listing)
**Research hint**: yes — research-phase dedicado por cada sub-phase:
  - **5a (Tienda)**: payment provider Colombia (Bold vs Wompi vs Snipcart vs Shopify Buy Button) + IVA + política envíos + tiempos producción
  - **5b (Podcast)**: hosting (Transistor / Buzzsprout / Anchor) + Spotify/Apple submission + RSS feed propio
  - **5c (Yoga)**: bloqueada hasta cert de Sofía — research mínimo (una landing)
  - **5d (Bilingüe)**: GDPR + cookie banner + representante UE designado + traducción legal-reviewed
  - **5e (Blog)**: pipeline editorial + plantillas legal-reviewed + categorización
**Time estimate (informational)**: meses, no semanas (cada sub-phase es proyecto propio gated por external blocker)
**External blockers** (por sub-phase):
  - **5a**: decisión proveedor pagos + photo session cuadros high-res + política envíos legal
  - **5b**: episodios grabados y editados + decisión hosting + cuenta Spotify/Apple Podcasts
  - **5c**: Sofía completa formación de maestra de yoga
  - **5d**: validación demanda EN (nómadas digitales internacionales) + abogado para legal review en EN + GDPR posture
  - **5e**: estrategia editorial + plantillas legal-reviewed por abogado

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 (con sub-phases 5.1, 5.2, ... insertadas on-demand cuando cada blocker se libere)

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation + Deployable Skeleton | 0/TBD | Not started | - |
| 2. MVP Content + Three-Channel Contact | 0/TBD | Not started | - |
| 3. Legal Pass + Trust Signals + Indexación | 0/TBD | Not started | - |
| 4. Validación + Newsletter + Operative Polish | 0/TBD | Not started | - |
| 5. Expansion (sub-phases on-demand) | 0/TBD | Not started | - |

---

## Critical-Path Dependencies (cross-phase)

| From → To | Dependency | Why It Matters |
|-----------|------------|----------------|
| Phase 1 → Phase 2 | Base-path bug catch + deploy live verificado | El #1 bug de GH Pages project pages; si rompemos assets en Phase 2 sobre un base-path mal configurado, debugging es 3x más lento |
| Phase 2 → Phase 3 | Copy estable + glosario respetado + abogado disponible | Abogado revisa copy congelado, no en flujo; si copy sigue cambiando, revisión se invalida |
| Phase 3 → Phase 4 | `noindex` removido + primeros leads reales entrando | Iteración de copy de Phase 4 requiere data real de conversión; sin remover noindex no hay tráfico orgánico |
| Phase 4 → Phase 5 | Funnel validado (≥10 leads, show-up ≥70%) | No tiene sentido invertir en tienda/podcast/yoga sin validar primero que el sitio core convierte |

## Granularity & Mode Notes

- **Granularity:** coarse (config.json) — 5 fases anchas, NO 8-12 fases narrow. Phase 5 deliberadamente como una sola fase con sub-fases on-demand para evitar bloat de fases conditionales.
- **Mode:** YOLO + verifier ON + code_review standard + pattern_mapper ON (config.json) — velocidad para MVP de HOY (Phase 1+2) + profundidad en research por sensibilidad legal (Phase 3+).
- **Parallelization:** true — Phase 1 puede paralelizar SIPI trademark check (FOUND-13) + scaffold (FOUND-01..07) + workflow CI (FOUND-10).
- **UI safety gate:** true — Phase 1 y Phase 2 son UI-heavy y requieren screenshot review antes de transition.
- **AI integration phase:** true (config) — no aplica a este proyecto (sitio estático sin AI features); ignorable.
