import { Component, ViewEncapsulation, input } from '@angular/core';

/** StatItem — molécula. Cifra verificable + descripción. */
@Component({
  selector: 'g-stat-item, li[g-stat-item]',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './stat-item.scss',
  host: { class: 'g-stat' },
  template: `
    <span class="g-stat__value">{{ value() }}</span>
    <span class="g-stat__label">{{ label() }}</span>
  `,
})
export class StatItem {
  readonly value = input.required<string>();
  readonly label = input.required<string>();
}
