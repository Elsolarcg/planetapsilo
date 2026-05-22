# Phase 2: MVP Content + Three-Channel Contact — Pattern Map

**Mapped:** 2026-05-22
**Files analyzed:** 27 new/modified
**Analogs found:** 23 / 27 (4 net-new with no direct analog)

This document maps every file Phase 2 creates or modifies to its closest Phase 1 analog, with concrete code excerpts the executor should copy. The Phase 1 scaffold is small enough that every analog is in-context already; nothing here requires re-reading.

---

## File Classification

### Pages modified (composition only — body replaced with real components)

| File | Role | Data flow | Closest analog | Match quality |
|------|------|-----------|----------------|---------------|
| `src/pages/index.astro` | page | request-response (static render) | `src/pages/index.astro` (Phase 1 self) | exact (self-refactor) |
| `src/pages/acompanamiento.astro` | page | request-response | `src/pages/acompanamiento.astro` (Phase 1 self) | exact (self-refactor) |
| `src/pages/retiros.astro` | page | request-response | `src/pages/retiros.astro` (Phase 1 self) | exact (self-refactor) |
| `src/pages/contacto.astro` | page | request-response | `src/pages/contacto.astro` (Phase 1 self) | exact (self-refactor) |
| `src/pages/privacidad.astro` | page (NEW) | request-response | `src/pages/404.astro` | role-match (single-section stub page) |

### Section components (NEW — under `src/components/sections/`)

| File | Role | Data flow | Closest analog | Match quality |
|------|------|-----------|----------------|---------------|
| `src/components/sections/Hero.astro` | component (presentational) | request-response | `src/pages/index.astro` hero block + `src/pages/404.astro` | role-match (extracted from existing inline hero) |
| `src/components/sections/BrandBio.astro` | component | request-response | `src/pages/acompanamiento.astro` (section pattern) | role-match |
| `src/components/sections/ServiceTeaser.astro` | component (card) | request-response | `src/pages/obras.astro` `.obra-card` (lines 111–130) | role-match (card with title + meta + CTA) |
| `src/components/sections/ServicesSplit.astro` | component (composer) | request-response | `src/pages/obras.astro` `.obras-grid` (lines 109–133) | role-match (grid of cards) |
| `src/components/sections/Testimonial.astro` | component (card) | request-response | `src/pages/obras.astro` `.obra-card` | role-match (card with body + attribution) |
| `src/components/sections/FAQ.astro` | component (accordion) | event-driven (native `<details>` toggle) | `src/components/layout/Nav.astro` mobile drawer toggle | partial (native HTML; no JS needed) |
| `src/components/sections/RetreatPhases.astro` | component (3-card grid) | request-response | `src/pages/obras.astro` `.obras-grid` (lines 109–133) | role-match |
| `src/components/sections/ConfidentialityLine.astro` | component (display) | request-response | `src/pages/index.astro` `.hero-sub` block | role-match (centered statement) |
| `src/components/sections/CTABlock.astro` | component (CTA cluster) | request-response | `src/pages/contacto.astro` `.cta-row` (lines 17–21, 43–62) | exact (existing primary/secondary/tertiary chain) |

### UI primitives (NEW — under `src/components/ui/`)

| File | Role | Data flow | Closest analog | Match quality |
|------|------|-----------|----------------|---------------|
| `src/components/ui/Button.astro` | component (primitive) | request-response | `src/pages/contacto.astro` `.cta` / `.cta-primary` / `.cta-secondary` / `.cta-tertiary` (lines 43–62) + `src/components/layout/WhatsAppFloat.astro` (whole file) | exact (variants already exist inline) |

### Form components (NEW — under `src/components/forms/`)

| File | Role | Data flow | Closest analog | Match quality |
|------|------|-----------|----------------|---------------|
| `src/components/forms/ContactForm.astro` | component (form) | request-response (POST to Web3Forms) | none — net-new in codebase | no analog (use research excerpts + Web3Forms docs) |
| `src/components/forms/RetreatApplicationForm.astro` | component (form) | request-response (POST to Web3Forms) | `src/components/forms/ContactForm.astro` (built first in same plan) | sibling-pattern |
| `src/components/forms/FormField.astro` | component (primitive) | request-response | none — net-new | no analog (use UI-SPEC contract directly) |
| `src/components/forms/HabeasDataCheckbox.astro` | component (primitive) | request-response | none — net-new | no analog |
| `src/components/forms/FormSuccess.astro` | component (state view) | event-driven (swap-in-place) | `src/pages/index.astro` `.hero-content` block | partial (same centered-card layout) |

### Footer (modified — expand from stub)

| File | Role | Data flow | Closest analog | Match quality |
|------|------|-----------|----------------|---------------|
| `src/components/layout/Footer.astro` | component (layout) | request-response | `src/components/layout/Footer.astro` (Phase 1 self) | exact (self-extension) |

### Data modules (modified — expand exports)

| File | Role | Data flow | Closest analog | Match quality |
|------|------|-----------|----------------|---------------|
| `src/data/contact.ts` | data | n/a | `src/data/contact.ts` (Phase 1 self) | exact (self-extension) |
| `src/data/services.ts` | data | n/a | `src/data/services.ts` (Phase 1 self) | exact (self-extension) |
| `src/data/testimonials.ts` | data (NEW) | n/a | `src/data/services.ts` | role-match (typed array export) |
| `src/data/faqs.ts` | data (NEW) | n/a | `src/data/nav.ts` | role-match (smallest typed array) |

### Build tooling (NEW + modified)

