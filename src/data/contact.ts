// src/data/contact.ts
// Phase 2 (D-10, D-19, CONT-04, CONT-05, CONT-10): real contact channels wired.
// - WhatsApp number: REAL Colombian number — pending Sofía. Placeholder '57XXXXXXXXXX' until provided.
// - Calendly: placeholder URL until Sofía provides real event-type (LEGAL-09 in Phase 3).
// - Web3Forms: TWO public access keys (one per form). PUBLIC by design — see Web3Forms docs.
//   Threat T-02-04: keys exposed in client HTML is the intended Web3Forms pattern; rate-limited at endpoint.
// - waLink(prefill): URL-encoded helper used by every WhatsApp CTA across the site.

export interface ContactConfig {
  whatsappNumber: string;
  whatsappPrefill: string;          // backward compat — kept for any Phase 1 caller; new code uses waLink()
  calendlyUrl: string;
  web3formsKeyContacto: string;
  web3formsKeyRetiros: string;
  instagramUrl: string;
  tiktokUrl: string;
}

export const contact: ContactConfig = {
  // TODO: replace '57XXXXXXXXXX' with Sofía's real WhatsApp number before deploy (D-19 / Phase 4 VAL-05 evaluates dedicated Business number).
  whatsappNumber: '57XXXXXXXXXX',
  whatsappPrefill: 'Hola%20planetapsilo,%20me%20interesa%20explorar',
  // TODO: replace with Sofía's real Calendly event URL before deploy (Phase 3 LEGAL-09).
  calendlyUrl: 'https://calendly.com/planetapsilo/conversacion-inicial',
  // TODO: replace YOUR_*_ACCESS_KEY with real Web3Forms access keys (Sofía/Juan create at web3forms.com).
  web3formsKeyContacto: 'YOUR_CONTACTO_ACCESS_KEY',
  web3formsKeyRetiros: 'YOUR_RETIROS_ACCESS_KEY',
  // TODO: replace with Sofía's real IG and TikTok handles (D-26 / CONT-10).
  instagramUrl: 'https://instagram.com/planetapsilo',
  tiktokUrl: 'https://tiktok.com/@planetapsilo',
};

// D-19: WhatsApp deeplink helper. URL-encodes prefill so accents/punctuation survive.
// Used by WhatsAppFloat + every WhatsApp CTA across the site.
export const waLink = (prefill: string) =>
  `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(prefill)}`;
