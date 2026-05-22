# Phase 2: MVP Content + Three-Channel Contact — Context

**Gathered:** 2026-05-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Rellenar las 4 páginas del esqueleto Phase 1 con copy real legal-safe (cero palabras prohibidas del glosario) y cablear los tres canales de contacto (Calendly LINK + WhatsApp wa.me pre-cargado + Web3Forms con honeypot + Habeas Data checkbox) — todo detrás de `noindex`. Al final de Phase 2 un visitante ICP en iPhone real puede entender la propuesta en <30s, elegir uno de los tres canales y dejar contacto sin que ninguna línea cruce zona gris legal Colombia.

**No incluye:** bio narrativa de Sofía, testimonios reales con consentimiento, photos de cuadros de Sofía, sign-off del abogado, ni remoción de `noindex` — todo eso es Phase 3. Tampoco la tienda `/obras` (eso es Phase 02.1 separada).

</domain>

<decisions>
## Implementation Decisions

### Voz, persona y máxima del hero

- **D-01: Tono cascada a las 4 páginas** — Híbrido business+filosófico (registro Beckley / Synthesis). Lenguaje ejecutivo (claridad, decisión, integración, ordenar) cruzado con máximas filosóficas cortas como acentos visuales. Habla al ICP C-Level / founder / nómada digital sin perder el mood "de otro mundo".
- **D-02: Persona narrativa** — Segunda persona directa al lector ("llegaste hasta aquí por algo", "tu cuerpo lo sabe antes que tu mente"). **Guardrail obligatorio:** cada "tú" pasa por el copy linter contra `docs/copy-glossary.md` para no rozar registro clínico (paciente / diagnóstico / tratamiento). El "tú" es invitación, nunca prescripción.
- **D-03: Value-prop one-liner del hero (LOCKED)** — `Acompañamiento y retiros para liderazgos que están reordenando.` Va arriba del fold como h1, Fraunces light, sobre el gradiente cósmico de Phase 1.
- **D-04: Máxima filosófica del hero — dirección locked, wording final OPEN**
  - **Anchor temporal de trabajo:** `La claridad no se conquista. Se recuerda.`
  - **Dirección semántica que Sofía debe respetar al refinar:** el dolor del C-Level/founder bajo estrés decisional → fatiga cognitiva → falta de plasticidad para resolver problemas, proponer, pensar estrategias e innovar → la pausa profunda devuelve esa claridad. La máxima debe abrir hacia ese eje (cognición ejecutiva + descanso profundo) sin nombrar substancia ni terapia.
  - **Validación:** Sofía propone wording final que respete glosario PERMITIDO; Juan acepta antes de commit.

### Jerarquía de CTAs (cascada a hero + bloques internos)

