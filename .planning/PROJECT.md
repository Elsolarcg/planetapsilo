# planetapsilo

## What This Is

Sitio web multipágina con estética psicodélica/cósmica para Sofía — psicóloga próxima a graduarse de la Universidad de los Andes — que opera como página de validación y canal comercial para acompañamientos psicológicos a ejecutivos C-Level y nómadas digitales, retiros guiados, una tienda de arte propio y, en fases posteriores, podcast y oferta de yoga. La marca opera como "planetapsilo" (espacio/universo de exploración), no como marca personal directa de Sofía, para preservar su tarjeta profesional y mantener distancia legal frente a la promoción explícita de terapia psicodélica.

## Core Value

Un visitante del ICP (C-Level digital, nómada digital, founder/startup) puede entender en menos de 30 segundos qué se ofrece, sentir que el sitio es "de otro mundo" estéticamente, y dejar un dato de contacto (agendar Calendly, escribir por WhatsApp, o enviar formulario) sin que ninguna línea de copy comprometa la posición profesional de Sofía.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

(None yet — ship to validate)

### Active

<!-- Current scope. Building toward these. -->

**MVP de hoy (multi-página ligero):**
- [ ] Home con hero psicodélico ("de otro mundo") y propuesta de valor
- [ ] Página /acompanamiento — servicio para C-Level / nómadas digitales (lenguaje neutral, sin atribuir terapia psicodélica directa)
- [ ] Página /retiros — retiros guiados para CEOs / nómadas digitales
- [ ] Página /contacto — Calendly embed/link + botón WhatsApp + formulario respaldo
- [ ] Identidad visual psicodélica/cósmica derivada del referente (paleta naranjas/violetas/azules profundos, degradados místicos, tipografía sans-serif moderna)
- [ ] Deploy a GitHub Pages bajo el repo Elsolarcg/planetapsilo (force-push limpio sobre la v1)
- [ ] Copy en español Colombia, tono íntimo/empoderado tipo máximas (referente)
- [ ] Sin atribución directa de Sofía como prestadora de terapia psicodélica — proteger tarjeta profesional

**Fases siguientes (post-MVP):**
- [ ] Sección "Sobre la guía" con bio cuidada de Sofía (credencial Andes + camino experiencial, sin titularse en psicodelia)
- [ ] Tienda de arte (cuadros, pinturas, artesanías psicodélicas) — checkout simple o "consultar" inicial
- [ ] Página /yoga cuando Sofía termine su formación de maestra
- [ ] Podcast — feed embedded (Spotify/Apple) + landing por episodio
- [ ] Newsletter / lista de espera para retiros
- [ ] Sistema de agendamiento real (Calendly conectado con email/calendar de Sofía)
- [ ] Aviso de privacidad + términos legales Colombia
- [ ] Bilingüe ES/EN para captar nómadas digitales internacionales

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- **Marca personal "Sofía X" como cara visible** — por decisión de la cliente; tiene dudas frente a cómo aplicar a su tarjeta profesional de psicóloga. Se opera bajo "planetapsilo" hasta nuevo aviso.
- **Promesa o atribución de terapia con psilocibina** — zona gris legal Colombia. El sitio habla de "acompañamientos" y "espacios de exploración", no de tratamiento o cura.
- **Pasarela de pagos real para tienda en el MVP** — diferido. Primero validar interés en arte vía formulario "consultar".
- **Multi-idioma en MVP** — solo español. EN se evalúa cuando el ICP internacional se valide.
- **Migración del repo a otro org/GitHub personal del usuario** — diferido por decisión explícita (no perder tiempo moviendo). Se mantiene Elsolarcg/planetapsilo aunque cruza brands.
- **Backend o CMS** — innecesario para multi-página estático. Si surge necesidad de contenido editable (blog, episodios), se evalúa luego.

## Context

**Cliente y relación:**
- Sofía es la pareja/futura esposa del usuario Juan. Se trata como cliente dentro del workspace `clientes/` para mantener flujo profesional, pero las decisiones críticas (legales, posicionamiento, estética) las valida ella.
- Sofía pinta cuadros con temática psicodélica/psilocibina y estudia yoga para ser maestra — ambos son activos a integrar en fases futuras.

