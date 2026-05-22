// src/data/services.ts
// Phase 1 stubs. Phase 2 (CONT-02, CONT-03) replaces teaser with real legal-safe copy
// from docs/copy-glossary.md — sin lenguaje clínico, sin atribución de terapia,
// sin nombrar sustancia, sin precio.

export interface ServicePlaceholder {
  slug: 'acompanamiento' | 'retiros';
  label: string;
  teaser: string;
}

export const services: ServicePlaceholder[] = [
  {
    slug: 'acompanamiento',
    label: 'Acompañamiento',
    teaser:
      'Espacio de exploración para C-Level, nómadas digitales y founders. (Copy real en Phase 2.)',
  },
  {
    slug: 'retiros',
    label: 'Retiros',
    teaser:
      'Tres fases: Preparación, Inmersión, Integración. (Aplicación obligatoria — formato en Phase 2.)',
  },
];
