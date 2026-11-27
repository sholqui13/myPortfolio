import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Tag } from './tag';

@Component({
  imports: [Tag],
  template: `<ul>
    <li g-tag>Angular</li>
    <li g-tag inverse>WCAG</li>
  </ul>`,
})
class Host {}

describe('Tag', () => {
  it('es un <li> real con sus variantes', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const [a, b] = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('li'));
    expect(a.className).toBe('g-tag');
    expect(a.textContent).toBe('Angular');
    expect(b.classList).toContain('g-tag--inverse');
  });
});
