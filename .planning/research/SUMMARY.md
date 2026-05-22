# Project Research Summary — planetapsilo

**Project:** planetapsilo
**Domain:** Static, GitHub-Pages-deployable, visually rich Spanish-Colombia marketing/validation site for psychedelic-adjacent coaching + retreats (premium ICP: C-Level / digital nomads), with multi-phase evolution toward art shop, podcast, yoga, bilingual.
**Researched:** 2026-05-21
**Confidence:** HIGH on stack/architecture/features pattern; MEDIUM-HIGH on legal/compliance posture (gated by abogado validation flagged in PITFALLS).

## Executive Summary

planetapsilo is a "credibility hub + lead capture" multi-page static site whose entire architecture is dictated by **one non-technical constraint**: the brand must not implicitly or explicitly attribute psychedelic therapy to Sofía (licensed psychologist, Universidad de los Andes), because doing so puts her tarjeta profesional at risk under Ley 1090/2006 (COLPSIC deontológico) and exposes the project to SIC and Ley 1453/2011 liability. Every other decision — stack, IA, copy register, contact funnel, indexation policy, even visual treatment of substances — is downstream of that constraint.

Research converged on: **Astro 6 + Tailwind v4 + pure-CSS psychedelic visuals + Calendly LINK + WhatsApp wa.me + Web3Forms backup form, deployed via `withastro/action@v3` to `Elsolarcg/planetapsilo` with `base: '/planetapsilo'`, served `noindex` until copy + legal pass review.** This stack ships a 4-page MVP in 1-2h AND absorbs Phase 2-5 (art shop, podcast, bilingual, blog) without rewrite.

The premium-ICP playbook (Beckley / Behold / Synthesis / Sabiduría Psicodélica / Kaapi) is unambiguous: **for high-ticket consciousness work, the site screens — it does not sell.** No pricing on page, no "buy now" for retreats, application-style framing, three-phase program structure (Preparación / Inmersión / Integración), executive-register outcome copy bridged with intimate first-person máximas filosóficas. Sofía is **not** the cara visible in MVP; her absence is compensated in Phase 3 by trust-signal substitutes — narrative bio of "la guía", curated testimonials with disclaimers, manifiesto, visual craft from Sofía's own paintings.

The two largest risk vectors are (1) **copy leakage** — any combined occurrence of Sofía + "terapia" + substance language on the same page is CRITICAL, mitigated by a strict glosario permitido/prohibido enforced as a copy-linter from Phase 1; and (2) **GitHub Pages base-path mis-config**, the #1 bug in project-page deploys, mitigated by `base: '/planetapsilo'` from commit 1 + first-deploy gate. Habeas Data (Ley 1581) gates the public form: form ships in MVP with disclaimer + `/privacidad próximamente` link + global `noindex`. `noindex` removed only in Phase 3 after abogado sign-off.

## Key Findings

### Recommended Stack

- **Astro 6.3.7** (Node 22+): file-based multi-page, content collections, native i18n + MDX paths, official GH Pages action
- **Tailwind CSS 4.3.0** via `@tailwindcss/vite`: CSS-first `@theme` for psychedelic palette, 5x faster builds
- **withastro/action@v3** + actions/deploy-pages@v4: official GH Pages deploy, ~60-90s push-to-live
- **Calendly LINK (not inline embed)** + **WhatsApp `wa.me/57XXXXXXXXXX?text=...`** + **Web3Forms** (unlimited free; beats Formspree 50/mo cap; Netlify Forms incompatible with GH Pages)
- **Phosphor Icons duotone** (consumer/mystical look) via CDN
- **GSAP 3.15** (free post-Webflow) — optional polish, NOT MVP-required
- **Typography:** Cormorant Garamond / Fraunces (display) + Inter / DM Sans (body), `font-display: swap`
- **NOT:** Next.js export (basePath friction, drags React runtime), Three.js/WebGL in MVP (defer to Phase 4+), Framer Motion (React-only), Formspree free (cap), Netlify Forms (GH Pages incompatible), Tailwind v3 (slower, no `@theme`), Material/Bootstrap/Pico (fight psychedelic brand)

**Critical:** Astro 6 requires Node 22+. `.nvmrc` from commit 1.

### Expected Features

Premium-ICP pattern: **the more premium the audience, the less the site sells, the more it screens.**

