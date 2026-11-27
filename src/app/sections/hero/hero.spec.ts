import { TestBed } from '@angular/core/testing';
import { Hero } from './hero';

describe('Hero', () => {
  it('un único h1, retrato con alt y tamaño, decoración oculta', () => {
    const fixture = TestBed.createComponent(Hero);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('h1').length).toBe(1);
    expect(el.querySelector('h1')?.textContent).toContain('Stefania');
    const img = el.querySelector<HTMLImageElement>('.g-hero__photo')!;
    expect(img.alt).toContain('Retrato');
    expect(img.getAttribute('width')).toBe('800');
    expect(img.getAttribute('height')).toBe('847');
    el.querySelectorAll('svg').forEach((s) => expect(s.getAttribute('aria-hidden')).toBe('true'));
  });
});
