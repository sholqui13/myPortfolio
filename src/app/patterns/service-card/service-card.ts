import { Component, ViewEncapsulation, booleanAttribute, computed, input } from '@angular/core';
import { IconButton } from '../../ui';

/**
 * ServiceCard — molécula. Va dentro de la grilla de ServicesSection (<ul>).
 * La ilustración se proyecta con el atributo `media`:
 *   <li g-service-card title="…" text="…" href="#portafolio"><div media>…</div></li>
 */
@Component({
  selector: 'li[g-service-card]',
  imports: [IconButton],
  encapsulation: ViewEncapsulation.None,
  styleUrl: './service-card.scss',
  host: {
    class: 'g-service-card',
    '[class.g-service-card--featured]': 'featured()',
  },
  template: `
    <h3 class="g-service-card__title">{{ title() }}</h3>
    <p class="g-service-card__text">{{ text() }}</p>
    <div class="g-service-card__media" aria-hidden="true"><ng-content select="[media]" /></div>
    @if (href(); as link) {
      <a
        g-icon-button
        class="g-service-card__action"
        [href]="link"
        icon="arrow-up-right"
        [label]="accessibleLabel()"
        [variant]="featured() ? 'highlight' : 'inverse'"
      ></a>
    }
  `,
})
export class ServiceCard {
  readonly title = input.required<string>();
  readonly text = input.required<string>();
  readonly href = input<string>();
  readonly actionLabel = input<string>();
  /** Una sola por grupo. */
  readonly featured = input(false, { transform: booleanAttribute });

  protected readonly accessibleLabel = computed(
    () => this.actionLabel() ?? `Ver proyectos de ${this.title()}`,
  );
}
