# Phase 1: Foundation + Deployable Skeleton - Context

**Gathered:** 2026-05-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Entregar HOY una URL pública en GitHub Pages (`https://elsolarcg.github.io/planetapsilo/`) con un esqueleto Astro 6 + Tailwind v4 deployable, base path verificado, `noindex` activo, 4 page stubs (`/`, `/acompanamiento`, `/retiros`, `/contacto`), workflow CI/CD `withastro/action@v3` funcionando, branch `backup-v1` empujado al remoto Elsolarcg/planetapsilo como red de seguridad, SIPI trademark check documentado, y la identidad visual psicodélica base ya cargada (paleta + tipografía + gradiente animado de hero) — todo en un único deploy verificado al final del día.

**No incluye copy real, contenido de servicios, ni integración funcional de Calendly/WhatsApp/Web3Forms** — eso es Phase 2.

</domain>

<decisions>
## Implementation Decisions

### Visual Loadout del Esqueleto

- **D-01: Modo de color** — Dark only. Sin toggle light/dark. El gradiente cósmico (naranjas + violetas + azules profundos) requiere fondo oscuro para brillar. Sin doble trabajo de tokens.
- **D-02: Paleta saturada con alto contraste**. Tokens base en `src/styles/tokens.css`:
  - `--color-orange-mystic: #ff7a3d`
  - `--color-violet-deep: #5b2a86`
  - `--color-blue-cosmic: #0b1d4f`
  - Fondo base: degradado de blue-cosmic hacia un negro azulado (`#050a1a` aprox)
  - Texto principal: blanco crema (`#f4ede3` aprox) — NO blanco puro
  - Acentos: orange-mystic para CTAs primarios, violet-deep para chrome secundario
- **D-03: Tipografía**:
  - **Display** (hero, títulos, máximas): **Fraunces** vía Google Fonts. Pesos 300 + 500. `font-display: swap`. Cargar variant "soft" para curvas más etéreas.
  - **Body** (párrafos, nav, footer, micro-copy): **Inter** vía Google Fonts. Pesos 400 + 500.
  - Sin font-stack adicional. Self-host se evalúa en Phase 2 si Lighthouse perf no llega a ≥80.
- **D-04: Motion al launch** — CSS animated gradient en hero, vía `@property --angle` + `@keyframes` rotando un conic-gradient. Cero JS. Respeta `@media (prefers-reduced-motion: reduce)` con `animation: none`. SIN GSAP en Phase 1 (diferido a Phase 4).
- **D-05: SVG noise overlay** opcional en hero — `<feTurbulence>` filter a `opacity: 0.06–0.1` para textura granosa "psicodélica vintage". Claude's Discretion para decidir intensidad final.

### Identidad de Marca Mínima

- **D-06: Wordmark tipográfico** "planetapsilo" como única identidad de marca en Phase 1. Sin glyph, sin logo aún.
- **D-07: Tratamiento del wordmark**:
  - Lowercase: `planetapsilo`
  - Familia: **Fraunces** (display)
  - Peso: 300 (light)
  - Letterspacing: wide (`tracking: 0.08em` aprox)
  - Color: blanco crema sobre fondo oscuro
- **D-08: Favicon** — Glyph circular SVG con gradiente cósmico (orange-mystic → violet-deep → blue-cosmic en degradado radial). Generado a mano en SVG simple, 32x32 + 16x16 + apple-touch 180x180. Sin emoji.
- **D-09: Header transparente con blur on scroll**:
  - Estado inicial: header transparente que deja ver el gradiente animado del hero
  - Al scrollear (`window.scrollY > 50`): `backdrop-filter: blur(12px)` + borde inferior sutil (`border-bottom: 1px solid rgba(244,237,227,0.08)`)
  - Sticky position
  - Layout: wordmark a la izquierda, nav inline a la derecha (Inicio · Acompañamiento · Retiros · Contacto)
  - Mobile (< 768px): wordmark + hamburger; nav colapsa a drawer fullscreen overlay

### Claude's Discretion

