import { Component, ViewEncapsulation, input } from '@angular/core';
import { Logo } from '../../ui';
import { SocialLinks } from '../../patterns';

/** SiteFooter — organismo. Pie navy con logo grande, créditos y redes. */
@Component({
  selector: 'g-site-footer',
  imports: [Logo, SocialLinks],
  encapsulation: ViewEncapsulation.None,
  styleUrl: './site-footer.scss',
  template: `
    <footer class="g-site-footer g-on-dark">
      <div class="g-site-footer__inner">
        <div class="g-site-footer__brand">
          <g-logo size="lg" />
          <p class="g-site-footer__copy">{{ copy() }}</p>
        </div>
        <g-social-links />
      </div>
    </footer>
  `,
})
export class SiteFooter {
  readonly copy = input('© 2026 Stefania Holguin Quiroz · Medellín, Colombia');
}
