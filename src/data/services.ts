// src/data/services.ts
// Phase 2 (CONT-02, CONT-03, CONT-06, CONT-09): expanded entries.
// Copy authored within docs/copy-glossary.md PERMITIDO. Denial-clause "no es terapia" appears
// intentionally and is exempted by Plan 06 copy linter.
// confidentialityLine matches D-27 LOCKED string.

export interface Service {
  slug: 'acompanamiento' | 'retiros';
  label: string;
  teaser: string;
  ctaLabel: string;
  description?: string;
  audience?: string;
  outcomes?: string[];
  confidentialityLine?: string;
}

const CONFIDENTIALITY = 'Lo que se conversa aquí no sale de aquí. Trabajamos con discreción profesional y archivamos sólo lo mínimo necesario.';

export const services: Service[] = [
  {
    slug: 'acompanamiento',
    label: 'Acompañamiento',
    teaser: 'Encuentros uno-a-uno para C-Level, founders y nómadas digitales que están reordenando algo importante. Espacio de exploración no clínico.',
    ctaLabel: 'Conocer el acompañamiento',
    description: 'Conversaciones sostenidas para mentes que ya construyeron mucho y ahora necesitan ver desde otra altura. No es terapia ni servicio de salud — es un espacio de exploración para reordenar decisiones, prioridades y dirección desde un lugar más quieto.',
    audience: 'Pensado para C-Level que están negociando una venta, una salida o un pivote; founders que sienten que el problema dejó de ser de equipo; y nómadas digitales que llevan años en piloto automático y empiezan a notar el costo.',
    outcomes: [
      'Una conversación uno-a-uno en un espacio sin interrupciones, sin agenda externa, sin protocolo clínico.',
      'Encuentros recurrentes — semanales, quincenales o mensuales — que sostienen un proceso en tu vida cotidiana, no un evento aislado.',
      'Trabajo desde la pregunta, no desde la receta. Lo que aparece se explora; lo que se ordena se ordena.',
      'Sin diagnóstico, sin etiquetas, sin recetario. Tu lenguaje, tu ritmo, tus decisiones.',
    ],
    confidentialityLine: CONFIDENTIALITY,
  },
  {
    slug: 'retiros',
    label: 'Retiros',
    teaser: 'Tres fases — Preparación, Inmersión, Integración — para una pausa profunda. Aplicación previa obligatoria.',
    ctaLabel: 'Conocer los retiros',
    // Plan 04 expands retiros fields (phases description, suitability, etc.) — left empty here intentionally.
    confidentialityLine: CONFIDENTIALITY,
  },
];
