import { TestBed } from '@angular/core/testing';
import { Marquee } from './marquee';

describe('Marquee', () => {
  it('decorativa (aria-hidden) y con las palabras duplicadas para el bucle', () => {
    const fixture = TestBed.createComponent(Marquee);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.getAttribute('aria-hidden')).toBe('true');
    const words = Array.from(el.querySelectorAll('.g-marquee__band--a .g-marquee__track > span'))
      .filter((s) => !s.classList.contains('g-marquee__sep'))
      .map((s) => s.textContent);
    expect(words.length).toBe(14);
    expect(words.slice(0, 7)).toEqual(words.slice(7));
  });
});