| File | Role | Data flow | Closest analog | Match quality |
|------|------|-----------|----------------|---------------|
| `scripts/copy-lint.mjs` | utility (CLI script) | file-I/O (read `dist/**/*.html`, fail on match) | none — net-new in codebase | no analog (use Node fs + glob pattern) |
| `package.json` | config | n/a | `package.json` (Phase 1 self) | exact (add scripts entry) |
| `.github/workflows/deploy.yml` | config (CI) | n/a | `.github/workflows/deploy.yml` (Phase 1 self) | exact (insert lint step) |

### Styles (modified — minimal)

| File | Role | Data flow | Closest analog | Match quality |
|------|------|-----------|----------------|---------------|
| `src/styles/tokens.css` | config (CSS tokens) | n/a | `src/styles/tokens.css` (Phase 1 self) | exact (already has reduced-motion gate; Phase 2 only consumes) |
| `src/styles/global.css` | config (CSS base) | n/a | `src/styles/global.css` (Phase 1 self) | exact (already has reduced-motion gate; no edits required per UI-SPEC) |

---

## Pattern Assignments

### Pages — `src/pages/{index,acompanamiento,retiros,contacto}.astro` (page, request-response)

**Analog:** Phase 1 self (`src/pages/contacto.astro` is the richest Phase 1 page and demonstrates BaseLayout + data import + CTA composition).

**Imports + frontmatter pattern** (`src/pages/contacto.astro` lines 1–8):

```astro
---
// src/pages/contacto.astro — Contacto stub (Phase 2 CONT-04 wires real 3-channel CTAs).
// Tres canales abiertos: Calendly, WhatsApp, formulario Web3Forms. Phase 1 muestra stubs.
import BaseLayout from '../layouts/BaseLayout.astro';
import { contact } from '../data/contact';

const waHref = `https://wa.me/${contact.whatsappNumber}?text=${contact.whatsappPrefill}`;
---
```

**BaseLayout consumption with per-page meta** (`src/pages/contacto.astro` line 9):

```astro
<BaseLayout title="Contacto" description="Tres canales — Calendly, WhatsApp, formulario...">
```

→ Phase 2 simply swaps `title` and `description` to the LOCKED strings in UI-SPEC §"Per-page meta (CONT-12)".

**Page-level section pattern** (`src/pages/acompanamiento.astro` lines 7–17):

```astro
<BaseLayout title="Acompañamiento" description="...">
  <section class="page-section">
    <div class="container">
      ...
    </div>
  </section>
</BaseLayout>

<style>
  .page-section { padding-block: var(--space-section); }
  ...
</style>
```

→ Phase 2 keeps `.page-section { padding-block: var(--space-section); }` as the **default vertical rhythm** between sections — matches UI-SPEC §"Container & rhythm".

**Page-of-sections composition for Phase 2** (no Phase 1 file demonstrates this since stubs are thin, but the pattern derives from `obras.astro`'s data-import-then-iterate flow):

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/sections/Hero.astro';
import BrandBio from '../components/sections/BrandBio.astro';
import ServicesSplit from '../components/sections/ServicesSplit.astro';
import Testimonial from '../components/sections/Testimonial.astro';
import FAQ from '../components/sections/FAQ.astro';
import CTABlock from '../components/sections/CTABlock.astro';
import { services } from '../data/services';
import { testimonials } from '../data/testimonials';
import { faqs } from '../data/faqs';
import { contact, waLink } from '../data/contact';

const homeTestimonial = testimonials.find(t => t.context === 'home');
---
<BaseLayout title="planetapsilo" description="Acompañamiento y retiros...">
  <Hero variant="home" kicker="planetapsilo" title="Acompañamiento y retiros para liderazgos que están reordenando." maxim="La claridad no se conquista. Se recuerda." />
  <BrandBio paragraphs={[...]} />
  <ServicesSplit services={services} />
  <Testimonial quote={homeTestimonial.quote} attribution={homeTestimonial.attribution} disclaimer={homeTestimonial.disclaimer} />
  <FAQ items={faqs} />
  <CTABlock primary={{label:'Agenda una conversación', href: contact.calendlyUrl}} secondary={{label:'Escribir por WhatsApp', href: waLink('Hola planetapsilo, me interesa explorar')}} tertiary={{label:'Prefiero escribir un formulario', href:'/contacto#form'}} />
</BaseLayout>
```

---

### `src/pages/privacidad.astro` (page, NEW — single-section stub)

**Analog:** `src/pages/404.astro` (lines 1–22, 24–61).

**Why:** Both pages are single-section stubs over a hero gradient. 404 uses `.hero-bg` + `.noise-overlay` at `opacity: 0.7` — perfect base for the "próximamente" privacy stub.

**Frontmatter + base-aware home link** (`src/pages/404.astro` lines 5–10):

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';

// BASE_URL is "/planetapsilo" (no trailing slash). Append "/" so the link resolves to /planetapsilo/.
const baseUrl = import.meta.env.BASE_URL;
const homeHref = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
---
```

**Page shell** (lines 11–22):

```astro
<BaseLayout title="..." description="...">
  <section class="not-found">
    <div class="hero-bg" aria-hidden="true"></div>
    <div class="noise-overlay" aria-hidden="true"></div>
    <div class="container nf-content">
      ...
    </div>
  </section>