**Must-have (table stakes — Phase 1 MVP, 1-2h today):**
- Hero: one-line value prop + máxima + primary CTA "Agenda una conversación" + secondary "Explora los retiros"
- 4-page nav: Inicio / Acompañamiento / Retiros / Contacto
- `/acompanamiento`: service for C-Level / nómadas digitales, business + spiritual register, NO clinical claims
- `/retiros`: three-phase frame (Preparación / Inmersión / Integración), abstract location prestige cues, **no substance named, no pricing, application gate** (NOT Calendly directo)
- `/contacto`: 3 channels — Calendly LINK + WhatsApp floating + Web3Forms form
- Floating sticky WhatsApp button with pre-filled message
- Cohesive psychedelic palette (naranjas/violetas/azules profundos, CSS gradients + SVG noise)
- Mobile-first (80%+ traffic from IG/TikTok)
- Legal-safe copy (glosario enforced)
- Footer with IG + TikTok + brand line
- Favicon + page titles + meta descriptions
- 3 anonymized testimonial placeholders ("Founder, fintech, 41")
- 6-FAQ block (legalidad, confidencialidad, suitability, qué pasa en sesión, tiempo, "¿es para mí?")
- Confidentiality one-liner
- `<meta name="robots" content="noindex">` + `robots.txt Disallow: /` from commit 1

**Should-have (differentiators — Phase 2/3):**
- "Sobre planetapsilo" (brand bio Phase 2) → "Sobre la guía" narrative bio (Phase 3 — Sofía + abogado sign-off)
- Real testimonials (consented, format "M., Bogotá", disclaimer)
- Newsletter "lista de espera retiros"
- Real Calendly conectado + qualifier preguntas
- Photos of Sofía's paintings (post photo session)
- Suitability paragraph / self-screen
- `/privacidad` (Ley 1581) + global footer disclaimer — gate to remove `noindex`
- GSAP ScrollTrigger optional gradient motion

**Defer (Phase 4+):**
- Tienda de arte (Snipcart / Shopify Buy Button / Bold / Wompi)
- Podcast (`@astrojs/mdx` + content collection + Spotify embed + RSS)
- `/yoga` (blocked on Sofía cert)
- Bilingüe ES/EN (blocked on EN legal review + GDPR posture)
- Blog / educational content
- Decap CMS

**Anti-features (deliberately NOT built):** "terapia psicodélica"; Sofía + foto + título psicodélico; substance descriptions; direct ecommerce checkout retreats; live chat; login/member; pricing on pages; stock mushroom/ayahuasca imagery; press logos until real; clinical mental-health keywords; leetspeak ("m3dicin4").

### Architecture Approach

Astro `output: 'static'` + `base: '/planetapsilo'`, deployed via `withastro/action@v3`. Four-page MVP under `src/pages/{index,acompanamiento,retiros,contacto}.astro`, single `BaseLayout.astro`. Section components pure presentation. Copy lives in `src/data/{site,nav,services,contact}.ts` from day 1 (Anti-Pattern: hardcoded). Interactive bits = islands with `client:visible`. Content collections (`src/content/`) scaffolded empty Phase 1, populated Phase 2+ for bio/products/episodes — same architecture absorbs all future phases without restructure.

**Component tree:**
- `BaseLayout.astro` — HTML shell, meta, OG, fonts, nav, footer, slot
- `src/pages/*.astro` — one file = one route
- Section components — Hero, ValueProp, ServiceTeaser, CTABlock (3-button), Maxim
- Island components — ContactForm, future HeroCanvas
- `src/data/*.ts` — TS exports for nav, services copy, contact endpoints
- `src/styles/tokens.css` — design tokens
- `.github/workflows/deploy.yml` — single workflow

**Future phases absorbed via additions, never rewrites:** tienda → `src/content/products/*.mdx` + `tienda/[slug].astro` + Snipcart/Shopify island; podcast → `src/content/episodes/*.mdx` + `podcast/[slug].astro` + `rss.xml.js`; bilingüe → flip i18n in `astro.config.mjs`, mirror routes under `en/`; CMS → add `/admin/config.yml` mirroring schemas.

### Critical Pitfalls (12 prioritized)

1. **Atribuir "terapia psicodélica" a Sofía** `[REVIEW: ABOGADO]` — CRITICAL — Ley 1090 + Ley 1453. Mitigation: strict glosario PERMITIDO (acompañamiento, espacio de exploración, integración, claridad, expansión de consciencia) / PROHIBIDO (terapia, tratamiento, cura, paciente, diagnóstico, psilocibina, hongos, garantizado). Brand = "planetapsilo"; Sofía aparece solo como "guía"/"creadora". Enforce as copy-linter pre-deploy each phase.

