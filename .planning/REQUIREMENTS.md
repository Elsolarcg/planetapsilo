# Requirements: planetapsilo

**Defined:** 2026-05-21
**Core Value:** Un visitante del ICP (C-Level digital, nómada digital, founder/startup) puede entender en menos de 30 segundos qué se ofrece, sentir que el sitio es "de otro mundo" estéticamente, y dejar un dato de contacto (agendar Calendly, escribir por WhatsApp, o enviar formulario) sin que ninguna línea de copy comprometa la posición profesional de Sofía.

## v1 Requirements

Requirements for initial release (MVP visible + deployable). Cubren el sitio desde el deploy de hoy hasta la salida pública con indexación (post-revisión legal).

### Foundation (FOUND) — Phase 1

Establece el esqueleto técnico, identidad visual base y el pipeline de deploy.

- [ ] **FOUND-01**: Repo local en `/home/plazasia/workspace/07_DIGITAL_GROWTH/clientes/planetapsilo/` con scaffold Astro 6.3.x + Tailwind v4 + Node 22 (.nvmrc)
- [x] **FOUND-02**: `astro.config.mjs` con `site: 'https://elsolarcg.github.io'` + `base: '/planetapsilo'` configurados desde commit 1
- [x] **FOUND-03**: `BaseLayout.astro` con meta tags, OG por defecto, fuentes (Cormorant/Fraunces + Inter/DM Sans), nav, footer, slot
- [x] **FOUND-04**: `src/styles/tokens.css` con paleta psicodélica (naranjas / violetas / azules profundos), tipografía, spacing
- [x] **FOUND-05**: 4 page stubs creados — `src/pages/index.astro`, `acompanamiento.astro`, `retiros.astro`, `contacto.astro` (con placeholders mínimos)
- [x] **FOUND-06**: Componentes esqueleto — `Nav.astro`, `Footer.astro`, `WhatsAppFloat.astro` montados en BaseLayout
- [x] **FOUND-07**: `src/data/{site,nav,services,contact}.ts` placeholder con tipado básico
- [x] **FOUND-08**: `<meta name="robots" content="noindex">` global + `public/robots.txt` con `Disallow: /`
- [x] **FOUND-09**: Custom `404.astro` consistente con la marca
- [x] **FOUND-10**: GitHub Actions workflow `.github/workflows/deploy.yml` con `withastro/action@v3` + `actions/deploy-pages@v4`
- [x] **FOUND-11**: Branch `backup-v1` creada del repo `Elsolarcg/planetapsilo` antes de force-push
- [x] **FOUND-12**: Primer deploy a `https://elsolarcg.github.io/planetapsilo/` exitoso (200 en las 4 rutas, assets desde `/planetapsilo/_astro/*`, DevTools Network limpio)
- [x] **FOUND-13**: SIPI trademark check de "planetapsilo" (clases 35, 41, 44) documentado en `.planning/intel/trademark.md`
- [x] **FOUND-14**: `.gitignore` apropiado (node_modules, dist, .DS_Store) desde commit 1
- [x] **FOUND-15**: `docs/copy-glossary.md` con palabras PERMITIDAS y PROHIBIDAS — sirve de copy linter de referencia

### Content & Contact (CONT) — Phase 2

Llenar el esqueleto con copy legal-safe y wirar los tres canales de contacto (Calendly, WhatsApp, formulario).

