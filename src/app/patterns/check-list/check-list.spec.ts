import { TestBed } from '@angular/core/testing';
import { CheckList } from './check-list';

describe('CheckList', () => {
  it('pinta un ítem por condición con check decorativo', () => {
    const fixture = TestBed.createComponent(CheckList);
    fixture.componentRef.setInput('items', ['Remoto', 'Freelance']);
    fixture.detectChanges();
    const items = (fixture.nativeElement as HTMLElement).querySelectorAll('ul.g-check-list li');
    expect(items.length).toBe(2);
    expect(items[0].textContent?.trim()).toBe('Remoto');
    expect(items[0].querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
  });
});