2. **Promoción de retiros mencionando sustancia en sitio público** `[REVIEW: ABOGADO]` — CRITICAL — Ley 1453 + SIC. Mitigation: sin mención de sustancia en MVP; `/retiros` describe formato (días, ubicación, comidas, círculos, naturaleza, integración). Substance info off-site post-screening en informed-consent privado. **Application gate obligatoria** (NO Calendly directo a retiros).

3. **GitHub Pages base path rompe assets + links** — HIGH bloqueante — #1 bug. Mitigation: `site` + `base: '/planetapsilo'` desde commit 1; `import.meta.env.BASE_URL` para todo internal link. Phase-1 milestone = deploy a GH Pages, NO localhost.

4. **Formulario sin Habeas Data (Ley 1581)** `[REVIEW: ABOGADO]` — HIGH — SIC hasta 2000 SMMLV. Mitigation: `/privacidad` plantilla abogado + checkbox autorización + minimal capture. MVP-today: form con disclaimer mínimo + `/privacidad — próximamente` + noindex + deuda Phase 3.

5. **Calendly inline embed móvil = scroll trap iOS Safari + CLS** — MEDIUM-HIGH — Mitigation: MVP usa Calendly LINK, not inline.

6. **Visuales psicodélicos saturados = conversión killer + a11y violations** — HIGH — Contraste WCAG AA 4.5:1; `prefers-reduced-motion: reduce` bloqueante; sin autoplay WebGL móvil; LCP <2.5s en Moto G Power 4G.

7. **Marca sin cara visible sin sustitutos = parece estafa** — HIGH — Mitigation Phase 2/3: bio narrativa "la guía"; testimonios verificables con disclaimer; manifiesto; visual craft (cuadros); transparencia operativa; SLA humano <24h.

8. **Trademark SIPI sin búsqueda** — MEDIUM — Mitigation: 30-min SIPI search Phase 1 en clases 35, 41, 44; documentar en PROJECT.md.

9. **3 CTAs sin jerarquía pierde leads** — MEDIUM-HIGH — Mitigation: Primario Calendly link / Secundario WhatsApp / Terciario form; SLA <24h; UTM tracking.

10. **Testimonios "antes/después" + promesas = publicidad engañosa SIC + Ley 1090 art. 52** — HIGH — Mitigation: subjetivos no clínicos; inicial+ciudad; disclaimer "experiencia individual no garantiza resultados".

11. **Cliente = pareja, sin gate de aprobación** — MEDIUM proceso — Mitigation: ritual `gsd-transition` 30 min al cerrar fase; Sofía valida producto, Juan decide tech.

12. **Force-push sin backup branch** — LOW-MEDIUM — Mitigation: `git branch backup-v1` antes de `push --force` al remoto.

## High-Leverage Decisions Already Crystallized

| # | Decision | Source |
|---|----------|--------|
| 1 | Stack: Astro 6.3 + Tailwind v4 + pure-CSS visuals + GSAP optional (NOT Next.js, NOT vanilla HTML, NOT React SPA) | STACK |
| 2 | Hosting: GH Pages via `withastro/action@v3`; repo `Elsolarcg/planetapsilo`; `base: '/planetapsilo'` desde commit 1 | STACK + ARCH + PITFALLS#3 |
| 3 | Contact priority: Calendly LINK > WhatsApp wa.me pre-filled > Web3Forms form | FEATURES + PITFALLS#5,#9 |
| 4 | Form backend: Web3Forms (NOT Formspree, NOT Netlify Forms, NOT Google Forms) | STACK |
| 5 | Copy glosario PERMITIDO/PROHIBIDO enforced como linter | PITFALLS#1,#2 + FEATURES |
| 6 | Sofía NOT visible en MVP; bio narrativa "la guía" solo Phase 3 tras abogado | PROJECT + FEATURES + PITFALLS#1,#7 |
| 7 | NO pricing en `/retiros` ni `/acompanamiento` MVP — pricing en conversación | FEATURES |
| 8 | `/retiros` describe formato sin nombrar sustancia; application gate obligatoria | FEATURES + PITFALLS#2 |
| 9 | `noindex` + `robots.txt Disallow: /` hasta copy + legales aprobados | PITFALLS |
| 10 | Three-phase retreat structure (Preparación / Inmersión / Integración) explícito | FEATURES |
| 11 | Image pipeline: Astro `<Image />` → WebP/AVIF + srcset; hero ≤200KB | STACK + PITFALLS#6 |
| 12 | Three.js / WebGL diferido a Phase 4+; MVP = pure CSS + SVG noise | STACK + PITFALLS#6 |
| 13 | `prefers-reduced-motion: reduce` desactiva animaciones — bloqueante | PITFALLS#6 |
| 14 | Granularidad roadmap: Coarse (3-5 fases) | PROJECT |
| 15 | Backup branch `backup-v1` antes de force-push | PITFALLS#12 |

