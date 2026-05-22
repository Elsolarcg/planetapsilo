# Feature Research — planetapsilo

**Domain:** Psychedelic-aesthetic consciousness coaching / accompaniment site (Colombia/LATAM, premium ICP)
**Researched:** 2026-05-21
**Confidence:** HIGH (multiple competitor sites verified directly; legal/positioning language verified across LATAM + global premium retreat sites)

## Executive Framing

This is a "credibility hub + lead capture" site, not an e-commerce or content platform. The job to be done in 30 seconds: a C-Level visitor lands, feels the aesthetic shift ("this is otherworldly"), understands there is an *acompañamiento* and a *retiro* track, and reaches out via Calendly / WhatsApp / form. Every feature decision is filtered through three questions:

1. Does it build trust with a skeptical executive who reads carefully?
2. Does it preserve Sofía's licensed-psychologist status (no claim of "psychedelic therapy" attributed to her)?
3. Can a single founder ship and maintain it without a CMS or team?

Cross-site pattern across Beckley, Behold, Synthesis, Sabiduría Psicodélica, Kaapi: **the more premium the audience, the less the site sells and the more it screens.** The website's job for C-Level/founder ICP is to *make the user feel they are applying to a serious thing*, not "buying a session." This shapes every table-stakes feature below.

## Feature Landscape

### Table Stakes (Trust collapses without these)

Features the ICP assumes exist. Missing = "this looks unserious / could be a scam / I won't book."

| Feature | Why Expected | Complexity | ICP Note | MVP-Feasibility |
|---------|--------------|------------|----------|-----------------|
| Hero with one-line value prop + emotional aesthetic | First-impression filter; 3 seconds to communicate "otherworldly + serious" | LOW | C-Level scans fast; needs immediate signal this is not a backpacker site | **Today** |
| Clear nav with named pages (Inicio, Acompañamiento, Retiros, Contacto) | Multi-page signals depth vs single-landing signals "side hustle" | LOW | Reference site (Sabiduría) and Kaapi both use multi-page; baseline expectation | **Today** |
| `/acompanamiento` page explaining the 1:1 service | User must understand what they buy before contacting | LOW | Frame in business language ("claridad de propósito", "decisiones de alto impacto") not just spiritual | **Today** |
| `/retiros` page with what-it-is, who-it's-for, location feel | Retreat is high-stakes purchase; user needs orientation before applying | LOW-MED | Beckley/Behold use three-phase frame: Preparación / Inmersión / Integración. Adopt structurally even with light copy | **Today** |
| `/contacto` with multiple low-friction channels | Different personas convert on different channels; one channel = lost leads | LOW | Juan explicitly wants 3 vías abiertas: Calendly + WhatsApp + formulario | **Today** |
| WhatsApp CTA (sticky floating button, mobile-prominent) | LATAM default messaging channel; assumed for any service business in Colombia | LOW | WhatsApp + click-to-chat is the *Colombian* standard. Floating button bottom-right is the convention | **Today** |
| Calendly link or embed for "agendar conversación" | Executive ICP doesn't want email back-and-forth; expects to book directly | LOW | Use "Agenda una conversación inicial" framing, not "book a therapy session" | **Today** (link); Phase 2 (real calendar connected) |
| Backup contact form (Formspree / Google Forms / Netlify Forms) | User wants every channel open; some users won't WhatsApp a stranger | LOW | Use as the long-form intake for retreat interest later | **Today** |
| About / "Sobre planetapsilo" section (brand bio, not personal) | "Who is behind this?" — without it, site feels anonymous/scam | LOW | **Critical legal subtlety:** brand-level bio in MVP, personal Sofía bio deferred to Phase 2 once language is reviewed | **Today** (brand bio); Phase 2 (Sofía bio) |
| Trust signals: at least 2-3 testimonials or quotes | No social proof = no trust. Even anonymous quotes ("Founder, SaaS, 38") work | LOW | All premium sites (Beckley, Behold) lead with executive testimonials. Use placeholder framing in MVP if real ones unavailable | **Today** (placeholder copy); Phase 2 (real) |
| Visual identity (psychedelic/cosmic palette, gradient backgrounds, modern sans serif) | Aesthetic IS the differentiator; weak design = "amateur" signal | MED | Naranjas/violetas/azules profundos per reference. Aesthetic must feel cohesive across all 4 pages | **Today** |
| Mobile-first responsive design | 80%+ of coaching site traffic is mobile; broken mobile = instant bounce | LOW-MED | Sofía's audience comes from TikTok/IG — overwhelmingly mobile | **Today** |
| Legal/positioning copy that protects Sofía's tarjeta profesional | Wrong wording could create regulatory risk in Colombia | LOW (copy-only) | Use "acompañamiento", "espacios de exploración", "exploración de la consciencia". Avoid "terapia psicodélica", "tratamiento", "cura" entirely | **Today** |
| Favicon + page title + meta description | Absence = looks broken in browser tabs/shared links | LOW | Brand-level: "planetapsilo — espacios de exploración" | **Today** |
| HTTPS / GitHub Pages default | Browsers flag non-HTTPS; instant trust kill | LOW | Free on GitHub Pages | **Today** |
| Footer with brand, social links (IG, TikTok), email | Standard convention; absence feels broken | LOW | TikTok + IG already exist per PROJECT.md — link them | **Today** |

