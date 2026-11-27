import { Component, ViewEncapsulation, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon, Logo } from '../../ui';

/** Enlace de la barra superior de un caso (anterior / volver / siguiente). */
export interface CaseNavLink {
  label: string;
  /** Ruta interna, p. ej. `/proyectos/veyra` o `/`. */
  route: string;
  fragment?: string;
}

/** Tarjeta “Siguiente proyecto”: toma el tema del caso al que lleva. */
export interface CaseNextCard {
  slug: string;
  title: string;
}

export type CaseSlug = 'novasec' | 'veyra' | 'avianca';

/**
 * CaseShell — marco común de los casos de estudio (lienzo: CasoNovasec,
 * CasoVeyra, CasoAvianca). Aplica el tema con `[data-case]`, pinta la barra
 * del portafolio, proyecta el contenido dentro de `<main>` y cierra con la
 * tarjeta del siguiente proyecto y el pie.
 */
@Component({
  selector: 'g-case-shell',
  imports: [RouterLink, Logo, Icon],
  encapsulation: ViewEncapsulation.None,
  styleUrl: './case-study.scss',
  host: {
    class: 'g-case',
    '[attr.data-case]': 'slug()',
  },
  template: `
    <!-- Ruta relativa a <base href>: así el salto funciona también bajo /myPortfolio/. -->
    <a class="g-skip" [href]="'proyectos/' + slug() + '#caso'">Saltar al contenido</a>

    <header
      class="g-case-bar"
      [class.g-case-bar--light]="bar() === 'light'"
      [class.g-case-on-dark]="bar() === 'dark'"
    >
      <nav class="g-case-bar__nav" aria-label="Principal">
        <a class="g-case-bar__link" [routerLink]="back().route" [fragment]="back().fragment">
          <g-icon name="arrow-left" size="sm" />{{ back().label }}
        </a>
        <a class="g-case-bar__home" routerLink="/">
          <g-logo size="sm" alt="Genuina Multimedia, portafolio de Stefania Holguin" priority />
        </a>
        <a
          class="g-case-bar__link"
          [class.g-case-bar__link--cta]="bar() === 'light'"
          [routerLink]="forward().route"
        >
          {{ forward().label }}<g-icon name="arrow-right" size="sm" />
        </a>
      </nav>
    </header>

    <main id="caso">
      <ng-content />

      @if (next(); as n) {
        <section
          class="g-container g-case-section g-case-section--last"
          aria-labelledby="g-case-next-title"
        >
          <a class="g-case-next" [attr.data-case]="n.slug" [routerLink]="'/proyectos/' + n.slug">
            <span class="g-case-next__text">
              <span class="g-case-kicker g-case-next__kicker">Siguiente proyecto</span>
              <span class="g-case-next__title" id="g-case-next-title">{{ n.title }}</span>
            </span>
            <span class="g-case-next__arrow" aria-hidden="true"><g-icon name="arrow-right" /></span>
          </a>
        </section>
      }
    </main>

    <footer class="g-case-footer">
      <p class="g-case-footer__text">© 2026 Stefania Holguin Quiroz · {{ note() }}</p>
    </footer>
  `,
})
export class CaseShell {
  readonly slug = input.required<CaseSlug>();
  /** `dark`: barra a todo el ancho (Novasec, Veyra). `light`: píldora blanca (Avianca). */
  readonly bar = input<'dark' | 'light'>('dark');
  readonly back = input<CaseNavLink>({
    label: 'Volver al portafolio',
    route: '/',
    fragment: 'portafolio',
  });
  readonly forward = input.required<CaseNavLink>();
  readonly next = input<CaseNextCard>();
  /** Aviso del pie (datos simulados, confidencialidad…). */
  readonly note = input.required<string>();
}