## Legal / Compliance Gating Map

| Gate | Severity | Gates | Unblocker |
|------|----------|-------|-----------|
| Glosario de copy enforced | CRITICAL | Cualquier deploy | Lista en Phase 1 + linter |
| `/retiros` sin sustancia + application gate | CRITICAL | Deploy de `/retiros` | Decisión IA Phase 1 |
| Bio "Sobre planetapsilo" brand-only | MEDIUM | Trust signal MVP | Phase 1/2 copy marca |
| Bio narrativa "Sobre la guía" sin nombre/título | HIGH `[REVIEW: ABOGADO]` | Trust upgrade Phase 3 | Sofía + abogado validan |
| Mención credencial Andes en bio | HIGH `[REVIEW: ABOGADO]` | Bio Phase 3 | Disclaimer separador |
| `/privacidad` (Ley 1581) | HIGH `[REVIEW: ABOGADO]` | Form activo con tráfico | Plantilla abogado |
| Disclaimer global footer + servicios | HIGH `[REVIEW: ABOGADO]` | Remover noindex | Redacción abogado |
| Trademark SIPI check | MEDIUM | Inversión branding | Búsqueda 30 min Phase 1 |
| Testimonios reales con consentimiento | HIGH | Social proof Phase 3 | Consentimiento escrito |
| EN + GDPR | MEDIUM→HIGH | Bilingüe | Cookie banner + UE rep + traducción legal |
| Documentos retiro (waiver, consent, screening) | CRITICAL `[REVIEW: ABOGADO]` | Cualquier retiro real | Versión colombiana |
| Pre-tarjeta vs post-tarjeta Sofía | HIGH — Open Q abogado | Cobro online | Q abogado antes de cobrar |

**MVP-today posture:** ship con noindex + disclaimer mínimo + form con checkbox y `/privacidad próximamente`. Registrar deuda Phase 3. **NO remover noindex hasta abogado pase.**

## Critical-Path Gotchas

- GH Pages base path → `base: '/planetapsilo'` desde commit 1 + `import.meta.env.BASE_URL` en todo link
- Astro 6 → Node 22+ → `.nvmrc` + verify
- Leetspeak NO da cobertura → banear en glosario
- Calendly inline = scroll-trap iOS → MVP usa link directo
- wa.me desktop sin app → microcopy + `target="_blank"` + número copyable
- Retiros con Calendly directo → application gate obligatoria
- Sofía visible en MVP → brand-only, "Sobre planetapsilo" no "Sobre Sofía"
- Sin trust substitutes + Sofía oculta = parece estafa → Phase 3 bio + manifiesto + testimonios + visual craft
- Force-push sin backup → `git branch backup-v1`
- Form sin honeypot + sin privacidad → honeypot + Turnstile + checkbox + `/privacidad`
- Hero WebGL/video mata LCP móvil → gradientes CSS; Three.js a Phase 4+
- Email Sofía en plano = scraping → solo form + WhatsApp
- Indexación prematura → `noindex` + `Disallow: /` hasta aprobación

## Implications for Roadmap

**Suggested coarse phase structure — dependency-ordered, not feature-grouped:**

### Phase 1 — Foundation + Deployable Skeleton (today, 30-45 min)
Rationale: skeleton on GH Pages BEFORE real copy. Base-path verified first. SIPI trademark search in parallel.
Delivers: Astro scaffold + Tailwind v4 + `base`; 4 page stubs; BaseLayout/Nav/Footer/WhatsAppFloat skeletons; `src/data/*` placeholder; `tokens.css` palette; `withastro/action@v3` workflow; `backup-v1` branch; force-push; GH Pages verified; `noindex` + `robots.txt`; custom `404.astro`; glosario documented; SIPI search documented.
Exit gate: `https://elsolarcg.github.io/planetapsilo/` carga, 4 pages 200, assets desde `/planetapsilo/_astro/*`, SIPI documentado.