- [x] **CONT-01**: Hero en `/` con value-prop de una línea + máxima filosófica + CTA primario "Agenda una conversación" + CTA secundario "Explora los retiros"
- [x] **CONT-02**: Página `/acompanamiento` con descripción del servicio para C-Level / nómadas digitales en registro híbrido (business + espiritual), sin lenguaje clínico ni atribución de terapia psicodélica
- [x] **CONT-03**: Página `/retiros` con estructura tres fases (Preparación / Inmersión / Integración), sin nombrar sustancias, sin precio, con application gate (formulario aplicación, no Calendly directo)
- [x] **CONT-04**: Página `/contacto` con 3 canales — botón Calendly LINK (placeholder o real), botón WhatsApp con `wa.me/57XXXXXXXXXX?text=...` pre-cargado, formulario Web3Forms con honeypot, checkbox autorización Habeas Data, disclaimer mínimo
- [x] **CONT-05**: Componente `WhatsAppFloat.astro` sticky en mobile/desktop con mensaje pre-cargado, `target="_blank"`, microcopy explicativo
- [x] **CONT-06**: Componente `CTABlock.astro` reutilizable con jerarquía Primario (Calendly) > Secundario (WhatsApp) > Terciario (Form)
- [x] **CONT-07**: 3 testimonios anonimizados como placeholder ("Founder, fintech, 41 años" tipo) con disclaimer "experiencia individual no garantiza resultados"
- [x] **CONT-08**: Bloque FAQ de 6 preguntas (legalidad/confidencialidad/suitability/qué pasa/tiempo/¿es para mí?)
- [x] **CONT-09**: One-liner de confidencialidad visible en `/acompanamiento` y `/retiros`
- [x] **CONT-10**: Footer con enlaces a Instagram + TikTok + brand line + año + "Sigue noindex" status
- [x] **CONT-11**: Disclaimer global temporal en footer + página `/privacidad — próximamente` linkeada
- [x] **CONT-12**: OG meta por página + favicon + title/description únicos
- [x] **CONT-13**: `prefers-reduced-motion: reduce` respetado en todas las animaciones de fondo
- [x] **CONT-14**: Copy verificado contra `docs/copy-glossary.md` (cero palabras prohibidas)
- [ ] **CONT-15**: Lighthouse mobile ≥ 80 performance, ≥ 95 accesibilidad, ≥ 90 SEO en las 4 páginas
- [ ] **CONT-16**: CTAs probados en dispositivos reales (iPhone + Android) — WhatsApp abre app, Calendly abre evento, formulario envía

### Legal Pass & Indexación (LEGAL) — Phase 3

Eleva el MVP de "interno con noindex" a "público indexable" mediante revisión legal y trust signals.

- [ ] **LEGAL-01**: Glosario PERMITIDO/PROHIBIDO revisado por abogado colombiano (deontológico Ley 1090)
- [ ] **LEGAL-02**: Página `/privacidad` con texto Habeas Data (Ley 1581) redactado / revisado por abogado
- [ ] **LEGAL-03**: Disclaimer global de footer + disclaimer en páginas de servicios redactado por abogado
- [ ] **LEGAL-04**: Sección "Sobre planetapsilo" (brand bio) en `/` o página dedicada — sin nombrar a Sofía
- [ ] **LEGAL-05**: Sección/página "Sobre la guía" (bio narrativa) — Sofía + abogado validan phrasing; alude a credencial Andes con disclaimer separador, NO atribuye terapia psicodélica
- [ ] **LEGAL-06**: Manifiesto / filosofía de planetapsilo (1-2 párrafos) — Sofía valida
- [ ] **LEGAL-07**: 3 testimonios reales (no placeholder) con consentimiento escrito archivado, formato "M., Bogotá" + disclaimer
- [ ] **LEGAL-08**: Photos de cuadros propios de Sofía integradas (hero, secciones de transición) — sustituye imágenes stock
- [ ] **LEGAL-09**: Calendly real conectado al calendario de Sofía con 2-3 qualifier preguntas + página de confirmación branded
- [ ] **LEGAL-10**: Web3Forms con auto-responder configurado + referer whitelist + SLA documentado < 24h
- [ ] **LEGAL-11**: Suitability paragraph en `/retiros` (no es para X, sí es para Y)
- [ ] **LEGAL-12**: `<meta name="robots">` removido + `robots.txt` actualizado para permitir crawl
- [ ] **LEGAL-13**: Sitemap auto-generado vía `@astrojs/sitemap` y enviado a Google Search Console
- [ ] **LEGAL-14**: Search Console verificado y monitoreando indexación
- [ ] **LEGAL-15**: Analytics cookieless (Plausible / Umami) opcional instalado en BaseLayout

## v2 Requirements

Deferred to future milestones. Tracked but not in current roadmap (post-MVP).

### Validation & Polish (VAL) — Phase 4

