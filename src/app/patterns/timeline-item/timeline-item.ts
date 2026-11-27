import { Component, ViewEncapsulation, computed, input } from '@angular/core';

/** Rotación del punto (TimelineItem/README.md). */
const DOT_COLORS = [
  'var(--action)',
  'var(--highlight)',
  'var(--attention)',
  'var(--success)',
  'var(--ink)',
];

/** TimelineItem — molécula. Va dentro de un <ol class="g-timeline">. */
@Component({
  selector: 'li[g-timeline-item]',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './timeline-item.scss',
  host: { class: 'g-timeline-item' },
  template: `
    <div class="g-timeline-item__meta">
      <span class="g-timeline-item__org">{{ org() }}</span>
      <span class="g-timeline-item__date">{{ date() }}</span>
    </div>
    <div class="g-timeline-item__rail" aria-hidden="true">
      <span class="g-timeline-item__dot" [style.background]="dotColor()"></span>
    </div>
    <div class="g-timeline-item__body">
      <span class="g-timeline-item__role">{{ role() }}</span>
      <span class="g-timeline-item__desc">{{ desc() }}</span>
    </div>
  `,
})
export class TimelineItem {
  readonly org = input.required<string>();
  readonly date = input.required<string>();
  readonly role = input.required<string>();
  readonly desc = input.required<string>();
  readonly index = input(0);

  protected readonly dotColor = computed(() => DOT_COLORS[this.index() % DOT_COLORS.length]);
}
