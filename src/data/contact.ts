// src/data/contact.ts
// Phase 1 stubs (01-CONTEXT.md Deferred: real channels wired in Phase 2/3).
// - WhatsApp number: placeholder 0000000000 (Phase 2 wires real number — pending Sofía decision Phase 4).
// - Calendly: '#' (Phase 3 wires real link to Sofía's calendar).
// - Email: not exposed in Phase 1.

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
