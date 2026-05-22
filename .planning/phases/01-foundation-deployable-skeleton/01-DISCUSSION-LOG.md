# Phase 1: Foundation + Deployable Skeleton - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-21
**Phase:** 01-foundation-deployable-skeleton
**Areas discussed:** Visual loadout del esqueleto, Identidad de marca mínima

---

## Gray Area Selection

User selected 2 of 4 presented gray areas:

| Area | Selected |
|------|----------|
| Visual loadout del esqueleto | ✓ |
| Identidad de marca mínima (logo / wordmark / favicon) | ✓ |
| Datos reales vs placeholders en canales | (deferred — defaulted to stubs) |
| Custom domain (planetapsilo.com) vs subpath | (deferred — defaulted to subpath) |

---

## Visual Loadout del Esqueleto

### Q1: ¿Qué modo de color para el sitio?

| Option | Description | Selected |
|--------|-------------|----------|
| Dark only | Solo dark. Naranjas/violetas/azules brillan sobre fondo profundo. Más cósmico. Sin toggle. | ✓ |
| Light + Dark con toggle | Usuario elige. Doble trabajo de tokens. | |
| Light only | Tonos suaves estilo wellness boutique. Menos psicodélico. | |

**User's choice:** Dark only
**Notes:** Recomendada — alinea con el mood "de otro mundo" y con el referente sabiduriapsicodelica.com.

### Q2: ¿Qué intensidad de paleta?

| Option | Description | Selected |
|--------|-------------|----------|
| Saturada + alto contraste | Vibrante. orange-mystic #ff7a3d, violet-deep #5b2a86, blue-cosmic #0b1d4f | ✓ |
| Desaturada / dusty | Mate, terroso. Estilo Beckley/Behold (más maduro C-Level) | |
| Saturada monocromática | Un solo color dominante con acentos sutiles | |

**User's choice:** Saturada + alto contraste
**Notes:** Recomendada — máxima personalidad para destacar en IG/TikTok donde llegan los seguidores actuales de Sofía.

### Q3: ¿Tipografía display?

| Option | Description | Selected |
|--------|-------------|----------|
| Fraunces | Serif modernista. Variants soft/wonky. Pair con Inter. | ✓ |
| Cormorant Garamond | Serif romántica clásica. Más literaria. Riesgo "spa hotel". | |
| Cormorant en máximas + Fraunces en títulos | Híbrido. Más personalidad, más riesgo. | |

**User's choice:** Fraunces (display) + Inter (body)
**Notes:** Recomendada — Fraunces es el estándar 2026 para sitios cósmicos de gama alta. Inter como pareja neutra para body.

### Q4: ¿Qué nivel de motion en Phase 1?

| Option | Description | Selected |
|--------|-------------|----------|
| CSS animated gradient en hero | Gradiente cósmico que rota/respira vía @property + CSS animation. Cero JS. Respeta reduced-motion. | ✓ |
| Sin motion en Phase 1 | Gradientes estáticos + SVG noise. Motion en Phase 4. | |
| CSS animated + GSAP ScrollTrigger | Suma 30-45 min al MVP. | |

**User's choice:** CSS animated gradient en hero
**Notes:** Recomendada — define el mood "de otro mundo" desde commit 1 sin sumar al timeline. GSAP queda diferido a Phase 4.

---

## Identidad de Marca Mínima

### Q1: ¿Qué va en el header como identidad de marca en Phase 1?

| Option | Description | Selected |
|--------|-------------|----------|
| Wordmark tipográfico "planetapsilo" | Solo el nombre escrito en Fraunces. Patrón Beckley/Behold/Sabiduriapsicodelica. | ✓ |
| Wordmark + glyph cósmico minimalista | Texto + ícono SVG. ~20 min adicional. | |
| Placeholder "PP" / sin marca | Sin wordmark. Riesgo: "no hay marca". | |

**User's choice:** Wordmark tipográfico "planetapsilo"
**Notes:** Recomendada — listo en Phase 1, deja espacio para evolucionar a logo real cuando haya bandwidth/diseño con Sofía.

### Q2: Si vamos con wordmark, ¿qué tratamiento tipográfico?

| Option | Description | Selected |
|--------|-------------|----------|
| lowercase, light weight, wide tracking | Lee como manifest editorial. Legible en mobile. Encaja con Fraunces. | ✓ |
| UPPERCASE, medium weight, tight tracking | Más "brand premium". Riesgo más corporate/genérico. | |
| planeta·psilo con separador cósmico | Dividido con punto medio. Creativo pero rompe SEO/legibilidad. | |

**User's choice:** lowercase, light weight (300), wide tracking (~0.08em)
**Notes:** Recomendada — coherente con la estética suave/etérea + Fraunces como display.

### Q3: ¿Favicon para Phase 1?

| Option | Description | Selected |
|--------|-------------|----------|
| Glyph circular con gradiente cósmico | SVG con orange→violet→blue radial. Listo en 5 min. | ✓ |
| Letra 'p' estilizada en Fraunces | Clásico tipográfico. 3 min. | |
| Favicon emoji (🪐/✨/🌌) | Rápido pero menos serio. Evitar 🍄 por atribución psicodélica legal. | |

**User's choice:** Glyph circular SVG con gradiente cósmico (32x32 + 16x16 + apple-touch 180x180)
**Notes:** Recomendada — refleja la paleta del sitio, escala bien, no compromete legalmente.

### Q4: ¿Tratamiento del header (nav bar)?

| Option | Description | Selected |
|--------|-------------|----------|
| Header transparente con blur on scroll | Gradiente animado se ve a través. Al scrollear: backdrop-filter blur + borde sutil. Inmersivo. | ✓ |
| Header sólido oscuro fijo | Más contraste, más corporate, menos inmersivo. | |
| Sin header, solo nav en hero | Nav inline en hero sin sticky. Riesgo: visitante pierde nav al scrollear. | |

**User's choice:** Header transparente con blur on scroll
**Notes:** Recomendada — combina mood del referente (Sabiduría) con técnica moderna (Stripe).

---

## Claude's Discretion

User dejó al builder estos micro-decisiones:

- Intensidad final del SVG noise overlay en hero (opacity 0.06–0.1)
- Curva de easing del gradiente animado (linear vs ease-in-out)
- Tamaño exacto del wordmark en distintos contextos (header vs hero)
- Hover/focus states de nav links
- Naming exacto de tokens CSS
- Estructura HTML interna de componentes Astro
- Tono final de la página 404 (sugerido: cósmico-amable sin sarcasmo)

## Deferred Ideas

- Datos reales WhatsApp/Calendly/email → Phase 2/3
- Custom domain planetapsilo.com → Phase 4+ re-evaluación
- GSAP ScrollTrigger + motion avanzado → Phase 4
- Three.js / WebGL → Phase 4+ o nunca
- Light mode toggle → descartado (dark-only locked)
- Glyph / logo personalizado → Phase 4+ con Sofía
- Copy real hero + páginas → Phase 2
- Bilingüe ES/EN → Phase 5d
- Animación del wordmark al cargar → Phase 4 polish

---

*Discussion completed: 2026-05-21*
