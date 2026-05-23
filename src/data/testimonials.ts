// src/data/testimonials.ts
// Phase 2 (CONT-07, D-11, D-12): 3 testimonios placeholder.
// Phase 3 LEGAL-07 reemplaza estos con testimonios reales con consentimiento escrito archivado.
// Formato: inicial + rol + edad + ciudad. El disclaimer es el MISMO string LOCKED por card.
// Copy v1 por Claude dentro del glosario PERMITIDO — Sofía refina la redacción antes del cierre de fase.

export interface Testimonial {
  context: 'home' | 'acompanamiento' | 'retiros';
  quote: string;
  attribution: string;
  disclaimer: string;
}

const DISCLAIMER = 'Testimonio ilustrativo de Phase 2 — voces reales consentidas en próxima versión. La experiencia individual no garantiza resultados.';

export const testimonials: Testimonial[] = [
  {
    context: 'home',
    quote: 'Vine reordenando una venta y salí con algo más vivo que un plan.',
    attribution: 'M., founder fintech, 41 — Bogotá',
    disclaimer: DISCLAIMER,
  },
  {
    context: 'acompanamiento',
    quote: 'Llevábamos cuatro encuentros cuando entendí que el problema no era de equipo. Era una pregunta que yo no me estaba haciendo.',
    attribution: 'D., C-Level retail, 47 — Medellín',
    disclaimer: DISCLAIMER,
  },
  {
    context: 'retiros',
    quote: 'La integración me cambió más que la inmersión. La pausa profunda es donde algo se acomoda y después lo notas semanas después en cómo decides.',
    attribution: 'A., founder e-commerce, 38 — Bogotá',
    disclaimer: DISCLAIMER,
  },
];