### Differentiators (Move C-Level from "curious" to "I'll reach out")

These are where planetapsilo competes against Sabiduría Psicodélica, Kaapi, and generic coaches. Aligned with Core Value: visitor feels "otherworldly" *and* takes action.

| Feature | Value Proposition | Complexity | ICP Note | MVP-Feasibility |
|---------|-------------------|------------|----------|-----------------|
| **Application-style framing for retreats** ("solicitar información" / "aplicar al próximo retiro" instead of "comprar") | Premium retreats (Beckley, Behold, Synthesis) all gate via application. Communicates "this is selective, not a product" | LOW (copy + form) | This is **the** ICP cue. C-Level pays more for things that screen them | **Today** (form); Phase 2 (multi-step intake) |
| **Three-phase retreat structure visible on page** (Preparación → Inmersión → Integración) | Demonstrates professional rigor — not "show up and trip". Industry-standard premium frame | LOW | Beckley uses this exact structure. Executives recognize structured programs as serious | **Today** |
| **Outcomes framed in executive language** ("claridad estratégica", "reconexión con propósito de fundador", "rehumanizar la toma de decisiones") | Bridges spiritual register with business register — the Behold model. Without this, site feels "for backpackers" | LOW (copy) | This single copy choice is the strongest C-Level signal on the site | **Today** |
| **Aesthetic narrative copy / máximas filosóficas** (tipo "La consciencia no es algo que alcanzas, es algo que recuerdas") | Reference site's strongest emotional hook. Quotable, screenshotable, shareable | LOW | Match Sabiduría's intimate first-person tone. Avoids feeling generic | **Today** |
| **Premium location prestige cues for retreats** (mention region, finca, naturaleza, intimacy of group size) | Behold mentions "max 9-14 participants"; Beckley names Jamaica/Netherlands. Concrete location + small group = premium signal | LOW (copy) | If group size / location not finalized, use abstract premium language ("grupos íntimos", "ubicación seleccionada", "naturaleza profunda en Colombia") | **Today** (abstract); Phase 2 (real details + photos) |
| **Confidentiality / discretion mention** (single line: "Todas las conversaciones son confidenciales") | C-Level reputational concern. Single line removes the "what if my board hears?" objection | LOW (copy) | Don't over-promise NDA without legal review; "confidencialidad" is the soft, safe word | **Today** |
| **Subtle credentials hint without claiming title in psychedelics** (e.g. "Formación en psicología – Universidad de los Andes, formación experiencial en acompañamiento contemplativo") | Establishes credibility without crossing the legal line. Sabiduría does this with "más de una década guiando" | LOW (copy) | **Critical balance** — too much detail risks tarjeta profesional; too little feels like a charlatan | **Phase 2** (needs Sofía sign-off on exact phrasing) |
| **Sticky/floating WhatsApp button with pre-filled message** | Single tap → conversation. Industry conversion best practice for LATAM coaching | LOW | Pre-fill: "Hola, vengo de la web de planetapsilo, me interesa..." — reduces friction further | **Today** |
| **Hero CTA pair: primary "Agenda una conversación" + secondary "Explora los retiros"** | Two conversion paths for two readiness levels (hot vs. warm) | LOW | Mirrors Behold/Beckley's "Apply Now" + "See if Beckley is right for you" pattern | **Today** |
| **Newsletter / "lista de espera para próximo retiro" form** | Captures users who aren't ready now but are interested. Sabiduría's main asset is this list | LOW (Mailchimp/ConvertKit free tier) | C-Level often takes weeks/months from interest → commitment. Without list, lose them | **Phase 2** (needs email provider setup) |
| **FAQ section addressing the unspoken executive questions** ("¿Es legal?", "¿Cómo se protege mi privacidad?", "¿Qué pasa si en mitad del proceso necesito parar?") | Removes friction without requiring a sales call. Pre-answers objections that block conversion | LOW (copy) | This is where the "is this for me?" filter happens. Beckley/Behold both use heavily | **Today** (basic 4-6 questions); Phase 2 (expanded) |
| **Suitability hint / soft self-screening** ("Esta es una experiencia para personas en estabilidad psicológica, con apertura a la introspección profunda...") | Beckley uses a 3-min "Suitability Assessment". Soft version: a paragraph that lets unsuitable users self-exclude | LOW (copy MVP); MED (quiz Phase 2) | Screens out crisis-state users and reinforces premium gate | **Today** (paragraph); Phase 3 (interactive quiz) |
| **Reference to integration / post-experience support** | Differentiates from one-off "ceremony" providers. Signals "we walk with you, not just dose you" | LOW (copy) | Major Beckley/Synthesis differentiator. Integration is what executives actually pay for | **Today** |
| **Visual signature: animated gradient backgrounds / subtle motion** | Aesthetic-as-product. Static palette is good; subtle motion is "otherworldly" | MED | Reference: subtle CSS gradient animations, no heavy JS libraries needed | **Today** (CSS gradients); Phase 2 (more refined motion) |
| **Email obfuscation / coded language patterns** (Sabiduría's "m3dicin4") | Compliance signal to in-the-know audience; SEO/algorithmic safety | LOW | Use sparingly; only on substance-name moments, never on Sofía's name or "acompañamiento" | **Phase 2** (decide per page if needed) |
| **Premium typography pairing** (modern sans serif + occasional display font for máximas) | Typography is 50% of perceived premium feel | LOW (Google Fonts) | Avoid default browser fonts. Pairing like Inter + Cormorant Garamond, or DM Sans + Fraunces | **Today** |
| **Site loading speed < 2s** (static, no heavy frameworks) | Slow site = "low quality / abandoned" perception. Executives don't wait | LOW (static site default) | Static Astro/HTML → 100/100 Lighthouse achievable | **Today** |

### Anti-Features (Deliberately NOT built)

Things that would seem helpful but create legal, positioning, or operational damage.

| Anti-Feature | Why Tempting | Why Problematic | Alternative |
|---|---|---|---|
| **"Terapia con psilocibina" / "psilocybin therapy" anywhere in copy** | It's literally what's happening; SEO benefit | Direct legal risk to Sofía's tarjeta profesional. Crosses the line from coaching to unlicensed medical practice in Colombia | "Acompañamiento", "espacios de exploración", "exploración de la consciencia", "trabajo contemplativo" |
| **Before/after promises or outcome guarantees** ("Cura tu ansiedad", "Resuelve tu burnout", "Guaranteed transformation") | Strong direct-response copy converts | Creates implicit medical/treatment claim → regulatory exposure + ethical issue. Behold/Beckley both carefully avoid "cure" language | Aspirational framing: "Espacios para reconectar con tu claridad", "Procesos diseñados para acompañar tu reflexión" |
| **Sofía's full name + photo + "psicóloga psicodélica" anywhere** | Personal branding converts better; people trust faces | Directly violates the brand-level positioning decision in PROJECT.md. Her tarjeta profesional doesn't authorize her as a psychedelic therapist | Brand-level "planetapsilo" identity in MVP. Personal bio later, vetted phrasing, framed as guide not as licensed therapist |
| **Detailed substance descriptions / dosing / pharmacology content** | SEO traffic; demonstrates expertise | Crosses from spiritual/contemplative framing into pharmacological advice → unlicensed practice | Keep substances unnamed or coded; focus on the *experience* and *integration* not the chemistry |
| **Direct ecommerce checkout for retreats or art in MVP** | "Buy now" is high-conversion | (1) Premium retreats screen, they don't transact. (2) Art store needs payment provider, shipping, fulfillment — out of scope. (3) Real money flow triggers more legal review | Application form for retreats. "Consultar disponibilidad" form for art (Phase 3) |
| **Live chat / chatbot in MVP** | Modern trust signal | One-person operation can't staff live chat. AI chatbot in this domain risks giving medical-adjacent answers Sofía can't control | WhatsApp link (asynchronous, on Sofía's terms) |
| **Login / member area** | Sabiduría reference has one (for course customers) | No courses to gate; adds backend complexity; out of static-site scope. Empty member area worse than no member area | Newsletter-only for now (Phase 2) |
| **English version in MVP** | Digital nomad ICP is partly anglophone | (1) Doubles content work. (2) Legal language differs in English jurisdictions. (3) Spanish-Colombia is primary market validated. PROJECT.md explicitly defers | Phase 3 — only after Spanish version is validated and Sofía's bio language is locked |
| **Stock images of mushrooms, ayahuasca cups, ceremony scenes** | Visually obvious; easy to source | (1) Looks generic / template-y. (2) Direct substance imagery undermines the "acompañamiento" legal framing. (3) Stock photo aesthetic kills "otherworldly" feel | Original abstract psychedelic art (gradients, fractals, cosmic imagery). Phase 2: photos of Sofía's own paintings |
| **Long bio / autobiographical founder story in MVP** | Connection / trust building | Premature: Sofía's bio phrasing needs careful legal review. Better to launch brand-level and add bio in Phase 2 with vetted copy | "Sobre planetapsilo" brand bio in MVP. Personal bio in Phase 2 |
| **Reviews/ratings widget (Google Reviews, Trustpilot embed)** | Modern social proof | (1) Could create a review surface for negative experiences that's hard to moderate. (2) Some reviewers may mention substances by name, creating compliance issue. (3) Most premium sites don't use this | Curated testimonials (controlled copy) — site-owned, not third-party |
| **Press / "as seen in" logos in MVP** | Major trust booster on Beckley/Behold | If they don't exist yet, fabricating is fraud. Premature signal | Phase 2+ — only when real press exists. In MVP, use podcast appearances if any |
| **Blog / educational content section in MVP** | SEO + thought leadership | (1) Needs CMS or markdown pipeline. (2) Substance-adjacent content has legal/algorithmic risk that needs careful curation. (3) Out of 1-2h MVP scope | Phase 3 — when there's editorial capacity and legal-reviewed templates |
| **Direct pricing on retreats/sessions page** | Transparency builds trust | None of the premium references (Beckley, Behold, Sabiduría, Kaapi) show pricing on the site. Pricing happens in the qualification call. Showing prices commodifies the service | "Conversemos sobre tu proceso" — pricing discussed in the initial call |
| **Booking auto-confirms session without screening conversation** | Frictionless conversion | Skipping screening is both legally dangerous (suitability) and reputationally damaging (wrong-fit clients). Calendly should book a *conversación inicial*, not a session | Calendly → initial conversation → invitation to enter the process |
| **Generic mental health language** ("ansiedad", "depresión", "trauma" as primary copy) | High-search-volume keywords | Implies clinical treatment Sofía can't legally provide outside Andes-licensed context. Also makes site feel like a clinic, not a planetary brand | "Reconexión", "claridad", "presencia", "propósito", "expansión" — register of consciousness, not pathology |

## Feature Dependencies

```
Today's MVP (1-2h scope)
├── Hero + Nav + Visual Identity
│   └── enables all other pages (consistent feel)
├── /acompanamiento page
├── /retiros page
│   └──requires──> Three-phase frame (copy only)
│   └──requires──> Premium aesthetic to justify "application not purchase"
├── /contacto page
│   ├──requires──> Calendly account (real or placeholder link)
│   ├──requires──> WhatsApp number from Sofía
│   └──requires──> Form backend choice (Formspree / Google Forms / Netlify)
├── Floating WhatsApp button (sticky)
└── Legal copy review by Sofía before publish

Phase 2 (post-validation)
├── Personal "Sobre Sofía" section
│   └──blocked-on──> Sofía-approved phrasing that preserves tarjeta profesional
├── Newsletter signup
│   └──requires──> Email provider account (Mailchimp free / ConvertKit / Buttondown)
├── Real testimonials
│   └──requires──> Permission from actual past clients (sensitive — confidentiality)
├── Photos of Sofía's paintings
│   └──requires──> Photography session
├── Suitability self-screening quiz
│   └──requires──> Sofía's clinical input on screening criteria
└── Real Calendly integration (connected to email/calendar)

Phase 3+ (after PMF signals)
├── Tienda de arte
│   └──requires──> Payment processor (Bold/Wompi for Colombia, or Stripe)
│   └──requires──> Inventory + shipping logistics
├── Podcast page
│   └──requires──> Podcast existing (recording + hosting)
│   └──requires──> Spotify/Apple feed
├── Yoga page
│   └──requires──> Sofía's yoga teacher certification complete
├── Bilingual ES/EN
│   └──requires──> International ICP validation
│   └──requires──> Legal phrasing reviewed for English jurisdictions
└── Blog / educational content
    └──requires──> Editorial capacity + content pipeline

Conflicts (DO NOT combine in same phase)
- Personal Sofía branding ⟂ "planetapsilo" brand-only positioning (resolves in Phase 2)
- E-commerce checkout ⟂ "application not purchase" positioning (separate routes per offering)
- English version ⟂ Colombia-specific legal copy (need two reviewed versions, not one translated)
```

## MVP Definition (today, 1-2h)

### Launch With (v1 — shippable today)

- [ ] **Hero on Home** — One-line value prop + máxima + primary CTA "Agenda una conversación" + secondary "Explora los retiros". *Why essential:* 3-second filter for ICP.
- [ ] **Cohesive psychedelic aesthetic across 4 pages** — Naranjas/violetas/azules profundos, gradients, modern type. *Why essential:* aesthetic IS the product differentiator.
- [ ] **Nav: Inicio / Acompañamiento / Retiros / Contacto** — clean, no clutter. *Why essential:* multi-page is the trust baseline vs single landing.
- [ ] **/acompanamiento page** — what it is (in business + spiritual register), who it's for, soft CTA. *Why essential:* primary service offering.
- [ ] **/retiros page** — three-phase frame (Preparación / Inmersión / Integración), application framing not purchase, small-group + location prestige cues. *Why essential:* second offering + premium signal.
- [ ] **/contacto page** — Calendly link + WhatsApp + backup form. *Why essential:* explicit Juan requirement, captures every lead temperature.
- [ ] **Floating WhatsApp button with pre-filled message** — sticky, mobile-prominent. *Why essential:* LATAM coaching conversion standard.
- [ ] **3 testimonial quotes** (anonymized: "Founder, fintech, 41") — placeholder phrasing pending real ones. *Why essential:* social proof baseline.
- [ ] **6-FAQ block** answering executive objections (legality, confidentiality, suitability, what happens in a session, time commitment, what if it's not for me). *Why essential:* removes friction before contact.
- [ ] **Footer with IG + TikTok links + brand line** — *Why essential:* social proof + completeness.
- [ ] **Mobile responsive** — *Why essential:* 80%+ traffic from social.
- [ ] **Legal copy audit** — no "terapia psicodélica", no outcome guarantees, no Sofía-as-licensed-psychedelic-therapist framing. *Why essential:* protects tarjeta profesional, the entire decision driver.
- [ ] **Favicon, page titles, meta descriptions** — *Why essential:* shared-link trust.

### Add After Validation (v1.x — Phase 2)

- [ ] **Sobre Sofía / personal bio section** — *Trigger:* once exact phrasing is reviewed and Sofía signs off.
- [ ] **Real testimonials with first names + role** — *Trigger:* explicit consent obtained from past clients.
- [ ] **Newsletter signup ("lista de espera retiros")** — *Trigger:* first 5-10 leads through, demand for retreat capacity exceeds slots.
- [ ] **Real Calendly connected to Sofía's calendar/email** — *Trigger:* lead flow validates time spent integrating.
- [ ] **Photos of Sofía's paintings on Home / About** — *Trigger:* photo session done.
- [ ] **Suitability self-screening (longer-form on /retiros)** — *Trigger:* unsuitable inquiries are eating Sofía's time.
- [ ] **Privacy policy + terms (Colombia)** — *Trigger:* before launching real lead capture at scale or running paid ads.
- [ ] **Animated subtle motion (gradient shifts, parallax)** — *Trigger:* visual identity is stable, time for polish.

### Future Consideration (v2+ — Phase 3+)

- [ ] **Tienda de arte (Sofía's paintings)** — *Why defer:* needs payment + shipping + inventory; validate interest with "consultar" form first.
- [ ] **Podcast page + feed embeds** — *Why defer:* podcast doesn't exist yet; needs content + hosting + first 5 episodes.
- [ ] **/yoga page** — *Why defer:* Sofía's yoga teacher cert in progress.
- [ ] **Bilingual ES/EN** — *Why defer:* validate Spanish funnel first; English needs separate legal review.
- [ ] **Blog / educational content** — *Why defer:* requires editorial pipeline and legal-reviewed templates.
- [ ] **Login / member area** — *Why defer:* no gated content to host yet.
- [ ] **Interactive suitability quiz (Beckley-style)** — *Why defer:* needs Sofía's clinical screening criteria + form UX work.
- [ ] **Press / "as seen in" logos** — *Why defer:* only when real press exists.

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|-----------|---------------------|----------|
| Hero + cohesive aesthetic | HIGH | LOW | **P1** |
| /acompanamiento page | HIGH | LOW | **P1** |
| /retiros page (three-phase frame) | HIGH | LOW | **P1** |
| /contacto with Calendly + WhatsApp + form | HIGH | LOW | **P1** |
| Floating WhatsApp button | HIGH | LOW | **P1** |
| Legal-safe copy (no "terapia", no guarantees) | HIGH (existential) | LOW | **P1** |
| Mobile responsive | HIGH | LOW-MED | **P1** |
| FAQ (6 questions) | HIGH | LOW | **P1** |
| 3 testimonial placeholders | MED | LOW | **P1** |
| Executive-register outcome copy ("claridad estratégica") | HIGH (ICP fit) | LOW | **P1** |
| Confidentiality one-liner | MED | LOW | **P1** |
| Application framing vs purchase framing on /retiros | HIGH (ICP fit) | LOW | **P1** |
| Footer with socials | MED | LOW | **P1** |
| Personal Sofía bio | HIGH | MED (needs sign-off) | **P2** |
| Newsletter signup | MED | LOW-MED | **P2** |
| Real Calendly integration | MED | LOW | **P2** |
| Real testimonials (consented) | HIGH | MED (consent process) | **P2** |
| Suitability paragraph / soft screen | MED | LOW | **P2** |
| Photos of paintings | MED | MED (photo session) | **P2** |
| Privacy/terms page | MED (compliance) | LOW | **P2** |
| Animated gradient motion | LOW-MED | MED | **P2** |
| Art store | MED | HIGH | **P3** |
| Podcast page | MED | MED | **P3** (blocked on podcast existing) |
| Yoga page | LOW (today) | LOW | **P3** (blocked on cert) |
| Bilingual ES/EN | MED | HIGH | **P3** |
| Blog | MED | HIGH | **P3** |
| Interactive quiz | LOW (paragraph works) | MED | **P3** |
| Login / members | LOW | HIGH | Drop |
| Live chat / chatbot | LOW | HIGH (staffing) | Drop |

## Competitor Feature Analysis

| Feature | Sabiduría Psicodélica | Beckley Retreats | Behold Retreats | Kaapi (Colombia) | planetapsilo Approach |
|---------|----------------------|------------------|-----------------|------------------|----------------------|
| Multi-page nav | Yes (Inicio/Cursos/Podcast/Retiros/Contacto/Login) | Yes (Program/Retreats/Why/Testimonials/FAQ/Resources) | Yes | Yes (Servicios/Recursos/Sobre/FAQ/Contacto) | **Yes — 4 pages (Inicio/Acompañamiento/Retiros/Contacto)** |
| Application framing for retreats | Soft (info request) | Hard ("by application only", suitability quiz) | Hard (5-step intake) | Soft (consultation) | **Soft in MVP, harden to Phase 2 with quiz** |
| Pricing on site | No | No | Yes ($12.5K-20K) | No | **No — pricing in qualification call** |
| Three-phase structure (prep/immerse/integrate) | Implied | Explicit (4w / 4-5d / 4-6w) | Explicit (7-week program) | Implied | **Adopt explicit structure on /retiros** |
| Executive-targeted language | Mild ("emprendedores") | Strong ("former Disney COO", "McKinsey partner") | Strong ("Leaders, Executives, Entrepreneurs") | Mild (general "autoconocimiento") | **Strong — bridge spiritual + business register** |
| Testimonials with credentials | Yes (logos, "miles de personas") | Yes (named with company + role) | Yes (NFL players, named) | None visible | **Anonymized credentials in MVP ("Founder, SaaS, 38"), real names Phase 2** |
| Science / research credibility | Light | Heavy (Harvard/Yale/Hopkins/Imperial) | Heavy (same institutions) | Medium (Grof quote, multidisciplinary team) | **Light in MVP — Sofía's Andes formation + contemplative framing; no overclaiming research** |
| WhatsApp visible | Not prominent | No | No | Yes (+57 number footer) | **Yes — floating button, Colombian standard** |
| Calendly | Not visible | Indirect (apply → call) | Indirect | Not visible | **Direct link MVP, screened-call positioning** |
| Newsletter | Yes (exclusive content angle) | Implied (resources) | Webinar capture | Not visible | **Defer to Phase 2 — needs provider setup** |
| FAQ | Implied | Yes (dedicated page) | Yes | Yes | **Yes — 6 questions inline on /retiros and /acompanamiento** |
| Coded language for substances | Yes ("m3dicin4") | No (legal jurisdictions) | No (legal jurisdictions) | No (named in Spanish) | **Use sparingly — only if substance is named at all; default is to not name** |
| Podcast | Yes (core asset) | No | No | No | **Phase 3 — when podcast exists** |
| Login/members | Yes (course-gated) | No | No | No | **Drop — no gated content** |
| Founder photo + name | Yes (Yannina, prominent) | Yes (team page) | Yes | Yes (team named) | **Brand-only MVP; Sofía bio Phase 2 with vetted copy** |
| Confidentiality mention | Implicit | Yes ("confidential suitability assessment") | Implicit | Yes (psychiatric framing implies it) | **Yes — single explicit line** |
| Coded/obfuscated psychedelic language | "herramientas psicodélicas", "m3dicin4" | "legal psilocybin" | "plant medicine" | "psilocibina" (legal-Colombia context) | **"Acompañamiento", "espacios de exploración" — never name substance** |

## ICP-Specific Signals: "For Executives" vs "For Backpackers"

The single biggest differentiator across all premium references is **register switching**: site speaks fluent business AND fluent consciousness. Lacking either filter = wrong audience.

**Executive signals to include (per page):**

1. **Outcome language in business register** — "claridad estratégica", "decisiones de alto impacto", "reconexión con propósito de fundador", "presencia en contextos de liderazgo"
2. **Time-respecting framing** — "una conversación inicial de 30 minutos", "programa estructurado en X semanas" (calendar transparency = respect)
3. **Confidentiality explicit** — single line removes the "what if my board sees this" objection
4. **Small-group / curated language** — "grupos íntimos", "selección cuidadosa", "ubicaciones reservadas"
5. **Three-phase program structure** — signals professional rigor, not "ceremony night"
6. **Application not purchase** — gates communicate selectivity
7. **Premium typography + spacious layout** — visual silence = premium
8. **No pricing on page** — commodity items show prices; bespoke services don't
9. **Subtle credential mention** (without overclaiming) — Andes formation + experiential training
10. **Suitability self-screen** — "esta experiencia es para personas en estabilidad psicológica..."

**Backpacker signals to avoid:**

- Mushroom emoji, tie-dye visuals, cliché ceremony stock photos
- "Trip", "viaje psicodélico", "ceremonia ancestral" without curation framing
- Prices in low ranges (signals casual)
- Group sizes >20 or unspecified
- "Cualquiera puede" / open-invitation tone
- Direct substance imagery
- Pop-culture references
- Crystals, chakras, generic New Age iconography
- Comic Sans / handwritten fonts / amateur typography

## "First Contact" Funnel Patterns

Across all premium references, the conversion path looks like:

```
Anonymous visitor
  ↓
[Aesthetic + máxima hooks attention]
  ↓
[Reads /acompanamiento or /retiros]
  ↓
[FAQ pre-answers objections]
  ↓
[Application form OR Calendly book initial conversation OR WhatsApp]
  ↓
Initial 20-30 min conversation (Sofía screens, qualifies, prices)
  ↓
Invitation into process / retreat
```

**Implication for MVP:** every page must end in a CTA, but the CTA is "agenda una conversación" not "compra". WhatsApp button is the cross-cutting backup channel.

**Calendly UX patterns observed:**
- Best premium pattern: Calendly opens a 20-30 min "Initial Conversation" event, not session-length
- Pre-call questionnaire (Calendly's built-in form) asks 2-3 questions: "Qué te trae aquí", "Has explorado este tipo de espacios antes", "Cuál es la mejor forma de contactarte"
- Confirmation email reinforces brand and confidentiality

**WhatsApp CTA patterns:**
- Bottom-right floating button (LATAM standard)
- Pre-filled message ("Hola, vengo del sitio de planetapsilo, me interesa saber más sobre...")
- Mobile: button is larger and more prominent
- Desktop: smaller, still visible on scroll

## Sources

- [Sabiduría Psicodélica (reference site)](https://www.sabiduriapsicodelica.com/)
- [Beckley Retreats](https://www.beckleyretreats.com/) — premium executive retreat structure
- [Behold Retreats — 7-Week Executive Program](https://www.behold-retreats.com/transformations/7-week-program) — executive-targeted ICP language and pricing model
- [Synthesis Institute Immersion Retreats](https://www.synthesisinstitute.com/immersion-retreats) — legal psilocybin retreat framing
- [Kaapi Center (Bogotá)](https://www.kaapicenter.org/) — Colombian legal language for psilocybin-assisted work
- [Fortune Well — psychedelic leadership retreats](https://fortune.com/well/article/psychedelic-leadership-retreat-magic-mushrooms-mdma-ayahuasca/) — executive ICP validation
- [Beckley Blog — psilocybin retreats and executive leadership](https://www.beckleyretreats.com/blog/psilocybin-retreats-executives-leadership-skills)
- [Globe and Mail — executives turn to psychedelic retreats](https://www.theglobeandmail.com/business/article-psychedelic-retreats-business-executives-stress-ayahuasca-psilocybin/)
- [Elementor — 2026 coaching website models](https://elementor.com/blog/inspiring-coaching-websites-to-model/)
- [LandingPageFlow — 2026 CTA placement strategies](https://www.landingpageflow.com/post/best-cta-placement-strategies-for-landing-pages)
- [Doctoralia — psilocybin therapy specialists Bogotá](https://www.doctoralia.co/tratamientos-servicios/psicoterapia-con-el-uso-de-psilocibina/bogota) — Colombian regulatory context
- [EAFIT — Derecho a la salud y psilocibina en Colombia](https://repository.eafit.edu.co/bitstreams/5c94e57d-4a74-46d0-9294-1a1aacc3071d/download) — legal context Colombia
- [Wellness Law — what health coaches can say without legal trouble](https://wellnesslaw.com/blogs/news/what-can-a-health-coach-say-on-a-website-without-getting-into-legal-trouble) — disclaimer/language patterns
- [Paperbell — coaching disclaimer templates](https://paperbell.com/blog/coaching-disclaimer-template/)
- [PROJECT.md](/home/plazasia/workspace/07_DIGITAL_GROWTH/clientes/planetapsilo/.planning/PROJECT.md) — ICP, constraints, key decisions

---
*Feature research for: planetapsilo — psychedelic-aesthetic consciousness coaching site (Colombia, premium ICP)*
*Researched: 2026-05-21*
