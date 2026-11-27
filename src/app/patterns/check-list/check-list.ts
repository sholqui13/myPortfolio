import { Component, ViewEncapsulation, input } from '@angular/core';
import { Icon } from '../../ui';

/** CheckList — molécula. 2 a 4 condiciones cortas con check turquesa decorativo. */
@Component({
  selector: 'g-check-list',
  imports: [Icon],
  encapsulation: ViewEncapsulation.None,
  styleUrl: './check-list.scss',
  template: `
    <ul class="g-check-list">
      @for (item of items(); track item) {
        <li><g-icon name="check" size="sm" />{{ item }}</li>
      }
    </ul>
  `,
})
export class CheckList {
  readonly items = input.required<string[]>();
}
