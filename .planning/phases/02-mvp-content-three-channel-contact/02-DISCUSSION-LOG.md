# Phase 2: MVP Content + Three-Channel Contact — Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in `02-CONTEXT.md` — this log preserves the alternatives considered.

**Date:** 2026-05-22
**Phase:** 02-mvp-content-three-channel-contact
**Areas discussed:** Voz copy + máxima hero, /retiros + application form, Testimonios + FAQ + brand bio, /contacto + visual treatment

---

## Voz copy + máxima hero

| Option | Description | Selected |
|--------|-------------|----------|
| Híbrido business+filosófico | Estilo Beckley/Synthesis — lenguaje ejecutivo + máximas filosóficas como acentos. Recomendado. | ✓ |
| Íntimo+espiritual primera persona | Estilo Sabiduría/Yannina — "llevo años creando estos espacios". | |
| Filosófico impersonal | Sin "yo" ni "nosotros", solo máximas + descripción de formato. | |

**Tono — User's choice:** Híbrido business+filosófico (recommended)

---

| Option | Description | Selected |
|--------|-------------|----------|
| Tercera persona / la marca | "planetapsilo acompaña" — coherente con Sofía oculta. Recomendado. | |
| Plural inclusivo "nosotros" | "creemos que la claridad se recuerda" — implica equipo. | |
| Segunda persona directa al lector | "llegaste hasta aquí por algo" — directo, riesgo glosario. | ✓ |

**Persona — User's choice:** Segunda persona directa al lector
**Notes:** Aceptado con guardrail — cada "tú" pasa por copy linter contra `docs/copy-glossary.md` para no rozar registro clínico.

---

| Option | Description | Selected |
|--------|-------------|----------|
| Acompañamiento y retiros para liderazgos que están reordenando. | Habla directo al ICP, sin lenguaje clínico. Recomendado. | ✓ |
| Un espacio para ver desde otra altura lo que ya construiste. | Más metafórico, menos accionable. | |
| Pausa profunda para mentes que han construido mucho. | Apela al achievement; menos accionable. | |

**Value-prop — User's choice:** "Acompañamiento y retiros para liderazgos que están reordenando." (recommended)

---

| Option | Description | Selected |
|--------|-------------|----------|
| La claridad no se conquista. Se recuerda. | Eco de la máxima de referencia (Sabiduría). Recomendado. | partial |
| Lo que el éxito no ordena, lo ordena la pausa. | Apela al ICP saturado; quizá sentencioso. | |
| Algunos viajes empiezan quieto. | Ambigüedad alta — "viaje" puede leerse como sustancia. | |

**Máxima — User's choice:** DIRECCIÓN locked, wording final OPEN
**Notes:** Anchor temporal "La claridad no se conquista. Se recuerda." pero wording final lo refina Sofía. Dirección semántica que el user articuló: el dolor del C-Level/founder bajo estrés decisional → fatiga cognitiva → falta de plasticidad para resolver problemas, proponer, pensar estrategias, innovar → la pausa profunda devuelve esa claridad. Sofía propone wording final respetando glosario; Juan acepta antes de commit.

---

## /retiros + application form

| Option | Description | Selected |
|--------|-------------|----------|
| Inline al final de /retiros | Form anclado debajo de las tres fases. Un solo URL. Recomendado. | ✓ |
| Página /aplicacion separada | Botón en /retiros → /aplicacion. Más clean, más fricción. | |
| Modal/drawer dentro de /retiros | Bloquea con prefers-reduced-motion, complica a11y. | |

**Form ubicación — User's choice:** Inline al final de /retiros (recommended)

---

| Option | Description | Selected |
|--------|-------------|----------|
| 5 preguntas curadas | Nombre+email, WhatsApp, cómo te enteraste, qué te trae, experiencia previa. Habeas Data. Recomendado. | ✓ |
| 8 preguntas (más profundo) | Añade edad, rol, manejo del estrés, fecha. Más fricción. | |
| 3 preguntas mínimas | Solo capturar contacto; deja a Sofía con poco contexto. | |

**Preguntas — User's choice:** 5 preguntas curadas (recommended)

---

| Option | Description | Selected |
|--------|-------------|----------|
| Mensaje inline + SLA <24h + WhatsApp opcional | Form se reemplaza por bloque success. Sin redirect. Recomendado. | ✓ |
| Redirige a /gracias | Page nueva con botón "volver". Rompe mood. | |
| Toast + form se limpia | Confunde al visitor premium. | |

**Confirmación — User's choice:** Mensaje inline + SLA <24h + WhatsApp opcional (recommended)

---

| Option | Description | Selected |
|--------|-------------|----------|
| Dos forms Web3Forms con access keys distintos | A retiros / B contacto. Triage clean. Recomendado. | ✓ |
| Un solo form con campo "tipo" oculto | Mismo endpoint, mezcla bandeja. | |
| Form retiros = mismo /contacto | Sin screening específico. | |

