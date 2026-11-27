import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { StatItem } from './stat-item';

@Component({
  imports: [StatItem],
  template: `<ul>
    <li g-stat-item value="B1" label="inglés (EF SET)"></li>
  </ul>`,
})
class Host {}

describe('StatItem', () => {
  it('muestra cifra y descripción en un <li> real', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const li = (fixture.nativeElement as HTMLElement).querySelector('li')!;
    expect(li.classList).toContain('g-stat');
    expect(li.querySelector('.g-stat__value')?.textContent).toBe('B1');
    expect(li.querySelector('.g-stat__label')?.textContent).toBe('inglés (EF SET)');
  });
});
