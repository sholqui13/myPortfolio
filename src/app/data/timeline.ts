export interface TimelineEntry {
  org: string;
  date: string;
  role: string;
  desc: string;
}

/** De lo más reciente a lo más antiguo (lienzo Main). */
export const TIMELINE: TimelineEntry[] = [
  {
    org: 'FLYR Labs · Avianca',
    date: 'Abr 2023 – Jul 2026',
    role: 'Software Developer (Front-End)',
    desc: 'Flujo de reservas y LifeMiles en Angular, accesibilidad WCAG, performance, Umbraco, Git y Azure.',
  },
  {
    org: 'Nivelics S.A.S.',
    date: 'Jul 2021 – Jun 2022',
    role: 'Diseñadora Web Junior Front-End',
    desc: 'Diseño en Figma y Adobe XD y maquetación responsive de portales corporativos con Angular, SASS y Bootstrap, bajo metodología Scrum.',
  },
  {
    org: 'UNAD',
    date: 'Ago 2025 – actual',
    role: 'Especialización en Gestión de Proyectos',
    desc: 'Formación para conectar diseño, desarrollo y negocio.',
  },
  {
    org: 'UNAD',
    date: 'Ago 2021 – Abr 2026',
    role: 'Ingeniería Multimedia',
    desc: 'Graduada con Grado de Honor.',
  },
  {
    org: 'SENA',
    date: 'Ago 2018 – Mar 2021',
    role: 'Tecnología en Producción de Multimedia',
    desc: 'Formación técnica en diseño y producción de contenidos multimedia.',
  },
];