**Forms separados — User's choice:** Dos forms con access keys distintos (recommended)

---

## Testimonios + FAQ + brand bio

| Option | Description | Selected |
|--------|-------------|----------|
| 3 cards con quote + inicial+rol+ciudad + disclaimer | Grid 1col/3col. Disclaimer "Testimonios ilustrativos". Recomendado. | ✓ |
| Bloque rotativo (1 a la vez) | Requiere JS + reduced-motion conflict. | |
| Sin testimonios en MVP | Cero riesgo pero pierde trust substitute. | |

**Formato testimonios — User's choice:** 3 cards (recommended)

---

| Option | Description | Selected |
|--------|-------------|----------|
| Solo en home | Bloque único; evita duplicación. Recomendado. | |
| En home + /acompanamiento + /retiros (mismos 3) | Repite → puede leer redundante. | |
| 1 por página (rotación) | 1 contextual en cada página. Más curado. | ✓ |

**Ubicación testimonios — User's choice:** 1 por página (rotación)
**Notes:** Implica curar 3 placeholders distintos contextualizados — home (general transformacional), /acompanamiento (C-Level ongoing), /retiros (3-fase completado).

---

| Option | Description | Selected |
|--------|-------------|----------|
| Las 6 del SUMMARY.md, accordion `<details>`, solo en home | HTML semántico, a11y nativo, Lighthouse-friendly. Recomendado. | ✓ |
| Accordion en home + mini-FAQ específica en /retiros | 2 sets, más completo, más curaduría. | |
| Always-expanded sin accordion | Alarga la home. | |

**FAQ — User's choice:** 6 FAQs accordion solo en home (recommended)

---

| Option | Description | Selected |
|--------|-------------|----------|
| Bloque corto en home (2-3 párrafos) | Después del hero, antes de servicios. Sin Sofía. Recomendado. | ✓ |
| Página /sobre dedicada | 5ª ruta, más espacio, +nav item. | |
| Sin brand bio en MVP | Cero info de qué es planetapsilo como entidad. | |

**Brand bio — User's choice:** Bloque corto en home (recommended)

---

## /contacto + visual treatment

| Option | Description | Selected |
|--------|-------------|----------|
| Calendly + WhatsApp arriba — Form abajo | Respeta jerarquía Pitfall #9. Recomendado. | ✓ |
| Form arriba, CTAs como alternativas | ICP C-Level prefiere agendar/escribir directo. | |
| Tres cards iguales lado a lado | Pierde jerarquía. | |

**Jerarquía /contacto — User's choice:** Calendly+WhatsApp arriba, Form abajo (recommended)

---

| Option | Description | Selected |
|--------|-------------|----------|
| Honeypot field | Nativo Web3Forms. Suficiente mientras noindex activo. Recomendado. | ✓ |
| Honeypot + Cloudflare Turnstile | Más robusto pero +script externo afecta Lighthouse. | |
| Honeypot + hCaptcha visible | Fricción alta para ICP premium. | |

**Anti-spam — User's choice:** Honeypot solo (recommended)

---

| Option | Description | Selected |
|--------|-------------|----------|
| SLA visible + microcopy contextual | Cerca de cada CTA, en success state, prefill por origen. Recomendado. | ✓ |
| SLA solo en form-success | No visible antes del click. | |
| Sin SLA — solo CTAs limpios | Pierde trust substitute clave. | |

**SLA + copy — User's choice:** SLA visible + microcopy contextual (recommended)

---

| Option | Description | Selected |
|--------|-------------|----------|
| Mismo hero gradient cósmico, menos intensidad (opacity 0.5) | Mantiene mood sin competir con contenido. Recomendado. | ✓ |
| Gradiente sub-tonal por página (cada una su matiz) | Coordinar 3 paletas, más tiempo. | |
| Hero gradient solo en home; interiores sin animado | Editorial, mejor Lighthouse, pierde wow visual. | |

**Visual interior — User's choice:** Mismo hero gradient, opacity reducida (recommended)

---

## Claude's Discretion

- Estructura HTML exacta de cada bloque (cards testimonios, FAQ accordion, success state).
- Naming de componentes nuevos (Hero, Maxim, ServiceTeaser, Testimonial, FAQ, BrandBio, ContactForm, RetreatApplicationForm).
- Spacing/padding/scale interna usando tokens existentes.
- Curaduría wording de los 3 testimonios placeholder + 6 respuestas FAQ — Claude redacta v1, Sofía revisa.
- Chevron del `<details>` summary — sí, conservador.
- Loading skeleton del form en vuelo — disabled state + spinner SVG.
- Manejo error 400/500 Web3Forms — mensaje inline + sugerir WhatsApp fallback.

## Deferred Ideas

Ver `02-CONTEXT.md` §`<deferred>` para la lista completa (20 items diferidos a Phase 3 / Phase 4 / Phase 5 / out-of-scope).