**Estado previo (v1):**
- Existe repo en `github.com/Elsolarcg/planetapsilo` (1 commit, sin README) — HTML estático puro + 4 imágenes. Sin actividad reciente. La v1 NO se preserva; se reescribe desde cero.
- GitHub Pages live en `https://elsolarcg.github.io/planetapsilo/`.
- Sofía tiene presencia en TikTok e Instagram con seguidores (canales de captura para el sitio).

**Referente principal — sabiduriapsicodelica.com (Yannina Thomassiny):**
- Estructura: Inicio, Cursos/Talleres, Podcast, Retiros, Contacto + Login.
- Paleta: tonos cálidos y degradados místicos (naranjas, violetas, azules profundos).
- Copy: narrativa en primera persona, máximas filosóficas tipo *"La consciencia no es algo que alcanzas, es algo que recuerdas"*.
- Tono íntimo, no médico; usa "personas", "comunidad transformadora".
- CTAs: "Conecta Conmigo", "Más Información", "Subscríbete", "Join Our Free Trial".
- Bio del prestador sin títulos académicos, narrativa experiencial ("más de una década guiando").
- Usa codificación deliberada (ej. "m3dicin4") para sortear filtros SEO/compliance — patrón aprovechable.
- Stack: Kajabi (no replicamos; usamos estático).

**ICP primario:**
- C-Level y founders de empresas digitales y startups.
- Nómadas digitales con poder adquisitivo medio-alto.
- Buscan expansión de visión de negocio vía exploración psicodélica guiada + acompañamiento psicológico.

**Estética buscada — "de otro mundo":**
- Cósmica, psicodélica, universo expandido.
- Posible uso de Claude design system / componentes modernos.
- Referente directo: sabiduriapsicodelica.com.

## Constraints

- **Timeline**: MVP visible y deployable hoy en 1-2 horas — Sofía y Juan quieren tener qué mostrar al final del día.
- **Tech stack**: Sitio estático deployable a GitHub Pages. Opciones favoritas: Astro, Next.js export estático, o HTML+CSS+JS directo. Stack final se decide en Fase 1 según research.
- **Legal Colombia**: Copy no puede atribuir terapia psicodélica a Sofía como prestadora. Tampoco prometer cura/tratamiento. Lenguaje "acompañamiento" y "espacios de exploración".
- **Repo**: Mantener `Elsolarcg/planetapsilo` como remoto. Empezar fresco local y forzar push limpio sobre la v1.
- **Idioma**: Español únicamente en el MVP.
- **Contacto en MVP**: Calendly (placeholder/real) + WhatsApp directo + formulario de respaldo (Google Forms / Formspree / similar) — todas las vías abiertas para no perder leads.
- **Marca**: Bajo "planetapsilo", no bajo nombre personal de Sofía.

## Key Decisions

<!-- Decisions that constrain future work. -->

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Marca opera como "planetapsilo", no como marca personal de Sofía | Proteger su tarjeta profesional de psicóloga y mantener distancia legal frente a terapia psicodélica | — Pending |
| Empezar fresco localmente y force-push al repo Elsolarcg/planetapsilo | La v1 (1 commit, sin estructura) no aporta nada recuperable; mover el repo a otro org se diferiría más tiempo del que ahorraríamos | — Pending |
| Granularidad Coarse del roadmap (3-5 fases anchas) | El proyecto está explorando; mejor avanzar en bloques grandes que sobre-planear | — Pending |
| MVP multi-página (Home + /acompanamiento + /retiros + /contacto) en lugar de landing única | Soporta el ICP con secciones dedicadas sin saltar a multi-idioma o ecommerce | — Pending |
| Contacto en MVP soporta 3 vías (Calendly + WhatsApp + formulario) | El usuario explícitamente quiere las 3 abiertas para no perder leads en validación temprana | — Pending |
| Idioma sólo español en MVP | ICP primario Colombia/LATAM. Bilingüe se evalúa cuando se valide demanda internacional | — Pending |
| Stack a definir en research/Fase 1 | Hay opciones razonables (Astro, Next.js export, HTML puro). Research debe decidir según prioridad de estética + velocidad de iteración | — Pending |
| Modelo GSD: YOLO + Coarse + Research + Verifier + Quality (Opus) | Velocidad para MVP hoy + profundidad en research por sensibilidad legal/estética | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-21 after initialization*