### Phase 2 — MVP Content + Three-Channel Contact (continuation, 45-90 min)
Rationale: fill skeleton con copy legal-safe + wire 3 canales. Sigue noindex hasta Phase 3.
Delivers: Hero + máxima + dual CTA; `/acompanamiento` (business + spiritual register); `/retiros` Preparación/Inmersión/Integración (sin sustancia, sin precio, application framing); `/contacto` Calendly LINK + WhatsApp pre-filled + Web3Forms con honeypot + checkbox Habeas Data + disclaimer temporal; WhatsAppFloat sticky; 3 testimonios anonimizados; 6-FAQ; confidentiality one-liner; palette + tipografía pair; mobile responsive (Lighthouse ≥80 perf, ≥95 a11y, ≥90 SEO); `prefers-reduced-motion`; OG meta.
Exit gate: Copy linter pasa; Lighthouse Mobile ≥80; CTAs probados iPhone + Android reales; `/retiros` sin sustancia; three-phase visible; Sofía + Juan aprueban transition. **Sigue noindex.**

### Phase 3 — Legal Pass + Trust Signals + Indexación
Rationale: separa "MVP interno" de "sitio público". Habeas Data + glosario aprobado + bio narrativa + testimonios reales + manifiesto = trust substitutes. `noindex` removido al final.
Delivers: `[REVIEW: ABOGADO]` pase de copy 4 páginas; `/privacidad` (plantilla abogado); disclaimer global footer + servicios; "Sobre planetapsilo" + "Sobre la guía" narrative bio con disclaimer separador; manifiesto / filosofía; testimonios reales con consentimiento escrito; Calendly real conectado + 2-3 qualifier preguntas + confirmación branded; Web3Forms con auto-responder + referer whitelist; photos cuadros Sofía; suitability paragraph en `/retiros`; **remover `noindex`** + sitemap + Search Console; Plausible/Umami opcional cookieless.
Research flag: Habeas Data templates colombianos + bio narrativa + disclaimer + waiver retiros. Consulta abogado real.
Exit gate: Abogado firma copy + privacidad + disclaimer; bio aprobada; testimonios consentidos; `noindex` removido; Search Console verificado; primera ola leads reales con SLA <24h.

### Phase 4 — Validación + Newsletter + Operative Polish
Rationale: sitio público funcionando. Optimizar conversión, capturar leads tibios, preparar crecimiento.
Delivers: Newsletter "lista de espera" (Mailchimp/ConvertKit); suitability self-screen opcional; GSAP ScrollTrigger + gradient animations; pricing strategy decision (rango en `/acompanamiento` "desde $X"; retiros siguen application); WhatsApp Business + número dedicado; analytics cookieless + dashboard fuente-a-conversión; iteración copy según primeros leads; FAQ refinement; Decap CMS opcional.
Research flag: Pricing benchmarks Colombia acompañamiento C-Level.
Exit gate: ≥5-10 leads procesados; show-up Calendly ≥70%; newsletter live; campaña post-lanzamiento ejecutada.

### Phase 5 — Expansion (sub-phases independent)
Sub-phases:
- **5a Tienda:** Snipcart / Shopify Buy Button drop-in + `src/content/products/*.mdx`; fallback inicial form "consultar"
- **5b Podcast:** `@astrojs/mdx` + content collection `episodes`; embed Spotify/Apple; `astro-rss` para `/podcast.xml`
- **5c `/yoga`:** una página — blocked on cert
- **5d Bilingüe ES/EN:** Astro i18n + `src/pages/en/` + `src/i18n/{es,en}.json`; bloqueante: EN legal review + GDPR + cookie banner
- **5e Blog:** `posts` collection; pipeline editorial + plantillas legal-reviewed
Research flag: cada sub-fase necesita su propio `/gsd-research-phase`: payment Colombia (5a), podcast hosting (5b), GDPR (5d).

### Phase Ordering Rationale

- Phase 1 precede todo — base path / deploy / glosario / SIPI son foundation blockers
- Phase 2 ships behind noindex — copy commitea a Google cache + Wayback; mejor iterar sin indexar
- Phase 3 ES el gate a público — abogado + Habeas Data + bio narrativa = unblockers de remover noindex
- Phase 4 requiere Phase 3 vivo — captura leads tibios necesita indexación + inbound real
- Phase 5 cada sub-fase tiene external blocker propio; orden flexible post-Phase 4