- **VAL-01**: Newsletter "lista de espera de retiros" (Mailchimp / ConvertKit / Buttondown free tier)
- **VAL-02**: Self-screen interactivo (quiz de suitability tipo Beckley) opcional
- **VAL-03**: GSAP ScrollTrigger + animaciones de gradiente sutil (respeta reduced-motion)
- **VAL-04**: Pricing strategy decisión — `/acompanamiento` con rango "desde $X" (retiros siguen sin precio)
- **VAL-05**: WhatsApp Business + número dedicado (no personal de Sofía)
- **VAL-06**: Dashboard de fuente-a-conversión cookieless
- **VAL-07**: Iteración de copy basada en primeros leads procesados
- **VAL-08**: FAQ refinement post-feedback
- **VAL-09**: Decap CMS opcional para que Sofía edite sin código

### Expansion — Tienda de Arte (TIENDA) — Phase 5a

- **TIENDA-01**: Decisión proveedor (Snipcart vs Shopify Buy Button vs Stripe Payment Link)
- **TIENDA-02**: Página `/tienda` con grid de obras
- **TIENDA-03**: Páginas de detalle por obra (`/tienda/[slug].astro`) desde content collection `products`
- **TIENDA-04**: Carrito + checkout integrado o "consultar" como fallback inicial
- **TIENDA-05**: Política de envíos + tiempos de producción + condiciones

### Expansion — Podcast (POD) — Phase 5b

- **POD-01**: Página `/podcast` con feed Spotify/Apple embed
- **POD-02**: Content collection `episodes` con MDX por episodio
- **POD-03**: Páginas de detalle por episodio (`/podcast/[slug].astro`)
- **POD-04**: RSS feed propio vía `astro-rss`
- **POD-05**: Sumisión a Spotify / Apple Podcasts / Google Podcasts

### Expansion — Yoga (YOGA) — Phase 5c

- **YOGA-01**: Página `/yoga` (bloqueada hasta que Sofía complete su certificación)

### Expansion — Bilingüe (I18N) — Phase 5d

- **I18N-01**: Activar `i18n` en `astro.config.mjs` con `defaultLocale: 'es'`
- **I18N-02**: Mirror de páginas bajo `src/pages/en/`
- **I18N-03**: Cookie banner GDPR + política bilingüe
- **I18N-04**: Representante UE designado (o waiver legal)
- **I18N-05**: Traducción legal-reviewed de copy crítico

### Expansion — Blog (BLOG) — Phase 5e

- **BLOG-01**: Content collection `posts` con MDX
- **BLOG-02**: Página `/blog` con listado
- **BLOG-03**: Páginas de detalle por post (`/blog/[slug].astro`)
- **BLOG-04**: Pipeline editorial + plantillas legal-reviewed

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Marca personal "Sofía X" como cara visible | Decisión de la cliente; protege tarjeta profesional |
| Atribución directa de terapia con psilocibina a Sofía | Zona gris legal Colombia (Ley 1090, Ley 1453) |
| Mencionar nombre de sustancias (psilocibina, hongos) en el sitio público | Riesgo SIC / Ley 1453 — describir formato, no sustancia |
| Pasarela de pagos para retiros en MVP | Retiros se aplican; cobro privado post-screening |
| Calendly inline embed | Scroll trap en iOS — usar link directo |
| Pricing visible en sitio (acompañamiento, retiros) MVP | Premium pattern: pricing en conversación; sólo VAL-04 evalúa rango |
| Migración del repo a otro org/GitHub personal del usuario | Decisión explícita de no perder tiempo moviendo |
| Bilingüe en MVP | Solo español; EN evaluado en Phase 5d post-validación |
| Backend / CMS / login en MVP | Sitio estático puro; Decap CMS opcional Phase 4+ |
| Three.js / WebGL en MVP | Performance LCP móvil; diferido Phase 4+ |
| Leetspeak ("m3dicin4") en copy | NO da cobertura legal Colombia; banear |
| Stock imagery de hongos / ayahuasca | Refuerza atribución; usar arte propio de Sofía Phase 3 |
| Live chat widget | Innecesario; WhatsApp ya cumple |
| Press logos / "como se vio en X" | Falsificable; no usar hasta tener prensa real |
| Reviews / ratings de servicios estilo ecommerce | No corresponde a servicios de acompañamiento |
| Lenguaje clínico psicología mental-health como copy principal | Refuerza atribución terapia → riesgo legal |
| Email de Sofía expuesto en texto plano | Scraping → spam; solo form + WhatsApp |
| Calendly directo para retiros | Retiros requieren application gate, no booking abierto |

