import { Component, ViewEncapsulation, input } from '@angular/core';
import { TimelineItem } from '../../patterns';
import { TIMELINE, TimelineEntry } from '../../data/timeline';

/** Timeline — organismo. “Mi experiencia y formación”: lista ordenada de TimelineItem. */
@Component({
  selector: 'g-timeline',
  imports: [TimelineItem],
  encapsulation: ViewEncapsulation.None,
  styleUrl: './timeline.scss',
  template: `
    <section
      class="g-container g-section g-timeline-section"
      id="experiencia"
      aria-labelledby="g-exp-title"
    >
      <h2 class="g-section__title g-section__title--center" id="g-exp-title">
        {{ title() }} <em>{{ highlight() }}</em>
      </h2>
      <ol class="g-timeline">
        @for (t of items(); track $index) {
          <li
            g-timeline-item
            [org]="t.org"
            [date]="t.date"
            [role]="t.role"
            [desc]="t.desc"
            [index]="$index"
          ></li>
        }
      </ol>
    </section>
  `,
})
export class Timeline {
  readonly items = input<TimelineEntry[]>(TIMELINE);
  readonly title = input('Mi experiencia y');
  readonly highlight = input('formación');
}