</BaseLayout>
```

→ Phase 2 reuses this shell verbatim for `/privacidad`. Body content = LOCKED `/privacidad` copy in UI-SPEC §"Empty / loading / error contracts".

---

### `src/components/sections/Hero.astro` (component, NEW)

**Analog:** `src/pages/index.astro` (hero block lines 13–25 + style lines 28–74). Extract the inline hero into a reusable component, parameterize `variant`, `kicker`, `title`, `maxim`, `lead`.

**Existing inline hero markup pattern** (`src/pages/index.astro` lines 13–25):

```astro
<section class="hero">
  <div class="hero-bg" aria-hidden="true"></div>
  <div class="noise-overlay" aria-hidden="true"></div>
  <div class="container hero-content">
    <p class="kicker">planetapsilo</p>
    <h1 class="hero-headline">
      Un espacio de exploración<br />en construcción.
    </h1>
    <p class="hero-sub">
      Esqueleto Phase 1 — copy real, retiros, acompañamiento y contacto llegan en Phase 2.
    </p>
  </div>
</section>
```

**Hero CSS already proven** (`src/pages/index.astro` lines 29–48):

```css
.hero {
  position: relative;
  isolation: isolate;
  min-height: min(100vh, 720px);
  display: flex;
  align-items: center;
  overflow: hidden;
}
.hero-bg {
  position: absolute;
  inset: -10%;
  z-index: -2;
  opacity: 0.85;
}
.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding-block: var(--space-section);
}
```

**Phase 2 variant logic** — UI-SPEC §"Per-page section composition" requires home `min-height: min(100vh, 720px)` and opacity `0.85`; interior pages `min-height: min(60vh, 520px)` and opacity `0.5`. Implement via a Props discriminator:

```astro
---
interface Props {
  variant: 'home' | 'interior';
  kicker?: string;
  title: string;
  maxim?: string;
  lead?: string;
}
const { variant, kicker, title, maxim, lead } = Astro.props as Props;
---
<section class:list={['hero', `hero--${variant}`]}>
  <div class="hero-bg" aria-hidden="true"></div>
  <div class="noise-overlay" aria-hidden="true"></div>
  <div class="container hero-content">
    {kicker && <p class="kicker">{kicker}</p>}
    <h1>{title}</h1>
    {maxim && <p class="maxim">{maxim}</p>}
    {lead && <p class="lead">{lead}</p>}
  </div>
</section>

<style>
  /* Reuse Phase 1 .hero / .hero-content / .kicker rules; only opacity + min-height vary by variant */
  .hero--home { min-height: min(100vh, 720px); }
  .hero--interior { min-height: min(60vh, 520px); }
  .hero--home .hero-bg { opacity: 0.85; }
  .hero--interior .hero-bg { opacity: 0.5; }
</style>
```

The `.kicker` style in lines 49–58 of `index.astro` is the pattern for the kicker; the `.maxim` selector is new (Fraunces 300 italic at `--font-display-md` per UI-SPEC typography table).

---

### `src/components/sections/ServiceTeaser.astro` + `ServicesSplit.astro` + `Testimonial.astro` + `RetreatPhases.astro` (card components, NEW)

**Analog:** `src/pages/obras.astro` (lines 109–133 markup; lines 188–268 style — already a polished card grid).

**Grid composition pattern** (`src/pages/obras.astro` lines 109–133):

```astro
<ul class="obras-grid" role="list">
  {obras.map((o) => (
    <li class="obra-card">
      <div class="obra-media">
        <img src={img(o.imagen)} alt={`${o.titulo}...`} loading="lazy" width="800" height="800" />
      </div>
      <div class="obra-body">
        <h2 class="obra-title">{o.titulo}</h2>
        <p class="obra-meta">{o.tecnica} · {o.dimensiones} · {o.ano}</p>
        <p class="obra-price">{o.precio}</p>
        <a class="obra-cta" href={waLink(o.titulo)} target="_blank" rel="noopener noreferrer" aria-label={`Consultar...`}>
          Me interesa
        </a>
      </div>
    </li>
  ))}
</ul>
```

**Responsive grid CSS — directly reusable** (`obras.astro` lines 188–202):

```css
.obras-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}
@media (min-width: 600px) {
  .obras-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 960px) {
  .obras-grid { grid-template-columns: repeat(3, 1fr); }
}
```

→ `ServicesSplit` uses 1-col mobile / 2-col tablet+ (drop the 3-col query). `RetreatPhases` uses 1-col mobile / 3-col tablet+. `Testimonial` is a single centered card — adapt without the grid.

**Card body + CTA pattern** (`obras.astro` lines 228–268) for `ServiceTeaser` per-card structure. **NOTE:** `obra-cta` style is outline-orange (pill on `--color-orange-mystic` border with cream-text-on-orange-fill on hover). For `ServiceTeaser` the UI-SPEC requires `cta-tertiary` (text link) — defer to the `Button` primitive below, not this style.

---

### `src/components/sections/FAQ.astro` (accordion, NEW)

**Analog:** None for `<details>` specifically. The closest interactive pattern is the mobile drawer toggle in `src/components/layout/Nav.astro` (lines 91–123 CSS + lines 140–146 JS) — but UI-SPEC §"Accordion (FAQ) interaction" mandates **zero JS** using native `<details><summary>`.

**Native pattern (no analog, but trivial):**

```astro
---
interface Props {
  items: { question: string; answer: string }[];
}
const { items } = Astro.props as Props;
---
<section class="faq page-section">
  <div class="container">
    <h2>Preguntas frecuentes</h2>
    <div class="faq-list">
      {items.map((item) => (
        <details class="faq-item">
          <summary>
            <span>{item.question}</span>
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
              <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" fill="none" />
            </svg>
          </summary>
          <div class="faq-answer">{item.answer}</div>
        </details>
      ))}
    </div>
  </div>
</section>

