import { TestBed } from '@angular/core/testing';
import { Timeline } from './timeline';

describe('Timeline', () => {
  it('lista ordenada con las cinco etapas', () => {
    const fixture = TestBed.createComponent(Timeline);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('section')?.id).toBe('experiencia');
    expect(el.querySelectorAll('ol > .g-timeline-item').length).toBe(5);
    expect(el.querySelector('h2 em')?.textContent).toBe('formación');
  });
});
