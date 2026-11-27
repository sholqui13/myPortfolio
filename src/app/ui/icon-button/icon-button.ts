import {
  Component,
  ElementRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { Icon } from '../icon/icon';
import { IconName } from '../icon/icons';

export type IconButtonVariant =
  'inverse' | 'inverse-raised' | 'highlight' | 'attention' | 'outline';

/**
 * IconButton — átomo. Botón circular solo con ícono; `label` es obligatorio (aria-label).
 *
 *   <button g-icon-button icon="arrow-right" label="Proyecto siguiente"></button>
 */
@Component({
  selector: 'a[g-icon-button], button[g-icon-button]',
  imports: [Icon],
  encapsulation: ViewEncapsulation.None,
  styleUrl: './icon-button.scss',
  host: {
    class: 'g-icon-button',
    '[class]': 'modifiers()',
    '[attr.aria-label]': 'accessibleName()',
    '[attr.type]': 'isButton ? "button" : null',
    '[attr.target]': '!isButton && newTab() ? "_blank" : null',
    '[attr.rel]': '!isButton && newTab() ? "noopener" : null',
  },
  template: `<g-icon [name]="icon()" />`,
})
export class IconButton {
  readonly icon = input.required<IconName>();
  readonly label = input.required<string>();
  readonly variant = input<IconButtonVariant>('inverse');
  readonly size = input<'md' | 'lg'>('md');
  readonly newTab = input(false, { transform: booleanAttribute });

  protected readonly isButton =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.tagName === 'BUTTON';

  protected readonly modifiers = computed(
    () => `g-icon-button--${this.variant()}${this.size() === 'lg' ? ' g-icon-button--lg' : ''}`,
  );

  protected readonly accessibleName = computed(() =>
    this.newTab() ? `${this.label()} (abre en una pestaña nueva)` : this.label(),
  );
}
