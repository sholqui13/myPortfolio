import {
  Component,
  DOCUMENT,
  ElementRef,
  Injector,
  OnDestroy,
  ViewEncapsulation,
  afterNextRender,
  booleanAttribute,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { Button, IconButton, Logo } from '../../ui';
import { SocialLinkItem, SocialLinks } from '../../patterns';
import { NAV_ITEMS, NavItem } from '../../data/nav';
import { LINKS } from '../../data/links';

/**
 * MobileMenu — organismo. Barra con logo + botón naranja; abierto, panel a
 * pantalla completa (role="dialog"). Visible por debajo de 1024 px.
 * Foco atrapado (cdkTrapFocus), scroll del body bloqueado, cierre con Esc,
 * con el botón o al elegir una sección; el foco vuelve al botón de menú.
 */
@Component({
  selector: 'g-mobile-menu',
  imports: [CdkTrapFocus, Logo, IconButton, Button, SocialLinks],
  encapsulation: ViewEncapsulation.None,
  styleUrl: './mobile-menu.scss',
  host: {
    class: 'g-mobile-menu g-on-dark',
    '(document:keydown.escape)': 'close()',
  },
  template: `
    <div class="g-mobile-menu__bar">
      <g-logo size="sm" [href]="homeHref()" alt="Genuina Multimedia, inicio" priority />
      <button
        #toggle
        g-icon-button
        icon="menu"
        variant="attention"
        label="Abrir menú"
        [attr.aria-expanded]="open()"
        aria-controls="g-mobile-menu-panel"
        (click)="openMenu()"
      ></button>
    </div>

    @if (open()) {
      <div
        class="g-mobile-menu__panel"
        id="g-mobile-menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Menú principal"
        cdkTrapFocus
      >
        <span class="g-mobile-menu__orb g-mobile-menu__orb--a" aria-hidden="true"></span>
        <span class="g-mobile-menu__orb g-mobile-menu__orb--b" aria-hidden="true"></span>
        <span class="g-mobile-menu__orb g-mobile-menu__orb--c" aria-hidden="true"></span>

        <div class="g-mobile-menu__top">
          <g-logo size="sm" [href]="homeHref()" alt="Genuina Multimedia, inicio" />
          <button
            g-icon-button
            icon="close"
            variant="inverse-raised"
            label="Cerrar menú"
            (click)="close()"
          ></button>
        </div>

        <nav aria-label="Secciones">
          <ul class="g-mobile-menu__list">
            @for (l of items(); track l.href; let i = $index) {
              <li>
                <a
                  #link
                  class="g-mobile-menu__link"
                  [href]="l.href"
                  [attr.aria-current]="l.current ? 'page' : null"
                  (click)="close()"
                >
                  <span class="g-mobile-menu__num">0{{ i + 1 }}</span>
                  {{ l.label }}
                  @if (l.current) {
                    <span class="g-mobile-menu__dot" aria-hidden="true"></span>
                  }
                </a>
              </li>
            }
          </ul>
        </nav>

        <div class="g-mobile-menu__ctas">
          <a g-button variant="attention" icon="download" [href]="links.cv" newTab>Ver mi CV</a>
          <a g-button variant="ghost-inverse" [href]="links.mailto">Escríbeme</a>
        </div>

        <div class="g-mobile-menu__foot">
          <p class="g-mobile-menu__status">
            <span class="g-mobile-menu__live" aria-hidden="true"></span>Disponible para nuevos
            proyectos
          </p>
          <g-social-links [items]="social" />
        </div>
      </div>
    }
  `,
})
export class MobileMenu implements OnDestroy {
  readonly items = input<NavItem[]>(NAV_ITEMS);
  readonly homeHref = input('#inicio');
  /** Solo para vistas de revisión: abre el panel al cargar. */
  readonly startOpen = input(false, { transform: booleanAttribute });

  protected readonly open = signal(false);
  protected readonly links = LINKS;
  protected readonly social: SocialLinkItem[] = [
    { icon: 'linkedin', label: 'LinkedIn de Stefania Holguin', href: LINKS.linkedin, newTab: true },
    { icon: 'github', label: 'GitHub de Stefania Holguin', href: LINKS.github, newTab: true },
    { icon: 'mail', label: 'Enviar correo', href: LINKS.mailto },
  ];

  private readonly document = inject(DOCUMENT);
  private readonly injector = inject(Injector);
  private readonly toggle = viewChild.required('toggle', { read: ElementRef<HTMLButtonElement> });
  private readonly firstLink = viewChild<ElementRef<HTMLAnchorElement>>('link');

  constructor() {
    afterNextRender(() => {
      if (this.startOpen()) this.openMenu();
    });
  }

  openMenu(): void {
    if (this.open()) return;
    this.open.set(true);
    this.document.body.style.overflow = 'hidden';
    // Foco al primer enlace cuando el panel ya está en el DOM.
    afterNextRender(() => this.firstLink()?.nativeElement.focus(), { injector: this.injector });
  }

  close(): void {
    if (!this.open()) return;
    this.open.set(false);
    this.document.body.style.overflow = '';
    afterNextRender(() => this.toggle().nativeElement.focus(), { injector: this.injector });
  }

  ngOnDestroy(): void {
    if (this.open()) this.document.body.style.overflow = '';
  }
}