<style>
  .faq-item { border-bottom: 1px solid var(--color-chrome-border); }
  details[open] summary svg { transform: rotate(90deg); }
  summary svg { transition: transform 200ms ease; }
  @media (prefers-reduced-motion: reduce) {
    summary svg { transition: none; }
  }
</style>
```

The local reduced-motion override mirrors the WhatsAppFloat pattern (`WhatsAppFloat.astro` lines 40–43).

---

### `src/components/sections/CTABlock.astro` (NEW)

**Analog:** `src/pages/contacto.astro` lines 17–21 (markup) + lines 43–62 (styles). The CTA-row pattern is **already** primary/secondary/tertiary — Phase 2 just extracts it.

**Existing inline pattern** (`contacto.astro` lines 17–21):

```astro
<div class="cta-row">
  <a class="cta cta-primary" href={contact.calendlyUrl}>Agenda (stub)</a>
  <a class="cta cta-secondary" href={waHref} target="_blank" rel="noopener noreferrer">WhatsApp (stub)</a>
  <a class="cta cta-tertiary" href="#form">Formulario (Phase 2)</a>
</div>
```

**Existing CTA style scaffold** (`contacto.astro` lines 43–62):

```css
.cta-row { display: flex; gap: 1rem; flex-wrap: wrap; }
.cta {
  display: inline-block;
  padding: 0.875rem 1.5rem;
  border-radius: 0.5rem;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.95rem;
}
.cta-primary { background: var(--color-orange-mystic); color: var(--color-bg-base); }
.cta-secondary {
  background: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-chrome-border-strong);
}
.cta-tertiary {
  background: transparent;
  color: var(--color-text-muted);
  border: 1px solid var(--color-chrome-border);
}
```

→ **Phase 2 must REVISE** these against the LOCKED Button variants in UI-SPEC §"Button variants":
- Primary: `padding: 12px 28px`, `border-radius: 999px` (pill, not 0.5rem), `font-size: 17px` (`--font-body-md`, not 0.95rem).
- Secondary: `border: 1px solid var(--color-text-primary)` (cream at full opacity, not `--color-chrome-border-strong`), pill radius, identical padding to primary.
- Tertiary: inline text link, **no chrome** (drop the border entirely — current Phase 1 has a border which UI-SPEC rejects).

The structure (one `<a>` per variant inside a flex row) is correct; the **token values** need to be replaced when extracting into the `Button` primitive.

---

### `src/components/ui/Button.astro` (NEW)

**Analog:** `src/components/layout/WhatsAppFloat.astro` (the whole file — exemplifies the "single CTA primitive with scoped style + reduced-motion override" pattern).

**Compose pattern** (`WhatsAppFloat.astro` lines 1–20):

```astro
---
import { contact } from '../../data/contact';

const href = `https://wa.me/${contact.whatsappNumber}?text=${contact.whatsappPrefill}`;
---
<a
  class="wa-float"
  href={href}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Abrir WhatsApp (stub — Phase 2 conecta número real)"
>
  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
    <path d="..."/>
  </svg>
</a>
```

**Hover + reduced-motion treatment** (`WhatsAppFloat.astro` lines 22–44) — this is the gold-standard hover/motion pattern Phase 2 must replicate on `cta-primary`:

```css
.wa-float {
  ...
  background: var(--color-orange-mystic);
  color: var(--color-bg-base);
  box-shadow: 0 8px 24px rgba(255, 122, 61, 0.35);
  transition: transform 200ms ease;
}
.wa-float:hover { transform: scale(1.05); }
@media (prefers-reduced-motion: reduce) {
  .wa-float { transition: none; }
  .wa-float:hover { transform: none; }
}
```

→ UI-SPEC overrides the hover scale from `1.05` to `1.02` and adds a `target="_blank"` + `rel="noopener noreferrer"` pair on every CTA that opens external (Calendly + WhatsApp). Pitfall #15 carry from Phase 1.

**Conditional `external` prop pattern** — net-new but obvious:

```astro
---
interface Props {
  variant: 'primary' | 'secondary' | 'tertiary';
  href: string;
  label: string;
  external?: boolean;
  prefill?: string; // when href is a wa.me link and we want centralized encoding
}
const { variant, href, label, external = false, prefill } = Astro.props as Props;
const finalHref = prefill ? `${href}?text=${encodeURIComponent(prefill)}` : href;
const target = external ? '_blank' : undefined;
const rel = external ? 'noopener noreferrer' : undefined;
---
<a class:list={['cta', `cta-${variant}`]} href={finalHref} target={target} rel={rel}>{label}</a>
```

---

### `src/components/forms/ContactForm.astro` + `RetreatApplicationForm.astro` (forms, NEW — no analog)

**Status:** Net-new in the codebase. No existing form anywhere.

**Pattern source:** Web3Forms `<form action>` POST + UI-SPEC §"Form lifecycle states" + §"Form copy".

**Reference structure (synthesized — planner adapts):**

```astro
---
import FormField from './FormField.astro';
import HabeasDataCheckbox from './HabeasDataCheckbox.astro';
import FormSuccess from './FormSuccess.astro';
import { contact } from '../../data/contact';

