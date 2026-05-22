<!-- GSD:project-start source:PROJECT.md -->
## Project

**planetapsilo**

Sitio web multipágina con estética psicodélica/cósmica para Sofía — psicóloga próxima a graduarse de la Universidad de los Andes — que opera como página de validación y canal comercial para acompañamientos psicológicos a ejecutivos C-Level y nómadas digitales, retiros guiados, una tienda de arte propio y, en fases posteriores, podcast y oferta de yoga. La marca opera como "planetapsilo" (espacio/universo de exploración), no como marca personal directa de Sofía, para preservar su tarjeta profesional y mantener distancia legal frente a la promoción explícita de terapia psicodélica.

**Core Value:** Un visitante del ICP (C-Level digital, nómada digital, founder/startup) puede entender en menos de 30 segundos qué se ofrece, sentir que el sitio es "de otro mundo" estéticamente, y dejar un dato de contacto (agendar Calendly, escribir por WhatsApp, o enviar formulario) sin que ninguna línea de copy comprometa la posición profesional de Sofía.

### Constraints

- **Timeline**: MVP visible y deployable hoy en 1-2 horas — Sofía y Juan quieren tener qué mostrar al final del día.
- **Tech stack**: Sitio estático deployable a GitHub Pages. Opciones favoritas: Astro, Next.js export estático, o HTML+CSS+JS directo. Stack final se decide en Fase 1 según research.
- **Legal Colombia**: Copy no puede atribuir terapia psicodélica a Sofía como prestadora. Tampoco prometer cura/tratamiento. Lenguaje "acompañamiento" y "espacios de exploración".
- **Repo**: Mantener `Elsolarcg/planetapsilo` como remoto. Empezar fresco local y forzar push limpio sobre la v1.
- **Idioma**: Español únicamente en el MVP.
- **Contacto en MVP**: Calendly (placeholder/real) + WhatsApp directo + formulario de respaldo (Google Forms / Formspree / similar) — todas las vías abiertas para no perder leads.
- **Marca**: Bajo "planetapsilo", no bajo nombre personal de Sofía.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## TL;DR Recommendation
- **Astro** ships zero JS by default, scores 98–100 on Lighthouse, supports MDX for the future podcast/blog phase, has a first-class GitHub Pages deploy action, and lets you drop in React/Vue/Svelte islands later if needed (for the future ecommerce phase). It is the standard 2026 choice for content-heavy marketing sites.
- **Tailwind v4** has a 5x faster build, CSS-first `@theme` config (perfect for swapping a custom psychedelic palette), and a first-party Vite plugin that Astro consumes natively — meaning a single line in `src/styles/global.css` (`@import "tailwindcss";`) is all the wiring needed.
- The psychedelic aesthetic is achievable in **pure CSS** (radial/conic gradients, `animation`, `@property` interpolated custom properties, `mix-blend-mode`, `backdrop-filter`). We add **GSAP** only for scroll-triggered choreography on the hero — and only on pages that need it. WebGL/Three.js is **deliberately deferred**: it doubles bundle size and adds 1–2h of authoring time, blowing the MVP window.
- **Web3Forms** has unlimited submissions on the free tier (Formspree caps at 50/mo), zero account dashboard friction, and works with a plain `<form action>`. Netlify Forms is incompatible with GitHub Pages.
- **Calendly inline embed** is a copy-paste `<div>` + `<script>` — no auth, no SDK.
## Recommended Stack
### Core Technologies
| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| **Astro** | `6.3.7` (latest stable, March 2026 major) | Static site framework / SSG | Zero-JS-by-default, file-based multi-page routing (`/acompanamiento`, `/retiros`, `/contacto` as `.astro` files in `src/pages/`), MDX-ready for podcast/blog phase, official GH Pages action, future "islands" path for ecommerce widgets. Standard 2026 choice for content sites per Astro 6 release notes and 2026 SSG comparisons. |
| **Tailwind CSS** | `4.3.0` | Styling / utility CSS | CSS-first `@theme` config lets us define the psychedelic palette (`--color-orange-mystic`, `--color-violet-deep`, `--color-blue-cosmic`) in one place; 5x faster builds; first-party Vite plugin integrates with Astro in one import line; eliminates tailwind.config.js boilerplate. |
| **Node.js** | `>=22.0.0` | Runtime for build | Astro 6 hard requirement (drops Node 20). Confirm `node -v` before `npm create astro@latest`. |
| **GitHub Actions** (Astro's official `withastro/action@v3`) | latest | Build + deploy to GH Pages | Two-step workflow: `actions/configure-pages` then `withastro/action`. Handles `base:` path injection, Pages artifact upload, and deployment. Recommended path in official Astro docs. |
### Supporting Libraries
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| **GSAP** | `3.15.0` | Scroll-triggered + complex tweens | Hero parallax, scroll-triggered text reveals, gradient orb morph. Now 100% free including all plugins (ScrollTrigger, SplitText) as of 2024 acquisition by Webflow. Framework-agnostic — works in Astro `.astro` `<script>` blocks. Load only on pages that need it. |
| **Phosphor Icons** | `@phosphor-icons/web` (CDN or `npm i @phosphor-icons/web`) | Icon system | 7,700+ icons in 6 weights including **duotone** — duotone is the differentiator for the "cosmic / consumer / mystical" aesthetic vs. the utilitarian feel of Lucide/Heroicons. Industry pattern in 2026 is Lucide for app UI, Phosphor for marketing — and this is a pure marketing site. |
| **@astrojs/sitemap** | `3.7.2` | Generate `sitemap.xml` for SEO | Add in phase 2 once domain is real. Not blocking MVP. |
| **@astrojs/mdx** | latest | Markdown + components for podcast/blog phase | Defer to phase 3 (podcast/content layer). Not needed for MVP. |
| **sharp** | bundled by Astro `astro:assets` | Build-time image optimization | Built into Astro's `<Image />` component — generates WebP/AVIF + responsive `srcset` at build time, no runtime cost on GH Pages. Just `import` the image and use `<Image src={...} />`. |
| **Web3Forms** | n/a (HTTP endpoint) | Form-fallback backend | `<form action="https://api.web3forms.com/submit" method="POST">` + hidden `access_key` input. Unlimited submissions on free tier (vs Formspree's 50/mo cap), email delivery, optional hCaptcha. Works without JS. |
| **Calendly inline embed** | n/a (CDN script) | Appointment booking widget | `<div class="calendly-inline-widget" data-url="https://calendly.com/USER/event" style="min-width:320px;height:700px;"></div>` + `<script src="https://assets.calendly.com/assets/external/widget.js" async></script>`. Add `data-resize="true"` to auto-fit height. |
| **WhatsApp deeplink** | n/a (URL) | Direct contact | `https://wa.me/57XXXXXXXXXX?text=Hola%20planetapsilo...` — zero dependencies, opens WhatsApp on mobile/desktop. |
### Development Tools
| Tool | Purpose | Notes |
|------|---------|-------|
| `npm create astro@latest` | Project scaffold | Pick "Empty" or "Minimal" template, TypeScript "strict", no integrations on init (we add Tailwind manually via `npx astro add tailwind`). |
| `npx astro add tailwind` | Wires Tailwind v4 Vite plugin into Astro automatically | Faster than manual `@tailwindcss/vite` install. |
| **Browser DevTools** + **Lighthouse** | Performance verification | Target ≥95 Performance, ≥95 Accessibility, 100 Best Practices on first deploy. |
| **GitHub Pages settings** | Configure source = "GitHub Actions" | Required **once** in `Settings → Pages → Source → GitHub Actions` on `Elsolarcg/planetapsilo` before first workflow run. |
## Installation
# 1. Scaffold (interactive — pick "Empty", TypeScript strict, no extras)
# 2. Pin Node 22+ via .nvmrc (Astro 6 requires Node 22)
# 3. Install
# 4. Tailwind v4 (Astro CLI handles the Vite plugin wiring)
# 5. Optional MVP additions
# 6. Phosphor icons via CDN — no npm install needed for MVP; add this in <head>:
#    <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2/src/regular/style.css" />
#    <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2/src/duotone/style.css" />
## Top-Stack Trade-Off Comparison
| Criterion | **Astro 6** (recommended) | Next.js 15 static export | Vanilla HTML/CSS/JS | Vite + React (SPA) | Eleventy (11ty) |
|-----------|---------------------------|--------------------------|---------------------|--------------------|-----------------|
| **Time-to-first-deploy (MVP)** | 45–60 min | 90–120 min | 30–45 min | 75–90 min | 60–75 min |
| **Multi-page routing** | File-based, native | File-based, native but `output: 'export'` constraints | Manual file-per-page | SPA — need React Router, complicates static export | File-based via templates |
| **Zero-JS by default** | ✅ Yes | ❌ Ships React runtime always | ✅ Yes | ❌ Ships React runtime | ✅ Yes |
| **Lighthouse score on GH Pages** | 98–100 (typical) | 80–90 (typical) | 100 (if disciplined) | 70–85 | 95–100 |
| **GH Pages official path** | ✅ `withastro/action@v3` | ⚠️ `next export` works but `base path` needs `assetPrefix` + `basePath` config; many gotchas | ✅ Just push to `gh-pages` branch | ⚠️ Manual base config + 404.html SPA hack | ⚠️ Community actions, no first-party |
| **Tailwind v4 integration** | ✅ One-line via `astro add` | ✅ First-party | ✅ Vite plugin | ✅ First-party | ⚠️ Manual PostCSS setup |
| **MDX / future blog & podcast** | ✅ `@astrojs/mdx`, content collections | ✅ `next/mdx` | ❌ Reinvent the wheel | ⚠️ Need extra libs | ✅ Native |
| **Future ecommerce (Snipcart, Shopify Buy Button, Stripe Checkout link)** | ✅ Drop in via "islands" or `<script>` tags | ✅ Component-friendly | ✅ Drop in `<script>` | ✅ Component-friendly | ✅ Drop in `<script>` |
| **i18n (bilingual ES/EN future)** | ✅ Native i18n routing | ✅ Native i18n | ❌ Manual duplication | ⚠️ Library-dependent | ⚠️ Plugin-based |
| **Bundle size on first paint** | ~5–20 KB JS (mostly 0) | 80–150 KB JS minimum | 0–10 KB | 100–200 KB | 0–10 KB |
| **DX for non-technical content edits later (Sofía or Juan)** | High (Markdown / MDX collections) | Medium | Low (HTML by hand) | Low (JSX) | High (Markdown) |
| **Risk of forced rewrite in 6 months** | Low | Medium (export limitations) | High (scales poorly past 4 pages) | High (wrong shape) | Low |
## Visual Stack: How to Achieve "Otherworldly / Cosmic / Psychedelic"
### Level 1 — Pure CSS (MUST USE, MVP)
- **Conic + radial gradients** layered with `mix-blend-mode: screen/overlay/soft-light` for the nebula effect.
- `@property --angle` + `animation` for *animated* gradient rotation (interpolatable custom properties, supported in all 2026 evergreen browsers).
- `backdrop-filter: blur()` + transparent gradient overlays for the "frosted cosmic glass" cards.
- CSS `noise` SVG filter (`<feTurbulence>`) layered at `opacity:.08` for the grainy/film feel that distinguishes a "deep" psychedelic look from a generic gradient site.
- Tailwind v4 `@theme` block to expose `--color-orange-mystic: #ff7a3d; --color-violet-deep: #5b2a86; --color-blue-cosmic: #0b1d4f;` as utilities (`bg-orange-mystic`, `text-violet-deep`).
### Level 2 — GSAP (RECOMMENDED, MVP if time permits)
- ScrollTrigger for hero text reveal + parallax orbs on `/` and `/retiros`.
- A single 18 KB gzipped library (core) + 5 KB (ScrollTrigger). Load via `<script>` tag in only the pages that animate.
- Avoid Framer Motion — it's React-only, 32 KB gzipped, and we don't need a React island just for animations.
### Level 3 — Three.js / WebGL (DEFER TO PHASE 2+)
- A WebGL shader background (e.g., signed-distance-field nebula, fragment-shader fluid) is the *most* "of another world" you can get.
- **But:** Three.js core is ~150 KB gzipped, shader authoring takes 2–4h minimum, and on low-end mobile (much of LATAM ICP outside C-Level cohort) it can stutter. Not worth the MVP time.
- If you escalate later, the contender is **OGL** (3 KB) or **Vanta.js** (drop-in animated backgrounds with Three.js under the hood) before reaching for raw Three.js.
### Level 4 — Lottie (NOT RECOMMENDED for this brand)
- Lottie shines for *illustrated* micro-animations (icons, mascots). The psychedelic aesthetic is *generative/atmospheric*, not illustrative. Skip.
### Typography Recommendation
- **Display:** "Cormorant Garamond" or "Fraunces" (serif with mystical/literary feel — matches the "máximas filosóficas" copy register of the reference site).
- **Body:** "Inter" or "DM Sans" (clean, neutral sans).
- Both via `<link rel="preconnect">` + Google Fonts CSS2 with `display=swap`. Add `font-display: swap` to avoid CLS on slow connections.
## Form Backend Recommendation Detail
| Service | Free tier | Works on GH Pages | Spam protection | Verdict |
|---------|-----------|-------------------|-----------------|---------|
| **Web3Forms** ✅ | **Unlimited submissions**, email delivery, 30-day history | ✅ Pure `<form action>` POST | hCaptcha/reCaptcha/Turnstile opt-in, honeypot | **USE THIS** for the form fallback in MVP |
| Formspree | 50 submissions/month (testing cap) | ✅ | Built-in | Skip — 50/mo is too tight; we want validation, not artificial throttling |
| Google Forms embed | Unlimited | ✅ iframe | Built-in | Acceptable fallback-of-fallback. Looks like a Google form (breaks aesthetic). Use only if Web3Forms account creation is blocked. |
| Netlify Forms | 100/mo | ❌ Requires Netlify hosting | n/a | **NOT COMPATIBLE** — we're on GH Pages |
| Static Forms / Splitforms | 1000/mo free | ✅ | Built-in | Backup option if Web3Forms has reliability issues |
## Alternatives Considered
| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| **Astro 6** | Next.js 15 static export | Only if the team has deep Next muscle memory and intends to migrate to Vercel/SSR within 3 months. Static export has `next/image` limitations (must use `loader: 'custom'` or `unoptimized: true` for GH Pages). |
| **Astro 6** | Vanilla HTML+CSS+JS | If we **only ever** ship 1–4 pages and never add a blog/podcast/i18n. The moment the future requirements kick in, refactoring 4 hand-rolled HTML files into a shared layout is more work than starting with Astro. |
| **Astro 6** | Eleventy (11ty) | If the team prefers Nunjucks/Liquid templates and won't ever need component islands. Astro's component model is closer to modern dev expectations. |
| **Astro 6** | Vite + React (SPA) | Never for this project. Marketing sites that ship as SPAs have measurably worse SEO, social-share previews, and Lighthouse scores. Static-output is non-negotiable here. |
| **Tailwind v4** | Vanilla CSS + custom-properties only | If the team is allergic to utility CSS. Loses the 5x build perf, the `@theme` palette ergonomics, and the future shadcn/Astro UI library compatibility. |
| **Tailwind v4** | UnoCSS | Functionally similar but smaller ecosystem; only pick if you already use it. |
| **GSAP 3** | Motion One (`motion.dev`) | Smaller (12 KB) and modern; good fit if you reject GSAP's API. GSAP is more battle-tested for scroll choreography and the entire toolset is now free. |
| **GSAP 3** | Framer Motion | Only if you commit to React islands throughout. We don't — keeping islands optional. |
| **Phosphor Icons** | Lucide | If you want the "standard 2026 dashboard look." For *this* brand (mystical, consumer, illustrative), Phosphor's **duotone** weight is the right call. |
| **Web3Forms** | Formspree | If you want a polished submission dashboard and 50/mo is acceptable. We have validation goals, so unlimited beats a dashboard. |
| **Calendly inline embed** | Cal.com self-hosted | Cal.com is open-source and cheaper at scale, but requires a backend (Vercel/Railway) — violates our static-only constraint. Defer to a future "operations" phase. |
| **GitHub Pages** | Netlify / Cloudflare Pages | The repo `Elsolarcg/planetapsilo` is a project constraint. If we later move (out of scope per PROJECT.md), Cloudflare Pages is the upgrade target — better global CDN, Workers for future serverless. |
## What NOT to Use
| Avoid | Why | Use Instead |
|-------|-----|-------------|
| **Next.js with App Router + static export** | `next export` has known limitations on GH Pages (image loader, basePath, asset prefix all need manual configuration; dynamic routes need `generateStaticParams`); ships React runtime even on static pages; Lighthouse Performance routinely 10–20 points below Astro on equivalent content. | Astro 6. |
| **Create React App / Vite + React SPA** | CRA is deprecated. SPAs on marketing sites kill SEO, break social share previews, and require an SPA fallback (`404.html` hack) on GH Pages. | Astro (or vanilla HTML if truly tiny). |
| **Gatsby** | Stagnant since 2023, Netlify acquisition stalled the project, GraphQL data layer is heavy overkill for 4 pages. | Astro. |
| **Tailwind v3 (`tailwindcss@3.x`)** | Old config-file model, 5x slower builds, no `@theme` directive. Migration tool from v3→v4 exists but starting fresh on v4 is the right call. | Tailwind v4.3.x. |
| **Bootstrap / Bulma / Pico CSS** | Generic out-of-the-box look antithetical to the "of another world" aesthetic; overrides become a fight. | Tailwind v4 + custom palette. |
| **Material UI / Chakra UI** | Component library overrides will fight the psychedelic brand at every turn; bundle bloat (~80 KB JS). | Hand-built components with Tailwind utilities. |
| **Framer Motion (without React islands)** | React-only — pulls in React runtime just for animations. | GSAP 3 (framework-agnostic) or pure CSS animations. |
| **Three.js in MVP** | 150 KB+ gzipped, shader authoring is 2–4h, can stutter on mobile. The aesthetic is achievable in pure CSS for now. | Layered CSS gradients + `@property` interpolated animations + GSAP for scroll. Defer Three.js to phase 2+. |
| **Lottie for backgrounds** | Designed for illustrated micro-animations, not atmospheric/generative effects. Bundle overhead for the wrong tool. | Pure CSS gradients + SVG filters. |
| **Netlify Forms** | Only works when hosting is Netlify. We are on GH Pages. | Web3Forms. |
| **Formspree free tier as primary** | 50 submissions/month cap is too tight for a validation phase. | Web3Forms (unlimited free). |
| **Google Analytics 4 in MVP** | Cookie/consent banner overhead for the very first 1-hour deploy. Adds friction. | Defer to phase 2; add **Plausible** or **Umami** (cookieless, GDPR-clean, no banner needed) when needed. |
| **`<picture>` + manual `srcset` everywhere** | Tedious and error-prone. | Astro's `<Image />` component (uses sharp at build time). |
| **jQuery, plain Bootstrap JS** | Outdated for 2026 stack expectations; bundle bloat. | Astro's built-in `<script>` blocks with vanilla JS, or GSAP for animations. |
| **Self-hosting Three.js or Lottie via `<script src="//cdn...">` in the MVP** | Pulls in runtime weight that delays first paint and hurts Lighthouse on the very metric (visual richness *per kilobyte*) we care about for the ICP. | Pure CSS first, escalate only after MVP is live. |
## Stack Patterns by Variant
- Astro + Tailwind v4 only. No GSAP, no Phosphor (use inline SVG or emoji). Pure CSS animated gradients. Web3Forms via raw `<form action>`. Calendly inline embed. WhatsApp via `https://wa.me/...`.
- 4 pages = 4 `.astro` files under `src/pages/`.
- 1 shared `<Layout.astro>` with header + footer.
- Add GSAP ScrollTrigger to the hero on `/` and `/retiros`.
- Add Phosphor duotone icons in the CTA buttons (Calendly, WhatsApp, Email).
- Add a custom font pair via Google Fonts.
- **Snipcart** (drop-in `<script>` + `data-item-*` attributes — works perfectly with static sites and Astro).
- Or **Shopify Buy Button** (just paste their `<script>` embed) if Sofía wants a Shopify backend.
- Avoid: building a custom cart. Defer that complexity until the art shop is *validated*.
- Add `@astrojs/mdx` and create `src/content/podcast/` content collection with one MDX file per episode.
- Embed Spotify episode iframe per episode page.
- Add `astro-rss` integration for `/podcast.xml` (Apple Podcasts/Spotify directory submission).
- Use Astro's native i18n routing (`src/pages/en/...`). Defaults to Spanish, English under `/en/`. Add a language switcher component.
## Version Compatibility
| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| `astro@6.3.7` | `node@>=22.0.0` | **Hard requirement** — Astro 6 dropped Node 20. Check `node -v`. Use `.nvmrc` to lock. |
| `astro@6.3.7` | `@tailwindcss/vite@4.3.0` | Use `npx astro add tailwind` to wire — it edits `astro.config.mjs` correctly. |
| `tailwindcss@4.3.0` | `@tailwindcss/vite@4.3.0` (same version) | Tailwind v4 requires the matching Vite plugin. Old PostCSS-only setup is **not** supported in v4. |
| `gsap@3.15.0` | Astro `<script>` blocks (any framework) | Framework-agnostic. Import in a `<script>` tag inside the `.astro` file that needs it; Astro will tree-shake to that page only. |
| `withastro/action@v3` | Astro 6 | Uses Node 22 in CI by default. |
| `@astrojs/sitemap@3.7.2` | Astro 6 | Drop-in. Requires `site:` set in `astro.config.mjs` (we already do for the GH Pages URL). |
| **Astro `base: '/planetapsilo'`** | All internal links | **CRITICAL gotcha:** every `<a href="/page">` becomes `<a href="/planetapsilo/page">` only if you use `<a href={`${import.meta.env.BASE_URL}page`}>` or Astro's `<a href="/page">` resolved through `astro:assets`. Use the `import.meta.env.BASE_URL` pattern for *all* internal links. Otherwise links 404 on GH Pages. |
## Confidence Assessment
| Recommendation | Confidence | Verification source |
|---|---|---|
| Astro 6.3.7 as framework choice | **HIGH** | `npm view astro version` returned `6.3.7`; Astro 6 release announcement; 2026 SSG comparison articles |
| Astro is faster than Next.js static export on GH Pages | **HIGH** | Multiple independent 2026 benchmarks; matches Astro's stated zero-JS-by-default architecture |
| Tailwind v4.3.0 as CSS framework | **HIGH** | `npm view tailwindcss version` returned `4.3.0`; official v4 release notes |
| GSAP 3.15.0 is free including all plugins | **HIGH** | GSAP homepage post-Webflow acquisition (announced 2024, in effect 2026); `npm view gsap version` returned `3.15.0` |
| Three.js (`three@0.184.0`) deferred is the right call for MVP | **MEDIUM-HIGH** | Bundle size is well-known; "right call" is a judgment grounded in MVP time budget — if budget were 8h+, Three.js would be in scope |
| Web3Forms unlimited free tier | **HIGH** | Web3Forms official docs + 2026 comparison articles; multiple independent sources confirm "unlimited submissions, email-only, free" |
| Calendly inline embed snippet | **HIGH** | Calendly official help docs |
| Phosphor Icons over Lucide for "consumer/mystical" aesthetic | **MEDIUM** | Industry pattern reports for 2026; subjective brand fit — could swap if Sofía prefers Lucide's minimalism |
| `base: '/planetapsilo'` + `withastro/action@v3` deploy flow | **HIGH** | Astro official GH Pages deploy guide |
| Node 22 required by Astro 6 | **HIGH** | Astro 6 release notes |
## Sources
- [Astro 6 release notes (Southwell Media, 2026)](https://www.southwellmedia.com/blog/astro-6-stable-release) — confirms Astro 6 stable, Node 22 requirement, live content collections
- [Deploy your Astro Site to GitHub Pages — Astro Docs](https://docs.astro.build/en/guides/deploy/github/) — official `base` config and `withastro/action` workflow
- [withastro/action — GitHub Action](https://github.com/withastro/action) — official deploy action source
- [Astro 6 upgrade guide](https://docs.astro.build/en/guides/upgrade-to/v6/) — Node 22 hard requirement
- [Tailwind CSS v4.0 announcement](https://tailwindcss.com/blog/tailwindcss-v4) — Lightning CSS engine, `@theme` config, 5x faster builds, Vite-first
- [LogRocket: Dev's guide to Tailwind CSS in 2026](https://blog.logrocket.com/tailwind-css-guide/) — current best-practices coverage
- [GSAP homepage (2026)](https://gsap.com/) — 100% free including all plugins post-Webflow acquisition
- [Three.js — npm](https://www.npmjs.com/package/three) and [Three.js 2026 changes (Utsubo)](https://www.utsubo.com/blog/threejs-2026-what-changed) — current `0.184.0`, WebGPU support
- [GSAP vs Framer Motion vs React Spring 2026](https://www.annnimate.com/blog/gsap-vs-framer-motion-vs-react-spring) — framework-agnostic argument for GSAP on static sites
- [Web3Forms docs — Installation](https://docs.web3forms.com/getting-started/installation) — access-key setup, HTML snippet
- [Web3Forms docs — hCaptcha](https://docs.web3forms.com/getting-started/customizations/spam-protection/hcaptcha) — spam protection
- [Best Free Form Backend Services in 2026 (splitforms)](https://splitforms.com/blog/best-free-form-backend-services-2026) — comparison of Web3Forms, Formspree, Splitforms tiers
- [Calendly Embed options overview](https://help.calendly.com/hc/en-us/articles/223147027-Embed-options-overview) — inline embed snippet
- [Calendly: How to control your embed layout and sizing](https://help.calendly.com/hc/en-us/articles/30970862033175-How-to-control-your-embed-layout-and-sizing) — `data-resize="true"` and sizing
- [Astro Images docs](https://docs.astro.build/en/guides/images/) — `<Image />`, sharp at build time
- [Best Static Site Generators 2026 (thesoftwarescout)](https://thesoftwarescout.com/best-static-site-generators-2026-astro-next-js-hugo-more/) — independent 2026 SSG comparison
- [Astro vs Next.js for static sites (eastondev, 2026-12)](https://eastondev.com/blog/en/posts/dev/20251202-astro-vs-nextjs-static-site/) — performance comparison
- [Lucide vs Heroicons vs Phosphor Icons 2026 (PkgPulse)](https://www.pkgpulse.com/guides/lucide-vs-heroicons-vs-phosphor-react-icon-libraries-2026) — icon-library positioning for marketing
- npm registry direct queries (authoritative version source): `npm view astro version` → `6.3.7`, `npm view tailwindcss version` → `4.3.0`, `npm view gsap version` → `3.15.0`, `npm view three version` → `0.184.0`, `npm view @astrojs/sitemap version` → `3.7.2`
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