- **D-05: Tres niveles de jerarquía CTA** (Pitfall #9 mitigación)
  - **Primario** — Calendly LINK (botón naranja sólido, `cta-primary`, "Agenda una conversación")
  - **Secundario** — WhatsApp wa.me (botón outline crema, `cta-secondary`, "Escribir por WhatsApp")
  - **Terciario** — Formulario (link inline texto, "Prefiero escribir un formulario")
- **D-06: Hero dual CTA** — Primario Calendly + secundario "Explora los retiros" (interno a `/retiros`). El form NO aparece en hero — vive en `/contacto` y `/retiros` (este último como form de aplicación).

### /retiros — Application gate UX

- **D-07: Form de aplicación inline al final de `/retiros`** — Anclado debajo del bloque de tres fases (Preparación / Inmersión / Integración). Un solo URL, sin redirect, mantiene contexto visual del gradiente. No Calendly directo (Pitfall #2).
- **D-08: 5 preguntas curadas en el form de aplicación a retiros**
  1. Nombre + email
  2. WhatsApp (+57…)
  3. ¿Cómo te enteraste de planetapsilo? (open text corto)
  4. ¿Qué te trae a este momento? (textarea 2-3 líneas — reemplazo neutro a "síntomas")
  5. ¿Has participado antes en espacios similares? (radio: sí / no / prefiero no responder)
  - Más: checkbox de autorización Habeas Data (Ley 1581) + honeypot oculto
- **D-09: Pantalla post-submit (success state inline)** — El form se reemplaza por un bloque en su sitio con copy:
  > "Recibimos tu aplicación. Te respondemos en menos de 24h.
  > Si prefieres conversar antes → [WhatsApp]."
  - Sin redirect a `/gracias`, sin toast. Mantiene el visitor en `/retiros`. SLA visible refuerza profesionalismo.
- **D-10: Dos forms Web3Forms con access keys distintos**
  - `WEB3FORMS_KEY_RETIROS` → subject "Aplicación retiro planetapsilo"
  - `WEB3FORMS_KEY_CONTACTO` → subject "Consulta general planetapsilo"
  - Sofía separa inbox / triage. Keys viven en `src/data/contact.ts` (no en `.env` — son keys públicas de Web3Forms, expuestas por diseño).

### Testimonios placeholder (Phase 3 reemplaza con reales consentidos)

- **D-11: 3 cards con quote + inicial+rol+ciudad + disclaimer global** — Cards alineadas en grid 1col mobile / 3col desktop. Quote en Fraunces itálica. Atribución abajo: `"M., founder fintech, 41 — Bogotá"`. Pie de bloque:
  > "Testimonios ilustrativos de Phase 2. Voces reales y consentidas en la próxima versión. La experiencia individual no garantiza resultados."
- **D-12: 1 testimonio por página (rotación contextual)** — Tres placeholders distintos, cada uno alineado al contexto:
  - **Home** — testimonio general transformacional ("vine reordenando una venta y salí con algo más vivo que un plan").
  - **/acompanamiento** — testimonio de C-Level sobre acompañamiento ongoing ("llevábamos 4 encuentros cuando entendí que el problema no era de equipo").
  - **/retiros** — testimonio de quien completó las tres fases ("la integración me cambió más que la inmersión").
  - Las 3 quotes finales las redacta Sofía dentro del glosario PERMITIDO; Juan revisa contra linter.

### FAQ

- **D-13: 6 FAQs en accordion `<details>` nativo, solo en home** — Default closed, todas en una vista. HTML semántico `<details><summary>` (cero JS, a11y nativo, Lighthouse-friendly). Las 6 preguntas concretas:
  1. ¿Qué encuadre legal tiene este espacio? (no es terapia ni servicio de salud — texto exacto del disclaimer global)
  2. ¿Qué tan confidencial es lo que se conversa aquí?
  3. ¿Cómo sé si esto es para mí? (suitability sin diagnóstico)
  4. ¿Qué pasa en un encuentro de acompañamiento?
  5. ¿Cuánto tiempo dura un proceso típico?
  6. ¿Cómo decido entre acompañamiento y un retiro?
- Las respuestas las redacta Sofía; pasan por linter contra glosario PROHIBIDO.

### Brand bio "Sobre planetapsilo"

- **D-14: Bloque corto en home (2-3 párrafos), sin página dedicada** — Posición: después del hero, antes del split servicios+retiros. Sin mencionar a Sofía, sin credenciales (LEGAL-04/05 son Phase 3). Contenido propuesto:
  - **Párrafo 1 (qué es):** "planetapsilo es un espacio de exploración personal para liderazgos que están reordenando. No es terapia ni servicio de salud — es acompañamiento y retiros pensados para mentes que ya construyeron mucho y ahora quieren ver desde otra altura."
  - **Párrafo 2 (cómo funciona):** "Cada propuesta recibe a pocas personas. Hay una conversación antes — para saber si lo que pides y lo que ofrecemos calzan. La pausa real no se improvisa."
  - **Párrafo 3 (opcional, filosófico — Sofía ajusta):** una línea-puente al manifiesto. Sofía propone el wording.
- Página dedicada `/sobre` queda diferida a Phase 3 cuando se sume bio narrativa de la guía.

### /contacto — funnel de tres canales

- **D-15: Jerarquía visual del /contacto** — Hero corto + dos CTAs grandes lado-a-lado (Calendly primario / WhatsApp secundario) → debajo bloque "Si prefieres escribir" con form Web3Forms general. Respeta D-05 (Primario > Secundario > Terciario). No usar 3 cards iguales (Pitfall #9).
- **D-16: Form general de /contacto — campos mínimos**
  1. Nombre
  2. Email
  3. WhatsApp (opcional)
  4. ¿Sobre qué quieres conversar? (select: acompañamiento / retiros / otra cosa)
  5. Cuéntame en una línea (textarea corto)
  - Más: checkbox Habeas Data + honeypot oculto
- **D-17: Anti-spam** — Honeypot field nativo de Web3Forms, sin Turnstile / hCaptcha en MVP. Suficiente mientras `noindex` esté activo. Si llega spam real post-indexación → se evalúa Turnstile en Phase 4 (no es bloqueante hoy).
- **D-18: SLA <24h visible cerca de cada CTA**
  - Bajo Calendly: "Espacios próximos esta semana"
  - Bajo WhatsApp: "Respondemos antes de 24h"
  - Bajo form (estado idle): "Respondemos antes de 24h, normalmente el mismo día"
  - En el form-success post-submit: igual mensaje
- **D-19: Microcopy WhatsApp pre-cargado (URL-encoded)**
  - Default global (WhatsAppFloat sticky): `Hola planetapsilo, me interesa explorar`
  - Desde `/acompanamiento`: `Hola planetapsilo, me interesa explorar el acompañamiento`
  - Desde `/retiros`: `Hola planetapsilo, me interesa explorar los retiros`
  - Implementación: helper `waLink(prefill: string)` en `src/data/contact.ts` que devuelve `https://wa.me/${number}?text=${encodeURIComponent(prefill)}`.

### Visual treatment de páginas interiores

- **D-20: Mismo hero gradient cósmico en interiores, opacity reducida** — Cada página interior (/acompanamiento, /retiros, /contacto) tiene su propio hero con el gradiente animado de Phase 1, pero opacity `~0.5` (vs home `0.85`). Mantiene mood "de otro mundo" sin competir con el contenido. SVG noise overlay opcional con `opacity: 0.05`.
- **D-21: Sin fotos reales en MVP** — Cuadros de Sofía son Phase 3 (LEGAL-08). Stock imagery de hongos/ayahuasca está PROHIBIDA (PROJECT.md Out of Scope). Solo CSS gradients + SVG noise + tipografía hacen el trabajo visual.
- **D-22: Mismo BaseLayout para las 4 páginas** — Reutilizar `src/layouts/BaseLayout.astro` sin variantes. La diferencia entre páginas es la opacity del `.hero-bg` (variable CSS local por página) y el contenido — no la chrome.

### Performance, a11y, motion (continúan de Phase 1)

- **D-23: Lighthouse Mobile target (gate de Phase 2)** — ≥80 perf, ≥95 a11y, ≥90 SEO en las 4 páginas medidas con perfil Moto G Power 4G. Falla bloquea cierre de Phase 2.
- **D-24: `prefers-reduced-motion: reduce`** — Defense in depth ya en `tokens.css` Y `global.css` (carrying forward de Phase 1). Cualquier animación nueva (incluido el accordion de FAQ si se anima) respeta esto.
- **D-25: Copy linter como CI gate pre-deploy** — El comando documentado en `docs/copy-glossary.md` corre en CI antes del deploy:
  ```bash
  FORBIDDEN='terapia|tratamiento|paciente|psilocibina|hongos|ayahuasca|cura|garantizado|antes/después|diagnóstico'
  ! grep -rEi "$FORBIDDEN" dist/ 2>/dev/null
  ```
  - Exit 1 = bloquea el deploy. Se integra en el workflow `.github/workflows/deploy.yml` como step antes de `deploy-pages@v4`.

### Disclaimers y footer

- **D-26: Footer Phase 2 — completar pieces que Phase 1 dejó stub**
  - IG link + TikTok link (URLs reales — Sofía pasa los handles)
  - Brand line (de Phase 1) + año
  - Status "Sigue noindex" condicionado a `site.indexable === false` (ya existe)
  - Disclaimer global mínimo (1-2 líneas):
    > "planetapsilo ofrece espacios de exploración personal y acompañamiento no clínico. No constituye terapia ni servicio de salud. Para necesidades de salud mental, consulta a un profesional habilitado."
  - Link a `/privacidad — próximamente` (página stub que Phase 3 reemplaza por Habeas Data real)
- **D-27: Confidentiality one-liner** — Visible en `/acompanamiento` y `/retiros` cerca del form/CTA:
  > "Lo que se conversa aquí no sale de aquí. Trabajamos con discreción profesional y archivamos sólo lo mínimo necesario."

### Claude's Discretion

Áreas donde Claude decide en planning/ejecución sin requerir confirmación de Sofía/Juan:
- Estructura HTML exacta de cada bloque (cards de testimonios, FAQ accordion, success state del form) — seguir conventions Astro + a11y.
- Naming exacto de componentes nuevos (`Hero.astro`, `Maxim.astro`, `ServiceTeaser.astro`, `Testimonial.astro`, `FAQ.astro`, `BrandBio.astro`, `ContactForm.astro`, `RetreatApplicationForm.astro`).
- Spacing, padding, tipografía size scale interna — usar tokens existentes en `tokens.css`.
- Curaduría del wording exacto de los 3 testimonios placeholder y de las 6 respuestas FAQ — Claude redacta v1, Sofía revisa.
- Si el `<details>` nativo necesita un summary chevron CSS personalizado — sí, opcional, default conservador.
- Loading skeleton de los forms cuando el envío está en vuelo — usar disabled state + spinner SVG inline.
- Manejo de error 400/500 del Web3Forms — mostrar mensaje inline rojo + sugerir WhatsApp como fallback.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing Phase 2.**

### Glosario legal (BLOQUEANTE — copy linter)
- `docs/copy-glossary.md` — Source of truth de palabras PERMITIDAS y PROHIBIDAS + reglas de uso. **Cada palabra del copy escrito en Phase 2 pasa por este filtro antes de commit.**

### Proyecto y requirements
- `.planning/PROJECT.md` — Core value, ICP, constraints legales Colombia, decisiones de marca (Sofía oculta en MVP).
- `.planning/REQUIREMENTS.md` — 16 REQ-IDs de Phase 2 (CONT-01..CONT-16) con criterios exactos por página y por canal.
- `.planning/ROADMAP.md` §"Phase 2" — Goal, success criteria, dependencies (Phase 1 deploy verificado + base path funcional + noindex activo).

### Research crystallized (lectura obligatoria del planner)
- `.planning/research/SUMMARY.md` §"Expected Features" y §"Critical Pitfalls" — Must-have feature list + 12 pitfalls priorizados (especialmente #1 copy leak, #2 retiros sin sustancia, #4 Habeas Data, #5 Calendly inline, #6 reduced-motion + a11y, #7 trust substitutes, #9 jerarquía CTAs, #10 testimonios).
- `.planning/research/FEATURES.md` — Tagging de qué entra en Phase 2 vs Phase 3+.
- `.planning/research/PITFALLS.md` — 22 pitfalls completos con mitigaciones.

### Decisiones heredadas de Phase 1
- `.planning/phases/01-foundation-deployable-skeleton/01-CONTEXT.md` — Visual loadout (paleta + tipografía + gradiente + header blur), wordmark treatment, BASE_URL helper pattern.

### Stack externo (referenciados por el research)
- [Web3Forms — Installation](https://docs.web3forms.com/getting-started/installation) — `<form action>` POST pattern + access_key
- [Web3Forms — Spam protection (honeypot)](https://docs.web3forms.com/getting-started/customizations/spam-protection/honeypot) — campo nativo
- [Web3Forms — Custom Success Page / Redirect](https://docs.web3forms.com/getting-started/customizations/redirect-on-success) — opciones de success handling
- [Calendly Embed Options](https://help.calendly.com/hc/en-us/articles/223147027) — LINK button pattern (no inline)
- [WhatsApp wa.me URL spec](https://faq.whatsapp.com/5913398998672934) — `?text=` URL-encoding rules
- [HTML `<details>` accessibility](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) — native accordion pattern

### Legal (referencia, sin obligación de acción Phase 2)
- Ley 1090 de 2006 (deontológico psicología COLPSIC) — guía el glosario
- Ley 1581 de 2012 (Habeas Data) — pendiente de redacción real Phase 3; en Phase 2 sólo checkbox + `/privacidad próximamente`
- Ley 1453 de 2011 (penal narcotráfico) — guía la regla "sin nombrar sustancia"

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets (de Phase 1)

- **`src/layouts/BaseLayout.astro`** — HTML shell completo con meta tags, OG, fuentes, noindex condicional, canonical URL, BASE_URL helper. Phase 2 lo consume sin modificar. Para OG por página (CONT-12), pasar prop `ogImage` o `description` distinto por page.
- **`src/components/layout/Nav.astro`** — Sticky header con blur-on-scroll, mobile hamburger drawer, `internal()` helper para BASE_URL. Phase 2 no toca.
- **`src/components/layout/Footer.astro`** — Footer minimal que necesita expandirse con IG/TikTok links + disclaimer + `/privacidad` link (D-26).
- **`src/components/layout/WhatsAppFloat.astro`** — Sticky CTA naranja flotante. Phase 2 reemplaza el `whatsappNumber` placeholder `0000000000` y el prefill por valores reales — el componente queda igual.
- **`src/data/site.ts`** — `site.indexable: false` controla noindex global (no se toca en Phase 2; flip es Phase 3 LEGAL-12).
- **`src/data/contact.ts`** — Phase 1 dejó stubs (`whatsappNumber: '0000000000'`, `calendlyUrl: '#'`). Phase 2 inyecta valores reales + agrega `web3formsKeyContacto`, `web3formsKeyRetiros`, helper `waLink(prefill)`.
- **`src/data/services.ts`** — Phase 1 dejó `services[]` con teaser. Phase 2 expande con `description`, `audience`, `outcomes`, `confidentialityLine` para `/acompanamiento` y `/retiros`.
- **`src/data/nav.ts`** — Nav order ya está: Inicio · Acompañamiento · Retiros · Obras · Contacto. Phase 2 no lo cambia.
- **`src/styles/tokens.css`** — Paleta + spacing + font stacks + `@property --cosmic-angle` + `cosmic-rotate` keyframes. Phase 2 sólo consume tokens; no añade nuevos colores fundamentales.
- **`src/styles/global.css`** — Defense in depth para `prefers-reduced-motion`. Phase 2 no la altera.

### Established Patterns

- **BASE_URL helper en cada componente que tenga internal links** — Carrying forward del Pitfall #13 (GH Pages base path). Cualquier `<a href>` interno usa `internal('/ruta')` o `import.meta.env.BASE_URL` trim + concat.
- **Naming semántico de tokens CSS** — `--color-text-primary`, `--color-bg-base`, `--color-orange-mystic`. No `--color-1`. Phase 2 sigue esa convención.
- **Pages = composición delgada, lógica visual en componentes** — Las páginas `.astro` actuales (`index.astro`, etc.) son thin wrappers que importan `BaseLayout` y meten contenido directo. Phase 2 introduce componentes de sección reutilizables (`Hero`, `Testimonial`, `FAQ`, `BrandBio`, `ContactForm`, `RetreatApplicationForm`) y las pages los componen.
- **Scripts inline en `.astro` con vanilla JS** — Nav.astro ya estableció el patrón (cero framework runtime). Phase 2 sigue igual para cualquier interactividad mínima (success state del form, accordion si no usamos `<details>` nativo).

### Integration Points

- **Web3Forms HTTPS endpoint** — `https://api.web3forms.com/submit`. POST con `access_key` + campos. Dos endpoints lógicos distintos (mismo URL, distinto access_key) → ver D-10.
- **Calendly URL real** — Pendiente: Sofía pasa el link de su event-type. Mientras tanto Phase 2 puede shippear con placeholder `https://calendly.com/planetapsilo/conversacion-inicial` y registrar como deuda hasta el sign-off de Sofía.
- **WhatsApp number real** — Pendiente: número personal de Sofía en MVP (Phase 4 decide WhatsApp Business + dedicado). Formato wa.me: `57XXXXXXXXXX` sin `+`, sin espacios.
- **Google Fonts CSS2** — Ya está en `global.css` (Fraunces + Inter). Phase 2 no toca.
- **GitHub Actions deploy workflow** — `.github/workflows/deploy.yml`. Phase 2 añade un step "Copy linter" antes de `withastro/action@v3` build (D-25).

</code_context>

<specifics>
## Specific Ideas

### Estructura propuesta de la home (orden de bloques)

1. **Hero** — gradient cósmico animado + wordmark kicker + h1 value-prop (D-03) + máxima (D-04 anchor) + dual CTA (Calendly primario / "Explora los retiros" secundario).
2. **Brand bio "Sobre planetapsilo"** — 2-3 párrafos (D-14), sin imágenes.
3. **Servicios split** — 2 cards lado a lado: "Acompañamiento" → CTA "Conocer más" → `/acompanamiento`; "Retiros" → CTA "Explorar" → `/retiros`.
4. **Testimonio (1, contextual home)** — 1 card grande centrada (D-12 home version) + atribución + disclaimer.
5. **6 FAQ accordion** — `<details>` nativo (D-13).
6. **CTA block final** — repite Calendly primario + WhatsApp secundario + link al form.

### Estructura propuesta de `/acompanamiento`

1. Hero corto (opacity gradient 0.5 — D-20) con título "Acompañamiento" + 1-line teaser.
2. **Para quién** — bloque breve definiendo ICP (C-Level / founder / nómada digital con momento de inflexión).
3. **Qué pasa en un encuentro** — 3-4 bullets de formato (sin clínica).
4. **Cómo funciona el proceso** — 3 fases o 3 pasos sin atribuir terapia.
5. **Testimonio contextual ongoing** (D-12).
6. **Confidencialidad one-liner** (D-27).
7. **CTA jerarquizado** (D-05).

### Estructura propuesta de `/retiros`

1. Hero corto + máxima específica del retiro.
2. **Las tres fases** — 3 cards o lista visual:
   - **Preparación** — qué pasa antes del encuentro físico
   - **Inmersión** — formato del encuentro (días, naturaleza, círculos, comidas, meditación) — **sin nombrar sustancia**
   - **Integración** — qué sigue después
3. **Para quién es y para quién no** — suitability paragraph sin lenguaje clínico.
4. **Testimonio contextual retiro** (D-12).
5. **Confidencialidad one-liner** (D-27).
6. **Form de aplicación inline** (D-07, D-08, D-09).

### Estructura propuesta de `/contacto`

1. Hero breve.
2. **Dos CTAs grandes lado a lado** (Calendly + WhatsApp — D-15).
3. **"Si prefieres escribir"** + form general Web3Forms (D-16).
4. **SLA + microcopy** cerca de cada uno (D-18).

### Form success state — copy exacto sugerido

**Form de retiros (post-submit):**
> "Recibimos tu aplicación. Te respondemos en menos de 24h.
> Si prefieres conversar antes → [Escríbenos por WhatsApp]"

**Form general (post-submit):**
> "Mensaje recibido. Te respondemos antes de 24h, normalmente el mismo día.
> Si querés agendar directo → [Agenda una conversación]"
> _(usar tú-form Colombia, no vos)_

### Helper waLink() propuesto

```ts
// src/data/contact.ts
export const waLink = (prefill: string) =>
  `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(prefill)}`;
```

Usar en WhatsAppFloat (prefill global), `/acompanamiento` (prefill contextual), `/retiros` (prefill contextual), `/contacto` (prefill default).

</specifics>

<deferred>
## Deferred Ideas

- **Bio narrativa "Sobre la guía" (Sofía)** — Phase 3 (LEGAL-05). Requiere abogado + disclaimer separador Andes.
- **Página `/sobre` dedicada** — Phase 3, junto con bio narrativa. En Phase 2 vive como bloque en home (D-14).
- **3 testimonios reales con consentimiento escrito** — Phase 3 (LEGAL-07). Sustituyen los placeholders de D-11/D-12.
- **Photos de cuadros de Sofía** — Phase 3 (LEGAL-08), gated por photo session.
- **`/privacidad` con Habeas Data real (Ley 1581)** — Phase 3 (LEGAL-02). En Phase 2 es stub "próximamente".
- **Calendly real conectado al calendario de Sofía con qualifier questions + confirmación branded** — Phase 3 (LEGAL-09). En Phase 2 puede usar Calendly placeholder.
- **Cloudflare Turnstile / hCaptcha** — Phase 4 si llega spam real post-indexación. En Phase 2: solo honeypot.
- **OG image generada por página vía `@astrojs/og`** — Phase 4 polish. En Phase 2: una OG default `og-default.svg` para las 4 páginas (puede mejorarse luego).
- **`@astrojs/sitemap`** — Phase 3 (LEGAL-13), junto con remoción de noindex.
- **Analytics cookieless (Plausible / Umami)** — Phase 3 (LEGAL-15) opcional o Phase 4.
- **GSAP ScrollTrigger + animaciones avanzadas** — Phase 4 (VAL-03).
- **Pricing visible** — Phase 4 (VAL-04) sólo para acompañamiento. Retiros siguen sin precio.
- **Newsletter "lista de espera retiros"** — Phase 4 (VAL-01).
- **Decap CMS para que Sofía edite sin código** — Phase 4 (VAL-09).
- **WhatsApp Business + número dedicado** — Phase 4 (VAL-05).
- **Three.js / WebGL hero** — diferido indefinidamente, posiblemente nunca (Pitfall #6).
- **Reescribir hero como "long-scroll" tipo Sabiduría / Synthesis** — fuera de scope MVP; el hero actual + bloques es estándar suficiente para validación.
- **`/aplicacion` como página separada** — descartado; el form vive inline en `/retiros` (D-07).
- **Toast/notifications JS** — descartado a favor de inline success state.
- **3 cards iguales en /contacto sin jerarquía** — descartado por Pitfall #9.

</deferred>

---

*Phase: 02-mvp-content-three-channel-contact*
*Context gathered: 2026-05-22*
