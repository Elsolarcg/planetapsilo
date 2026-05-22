// src/data/nav.ts
// Nav items consumed by Nav.astro. `href` is the route WITHOUT base prefix —
// Nav.astro's `internal()` helper applies `import.meta.env.BASE_URL` to neutralize
// Pitfall #13 (GH Pages base-path bug).

export interface NavItem {
  label: string;
  href: string;
}

export const nav: NavItem[] = [
  { label: 'Inicio',         href: '/' },
  { label: 'Acompañamiento', href: '/acompanamiento' },
  { label: 'Retiros',        href: '/retiros' },
  { label: 'Contacto',       href: '/contacto' },
];
