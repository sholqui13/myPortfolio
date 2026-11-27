import { Component, ViewEncapsulation, input } from '@angular/core';
import { ServiceCard } from '../../patterns';
import { ServiceIllustration, ServiceIllustrationKind } from './service-illustration';

export interface ServiceItem {
  title: string;
  text: string;
  href?: string;
  actionLabel?: string;
  featured?: boolean;
  illustration?: ServiceIllustrationKind;
}

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    title: 'Desarrollo Front-End',
    text: 'Angular, TypeScript y SASS con BEM. Responsive y Mobile-First.',
    href: '#portafolio',
    actionLabel: 'Ver proyectos de desarrollo Front-End',
    illustration: 'frontend',
  },
  {
    title: 'Diseño UX/UI',
    text: 'Prototipos en Figma y Adobe XD listos para llevar a código.',
    href: '#portafolio',
    actionLabel: 'Ver proyectos de diseño UX/UI',
    featured: true,
    illustration: 'ux',
  },
  {
    title: 'Accesibilidad y performance',
    text: 'Buenas prácticas WCAG, carga rápida y pruebas cross-browser.',
    href: '#portafolio',
    actionLabel: 'Ver proyectos con foco en accesibilidad',
    illustration: 'a11y',
  },
];

/** ServicesSection — organismo. Bloque oscuro “Mis servicios” con 3 ServiceCard. */
@Component({
  selector: 'g-services-section',
  imports: [ServiceCard, ServiceIllustration],
  encapsulation: ViewEncapsulation.None,
  styleUrl: './services-section.scss',
  template: `
    <section class="g-container g-on-dark" id="servicios" aria-labelledby="g-serv-title">
      <div class="g-services">
        <div class="g-services__head">
          <h2 class="g-services__title" id="g-serv-title">Mis <em>servicios</em></h2>
          <p class="g-services__lead">{{ lead() }}</p>
        </div>
        <ul class="g-services__grid">
          @for (s of items(); track s.title) {
            <li
              g-service-card
              [title]="s.title"
              [text]="s.text"
              [href]="s.href"
              [actionLabel]="s.actionLabel"
              [featured]="s.featured ?? false"
            >
              @if (s.illustration; as kind) {
                <g-service-illustration media [kind]="kind" />
              }
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class ServicesSection {
  readonly items = input<ServiceItem[]>(DEFAULT_SERVICES);
  readonly lead = input(
    'Un mismo equipo para diseñar y construir: del prototipo al código en producción.',
  );
}
