import { Component, ViewEncapsulation, input } from '@angular/core';

export type ServiceIllustrationKind = 'frontend' | 'ux' | 'a11y';

/** Ilustraciones decorativas de las tarjetas de servicio (lienzo Main). */
@Component({
  selector: 'g-service-illustration',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './service-illustration.scss',
  host: { class: 'g-illo', 'aria-hidden': 'true' },
  template: `
    @switch (kind()) {
      @case ('frontend') {
        <div class="g-illo__window">
          <span class="g-illo__bar g-illo__bar--title"></span>
          <span class="g-illo__block"></span>
          <span class="g-illo__bar g-illo__bar--line"></span>
          <span class="g-illo__bar g-illo__bar--cta"></span>
        </div>
        <div class="g-illo__phone">
          <div class="g-illo__screen">
            <span class="g-illo__thumb"></span>
            <span class="g-illo__text"></span>
            <span class="g-illo__text g-illo__text--short"></span>
            <span class="g-illo__btn"></span>
          </div>
        </div>
      }
      @case ('ux') {
        <div class="g-illo__frames">
          <span></span>
          <span class="g-illo__frame--active"></span>
          <span></span>
        </div>
        <div class="g-illo__swatches">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
        <svg class="g-illo__cursor" viewBox="0 0 26 30" focusable="false">
          <path d="M2 2 24 16 13 18 8 28z" />
        </svg>
      }
      @case ('a11y') {
        <div class="g-illo__a11y">
          <div class="g-illo__ring">AA</div>
          <div class="g-illo__bars"><span></span><span></span><span></span><span></span></div>
        </div>
      }
    }
  `,
})
export class ServiceIllustration {
  readonly kind = input.required<ServiceIllustrationKind>();
}
