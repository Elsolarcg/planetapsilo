// src/data/site.ts
// Single source of truth for site-wide config consumed by BaseLayout + Footer.
// 2026-06-03 pivot: this is now Sofía Castañeda's psychology landing page (indexable).

export interface SiteConfig {
  name: string;
  baseUrl: string;
  ogDefault: {
    title: string;
    description: string;
    image: string; // path relative to BASE_URL (no leading slash)
  };
  indexable: boolean;
  year: number;
}

export const site: SiteConfig = {
  name: 'Sofía Castañeda',
  baseUrl: 'https://elsolarcg.github.io/planetapsilo',
  ogDefault: {
    title: 'Sofía Castañeda · Psicóloga',
    description:
      'Acompañamiento psicológico virtual. Un espacio seguro para comprenderte, afrontar tus desafíos y construir una vida con mayor bienestar.',
    image: 'og-default.svg',
  },
  // Pivot decision (2026-06-03): page is public/indexable.
  indexable: true,
  year: new Date().getFullYear(),
};