## Traceability

Mapping completo de cada REQ-ID a su fase. Generado durante creación de ROADMAP.md (2026-05-21).

### v1 — Per-REQ-ID Mapping

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Pending |
| FOUND-02 | Phase 1 | Complete |
| FOUND-03 | Phase 1 | Complete |
| FOUND-04 | Phase 1 | Complete |
| FOUND-05 | Phase 1 | Complete |
| FOUND-06 | Phase 1 | Complete |
| FOUND-07 | Phase 1 | Complete |
| FOUND-08 | Phase 1 | Complete |
| FOUND-09 | Phase 1 | Complete |
| FOUND-10 | Phase 1 | Complete |
| FOUND-11 | Phase 1 | Complete |
| FOUND-12 | Phase 1 | Complete |
| FOUND-13 | Phase 1 | Complete |
| FOUND-14 | Phase 1 | Complete |
| FOUND-15 | Phase 1 | Complete |
| CONT-01 | Phase 2 | Complete |
| CONT-02 | Phase 2 | Complete |
| CONT-03 | Phase 2 | Complete |
| CONT-04 | Phase 2 | Complete |
| CONT-05 | Phase 2 | Complete |
| CONT-06 | Phase 2 | Complete |
| CONT-07 | Phase 2 | Complete |
| CONT-08 | Phase 2 | Complete |
| CONT-09 | Phase 2 | Complete |
| CONT-10 | Phase 2 | Complete |
| CONT-11 | Phase 2 | Complete |
| CONT-12 | Phase 2 | Complete |
| CONT-13 | Phase 2 | Complete |
| CONT-14 | Phase 2 | Complete |
| CONT-15 | Phase 2 | Pending |
| CONT-16 | Phase 2 | Pending |
| LEGAL-01 | Phase 3 | Pending |
| LEGAL-02 | Phase 3 | Pending |
| LEGAL-03 | Phase 3 | Pending |
| LEGAL-04 | Phase 3 | Pending |
| LEGAL-05 | Phase 3 | Pending |
| LEGAL-06 | Phase 3 | Pending |
| LEGAL-07 | Phase 3 | Pending |
| LEGAL-08 | Phase 3 | Pending |
| LEGAL-09 | Phase 3 | Pending |
| LEGAL-10 | Phase 3 | Pending |
| LEGAL-11 | Phase 3 | Pending |
| LEGAL-12 | Phase 3 | Pending |
| LEGAL-13 | Phase 3 | Pending |
| LEGAL-14 | Phase 3 | Pending |
| LEGAL-15 | Phase 3 | Pending |

### v2 — Per-REQ-ID Mapping (deferred, tracked)

| Requirement | Phase | Status |
|-------------|-------|--------|
| VAL-01..09 | Phase 4 | Deferred (post-Phase 3 indexación) |
| TIENDA-01..05 | Phase 5a | Deferred (gated por proveedor pagos + photo session) |
| POD-01..05 | Phase 5b | Deferred (gated por episodios + hosting) |
| YOGA-01 | Phase 5c | Deferred (gated por cert Sofía) |
| I18N-01..05 | Phase 5d | Deferred (gated por validación demanda EN + GDPR) |
| BLOG-01..04 | Phase 5e | Deferred (gated por estrategia editorial) |

### Coverage Summary

**v1 requirements:**
- Total: 46 (15 FOUND + 16 CONT + 15 LEGAL)
- Mapped to phases: 46 ✓
- Unmapped: 0 ✓
- Duplicates (mismo REQ en >1 fase): 0 ✓

**v2 requirements (deferred):**
- Total: 24 (9 VAL + 5 TIENDA + 5 POD + 1 YOGA + 5 I18N + 4 BLOG)
- Tracked but out of current roadmap execution: 24

**Per-phase load (v1):**
- Phase 1: 15 REQ-IDs (FOUND-01..15)
- Phase 2: 16 REQ-IDs (CONT-01..16)
- Phase 3: 15 REQ-IDs (LEGAL-01..15)
- Phase 4: 9 REQ-IDs (v2, deferred)
- Phase 5: 24 REQ-IDs (v2, deferred, split a sub-fases on-demand)

---
*Requirements defined: 2026-05-21*
*Traceability updated: 2026-05-21 after ROADMAP.md creation*