interface Props {
  endpointAccessKey: string;
}
const { endpointAccessKey } = Astro.props as Props;
---
<section class="page-section" id="form">
  <div class="container form-container">
    <h2>Si prefieres escribir</h2>
    <form
      action="https://api.web3forms.com/submit"
      method="POST"
      class="contact-form"
      id="contact-form"
    >
      <input type="hidden" name="access_key" value={endpointAccessKey} />
      <input type="hidden" name="subject" value="Consulta general planetapsilo" />
      <input type="hidden" name="from_name" value="planetapsilo contact form" />
      <input type="text" name="botcheck" style="display:none" tabindex="-1" autocomplete="off" />

      <FormField type="text" name="name" label="Nombre" required={true} />
      <FormField type="email" name="email" label="Email" required={true} />
      <FormField type="tel" name="whatsapp" label="WhatsApp (opcional)" required={false} />
      <FormField type="select" name="topic" label="¿Sobre qué quieres conversar?" required={true}
                 options={['Acompañamiento','Retiros','Obras','Otra cosa']} />
      <FormField type="textarea" name="message" label="Cuéntame en una línea" required={true} rows={2} />

      <HabeasDataCheckbox />

      <button type="submit" class="cta cta-primary">Enviar mensaje</button>
      <p class="sla-microcopy">Respondemos antes de 24h, normalmente el mismo día.</p>
    </form>

    <div id="contact-success" hidden>
      <FormSuccess variant="contacto" />
    </div>
  </div>
</section>

<script>
  // Vanilla JS — pattern carried from Nav.astro lines 126–147 (no framework runtime).
  // On submit: prevent default, fetch POST, swap form → success block (D-09).
  const form = document.getElementById('contact-form') as HTMLFormElement | null;
  const success = document.getElementById('contact-success');
  if (form && success) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type=submit]');
      if (btn) { btn.setAttribute('disabled', ''); btn.textContent = 'Enviando…'; }
      try {
        const res = await fetch(form.action, { method: 'POST', body: new FormData(form) });
        if (res.ok) {
          form.hidden = true;
          success.hidden = false;
          success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          throw new Error('non-2xx');
        }
      } catch (err) {
        // Inline error per UI-SPEC §"Form lifecycle states"
        if (btn) { btn.removeAttribute('disabled'); btn.textContent = 'Enviar mensaje'; }
      }
    });
  }
</script>
```

**Why the inline-JS pattern:** `Nav.astro` lines 126–147 already established the convention — vanilla JS inside an `.astro` `<script>` block, zero framework runtime. Phase 2 forms follow the same shape.

**RetreatApplicationForm** = same shell, swap `endpointAccessKey` to `contact.web3formsKeyRetiros`, swap `subject` to `Aplicación retiro planetapsilo`, swap 5 fields per UI-SPEC §"RetreatApplicationForm (D-08)" table, and swap `FormSuccess variant="retiros"`. Anchor `#aplicacion` instead of `#form`.

---

### `src/components/forms/FormField.astro` (primitive, NEW — no analog)

**Pattern source:** UI-SPEC §"Form field states" + §"Field internal padding" — fully specified.

**Synthesized shell:**

```astro
---
interface Props {
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'radio';
  name: string;
  label: string;
  required?: boolean;
  helpText?: string;
  rows?: number;
  options?: string[];
}
const { type, name, label, required = false, helpText, rows = 3, options = [] } = Astro.props as Props;
---
<div class="form-field">
  <label for={name}>
    {label}{required && <span class="required" aria-hidden="true"> *</span>}
  </label>
  {type === 'textarea' && <textarea id={name} name={name} rows={rows} required={required}></textarea>}
  {type === 'select' && (
    <select id={name} name={name} required={required}>
      {options.map(opt => <option value={opt}>{opt}</option>)}
    </select>
  )}
  {(type === 'text' || type === 'email' || type === 'tel') && (
    <input id={name} name={name} type={type} required={required} />
  )}
  {helpText && <p class="help-text">{helpText}</p>}
</div>

<style>
  /* Styling per UI-SPEC §"Form field states" — padding 12px 16px, border-radius 8px, etc. */
  .form-field { display: flex; flex-direction: column; gap: 8px; }
  input, textarea, select {
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid var(--color-chrome-border);
    background: var(--color-bg-elevated);
    color: var(--color-text-primary);
    font-family: var(--font-body);
    font-size: 17px;
    line-height: 1.5;
  }
  input:focus, textarea:focus, select:focus {
    border-color: var(--color-orange-mystic);
    outline: 2px solid var(--color-orange-mystic);
    outline-offset: 0;
  }
  .required { color: var(--color-orange-mystic); }
  .help-text { font-size: 14px; color: var(--color-text-muted); margin: 0; }
</style>
```

---

### `src/components/forms/HabeasDataCheckbox.astro` (primitive, NEW)

**Pattern source:** UI-SPEC §"Habeas Data checkbox" — fully specified (20×20 custom, orange fill on check, 13px label).

No analog exists. Compose from spec only.

---

### `src/components/forms/FormSuccess.astro` (state view, NEW)

**Analog:** `src/pages/index.astro` `.hero-content` block (lines 16–24) — centered card layout works as a template.

**Pattern (paraphrased from UI-SPEC §"FormSuccess copy"):**

```astro
---
interface Props {
  variant: 'retiros' | 'contacto';
}
const { variant } = Astro.props as Props;
const copy = variant === 'retiros'
  ? { heading: 'Recibimos tu aplicación.', body: 'Te respondemos en menos de 24h. Si prefieres conversar antes →', ctaLabel: 'Escríbenos por WhatsApp', ctaHref: 'https://wa.me/...' }
  : { heading: 'Mensaje recibido.', body: 'Te respondemos antes de 24h, normalmente el mismo día. Si quieres agendar directo →', ctaLabel: 'Agenda una conversación', ctaHref: 'https://calendly.com/...' };
---
<div class="form-success">
  <h3>{copy.heading}</h3>
  <p>{copy.body}</p>
  <a class="cta cta-tertiary" href={copy.ctaHref}>{copy.ctaLabel}</a>
</div>

<style>
  .form-success {
    padding: 24px;
    border-radius: 12px;
    background: var(--color-bg-elevated);
    max-width: 36rem;
    margin-inline: auto;
    text-align: center;
  }
</style>
```