- Intensidad exacta del SVG noise overlay (opacity 0.06–0.1) — decidir en implementación mirando preview real.
- Curva de easing del gradiente animado (linear vs ease-in-out) — preferir algo "respiratorio" no mecánico.
- Tamaño/peso exacto del wordmark en header vs hero (puede variar entre los dos contextos).
- Hover/focus states de los nav links — usar color orange-mystic con transición suave.
- Estructura HTML interna de cada componente (Nav.astro, Footer.astro, WhatsAppFloat.astro) — seguir conventions Astro.
- Naming exacto de tokens CSS en `tokens.css` (preferir nombres semánticos: `--color-text-primary`, `--color-bg-base`, `--gradient-cosmic`).
- Decisión final entre `import.meta.env.BASE_URL` vs `Astro.url` helper para internal links — ambos resuelven el base path.

### Pre-decided (carrying forward del init y research, no re-discutido)

- Stack: Astro 6.3.x + Tailwind v4.3.x + Phosphor duotone via CDN + Web3Forms + Calendly LINK + WhatsApp wa.me
- Node 22+ pinned vía `.nvmrc`
- `astro.config.mjs`: `site: 'https://elsolarcg.github.io'`, `base: '/planetapsilo'`, `output: 'static'`
- `<meta name="robots" content="noindex,nofollow">` global desde commit 1 + `public/robots.txt` con `User-agent: *` / `Disallow: /`
- 4 page stubs: `src/pages/index.astro`, `acompanamiento.astro`, `retiros.astro`, `contacto.astro`
- Custom `404.astro` consistente con la marca (Claude's Discretion para tono final, sugerencia: cósmico)
- `.github/workflows/deploy.yml` con `withastro/action@v3` + `actions/deploy-pages@v4`
- `backup-v1` branch creada y empujada al remoto ANTES del force-push limpio
- SIPI trademark check de "planetapsilo" en clases 35, 41, 44 documentado en `.planning/intel/trademark.md`
- `.gitignore`: `node_modules/`, `dist/`, `.astro/`, `.DS_Store`, `.env*`
- `docs/copy-glossary.md` documentado (PERMITIDO + PROHIBIDO + reglas de uso) — sirve de referencia para Phase 2

### Diferidos a Phase 2/3/4 (no se discutieron, asumimos defaults)

- **Datos reales de canales** (WhatsApp number, Calendly URL, email) — Phase 1 usa stubs:
  - WhatsApp button: `href="https://wa.me/0000000000?text=Hola%20planetapsilo"` (placeholder)
  - Calendly button: `href="#"` (placeholder)
  - Email contacto: no expuesto en Phase 1
  - Reales se cablean en Phase 2 (form/CTA wiring) y Phase 3 (Calendly real conectado).
- **Custom domain** (planetapsilo.com) — mantenemos `elsolarcg.github.io/planetapsilo/` indefinidamente. Re-evaluar si crece tráfico o branding lo justifica (no antes de Phase 4).
- **GSAP / motion avanzado** — Phase 4.
- **Three.js / WebGL** — Phase 4+ o nunca.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing Phase 1.**

### Research (crystallized decisions)

- `.planning/research/STACK.md` — Stack completo con versiones, snippets de configuración (`astro.config.mjs`, workflow YAML), comparación de alternativas, gotchas (base path)
- `.planning/research/ARCHITECTURE.md` — Component boundaries, directory tree completo, build order, GH Pages mechanics
- `.planning/research/FEATURES.md` — Feature MVP-feasibility tags (qué entra en Phase 1 vs Phase 2)
- `.planning/research/PITFALLS.md` — 22 pitfalls priorizados (base path, leetspeak, force-push, noindex, etc.)
- `.planning/research/SUMMARY.md` — Síntesis ejecutiva, high-leverage decisions table, phase-by-phase implications

### Project context

- `.planning/PROJECT.md` — Vision, Core Value, Constraints (legal Colombia, repo Elsolarcg), Key Decisions
- `.planning/REQUIREMENTS.md` — 46 v1 REQ-IDs, Phase 1 cubre FOUND-01..FOUND-15
- `.planning/ROADMAP.md` — Phase 1 goal, success criteria, dependency hints

### External standards (referenciados por research)

- [Astro 6 GH Pages deploy guide](https://docs.astro.build/en/guides/deploy/github/) — workflow oficial
- [Tailwind v4 `@theme` config](https://tailwindcss.com/blog/tailwindcss-v4) — CSS-first palette tokens
- [Calendly Embed options](https://help.calendly.com/hc/en-us/articles/223147027) — LINK pattern para Phase 2
- [Web3Forms docs](https://docs.web3forms.com/getting-started/installation) — `<form action>` POST pattern

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

(None yet — greenfield. Phase 1 ES la creación inicial. La v1 del repo Elsolarcg/planetapsilo es 1 commit con HTML estático puro sin estructura recuperable — se reescribe desde cero. Backup-v1 branch preserva la v1 antes del force-push.)

### Established Patterns

(N/A para Phase 1. Phase 1 establece los patrones que Phase 2+ heredarán.)

### Integration Points

- **Remoto git:** `Elsolarcg/planetapsilo` (GitHub) — origen del backup + destino del force-push limpio
- **GitHub Pages settings:** Source = "GitHub Actions" (configurar 1 vez en Settings → Pages)
- **Google Fonts:** Fraunces + Inter vía `<link>` en `BaseLayout.astro`
- **Phosphor Icons:** vía CDN en `<head>` del BaseLayout

</code_context>

<specifics>
## Specific Ideas

### Paleta exacta (tokens.css)

```css
@theme {
  --color-orange-mystic: #ff7a3d;
  --color-violet-deep: #5b2a86;
  --color-blue-cosmic: #0b1d4f;
  --color-bg-base: #050a1a;          /* fondo profundo */
  --color-text-primary: #f4ede3;     /* crema, no blanco puro */
  --color-text-muted: rgba(244, 237, 227, 0.65);
  --color-chrome-border: rgba(244, 237, 227, 0.08);
}
```

### Gradiente animado de hero (CSS pattern)

```css
@property --cosmic-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.hero-bg {
  background: conic-gradient(
    from var(--cosmic-angle),
    var(--color-violet-deep),
    var(--color-orange-mystic),
    var(--color-blue-cosmic),
    var(--color-violet-deep)
  );
  animation: cosmic-rotate 32s linear infinite;
  filter: blur(80px) saturate(1.2);
}

@keyframes cosmic-rotate {
  to { --cosmic-angle: 360deg; }
}

@media (prefers-reduced-motion: reduce) {
  .hero-bg { animation: none; }
}
```

### Wordmark target

`<span class="font-display font-light text-2xl tracking-[0.08em] lowercase">planetapsilo</span>`

### Favicon SVG (32x32 placeholder generable)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>
    <radialGradient id="g" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ff7a3d"/>
      <stop offset="55%" stop-color="#5b2a86"/>
      <stop offset="100%" stop-color="#0b1d4f"/>
    </radialGradient>
  </defs>
  <circle cx="16" cy="16" r="14" fill="url(#g)"/>
</svg>
```

### Header behavior reference

Inspiración: header de sabiduriapsicodelica.com (referente) + header de stripe.com (blur técnico). Combinación: el mood de Sabiduría + la técnica de Stripe.

### Página 404 (tono)

Tono cósmico-amable: "Te perdiste en el universo de planetapsilo. Volvé al [inicio]." con un gradiente animado de fondo. Sin culpa, sin sarcasmo, sin "page not found" técnico.

</specifics>

<deferred>
## Deferred Ideas

- **Datos reales WhatsApp / Calendly / email** — Phase 1 ships con stubs; reales en Phase 2 (form/CTA wiring) y Phase 3 (Calendly real conectado al calendario de Sofía).
- **Custom domain planetapsilo.com** — no se compra hoy. Re-evaluar después de Phase 4 si tráfico/branding lo justifica.
- **GSAP ScrollTrigger + animaciones avanzadas** — Phase 4 (Validación + polish).
- **Three.js / WebGL hero shader** — Phase 4+ o nunca; CSS gradient cumple el mood.
- **Light mode / theme toggle** — no se construye. Dark-only es decisión locked.
- **Glyph / logo personalizado más allá del favicon** — eventual diseño con Sofía cuando haya bandwidth (Phase 4+).
- **Copy real del hero y de las 4 páginas** — Phase 2 (con copy linter contra glosario).
- **Bilingüe ES/EN** — Phase 5d.
- **Animación del wordmark al cargar (fade-in, letter-by-letter)** — Phase 4 polish, no MVP.

</deferred>

---

*Phase: 01-foundation-deployable-skeleton*
*Context gathered: 2026-05-21*
