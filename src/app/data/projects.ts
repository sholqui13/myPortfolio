import { Project } from './project';

/** Textos del lienzo “Portafolio Stefania Holguin” (Main). */
export const PROJECTS: Project[] = [
  {
    slug: 'novasec',
    title: 'Novasec: plataforma de operaciones de seguridad',
    org: 'Proyecto para Inovisec',
    desc: 'Maqueta funcional construida desde el handoff de Figma: inicio de sesión, mapa interactivo de casos activos y detalle de cada caso. Tokens de diseño, componentes standalone con signals, diseño responsive, accesibilidad y pruebas unitarias.',
    tags: ['Figma', 'Angular', 'TypeScript', 'Leaflet', 'Vitest'],
    tint: 'var(--teal-100)',
    caseHref: '/proyectos/novasec',
    demo: 'https://sholqui13.github.io/Novasec/',
    repo: 'https://github.com/sholqui13/Novasec',
    desk: {
      src: 'assets/img/novasec-desktop.webp',
      alt: 'Dashboard de Novasec en escritorio: mapa del campus con casos activos y panel con el detalle del caso 1042.',
      width: 1440,
      height: 900,
    },
    mob: {
      src: 'assets/img/novasec-mobile.webp',
      alt: 'Dashboard de Novasec en móvil, con el mapa arriba y el caso seleccionado debajo.',
      width: 390,
      height: 780,
    },
  },
  {
    slug: 'veyra',
    title: 'Veyra: monitoreo de flotas en tiempo real',
    org: 'Diseño UX/UI en Figma',
    desc: 'App para seguir vehículos en vivo: lista de la flota, mapa con el recorrido y telemetría de velocidad, rumbo, batería y voltaje. Sistema de diseño propio, modo claro y oscuro, versiones para escritorio, tablet y móvil, y estados de carga, error y vacío.',
    tags: ['Figma', 'Design System', 'Modo oscuro', 'Responsive'],
    tint: 'var(--violet-100)',
    caseHref: '/proyectos/veyra',
    figma: 'https://www.figma.com/design/sRY4pHnKhkubZszHrDUPd3/Veyra-App',
    desk: {
      src: 'assets/img/veyra-desktop.webp',
      alt: 'Pantalla de monitoreo de Veyra en escritorio: lista de vehículos, mapa con el recorrido y panel de telemetría del Camión 042.',
      width: 1439,
      height: 900,
    },
    mob: {
      src: 'assets/img/veyra-mobile.webp',
      alt: 'Veyra en móvil: mapa con el vehículo y hoja inferior con velocidad, batería y voltaje.',
      width: 440,
      height: 780,
    },
  },
  {
    slug: 'avianca',
    title: 'Avianca: reserva de vuelos y LifeMiles',
    org: 'FLYR Labs',
    desc: 'Desarrollo Front-End del flujo de reservas y del área de miembros, con accesibilidad WCAG, optimización de performance y contenido gestionado en Umbraco.',
    tags: ['Angular', 'WCAG', 'Umbraco'],
    tint: 'var(--violet-100)',
    caseHref: '/proyectos/avianca',
    desk: {
      src: 'assets/img/casos/avianca-inicio.webp',
      alt: 'Inicio de avianca.com en escritorio: buscador de vuelos de Bogotá a Medellín con el selector de pasajeros abierto.',
      width: 1681,
      height: 938,
    },
    mob: {
      src: 'assets/img/casos/avianca-movil-ofertas.webp',
      alt: 'Avianca en móvil: ofertas desde Medellín con tarjetas de Cali y Bogotá y su precio de ida y vuelta.',
      width: 426,
      height: 790,
    },
  },
];