---

### `src/components/layout/Footer.astro` (modified — expand stub)

**Analog:** Self (Phase 1 lines 1–22 markup + lines 24–56 styles).

**Existing structure to extend** (lines 8–22):

```astro
<footer class="site-footer">
  <div class="container footer-row">
    <p class="brand-line">
      <span class="wordmark">{site.name}</span>
      <span class="separator">·</span>
      <span class="muted">{site.year}</span>
      {!site.indexable && (
        <>
          <span class="separator">·</span>
          <span class="status muted">Sitio en construcción — sigue noindex</span>
        </>
      )}
    </p>
  </div>
</footer>
```

**Phase 2 extensions** (per UI-SPEC §"Reused Phase 1 components" + D-26):
1. Add IG link + TikTok link (URLs from `contact.ts` — needs new fields `instagramUrl`, `tiktokUrl`).
2. Add disclaimer paragraph (LOCKED text from UI-SPEC §"Copywriting Contract").
3. Add `/privacidad — próximamente` link (uses `internal()` helper or `import.meta.env.BASE_URL` pattern from `BaseLayout.astro` lines 30–33).
4. Keep `!site.indexable && ...` ternary intact (don't break the Phase 1 gate).

**BASE_URL helper pattern to reuse for the `/privacidad` link** — copy from `BaseLayout.astro` lines 30–33:

```ts
const baseUrl = import.meta.env.BASE_URL;
const baseTrimmed = baseUrl.replace(/\/$/, '');
const internal = (p: string) => `${baseTrimmed}/${p.replace(/^\//, '')}`;
```

Or use the `internal()` helper exactly as `Nav.astro` lines 12–17 already declares it.

---

### `src/data/contact.ts` (modified — expand)

**Analog:** Self (Phase 1 lines 1–17).

**Existing pattern** (lines 7–17):

```ts
export interface ContactConfig {
  whatsappNumber: string;
  whatsappPrefill: string;
  calendlyUrl: string;
}

export const contact: ContactConfig = {
  whatsappNumber: '0000000000',
  whatsappPrefill: 'Hola%20planetapsilo',
  calendlyUrl: '#',
};
```

**Phase 2 expansion** (per UI-SPEC §"Data layer additions" + D-10 + D-19):

```ts
export interface ContactConfig {
  whatsappNumber: string;
  whatsappPrefill: string;        // keep for WhatsAppFloat backward compat
  calendlyUrl: string;
  web3formsKeyContacto: string;
  web3formsKeyRetiros: string;
  instagramUrl: string;
  tiktokUrl: string;
}

export const contact: ContactConfig = {
  whatsappNumber: '57XXXXXXXXXX',  // real number — pending Sofía
  whatsappPrefill: 'Hola%20planetapsilo,%20me%20interesa%20explorar',
  calendlyUrl: 'https://calendly.com/planetapsilo/conversacion-inicial', // placeholder
  web3formsKeyContacto: 'YOUR_CONTACTO_ACCESS_KEY',
  web3formsKeyRetiros: 'YOUR_RETIROS_ACCESS_KEY',
  instagramUrl: 'https://instagram.com/planetapsilo',
  tiktokUrl: 'https://tiktok.com/@planetapsilo',
};

// D-19 helper — used by every WhatsApp CTA across the site.
export const waLink = (prefill: string) =>
  `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(prefill)}`;
```

→ The `whatsappPrefill` field stays so `WhatsAppFloat.astro` (line 8) keeps compiling without edits during the phase. Phase 2 can either (a) update `WhatsAppFloat.astro` to use `waLink()` or (b) keep both. The UI-SPEC says reuse Phase 1 component "wired with real values" — option (a) is cleaner.

---

### `src/data/services.ts` (modified — expand)

**Analog:** Self (Phase 1 lines 6–25).

**Existing pattern:**

```ts
export interface ServicePlaceholder {
  slug: 'acompanamiento' | 'retiros';
  label: string;
  teaser: string;
}

export const services: ServicePlaceholder[] = [
  { slug: 'acompanamiento', label: 'Acompañamiento', teaser: '...' },
  { slug: 'retiros', label: 'Retiros', teaser: '...' },
];
```

**Phase 2 expansion** — extend the interface per UI-SPEC §"Data layer additions" row "services.ts":

```ts
export interface Service {
  slug: 'acompanamiento' | 'retiros';
  label: string;
  teaser: string;
  ctaLabel: string;       // LOCKED per UI-SPEC: "Conocer el acompañamiento" / "Conocer los retiros"
  description?: string;
  audience?: string;
  outcomes?: string[];
  confidentialityLine?: string;
}

export const services: Service[] = [
  {
    slug: 'acompanamiento',
    label: 'Acompañamiento',
    ctaLabel: 'Conocer el acompañamiento',
    teaser: '...',           // legal-safe copy from Sofía
    audience: '...',
    outcomes: [...],
    confidentialityLine: 'Lo que se conversa aquí no sale de aquí...',
  },
  // retiros same shape
];
```

---

### `src/data/testimonials.ts` (NEW)

**Analog:** `src/data/services.ts` — exact same shape (typed array export, no logic).

**Pattern (copy from `services.ts` lines 6–25):**

```ts
export interface Testimonial {
  context: 'home' | 'acompanamiento' | 'retiros';
  quote: string;
  attribution: string;
  disclaimer: string;
}

export const testimonials: Testimonial[] = [
  { context: 'home', quote: '...', attribution: 'M., founder fintech, 41 — Bogotá', disclaimer: 'Testimonio ilustrativo de Phase 2...' },
  { context: 'acompanamiento', quote: '...', attribution: '...', disclaimer: '...' },
  { context: 'retiros', quote: '...', attribution: '...', disclaimer: '...' },
];
```

---

### `src/data/faqs.ts` (NEW)

**Analog:** `src/data/nav.ts` (smallest typed-array-with-comment Phase 1 file).

**Pattern (copy from `nav.ts` lines 6–17):**

```ts
// src/data/faqs.ts
// 6 FAQs consumed by FAQ.astro on home (D-13). Answers respect docs/copy-glossary.md PROHIBIDO list.

export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  { question: '¿Qué encuadre legal tiene este espacio?', answer: '...' },
  // 5 more per CONTEXT D-13
];
```

---

### `scripts/copy-lint.mjs` (NEW — no analog)

**Status:** Net-new. No `scripts/` directory exists in Phase 1.

**Source pattern:** UI-SPEC §"Copy linter — known false-positives" recommends "tiny Node script (`scripts/copy-lint.mjs`)" — most portable. Use Node 22+ built-ins only (no `glob` package needed; use `fs.readdirSync` recursively).

**Synthesized minimal pattern (planner adapts):**

```js
// scripts/copy-lint.mjs
// Lints dist/**/*.html against docs/copy-glossary.md PROHIBIDO list.
// Exit 1 on violation. Exempts denial-clause patterns (e.g., "No es terapia").
//
// Usage:
//   node scripts/copy-lint.mjs
// Run after `astro build`; integrated as `npm run lint:copy` and called in deploy.yml before deploy-pages.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const DIST = 'dist';
const PROHIBIDO = ['terapia', 'tratamiento', 'paciente', 'psilocibina', 'hongos', 'ayahuasca', 'cura', 'garantizado', 'diagnóstico'];

// Denial-clause exemptions (UI-SPEC false-positive section).
const EXEMPT_PATTERNS = [
  /\bno\s+(es|constituye)\s+(terapia|tratamiento)/i,
  /\bsin\s+(terapia|tratamiento|diagnóstico)/i,
  /tratamiento\s+de\s+datos/i,
];

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (extname(p) === '.html') out.push(p);
  }
  return out;
}

