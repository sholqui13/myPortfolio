import { Component, ViewEncapsulation, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Button } from '../../ui';
import { StatItem } from '../../patterns';

export interface Stat {
  value: string;
  label: string;
}

/**
 * “¿Por qué trabajar conmigo?” — bloque de la Home armado con piezas del
 * sistema (atomic-design.md): retrato en círculo attention, titular, párrafo,
 * tres StatItem y Button outline-action.
 */
@Component({
  selector: 'g-why-section',
  imports: [Button, StatItem, NgOptimizedImage],
  encapsulation: ViewEncapsulation.None,
  styleUrl: './why-section.scss',
  template: `
    <section class="g-container g-why-section" aria-labelledby="g-why-title">
      <div class="g-why">
        <div class="g-why__portrait" aria-hidden="true">
          <img
            class="g-why__photo"
            ngSrc="assets/img/stefania-retrato-recorte.webp"
            width="800"
            height="847"
            alt=""
          />
          <span class="g-why__orb g-why__orb--a"></span>
          <span class="g-why__orb g-why__orb--b"></span>
        </div>
        <div class="g-why__body">
          <h2 class="g-section__title g-why__title" id="g-why-title">
            ¿Por qué <em>trabajar conmigo</em> en tu próximo proyecto?
          </h2>
          <p class="g-why__text">{{ text() }}</p>
          <ul class="g-why__stats">
            @for (s of stats(); track s.value) {
              <li g-stat-item [value]="s.value" [label]="s.label"></li>
            }
          </ul>
          <a g-button variant="outline-action" href="#contacto" class="g-why__cta">Contrátame</a>
        </div>
      </div>
    </section>
  `,
})
export class WhySection {
  readonly text = input(
    'Entiendo el diseño y el código. Eso significa menos idas y vueltas, interfaces fieles a lo que se diseñó y una experiencia pensada para todas las personas desde el primer componente.',
  );
  readonly stats = input<Stat[]>([
    { value: '2 en 1', label: 'diseño UX/UI y desarrollo Front-End' },
    { value: '4', label: 'navegadores probados en cada entrega' },
    { value: 'B1', label: 'inglés (EF SET)' },
  ]);
}
