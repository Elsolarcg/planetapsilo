// src/data/site.ts
// Single source of truth for site-wide config consumed by BaseLayout + Footer.
// Phase 2 will update copy; Phase 3 will flip `indexable` to true after abogado sign-off (LEGAL-12).

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
  name: 'planetapsilo',
  baseUrl: 'https://elsolarcg.github.io/planetapsilo',
  ogDefault: {
    title: 'planetapsilo',
    description:
      'Espacio de exploración y acompañamiento. (Sitio en construcción — Phase 1 skeleton.)',
    image: 'og-default.svg',
  },
  // Phase 1 ships noindex. Flipping this to true is a Phase 3 LEGAL-12 task gated by abogado.
  indexable: false,
  year: new Date().getFullYear(),
};
