// src/data/services.ts
// Phase 2 (CONT-02, CONT-03, CONT-06): interfaz extendida — agrega ctaLabel por card (LOCKED en UI-SPEC),
// campos opcionales description/audience/outcomes/confidentialityLine consumidos por Plan 03 (acompañamiento) + Plan 04 (retiros).
// El home services-split (Plan 02) sólo consume slug + label + teaser + ctaLabel.

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

export const services: Service[] = [
  {
    slug: 'acompanamiento',
    label: 'Acompañamiento',
    teaser: 'Encuentros uno-a-uno para C-Level, founders y nómadas digitales que están reordenando algo importante. Espacio de exploración no clínico.',
    ctaLabel: 'Conocer el acompañamiento',
  },
  {
    slug: 'retiros',
    label: 'Retiros',
    teaser: 'Tres fases — Preparación, Inmersión, Integración — para una pausa profunda. Aplicación previa obligatoria.',
    ctaLabel: 'Conocer los retiros',
  },
];
