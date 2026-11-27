import { Component, ViewEncapsulation, input } from '@angular/core';
import { CheckList, ContactForm, EmailCard } from '../../patterns';
import { LINKS } from '../../data/links';

/** ContactSection — organismo. Titular, ContactForm, correo directo (EmailCard) y condiciones. */
@Component({
  selector: 'g-contact-section',
  imports: [ContactForm, EmailCard, CheckList],
  encapsulation: ViewEncapsulation.None,
  styleUrl: './contact-section.scss',
  template: `
    <section class="g-contact" id="contacto" aria-labelledby="g-cta-title">
      <h2 class="g-contact__title" id="g-cta-title">
        ¿Tienes un proyecto increíble?<br /><em>¡Hablemos!</em>
      </h2>
      <g-contact-form idPrefix="contacto" />
      <g-email-card [email]="links.email" labelId="contacto-correo-directo" />
      <g-check-list [items]="checks()" />
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
