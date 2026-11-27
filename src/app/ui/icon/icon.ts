import { Component, ViewEncapsulation, booleanAttribute, computed, input } from '@angular/core';
import { ICONS, IconName } from './icons';

/**
 * Icon — átomo. Ícono de trazo 24 × 24 en currentColor.
 * Sin `label` es decorativo (aria-hidden); con `label` es role="img".
 */
@Component({
  selector: 'g-icon',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './icon.scss',
  host: {
    class: 'g-icon',
    '[class.g-icon--sm]': 'size() === "sm"',
    '[class.g-icon--trail]': 'trail()',
  },
  template: `
    <svg
      [attr.viewBox]="viewBox()"
      fill="none"
      stroke="currentColor"
      [attr.stroke-width]="strokeWidth()"
      stroke-linecap="round"
      stroke-linejoin="round"
      focusable="false"
      [attr.aria-hidden]="label() ? null : 'true'"
      [attr.role]="label() ? 'img' : null"
      [attr.aria-label]="label() || null"
    >
      @for (d of paths(); track $index) {
        <svg:path [attr.d]="d" />
      }
    </svg>
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input<'sm' | 'md'>('md');
  readonly label = input<string>();
  readonly trail = input(false, { transform: booleanAttribute });

  protected readonly paths = computed(() => ICONS[this.name()] ?? []);
  protected readonly viewBox = computed(() =>
    this.name() === 'spark' ? '0 0 26 26' : '0 0 24 24',
  );
  /** Trazo 2 px; 3 px solo en `check` (Icon/README.md). */
  protected readonly strokeWidth = computed(() => (this.name() === 'check' ? 3 : 2));
}
