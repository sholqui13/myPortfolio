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

export type ButtonVariant =
  | 'primary'
  | 'highlight'
  | 'secondary'
  | 'outline-action'
  | 'light'
  | 'attention'
  | 'ghost-inverse';

/**
 * Button — átomo. Píldora para la acción principal de cada bloque.
 * Selector de atributo: el elemento real sigue siendo <a> o <button>.
 *
 *   <a g-button href="…" trailingIcon="arrow-up-right">Ver caso de estudio</a>
 *   <button g-button type="submit">Enviar</button>
 */
@Component({
  selector: 'a[g-button], button[g-button]',
  imports: [Icon],
  encapsulation: ViewEncapsulation.None,
  styleUrl: './button.scss',
  host: {
    class: 'g-button',
    '[class]': 'modifiers()',
    '[attr.type]': 'isButton ? type() : null',
    '[attr.target]': '!isButton && newTab() ? "_blank" : null',
    '[attr.rel]': '!isButton && newTab() ? "noopener" : null',
  },
  template: `
    @if (icon(); as name) {
      <g-icon [name]="name" size="sm" />
    }
    <ng-content />
    @if (newTab()) {
      <span class="g-sr"> (abre en una pestaña nueva)</span>
    }
    @if (trailingIcon(); as name) {
      <g-icon [name]="name" size="sm" trail />
    }
  `,
})
export class Button {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<'sm' | 'md'>('md');
  readonly icon = input<IconName>();
  readonly trailingIcon = input<IconName>();
  readonly newTab = input(false, { transform: booleanAttribute });
  readonly type = input<'button' | 'submit' | 'reset'>('button');

  protected readonly isButton =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.tagName === 'BUTTON';

  protected readonly modifiers = computed(
    () => `g-button--${this.variant()}${this.size() === 'sm' ? ' g-button--sm' : ''}`,
  );
}
