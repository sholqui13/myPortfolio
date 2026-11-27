import { Component, ViewEncapsulation, booleanAttribute, computed, input } from '@angular/core';
import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';

const LOGO_SRC = {
  dark: 'assets/logos/genuina-logo-horizontal-dark.svg',
  light: 'assets/logos/genuina-logo-horizontal-light.svg',
} as const;

/**
 * Logo — átomo. Versión según el fondo: `dark` (texto blanco) sobre surface-inverse,
 * `light` (texto navy) sobre surface. No recolorear ni deformar.
 */
@Component({
  selector: 'g-logo',
  imports: [NgOptimizedImage, NgTemplateOutlet],
  encapsulation: ViewEncapsulation.None,
  styleUrl: './logo.scss',
  template: `
    <ng-template #img>
      <!-- 490 × 129: tamaño intrínseco del SVG; el alto real lo da .g-logo__img -->
      <img
        class="g-logo__img"
        [ngSrc]="src()"
        width="490"
        height="129"
        [alt]="alt()"
        [priority]="priority()"
      />
    </ng-template>
    @if (href(); as link) {
      <a [class]="classes()" [href]="link"><ng-container [ngTemplateOutlet]="img" /></a>
    } @else {
      <span [class]="classes()"><ng-container [ngTemplateOutlet]="img" /></span>
    }
  `,
})
export class Logo {
  readonly on = input<'dark' | 'light'>('dark');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly href = input<string>();
  readonly alt = input('Genuina Multimedia');
  /** Para el logo del menú (arriba del pliegue). */
  readonly priority = input(false, { transform: booleanAttribute });

  protected readonly src = computed(() => LOGO_SRC[this.on()]);
  protected readonly classes = computed(() =>
    this.size() === 'md' ? 'g-logo' : `g-logo g-logo--${this.size()}`,
  );
}
