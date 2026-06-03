// src/data/contact.ts
// 2026-06-03 pivot: real contact channels for Sofía Castañeda's LP.
// - WhatsApp: REAL number 3144068637 (Colombia → 57 prefix, no spaces/plus for wa.me).
// - Email: real Uniandes correo.
// - Scheduling: PLACEHOLDER Calendly link (connects to Google Calendar). Swap before sharing widely.
// - Web3Forms: PUBLIC access key — placeholder until Sofía/Juan create one at web3forms.com.
//   Keys are public-by-design in Web3Forms; the endpoint rate-limits server-side.

export interface ContactConfig {
  whatsappNumber: string;          // E.164 sin '+' para wa.me
  email: string;
  schedulingUrl: string;           // Calendly / Google Calendar appointment link
  web3formsKey: string;
}

export const contact: ContactConfig = {
  whatsappNumber: '573144068637',
  email: 'a.castanedav@uniandes.edu.co',
  // TODO: reemplazar por el link real de agendamiento (Calendly conectado a Google Calendar).
  schedulingUrl: 'https://calendly.com/REEMPLAZAR/llamada-15-min',
  // TODO: reemplazar por la access key real de Web3Forms (web3forms.com).
  web3formsKey: 'YOUR_WEB3FORMS_ACCESS_KEY',
};

// WhatsApp deeplink helper. URL-encodes the prefill so accents/punctuation survive.
export const waLink = (prefill: string) =>
  `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(prefill)}`;

// mailto helper with optional subject.
export const mailLink = (subject?: string) =>
  `mailto:${contact.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