const violations = [];
for (const file of walk(DIST)) {
  const text = readFileSync(file, 'utf8');
  for (const word of PROHIBIDO) {
    const re = new RegExp(`\\b${word}\\b`, 'gi');
    let m;
    while ((m = re.exec(text))) {
      // Check exemptions around the match
      const surrounding = text.slice(Math.max(0, m.index - 50), m.index + word.length + 50);
      if (EXEMPT_PATTERNS.some(p => p.test(surrounding))) continue;
      violations.push({ file, word, snippet: surrounding.replace(/\s+/g, ' ').trim() });
    }
  }
}

if (violations.length) {
  console.error(`Copy lint FAILED — ${violations.length} violation(s):`);
  for (const v of violations) console.error(`  ${v.file}: "${v.word}" — ...${v.snippet}...`);
  process.exit(1);
}
console.log(`Copy lint OK — scanned ${walk(DIST).length} HTML files.`);
```

---

### `package.json` (modified — add scripts)

**Analog:** Self (Phase 1 lines 9–14).

**Existing scripts block** (lines 9–14):

```json
"scripts": {
  "dev": "astro dev",
  "build": "astro build",
  "preview": "astro preview",
  "astro": "astro"
},
```

**Phase 2 modification** (UI-SPEC §"Copy linter" + D-25):

```json
"scripts": {
  "dev": "astro dev",
  "build": "astro build",
  "preview": "astro preview",
  "astro": "astro",
  "lint:copy": "node scripts/copy-lint.mjs",
  "build:check": "npm run build && npm run lint:copy"
},
```

→ The deploy workflow (next file) calls `npm run lint:copy` AFTER `withastro/action@v3` builds — which already runs `astro build` — so a separate `build:check` is optional.

---

### `.github/workflows/deploy.yml` (modified — insert lint step)

**Analog:** Self (Phase 1 lines 1–49).

**Existing build job** (lines 26–37):

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Build with Astro
        uses: withastro/action@v3
        with:
          node-version: "22"
```

**Phase 2 modification** — insert a lint step after the build (per D-25):

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Build with Astro
        uses: withastro/action@v3
        with:
          node-version: "22"
      - name: Lint copy against docs/copy-glossary.md
        run: node scripts/copy-lint.mjs
