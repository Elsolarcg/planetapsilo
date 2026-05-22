# Architecture Research

**Domain:** Static psychedelic-aesthetic personal brand / coaching site, GitHub Pages deploy, multi-phase evolution
**Researched:** 2026-05-21
**Confidence:** HIGH (Astro path, content collections, GH Pages mechanics, ecommerce embeds — all verified in current official docs and 2026 community sources); MEDIUM on WebGL/Three.js integration patterns (well-known but project-specific complexity)

---

## TL;DR

**Recommended stack:** Astro 5+ with content collections, file-based routing, `output: 'static'`, deployed to GitHub Pages via the official `withastro/action`. Set `site` + `base` for project-page subpath (`/planetapsilo/`). Use React/Vanilla islands only where interactivity demands it (Calendly inline widget, Three.js hero, future buy buttons).

**Why Astro over Next.js export or raw HTML for THIS project:**
1. **Phase 1 today**: page-per-route via `src/pages/*.astro` works exactly like raw HTML + supports component reuse from minute one — no SPA tax, no hydration overhead.
2. **Phase 5 bilingual**: built-in i18n routing (`astro.config.mjs` → `i18n: { locales, defaultLocale }`) added later without restructuring URLs.
3. **Phase 3 ecommerce**: official ecommerce guide covers Shopify Buy Button, Snipcart, Stripe Checkout drop-in patterns.
4. **Phase 4 podcast**: native `@astrojs/rss` + content collections give per-episode landing pages from a single MDX folder.
5. **Performance**: zero-JS by default — heavy psychedelic visuals get optimized via `<Image />` (AVIF/WebP, srcset, lazy by default) without sacrificing the "de otro mundo" aesthetic budget on JS bloat.

Raw HTML works for today but blocks every future phase. Next.js export adds React tax for a content site that doesn't need it.

---

## Standard Architecture

### System Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                     BROWSER (visitor)                             │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐  │
│  │   Hero +   │  │  Calendly  │  │  WhatsApp  │  │  Formspree │  │
│  │  Three.js  │  │   inline   │  │   deeplink │  │   form     │  │
│  │  (island)  │  │  (island)  │  │   (anchor) │  │  (island)  │  │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘  │
└────────┼───────────────┼───────────────┼───────────────┼─────────┘
         │               │               │               │
         │ (HTML+CSS shipped, JS hydrates only islands)  │
         │               │               │               │
