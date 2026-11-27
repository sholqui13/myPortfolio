import { Component, ViewEncapsulation, input } from '@angular/core';
import { CheckList, ContactForm } from '../../patterns';
import { LINKS } from '../../data/links';

/** ContactSection — organismo. Titular, ContactForm, condiciones y correo directo. */
@Component({
  selector: 'g-contact-section',
  imports: [ContactForm, CheckList],
  encapsulation: ViewEncapsulation.None,
  styleUrl: './contact-section.scss',
  template: `
    <section class="g-contact" id="contacto" aria-labelledby="g-cta-title">
      <h2 class="g-contact__title" id="g-cta-title">
        ¿Tienes un proyecto increíble?<br /><em>¡Hablemos!</em>
      </h2>
      <g-contact-form idPrefix="contacto" />
      <g-check-list [items]="checks()" />
      <p class="g-contact__alt">
        O escríbeme directo a <a [href]="links.mailto">{{ links.email }}</a>
      </p>
    </section>
  `,
})
export class ContactSection {
  readonly checks = input<string[]>([
    'Remoto o en Medellín',
    'Freelance o tiempo completo',
    'Español e inglés',
  ]);
  protected readonly links = LINKS;
}
