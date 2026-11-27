import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TimelineItem } from './timeline-item';

@Component({
  imports: [TimelineItem],
  template: `
    <ol>
      @for (i of [0, 1, 5]; track i) {
        <li
          g-timeline-item
          org="UNAD"
          date="2021 – 2026"
          role="Ingeniería"
          desc="Grado de Honor"
          [index]="i"
        ></li>
      }
    </ol>
  `,
})
class Host {}

describe('TimelineItem', () => {
  it('pinta meta, cuerpo y un riel decorativo con el color rotado', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const items = (fixture.nativeElement as HTMLElement).querySelectorAll('li');
    expect(items[0].querySelector('.g-timeline-item__org')?.textContent).toBe('UNAD');
    expect(items[0].querySelector('.g-timeline-item__role')?.textContent).toBe('Ingeniería');
    expect(items[0].querySelector('.g-timeline-item__rail')?.getAttribute('aria-hidden')).toBe(
      'true',
    );

    const dot = (li: Element) =>
      (li.querySelector('.g-timeline-item__dot') as HTMLElement).style.background;
    expect(dot(items[0])).toBe('var(--action)');
    expect(dot(items[1])).toBe('var(--highlight)');
    expect(dot(items[2])).toBe('var(--action)'); // 5 % 5
  });
});
