import { Component, ViewEncapsulation } from '@angular/core';

/**
 * Bubble — átomo. Globo de saludo con destello rosa (decorativo).
 * Una sola vez por página: <g-bubble>¡Hola!</g-bubble>
 */
@Component({
  selector: 'g-bubble',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './bubble.scss',
  host: { class: 'g-bubble' },
  template: `
    <ng-content>¡Hola!</ng-content>
    <svg
      class="g-bubble__spark"
      viewBox="0 0 26 26"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6 14V5" />
      <path d="M11.5 16.5 18 10" />
      <path d="M14 22h9" />
    </svg>
  `,
})
export class Bubble {}
