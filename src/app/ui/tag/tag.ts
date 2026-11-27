import { Component, ViewEncapsulation, booleanAttribute, input } from '@angular/core';

/**
 * Tag — átomo. Etiqueta de tecnología; información, no control.
 * Va en una lista: <ul class="…"><li g-tag>Angular</li></ul>
 */
@Component({
  selector: 'li[g-tag], span[g-tag]',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './tag.scss',
  host: {
    class: 'g-tag',
    '[class.g-tag--inverse]': 'inverse()',
  },
  template: `<ng-content />`,
})
export class Tag {
  readonly inverse = input(false, { transform: booleanAttribute });
}