┌────────┴───────────────┴───────────────┴───────────────┴─────────┐
│             ASTRO BUILD OUTPUT  (static /dist)                    │
│  ┌─────────────────────────────────────────────────────────┐     │
│  │  Pages: index.html, acompanamiento/, retiros/, contacto/│     │
│  │  Assets: /_astro/*.css, *.js, /images/*.{avif,webp,jpg} │     │
│  └─────────────────────────────────────────────────────────┘     │
│                       ▲                                          │
│                       │ (built from)                             │
│  ┌─────────────────────────────────────────────────────────┐     │
│  │  SOURCE                                                  │     │
│  │  ┌────────────┐ ┌──────────────┐ ┌──────────────────┐   │     │
│  │  │ src/pages  │ │ src/content/ │ │ src/components/  │   │     │
│  │  │ (routes)   │ │ (MD/MDX/YAML)│ │ (UI primitives)  │   │     │
│  │  └────────────┘ └──────────────┘ └──────────────────┘   │     │
│  │  ┌────────────┐ ┌──────────────┐ ┌──────────────────┐   │     │
│  │  │ src/layouts│ │ src/data/    │ │ src/styles/      │   │     │
│  │  │ (shells)   │ │ (config JSON)│ │ (tokens + global)│   │     │
│  │  └────────────┘ └──────────────┘ └──────────────────┘   │     │
│  └─────────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────────┘
         ▲                                                ▲
         │ git push main                                  │ (3rd-party,
         │                                                │  no backend)
┌────────┴───────────┐                          ┌─────────┴────────┐
│  GITHUB ACTIONS    │                          │  EXTERNAL SVCS    │
│  withastro/action  │                          │  • Calendly       │
│  → publishes to    │                          │  • Formspree      │
│  gh-pages env      │                          │  • wa.me deeplink │
└────────────────────┘                          │  • (later)        │
                                                │    Shopify/       │
                                                │    Snipcart       │
                                                │    Spotify embed  │
                                                └───────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| **Layout (`BaseLayout.astro`)** | HTML shell: `<head>`, meta, OG, fonts, nav, footer, global CSS | Single `.astro` layout consumed by every page via `<slot />`. Variants: `BaseLayout` (default) and later `EpisodeLayout`, `ProductLayout` |
| **Pages (`src/pages/*.astro`)** | Route definition + page-level composition. One file = one URL | `index.astro`, `acompanamiento.astro`, `retiros.astro`, `contacto.astro` — each imports `BaseLayout` and section components |
| **Section components** | Visual blocks reused across pages (Hero, CTASection, TestimonialQuote, ServiceCard) | `.astro` files in `src/components/sections/`. Pure presentation, accept props |
| **Island components** | Interactive bits that need JS (Calendly widget, Three.js canvas, form state) | `.tsx` / `.jsx` / `.vue` / `.astro` with `client:visible` or `client:idle` directive |
| **Content (`src/content/`)** | Long-form / structured copy that benefits from MD/MDX or YAML — pages can read this | Astro content collections with schemas (Zod). Phase 1 OK to skip; Phase 2+ moves copy here |
| **Data (`src/data/`)** | Small config JSON: nav links, social URLs, contact endpoints, color palette tokens | Plain `.json` / `.ts` exports imported by components |
| **Assets (`src/assets/` + `public/`)** | Images and static files. `src/assets/` = processed by Astro `<Image />`. `public/` = served as-is (favicon, robots.txt, OG defaults) | Astro Image pipeline handles AVIF/WebP/srcset for `src/assets/`; `public/` is untouched |
| **Styles (`src/styles/`)** | Design tokens (CSS custom properties), global resets, type ramps. Tailwind optional | `tokens.css` (variables), `global.css` (resets, body), component styles colocated in `.astro` `<style>` |
| **Build/Deploy (`.github/workflows/`)** | CI that runs `astro build` and pushes `dist/` to GitHub Pages | Single workflow using `withastro/action@v3` triggered on push to `main` |

---

## Recommended Project Structure

### Phase 1 (today) — minimum viable tree

```
planetapsilo/
├── .github/
│   └── workflows/
│       └── deploy.yml                  # withastro/action → GH Pages
├── public/
│   ├── favicon.svg
│   ├── robots.txt                      # disallow nothing in MVP; just present
│   └── og-default.jpg                  # fallback social card
├── src/
│   ├── assets/                         # Astro-processed images (AVIF/WebP/srcset)
│   │   ├── hero/
│   │   │   └── cosmic-hero.jpg
│   │   ├── acompanamiento/
│   │   ├── retiros/
│   │   └── textures/                   # backgrounds, gradients, grain
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Nav.astro
│   │   │   ├── Footer.astro
│   │   │   └── WhatsAppFloat.astro     # sticky CTA, deeplink to wa.me/57...
│   │   ├── sections/
│   │   │   ├── Hero.astro              # text + background (image or future Three.js)
│   │   │   ├── ValueProp.astro
│   │   │   ├── ServiceTeaser.astro     # reusable: feeds Home from /acompanamiento etc.
│   │   │   ├── CTABlock.astro          # "Conecta conmigo" + 3 buttons
│   │   │   └── Maxim.astro             # filosophical quote block (referente: sabiduria)
│   │   ├── ui/
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   └── Gradient.astro          # decorative SVG/CSS gradient blob
│   │   └── islands/                    # interactive: client:* directive used here
│   │       ├── CalendlyInline.astro    # wraps <script> + div#calendly-inline
│   │       ├── ContactForm.astro       # plain HTML form posting to Formspree
│   │       └── (future) HeroCanvas.tsx # Three.js shader background
│   ├── content/                        # OPTIONAL in Phase 1 — start here Phase 2
│   │   └── config.ts                   # placeholder (empty collections OK)
│   ├── data/
│   │   ├── site.ts                     # site name, base URL, contact info
│   │   ├── nav.ts                      # nav items array (drives Nav.astro)
│   │   ├── services.ts                 # service teasers for Home
│   │   └── contact.ts                  # Calendly URL, WhatsApp number, Formspree endpoint
│   ├── layouts/
│   │   └── BaseLayout.astro            # html shell, head, nav, footer, slot
│   ├── pages/
│   │   ├── index.astro                 # Home
│   │   ├── acompanamiento.astro
│   │   ├── retiros.astro
│   │   ├── contacto.astro
│   │   └── 404.astro                   # custom 404 (GH Pages serves automatically)
│   ├── styles/
│   │   ├── tokens.css                  # --color-cosmic-deep, --gradient-aurora, etc.
│   │   └── global.css                  # reset + base typography
│   └── env.d.ts
├── astro.config.mjs                    # site, base, integrations
├── package.json
├── tsconfig.json
└── README.md
```

### Phase 2-5 expansion (NO restructure required — only additions)

```
src/
├── content/                            # ← grows substantially Phase 2+
│   ├── config.ts                       # collection schemas (Zod)
│   ├── pages/                          # long copy pulled out of components (Phase 2)
│   │   ├── sobre-la-guia.mdx
│   │   └── legal-privacidad.mdx
│   ├── products/                       # tienda (Phase 3) — one MDX per cuadro/artesanía
│   │   ├── cuadro-001-aurora.mdx
│   │   └── cuadro-002-mandala.mdx
│   ├── episodes/                       # podcast (Phase 4)
│   │   ├── 001-bienvenida.mdx
│   │   └── 002-c-level-y-consciencia.mdx
│   └── posts/                          # blog (Phase 5)
│       └── 2026-08-primer-post.mdx
├── pages/
│   ├── sobre.astro                     # Phase 2 — bio Sofía (renders from content/pages)
│   ├── tienda/
│   │   ├── index.astro                 # Phase 3 product grid
│   │   └── [slug].astro                # dynamic route from products collection
│   ├── podcast/
│   │   ├── index.astro                 # Phase 4 feed listing
│   │   └── [slug].astro                # episode landing
│   ├── yoga.astro                      # Phase 4
│   ├── blog/
│   │   ├── index.astro                 # Phase 5
│   │   └── [slug].astro
│   ├── rss.xml.js                      # Phase 4/5 — @astrojs/rss feed generator
│   └── en/                             # Phase 5 bilingual — mirrors es/ tree
│       ├── index.astro
│       └── ...
└── i18n/                               # Phase 5
    ├── es.json
    └── en.json
```

### Structure Rationale

- **`src/pages/` is the routing source of truth.** File-based routing means adding a new page = creating one file. No router config to maintain. URLs match folder structure literally.
- **`src/data/` vs `src/content/`:** `data/` holds small TS/JSON config (nav, contact endpoints, palette names) — typed, imported directly. `content/` holds editorial prose (bio, episodes, products) — schema-validated, queried via `getCollection()`. Splitting them now means Phase 2-5 just *adds* to `content/` without touching `data/`.
- **`src/components/{layout,sections,ui,islands}/`:** four buckets so newcomers (or future Sofía editing copy) can navigate by intent: "I need a button" → `ui/`, "I need a new visual block" → `sections/`, "I need an interactive widget" → `islands/`.
- **`src/assets/` (processed) vs `public/` (raw):** anything Astro should optimize (psychedelic visuals, photos) goes in `assets/` and is referenced via `import` + `<Image />`. Anything that must be served at a literal path (`/robots.txt`, `/favicon.svg`, manifest files, downloadable PDFs) goes in `public/`.
- **`content/config.ts` even in Phase 1 (empty):** scaffolds Zod-based schemas. When Phase 2 lands, adding the `products` collection is a 5-line schema, not a new architectural decision.
- **No `src/i18n/` in Phase 1:** Spanish only. When Phase 5 lands, Astro i18n config + `src/i18n/{es,en}.json` slots in without renaming the existing routes — Astro can serve `defaultLocale: 'es'` with no prefix and add `/en/` for English.

---

## Architectural Patterns

### Pattern 1: Layout → Page → Section Composition

**What:** Every page is `BaseLayout` wrapping a vertical stack of section components, fed by data from `src/data/` or `src/content/`.

**When to use:** Always. This is the spine. Section components are the unit of design reuse — `Hero` appears on Home, `ServiceTeaser` on Home + linked from `/acompanamiento`, `CTABlock` on every page.

**Trade-offs:** Slight indirection (a page is "thin"); huge upside in copy iteration speed and consistency. Sofía can change Hero copy in one prop and it propagates.

**Example:**
```astro
---
// src/pages/acompanamiento.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/sections/Hero.astro';
import ValueProp from '../components/sections/ValueProp.astro';
import CTABlock from '../components/sections/CTABlock.astro';
import { services } from '../data/services';

const service = services.find(s => s.slug === 'acompanamiento');
---
<BaseLayout title="Acompañamiento — planetapsilo" description={service.meta}>
  <Hero heading={service.heroTitle} subhead={service.heroSubhead} image={service.heroImage} />
  <ValueProp items={service.pillars} />
  <CTABlock variant="full" />
</BaseLayout>
```

### Pattern 2: Islands for Interactivity Only

**What:** Astro renders zero JavaScript by default. Wherever a component needs JS (Calendly inline widget, Three.js canvas, form validation), mark it with `client:visible` (lazy hydrate when scrolled into view) or `client:idle` (hydrate when browser idle).

**When to use:** Calendly inline embed; Three.js shader background; future Snipcart cart drawer; future ContactForm with client-side validation.

**Trade-offs:** Boundary discipline required — every island is a JS payload. Keep islands small and lazy. `client:visible` is the default choice for "below-the-fold interactive widgets" (Calendly on `/contacto`).

**Example:**
```astro
---
// src/components/islands/CalendlyInline.astro
const { url } = Astro.props;
---
<div class="calendly-inline-widget" data-url={url} style="min-width:320px;height:680px;"></div>
<script async src="https://assets.calendly.com/assets/external/widget.js"></script>
```

Used in a page:
```astro
<CalendlyInline url="https://calendly.com/sofia-planetapsilo/30min" client:visible />
```

### Pattern 3: Content-as-Code with Schema Validation

**What:** From Phase 2 onward, prose lives in `src/content/<collection>/*.mdx` with a Zod schema in `content/config.ts`. Pages query via `getCollection('episodes')` and Astro generates dynamic routes via `[slug].astro`.

**When to use:** Phase 2 bio, Phase 3 products, Phase 4 episodes, Phase 5 posts. Anything where the count grows or non-devs edit copy.

**Trade-offs:** Slight upfront ceremony (schema). Massive payoff: type safety, build-time validation (typo in frontmatter = build fails, not runtime 404), and a clean migration target for Decap CMS later.

**Example:**
```ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const episodes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    number: z.number().int().positive(),
    publishedAt: z.date(),
    spotifyUrl: z.string().url().optional(),
    applePodcastsUrl: z.string().url().optional(),
    durationMinutes: z.number().int().optional(),
    summary: z.string().max(300),
    cover: z.string().optional(),
  }),
});

export const collections = { episodes };
```

```astro
---
// src/pages/podcast/[slug].astro
import { getCollection, getEntry } from 'astro:content';
export async function getStaticPaths() {
  const episodes = await getCollection('episodes');
  return episodes.map(ep => ({ params: { slug: ep.slug }, props: { ep } }));
}
const { ep } = Astro.props;
const { Content } = await ep.render();
---
<BaseLayout title={`${ep.data.title} — planetapsilo`}>
  <article>
    <h1>{ep.data.title}</h1>
    {ep.data.spotifyUrl && <iframe src={`https://open.spotify.com/embed/episode/...`} />}
    <Content />
  </article>
</BaseLayout>
```

### Pattern 4: Three-Channel Contact Funnel as Co-Equal CTAs

**What:** `CTABlock` always offers three actions side-by-side: (1) "Agendar" → opens Calendly (popup or `/contacto`), (2) "WhatsApp" → `wa.me/57XXXXXXXXXX?text=Hola%20Sof%C3%ADa%2C...` deeplink with prefilled message, (3) "Escribir" → scrolls to / links to Formspree form on `/contacto`.

**When to use:** On every page. The PROJECT.md explicitly states all three must remain open in the MVP to avoid losing leads.

**Trade-offs:** Three CTAs side-by-side risks decision paralysis. Mitigate with visual hierarchy — Calendly as primary (filled gradient), WhatsApp + form as secondary (outlined). Single component means changing the order/styling is a one-file edit.

**Example:**
```astro
---
// src/components/sections/CTABlock.astro
import { contact } from '../../data/contact';
const waText = encodeURIComponent('Hola Sofía, vi planetapsilo y me interesa hablar.');
---
<section class="cta">
  <a href={contact.calendlyUrl} class="btn-primary">Agendar 30 min</a>
  <a href={`https://wa.me/${contact.whatsappNumber}?text=${waText}`} class="btn-secondary">WhatsApp</a>
  <a href="/contacto#form" class="btn-tertiary">Escribir</a>
</section>
```

### Pattern 5: Design-Token CSS (no Tailwind dependency required)

**What:** Define palette + gradients + type ramp as CSS custom properties in `src/styles/tokens.css`. Components use `var(--color-cosmic-deep)` etc. Optional: Tailwind v4 (CSS-first config) layers cleanly on top.

**When to use:** From day one. The psychedelic aesthetic depends on consistent palette across pages — tokens prevent drift.

**Trade-offs:** Tailwind would speed prototype but ships a class explosion in HTML; for a content site of 4-15 pages, vanilla CSS + tokens is leaner and more readable. Reassess at Phase 5 if site grows past ~30 pages.

**Example:**
```css
/* src/styles/tokens.css */
:root {
  --color-cosmic-deep: #1a0b2e;
  --color-violet-aurora: #6b2d8c;
  --color-orange-solar: #ff6b1a;
  --color-blue-abyss: #0a1845;
  --gradient-aurora: linear-gradient(135deg, var(--color-violet-aurora) 0%, var(--color-orange-solar) 50%, var(--color-blue-abyss) 100%);
  --font-display: 'Cormorant Garamond', serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --space-section: clamp(4rem, 10vw, 8rem);
}
```

---

## Data Flow

### Request Flow (visitor on `/contacto`)

```
[Visitor opens https://elsolarcg.github.io/planetapsilo/contacto/]
    ↓
[GitHub Pages CDN serves dist/contacto/index.html — pure static, no server]
    ↓
[Browser parses HTML, fetches /planetapsilo/_astro/*.css + page-specific JS chunk for islands]
    ↓
[Three islands hydrate lazily:]
    ├─ CalendlyInline (client:visible)  → loads widget.js, iframe to calendly.com
    ├─ ContactForm   (client:idle)      → attaches submit handler, posts to Formspree
    └─ WhatsAppFloat (no JS — plain <a>) → opens wa.me deeplink on tap
    ↓
[Visitor action:]
    ├─ Books Calendly → Calendly POSTs to Sofía's calendar/email
    ├─ Submits form   → Formspree receives → emails Sofía
    └─ Taps WhatsApp  → opens chat on phone with prefilled "Hola Sofía..."
    ↓
[No backend touched. Site has no database, no API, no server.]
```

### Build Flow (developer pushing changes)

```
[git push origin main]
    ↓
[GitHub Actions: .github/workflows/deploy.yml triggers]
    ↓
[withastro/action@v3 → npm ci → npx astro build]
    ↓
[astro build reads src/, processes images in src/assets/, generates dist/]
    ↓
[Action publishes dist/ to gh-pages branch / Pages environment]
    ↓
[Live in ~60-90s at https://elsolarcg.github.io/planetapsilo/]
```

### State Management

**There is no client state to manage in MVP.** Site is fully static; the only client-side state is per-island (Calendly iframe, form input — both self-contained). Resist any urge to introduce Redux/Zustand/Pinia — it would be architectural debt for zero gain.

Phase 3 ecommerce: cart state lives in Snipcart/Shopify's own embedded widget (LocalStorage handled by them). Don't roll your own.

### Key Data Flows

1. **Copy edit → live site:** Edit `src/data/services.ts` or `src/content/episodes/003.mdx` → `git push` → Action rebuilds → live in ~90s. No CMS needed for Sofía+Juan working from the repo.
2. **New page:** Create `src/pages/yoga.astro` → import `BaseLayout` + sections → push. URL `/planetapsilo/yoga/` exists.
3. **New product (Phase 3):** Create `src/content/products/006-mandala-azul.mdx` with frontmatter (price, image, description) → `src/pages/tienda/[slug].astro` auto-generates page → Shopify Buy Button reads the SKU from frontmatter → checkout via Shopify.
4. **New episode (Phase 4):** Create `src/content/episodes/004-...mdx` with Spotify URL → episode page auto-generated → RSS feed at `/rss.xml` regenerates.
5. **Bilingual (Phase 5):** Astro i18n routing kicks in; same component tree consumes `src/i18n/{es,en}.json` for chrome text; content collections gain a `lang` field or mirror under `content/en/`.

---

## Scaling Considerations

This is a personal brand site, not a SaaS — "scale" means "more content + more visitors," not "more concurrent writes."

| Scale | Architecture Adjustments |
|-------|--------------------------|
| **0-1k visitors/month** (today, Phase 1-2) | Default Astro + GitHub Pages. No changes. Static HTML scales infinitely for read traffic. |
| **1k-10k/month** (Phase 3-4 with paid traffic) | Watch GitHub Pages 100 GB/month bandwidth soft limit. If hero/video assets push you near it, offload heavy images to Cloudinary or move host to Cloudflare Pages (free, unlimited bandwidth, same Astro build). |
| **10k-100k/month** (viral TikTok/Instagram spike scenario) | Move off GitHub Pages to Cloudflare Pages or Netlify. Same `dist/` output, just a different deploy target. Add Cloudflare in front of GitHub Pages as cheaper alternative. Add real analytics (Plausible / Umami self-hosted). |
| **Content > 50 episodes / 100 products** (Phase 4+) | Migrate from raw MDX-editing to Decap CMS (`/admin` route, Git-based) so Sofía can edit without touching VS Code. Architecture unchanged — Decap commits to the same `src/content/` dir. |

### Scaling Priorities

1. **First bottleneck — GitHub Pages bandwidth (100 GB/month soft cap):** Triggers when heavy psychedelic visuals + reasonable traffic combine. *Fix:* AVIF/WebP via `<Image />` (60-73% smaller than JPEG), responsive srcset, and `loading="lazy"` (Astro default). If still bumping the cap, offload assets to Cloudinary or relocate to Cloudflare Pages.
2. **Second bottleneck — Sofía editing copy:** If Sofía isn't comfortable in a text editor, she'll stop updating the site and the project rots. *Fix:* Add Decap CMS at Phase 2 or 3 (Astro has official integration). One config file + an `/admin/` route — Decap writes to the same MDX files, no architecture change.
3. **Third bottleneck — Three.js hero performance on low-end mobile:** Cosmic shaders eat battery on $200 phones, common for nómadas digitales in transit. *Fix:* `prefers-reduced-motion` detection → fall back to static gradient image. Keep WebGL behind feature flag in `src/data/site.ts`.

---

## Anti-Patterns

### Anti-Pattern 1: Building Phase 1 as raw HTML "to save time"

**What people do:** Skip Astro, write `index.html`, `acompanamiento.html`, etc. directly. "It's just 4 pages, why over-engineer?"

**Why it's wrong:** No component reuse → nav/footer copy-pasted into 4 files → first revision becomes 4 edits. No image pipeline → ship 4 MB JPEGs. No i18n path → Phase 5 = full rewrite. No content collections → Phase 4 podcast = manual HTML for every episode.

**Do this instead:** Use Astro from Phase 1. `astro create` + writing 4 `.astro` pages is the same speed as 4 `.html` files **for the first hour**, and every subsequent hour is 5x faster. The PROJECT.md timeline of "1-2h MVP" is achievable in Astro — `npm create astro@latest -- --template minimal` is 60 seconds.

### Anti-Pattern 2: Inlining all copy in components

**What people do:** Hardcode every paragraph and heading inside `Hero.astro`, `ValueProp.astro`, etc. Sofía wants to revise wording → developer hunts through component tree.

**Why it's wrong:** Components become un-reusable (one Hero per page because copy is baked in). Sofía can't self-edit. Bilingual is impossible without rewriting every component.

**Do this instead:** Even in Phase 1, push copy into `src/data/services.ts` and `src/data/site.ts` as plain TS objects. Components accept props. Phase 2 graduates long copy (bio, legal) to `src/content/pages/*.mdx`. This is the difference between an editable site and one that ossifies.

### Anti-Pattern 3: Ignoring GitHub Pages `base` path

**What people do:** Develop locally with links like `<a href="/acompanamiento">`. Deploy to `https://elsolarcg.github.io/planetapsilo/`. Every link 404s because actual URL is `/planetapsilo/acompanamiento`.

**Why it's wrong:** Site appears broken on production. Custom 404 page (if absent) makes diagnostics painful. Wastes deploy cycles.

**Do this instead:** Set `base: '/planetapsilo'` in `astro.config.mjs` from commit #1. Use `import.meta.env.BASE_URL` or Astro's auto-prefixed `<a href="/acompanamiento">` (Astro rewrites internal links when `base` is set in v4+). Test by running `astro preview` locally — it serves under the base path.

```js
// astro.config.mjs — Phase 1 config
import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://elsolarcg.github.io',
  base: '/planetapsilo',
  trailingSlash: 'always',
  output: 'static',
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
});
```

If/when a custom domain is added later (e.g. `planetapsilo.com`), update `site` and remove `base` (or set `base: '/'`) — a single config diff, no link rewrites needed if you used Astro's relative helpers.

### Anti-Pattern 4: Loading Three.js / heavy WebGL on every page

**What people do:** Put the cosmic shader hero in `BaseLayout` so it appears everywhere. Every page now ships ~600KB of Three.js + shaders.

**Why it's wrong:** Mobile users on Colombian 4G abandon. Lighthouse score collapses. SEO suffers. The "de otro mundo" feeling becomes a "loading forever" feeling.

**Do this instead:** WebGL hero only on Home (`src/pages/index.astro`), as an island with `client:visible` and a static gradient fallback. Other pages get a CSS-only animated gradient (`Gradient.astro`). The aesthetic carries through tokens + typography + imagery, not through ubiquitous shaders.

### Anti-Pattern 5: Mixing `output: 'static'` with `output: 'server'` mid-project

**What people do:** Add an "API route" in `src/pages/api/contact.ts`, switch Astro to `output: 'server'`, then can't deploy to GitHub Pages anymore.

**Why it's wrong:** GitHub Pages is static-only. SSR requires Node host (Vercel, Netlify, Cloudflare Workers). Switching breaks the deploy target the entire project assumes.

**Do this instead:** Keep `output: 'static'`. For forms, use Formspree/Web3Forms (third-party form-to-email). For dynamic data later, fetch from third-party at build time and pre-render. If you genuinely need SSR (Phase 5+), that's the moment to migrate hosting to Cloudflare Pages — not to monkey-patch GitHub Pages.

---

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| **Calendly** | Inline embed via `<div class="calendly-inline-widget">` + `widget.js`. Alternative: `Calendly.initPopupWidget({ url })` for popup; or plain link `https://calendly.com/sofia-planetapsilo/30min` | Inline = best UX on `/contacto` (visitor doesn't leave page). Popup = best for "Agendar" buttons on Home / `/retiros` (no full embed weight). Link-out = ultra-fast fallback. Use all three: inline on contact page, popup elsewhere. |
| **WhatsApp** | `https://wa.me/57XXXXXXXXXX?text=Hola%20Sof%C3%ADa%2C%20vi%20planetapsilo` — plain `<a>` tag. No script needed | Number must be E.164 without `+`. URL-encode the prefilled message. Test on iOS and Android — both must open the chat with text populated. Sticky floating button on every page (`WhatsAppFloat.astro`). |
| **Formspree** | `<form action="https://formspree.io/f/{id}" method="POST">` — fully static HTML, no JS required | Free tier: 50 submissions/month — sufficient for validation phase. Add honeypot field for spam. Confirmation page = redirect to `/contacto/gracias`. Alternative: Web3Forms (unlimited free, similar API) or Google Forms `<iframe>` (ugliest UX but zero config). |
| **Shopify Buy Button** (Phase 3) | Generated `<script>` snippet from Shopify admin, dropped into a `.astro` component. One snippet per product OR a "collection" snippet for grid | Shopify handles cart, checkout, inventory, taxes, shipping. Requires Shopify subscription (~$29/mo). Best for credible art shop. Drop into `src/components/islands/ShopifyBuyButton.astro` with `client:visible`. |
| **Snipcart** (Phase 3 alternative) | `<button class="snipcart-add-item" data-item-id="..." data-item-price="..." data-item-name="...">` + Snipcart's global script | 2% transaction fee + Stripe fees. No monthly. Product data lives in YOUR repo (`src/content/products/*.mdx`) — frontmatter is the source of truth. Better if Sofía wants full design control. |
| **Stripe Checkout** (Phase 3 ultra-light) | Pre-built Payment Link from Stripe dashboard → plain `<a href="https://buy.stripe.com/...">Comprar</a>` | Zero JS, zero config. No cart (one-product checkout). Good for "consultar" → "pagar reserva de retiro" flows. Worst for multi-item art shop. |
| **Spotify embed** (Phase 4) | `<iframe src="https://open.spotify.com/embed/episode/{id}" width="100%" height="232" frameborder="0">` | One iframe per episode page. Lazy-load (`loading="lazy"` on iframe). Apple Podcasts uses similar `<iframe src="https://embed.podcasts.apple.com/...">`. Store episode IDs in `src/content/episodes/*.mdx` frontmatter. |
| **Decap CMS** (Phase 3+, optional) | Static `/admin/index.html` + `/admin/config.yml` → React app served from your own site, commits to GitHub via OAuth | Requires GitHub OAuth proxy (Netlify Identity, or self-hosted). On GitHub Pages, easiest path = use Netlify Identity even though hosted on GH Pages (CMS only needs the OAuth, not the hosting). Or self-host the proxy on Cloudflare Worker. |
| **Plausible / Umami** (Phase 2 analytics) | Single `<script defer data-domain="planetapsilo.com" src="https://plausible.io/js/script.js"></script>` in `BaseLayout` | Privacy-respecting, no consent banner needed in most EU/LATAM regimes. Avoid Google Analytics for legal-sensitive content (psychedelic-adjacent → GA's data sharing is a liability). |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| **Pages ↔ Sections** | Props (data flows down) | Pages own composition + data fetching from `data/` or `content/`. Sections are dumb/presentational. |
| **Layout ↔ Pages** | `<slot />` + frontmatter props | `BaseLayout` accepts `{ title, description, ogImage }` as props from the page. Page passes children via slot. |
| **Components ↔ Data** | TS imports (`import { services } from '../data/services'`) | Compile-time, type-safe. No runtime fetch. |
| **Pages ↔ Content** | `getCollection('episodes')`, `getEntry('pages', 'sobre-la-guia')` | Build-time only. Astro validates frontmatter against Zod schema in `content/config.ts`. |
| **Islands ↔ Host page** | Props (initial state) + island manages its own lifecycle | No shared state between islands. If two islands ever need to communicate (rare for this site), use `CustomEvent` on `document` — don't introduce a state library. |
| **Build ↔ Deploy** | `withastro/action@v3` reads `dist/`, publishes to Pages | Single trigger: push to `main`. No staging environment in Phase 1; add `develop` branch + preview deploy at Phase 3 if needed. |

---

## Build Order Implications (for Roadmap)

The architecture suggests this build order **within Phase 1** to unblock parallel work on copy/visuals:

1. **Scaffold** (15 min): `npm create astro@latest`, configure `site` + `base`, set up `.github/workflows/deploy.yml`, push empty site to verify deploy works end-to-end. **This unblocks everything else** — if deploy is broken, no one can see progress.
2. **Tokens + BaseLayout + Nav + Footer** (20 min): Establish the visual chrome. Now every page added inherits the look. **Unblocks visual designer / copy editor** — they can comment on real pages.
3. **Section components stubs** (15 min): Create `Hero`, `ValueProp`, `ServiceTeaser`, `CTABlock`, `WhatsAppFloat` as placeholder boxes with props. **Unblocks copywriter** — they can fill `src/data/services.ts` and see live updates.
4. **Page composition** (15 min): `index.astro`, `acompanamiento.astro`, `retiros.astro`, `contacto.astro` — each is 10-20 lines wiring up sections. **Unblocks routing review** — Sofía can click through the actual site flow.
5. **Calendly + Formspree integration** (15 min): Drop islands into `/contacto`. Use placeholder Calendly URL if real one not ready (config in `src/data/contact.ts` — swap later without touching component).
6. **Visual polish + real images** (40 min): Replace placeholder images with Sofía's actual psychedelic art. Run `<Image />` pipeline. Tune gradients and typography. **This is where 70% of the "wow" comes from** — leave headroom.

**Critical path:** Steps 1-2 are sequential (15 + 20 = 35 min). Once `BaseLayout` exists, steps 3-5 can run in parallel between dev + copywriter + visual designer. Step 6 is where Sofía + Juan iterate to taste.

**Phase 2+ build order constraints:**
- Content collections (`content/config.ts`) must be defined before any dynamic route can read them — Phase 4 podcast needs the `episodes` collection committed before episode pages can be built.
- i18n routing config must be set before any `/en/` page is added — flipping i18n on existing routes is one config change, but it's a breaking change for in-flight branches.
- Decap CMS config (`/admin/config.yml`) must mirror existing collection schemas — adopt at Phase 2 if you want, but don't add it before the content collections exist.

---

## GitHub Pages Specifics

| Concern | Approach for planetapsilo |
|---------|---------------------------|
| **Base path** | Repo is `Elsolarcg/planetapsilo` → URL is `https://elsolarcg.github.io/planetapsilo/`. Set `base: '/planetapsilo'` in `astro.config.mjs`. Use Astro's relative link helpers; avoid hardcoded `/foo` paths. |
| **Deploy method** | GitHub Actions via `withastro/action@v3` (official). Drop the workflow from Astro docs into `.github/workflows/deploy.yml`. Don't use the legacy `gh-pages` branch approach — Actions is simpler and supports custom Node versions. |
| **404 handling** | Astro auto-generates `dist/404.html` from `src/pages/404.astro`. GitHub Pages serves it automatically for unmatched routes. Make it on-brand (cosmic "te perdiste en el universo" vibe) with a back-to-home CTA. |
| **Custom domain** | When Sofía buys `planetapsilo.com` (Phase 2): (1) add `public/CNAME` file with `planetapsilo.com`, (2) configure DNS at registrar (`ALIAS` or 4 A records pointing to GH Pages IPs), (3) update `site: 'https://planetapsilo.com'` and remove/empty `base` in `astro.config.mjs`, (4) wait for HTTPS cert (~10 min after DNS resolves). |
| **HTTPS** | Auto-provisioned by GitHub via Let's Encrypt. Must enable "Enforce HTTPS" in repo settings → Pages. Wait until DNS resolves before enabling. |
| **Bandwidth limit** | Soft 100 GB/month. At average page weight ~2 MB (with cosmic visuals), that's ~50k page-views/month before warnings. More than enough for Phase 1-3. |
| **Repo size limit** | 1 GB. Don't commit raw high-res source files. Keep `src/assets/` images at delivery-target resolution (≤2400px wide, optimized JPEG/PNG). |
| **Build time limit** | GH Actions free tier: 2000 min/month on private, unlimited on public. Astro builds for a site this size: ~30-60s. Effectively no constraint. |
| **Caching** | GH Pages serves with reasonable cache headers but can't be configured. If granular cache control needed (Phase 4+), move to Cloudflare Pages. |
| **Redirects** | GH Pages does NOT support redirect rules. If you need `/old-url` → `/new-url`, use `<meta http-equiv="refresh">` in a stub HTML page OR move host to Netlify/Cloudflare which support `_redirects` files. |
| **SPA routing** | Not relevant — Astro generates real HTML files per route, not a SPA. This is a feature: every page has its own URL, its own `<title>`, its own OG image. SEO and shareability work out of the box. |

---

## Future-Proofing Checks (does this hold through Phase 5?)

| Future need | Does this architecture support it? | What changes? |
|-------------|------------------------------------|---------------|
| Phase 2: bio "Sobre la guía" + legal pages | YES | Add `src/content/pages/sobre-la-guia.mdx`, `src/pages/sobre.astro`, `src/pages/legal.astro`. Zero refactor. |
| Phase 2: SEO + analytics | YES | Add `<meta>` props to `BaseLayout`, drop Plausible script. Zero refactor. |
| Phase 3: art shop with checkout | YES | Add `products` content collection, `src/pages/tienda/{index,[slug]}.astro`. Pick Shopify Buy Button OR Snipcart based on Sofía's preference. Both are drop-in `<script>` + `data-*` attributes. |
| Phase 4: podcast with per-episode landings | YES | Add `episodes` content collection, `src/pages/podcast/{index,[slug]}.astro`, `src/pages/rss.xml.js` via `@astrojs/rss`. Embed Spotify/Apple iframes. |
| Phase 4: yoga page | YES | Add `src/pages/yoga.astro`. One file. |
| Phase 5: blog | YES | Add `posts` content collection, `src/pages/blog/{index,[slug]}.astro`. Reuse episode pattern. |
| Phase 5: bilingual ES/EN | YES | Add `i18n` to `astro.config.mjs`, create `src/i18n/{es,en}.json`, mirror `src/pages/` under `src/pages/en/` (or use Astro's i18n recipe with `defaultLocale: 'es'` and no prefix on ES). Content collections gain a `lang` field. No URL changes for Spanish; English at `/en/*`. |
| Decap CMS for Sofía self-edit | YES | Add `public/admin/{index.html,config.yml}`. Decap commits to `src/content/`. No code changes. |
| Migrate off GitHub Pages | YES, low-friction | Same `dist/` works on Netlify, Cloudflare Pages, Vercel static, S3+CloudFront. Change `base` config + remove `CNAME` if relevant. |

**Architecture rewrite triggers (none in scope for Phase 1-5):**
- Real-time features (chat, live booking) → would force SSR migration.
- User accounts with private content → would force auth + database (move to Next.js + Supabase or similar).
- High-traffic interactive web app → not this site's trajectory.

---

## Sources

- [Astro Docs — Deploy to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/) — HIGH confidence (official)
- [Astro Docs — Internationalization (i18n) Routing](https://docs.astro.build/en/guides/internationalization/) — HIGH confidence (official)
- [Astro Docs — Content Collections](https://docs.astro.build/en/guides/content-collections/) — HIGH confidence (official)
- [Astro Docs — Images](https://docs.astro.build/en/guides/images/) — HIGH confidence (official)
- [Astro Docs — E-commerce](https://docs.astro.build/en/guides/ecommerce/) — HIGH confidence (official)
- [Astro Docs — Decap CMS](https://docs.astro.build/en/guides/cms/decap-cms/) — HIGH confidence (official)
- [Astro Docs — RSS](https://docs.astro.build/en/recipes/rss/) — HIGH confidence (official)
- [withastro/action GitHub Action](https://github.com/withastro/action) — HIGH confidence (official)
- [Formspree — Adding a Form to Astro](https://formspree.io/guides/astro/) — HIGH confidence (vendor official)
- [Calendly — Embed options overview](https://help.calendly.com/hc/en-us/articles/223147027-Embed-options-overview) — HIGH confidence (vendor official)
- [GitHub Docs — GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) — HIGH confidence (official)
- [Codrops — Building a Scroll-Revealed WebGL Gallery with GSAP, Three.js, Astro and Barba.js (Feb 2026)](https://tympanus.net/codrops/2026/02/02/building-a-scroll-revealed-webgl-gallery-with-gsap-three-js-astro-and-barba-js/) — MEDIUM confidence (current pattern reference)
- [ux3d.io — Building with three.js and React inside Astro islands](https://ux3d.io/en/blog/threejs/) — MEDIUM confidence (case study)
- [Mavik Labs — Astro Internationalization in 2026](https://www.maviklabs.com/blog/internationalization-astro-2026/) — MEDIUM confidence (current secondary)
- [Astro Snipcart starter](https://github.com/lloydjatkinson/astro-snipcart) — MEDIUM confidence (community, well-maintained)
- [Astro Shopify starter (headless)](https://github.com/thomasKn/astro-shopify) — MEDIUM confidence (community)
- [Snipcart vs Shopify Buy Button comparison](https://snipcart.com/blog/snipcart-vs-shopify-buy-button-review) — MEDIUM confidence (vendor-authored but technically accurate)
- [Pagepro — Astro vs Next.js 2026](https://pagepro.co/blog/astro-nextjs/) — MEDIUM confidence (secondary comparison)
- [GitHub Community — GitHub Pages SPA routing limitations](https://github.com/orgs/community/discussions/27676) — HIGH confidence (official discussion thread)

---
*Architecture research for: static psychedelic-aesthetic personal brand site, multi-phase, GitHub Pages*
*Researched: 2026-05-21*
