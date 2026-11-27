import { Component, ViewEncapsulation, input } from '@angular/core';
import { Button, Logo } from '../../ui';
import { NavItem } from '../../data/nav';

/**
 * SiteHeader — organismo. Píldora navy: enlaces · logo · enlaces + “Contacto”.
 * Visible desde bp-desktop (1024 px); por debajo se usa MobileMenu.
 */
@Component({
  selector: 'g-site-header',
  imports: [Logo, Button],
  encapsulation: ViewEncapsulation.None,
  styleUrl: './site-header.scss',
  template: `
    <header class="g-container g-on-dark g-site-header">
      <nav class="g-site-header__nav" aria-label="Principal">
        <ul class="g-site-header__list">
          @for (l of left(); track l.href) {
            <li>
              <a class="g-link" [href]="l.href" [attr.aria-current]="l.current ? 'page' : null">{{
                l.label
              }}</a>
            </li>
          }
        </ul>
        <g-logo [href]="homeHref()" alt="Genuina Multimedia, inicio" priority />
        <ul class="g-site-header__list">
          @for (l of right(); track l.href) {
            <li>
              <a class="g-link" [href]="l.href" [attr.aria-current]="l.current ? 'page' : null">{{
                l.label
              }}</a>
            </li>
          }
          <li><a g-button variant="light" size="sm" [href]="contactHref()">Contacto</a></li>
        </ul>
      </nav>
    </header>
  `,
})
export class SiteHeader {
  readonly left = input<NavItem[]>([
    { label: 'Inicio', href: '#inicio', current: true },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Experiencia', href: '#experiencia' },
  ]);
  readonly right = input<NavItem[]>([{ label: 'Portafolio', href: '#portafolio' }]);
  readonly homeHref = input('#inicio');
  readonly contactHref = input('#contacto');
}
