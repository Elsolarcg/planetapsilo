// src/data/nav.ts
// Single-page LP: nav items are in-page anchors (no base-path prefixing needed for '#' links).

export interface NavItem {
  label: string;
  href: string;
}

export const nav: NavItem[] = [
  { label: 'Sobre mí',  href: '#sobre-mi' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Consulta',  href: '#consulta' },
  { label: 'Preguntas', href: '#faq' },
];
