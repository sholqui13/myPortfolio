import { Component, ViewEncapsulation, computed, input } from '@angular/core';

/**
 * Marquee — organismo decorativo. Dos franjas cruzadas que se desplazan en
 * direcciones opuestas. aria-hidden: repite habilidades de otras secciones.
 */
@Component({
  selector: 'g-marquee',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './marquee.scss',
  host: { class: 'g-marquee', 'aria-hidden': 'true' },
  template: `
    <div class="g-marquee__band g-marquee__band--a">
      <div class="g-marquee__track">
        @for (w of topLoop(); track $index) {
          <span>{{ w }}</span><span class="g-marquee__sep">✦</span>
        }
      </div>
    </div>
    <div class="g-marquee__band g-marquee__band--b">
      <div class="g-marquee__track">
        @for (w of bottomLoop(); track $index) {
          <span>{{ w }}</span><span class="g-marquee__sep">✦</span>
        }
      </div>
    </div>
  `,
})
export class Marquee {
  readonly top = input(['Angular', 'TypeScript', 'SASS + BEM', 'Git', 'Azure', 'Umbraco', 'Scrum']);
  readonly bottom = input([
    'Front-End',
    'UX/UI',
    'Accesibilidad',
    'Figma',
    'Responsive',
    'Performance',
  ]);

  /** Contenido duplicado para el bucle continuo (translateX -50 %). */
  protected readonly topLoop = computed(() => [...this.top(), ...this.top()]);
  protected readonly bottomLoop = computed(() => [...this.bottom(), ...this.bottom()]);
}
