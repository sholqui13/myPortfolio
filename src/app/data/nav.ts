export interface NavItem {
  label: string;
  href: string;
  current?: boolean;
}

/** Secciones de la Home (orden del menú móvil: 01–05). */
export const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', href: '#inicio', current: true },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Portafolio', href: '#portafolio' },
  { label: 'Contacto', href: '#contacto' },
];