### Research Flags

- Phase 3: Habeas Data templates colombianos certificados + bio narrativa + disclaimer (7 `[REVIEW: ABOGADO]` items)
- Phase 4: Pricing benchmarks Colombia C-Level + WhatsApp Business migration
- Phase 5a: Payment provider Colombia (Bold vs Wompi vs Snipcart) + shipping + IVA
- Phase 5b: Spotify/Apple submission + podcast hosting
- Phase 5d: GDPR + cookie consent + EU representative + traducción legal

Standard patterns (skip research-phase):
- Phase 1: Astro scaffold + GH Pages — STACK + ARCHITECTURE cubre todo
- Phase 2: MVP content + three-channel contact — FEATURES + PITFALLS crystallized

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | npm registry direct queries; Astro 6 / Tailwind v4 / withastro/action@v3 docs canonical |
| Features | HIGH | 5 competitor sites verified directly; premium-ICP playbook converges |
| Architecture | HIGH | Astro official docs every integration; GH Pages mechanics from GitHub docs |
| Pitfalls | MEDIUM-HIGH | Ley 1090 / 1581 / 1453 / 1480 primary sources; abogado validation flagged en 7 items; perf data CRC 2025 |

**Overall:** HIGH on technical execution; MEDIUM-HIGH on legal posture pending abogado validation. Project puede shippear Phase 1+2 detrás de `noindex`; NO puede remover `noindex` (Phase 3) sin abogado sign-off.

### Gaps to Address

- 7 `[REVIEW: ABOGADO]` items: glosario aprobado deontológico; bio Sofía con Andes; texto Habeas Data + `/privacidad`; disclaimer global; pre-tarjeta vs post-tarjeta scope; trademark "planetapsilo" semántica; documentos retiro (waiver + consent + screening). Handle: Phase 3 gate.
- WhatsApp number ownership: personal vs Business — MVP personal, Phase 4 dedicado/Business
- Calendly account: existe o se crea hoy; MVP placeholder OK, swap real en Phase 3
- Real testimonials: ¿clientes pasados consentibles? Si no, MVP placeholders identificados
- Photos cuadros Sofía: photo session externa — Phase 3 dependency
- Pricing strategy: Phase 4 con benchmark research
- Trademark SIPI: unknown hasta Phase 1 search; si colide, re-branding completo

## Sources

### Primary (HIGH)
- Astro 6 docs: https://docs.astro.build/
- withastro/action@v3: https://github.com/withastro/action
- Tailwind v4: https://tailwindcss.com/blog/tailwindcss-v4
- GSAP 2026: https://gsap.com/
- Web3Forms: https://docs.web3forms.com/
- Calendly Embed: https://help.calendly.com/
- GitHub Pages limits: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- Ley 1090 de 2006: http://www.secretariasenado.gov.co/senado/basedoc/ley_1090_2006.html
- Ley 1581 de 2012: http://www.secretariasenado.gov.co/senado/basedoc/ley_1581_2012.html
- Ley 1480 de 2011: https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=44306
- SIC: https://sic.gov.co/informacion-enganosa
- SIPI: https://www.vue.gov.co/tramites-y-consultas/consulta-de-nombre-de-marca
- COLPSIC: https://www.colpsic.org.co/
- Reference sites: sabiduriapsicodelica.com, beckleyretreats.com, behold-retreats.com, synthesisinstitute.com, kaapicenter.org

### Secondary (MEDIUM)
- 2026 SSG comparison articles; Codrops Three.js+Astro pattern; Fortune Well + Globe and Mail psychedelic executive retreats; Wellness Law + Paperbell disclaimers; WCAG 2.2 motion sensitivity; CRC 2025 Colombia mobile data

### Tertiary (LOW — to validate)
- Trademark "planetapsilo" disponibilidad — MUST run SIPI Phase 1
- Habeas Data registration threshold — MUST confirm abogado
- WhatsApp pre-filled rendering edge cases — MUST test real devices Phase 2

### Internal
- .planning/PROJECT.md
- .planning/research/STACK.md
- .planning/research/FEATURES.md
- .planning/research/ARCHITECTURE.md
- .planning/research/PITFALLS.md

---
*Research synthesis completed: 2026-05-21 — ready for roadmap*