```

→ `withastro/action@v3` produces `dist/` and uploads it as the Pages artifact. The lint step reads `dist/` from the same runner. If it exits 1, the deploy job (which `needs: build`) never runs. This is the exact gate D-25 specifies.

**Open question for planner:** `withastro/action@v3` may upload the artifact internally before the next step has a chance to fail. Verify the action's checkout-build-upload step ordering; if uploading is too early, switch to a manual `npm ci && npm run build && node scripts/copy-lint.mjs && actions/upload-pages-artifact@v3` pipeline. (Flag — does not block PATTERNS.md.)

---

### `src/styles/{tokens.css,global.css}` (no edits required per UI-SPEC)

**Analog:** Self (Phase 1).

UI-SPEC §"Motion" line 485 states: *"`prefers-reduced-motion: reduce` is already defensively wired in both `tokens.css` (lines 67-71) and `global.css` (lines 55-64). Phase 2 must not introduce any animation that bypasses either gate."*

Phase 2 only **consumes** these files. The orchestrator's "refine cosmic-bg with `prefers-reduced-motion`" hint is already satisfied in `tokens.css` lines 67–71:

```css
@media (prefers-reduced-motion: reduce) {
  .hero-bg {
    animation: none;
  }
}
```

If any Phase 2 component (e.g., new accordion chevron rotate, form spinner) adds an animation, the local style block must include its own `@media (prefers-reduced-motion: reduce) { ... }` override following the WhatsAppFloat pattern (lines 40–43).

---

## Shared Patterns

### BASE_URL helper (Pitfall #13 carry — applies to every component with internal links)

**Source:** `src/layouts/BaseLayout.astro` lines 30–33 + `src/components/layout/Nav.astro` lines 10–17.

**Apply to:** `Footer.astro` (when adding `/privacidad` link), `CTABlock.astro` (tertiary internal link to `/contacto#form`), `Hero.astro` (when home hero secondary CTA links to `/retiros`), any new component with an internal link.

```ts
const baseUrl = import.meta.env.BASE_URL;
const baseTrimmed = baseUrl.replace(/\/$/, '');
const internal = (p: string) => {
  const path = p.replace(/^\//, '');
  return path === '' ? `${baseTrimmed}/` : `${baseTrimmed}/${path}`;
};
```

### `target="_blank" + rel="noopener noreferrer"` (Pitfall #15 carry)

**Source:** `src/components/layout/WhatsAppFloat.astro` line 14 + `src/pages/contacto.astro` line 19 + `src/pages/obras.astro` lines 124–125.

**Apply to:** Every external CTA — Calendly button, WhatsApp button, Instagram/TikTok footer links.

```astro
<a href={waHref} target="_blank" rel="noopener noreferrer">...</a>
```

### Reduced-motion override (D-24 / CONT-13)

**Source:** `src/components/layout/WhatsAppFloat.astro` lines 40–43 + `src/styles/tokens.css` lines 67–71 + `src/styles/global.css` lines 55–64.

**Apply to:** Any new component that defines `transition:` or `animation:` in its scoped `<style>`. Pattern:

```css
@media (prefers-reduced-motion: reduce) {
  .component-selector { transition: none; animation: none; }
  .component-selector:hover { transform: none; }
}
```

### Container + section rhythm

**Source:** `src/styles/global.css` lines 67–71 + `src/pages/{acompanamiento,retiros,contacto,obras}.astro` `.page-section { padding-block: var(--space-section); }`.

**Apply to:** Every section component (`BrandBio`, `ServicesSplit`, `Testimonial`, `FAQ`, `RetreatPhases`, `ContactForm`, `RetreatApplicationForm`, `CTABlock`). Wrap content in `<div class="container">` and set `padding-block: var(--space-section);` on the outer `<section>`.

### Scoped `<style>` in `.astro` (zero global leakage)

**Source:** Every Phase 1 component (`Nav.astro` lines 45–124, `Footer.astro` lines 24–56, `WhatsAppFloat.astro` lines 22–44).

**Apply to:** Every new component. Astro scopes `<style>` automatically — no Tailwind utility soup, no global class collisions. Tokens are consumed via `var(--token-name)` from `tokens.css`.

### Per-page metadata via BaseLayout props

**Source:** `src/layouts/BaseLayout.astro` lines 18–26 (interface + default) + `src/pages/contacto.astro` line 9 (consumption).

**Apply to:** All 4 pages (CONT-12) — pass LOCKED `title` and `description` strings from UI-SPEC §"Per-page meta" table to `<BaseLayout title={...} description={...}>`.

### Data-import-then-iterate (page composition)

**Source:** `src/pages/obras.astro` lines 9–10, 30–91, 109–133.

**Apply to:** Pages consuming `services`, `testimonials`, `faqs`, `nav` — import the typed array, iterate via `.map()` inside JSX, never duplicate copy in markup.

---

## No Analog Found

Files with no close match in the codebase (planner uses UI-SPEC + research + Web3Forms docs):

| File | Role | Data flow | Reason |
|------|------|-----------|--------|
| `src/components/forms/ContactForm.astro` | form | request-response (POST) | No form exists in Phase 1 |
| `src/components/forms/RetreatApplicationForm.astro` | form | request-response (POST) | (sibling of ContactForm) |
| `src/components/forms/FormField.astro` | primitive | request-response | No form primitives exist |
| `src/components/forms/HabeasDataCheckbox.astro` | primitive | request-response | No checkbox UI exists |
| `scripts/copy-lint.mjs` | CLI utility | file-I/O (read dist/) | No `scripts/` dir in Phase 1; pattern derives from glossary regex + UI-SPEC false-positive notes |

For all five, the planner authors from UI-SPEC contract + Web3Forms doc patterns and the synthesized excerpts above. They share the vanilla-JS + scoped-CSS conventions Phase 1 already established (`Nav.astro` JS pattern, `WhatsAppFloat.astro` reduced-motion pattern).

---

## Metadata

**Analog search scope:** `src/pages/`, `src/components/layout/`, `src/data/`, `src/styles/`, `src/layouts/`, `.github/workflows/`, `package.json`, `astro.config.mjs`, `docs/`.
**Files scanned:** 16 source files (all of Phase 1 scaffold + 1 doc + 1 workflow + 1 config).
**Files in context (read this pass):** all 16. Phase 1 codebase is small enough that no re-reads or large-file targeted reads were necessary.
**Pattern extraction date:** 2026-05-22.
