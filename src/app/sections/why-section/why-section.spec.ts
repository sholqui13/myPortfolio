import { TestBed } from '@angular/core/testing';
import { WhySection } from './why-section';

describe('WhySection', () => {
  it('h2, cifras en lista, retrato decorativo y CTA a contacto', () => {
    const fixture = TestBed.createComponent(WhySection);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h2')?.id).toBe('g-why-title');
    expect(el.querySelectorAll('.g-why__stats > li').length).toBeGreaterThan(0);
    expect(el.querySelector('.g-why__portrait')?.getAttribute('aria-hidden')).toBe('true');
    expect(el.querySelector('.g-why__cta')?.getAttribute('href')).toBe('#contacto');
  });
});
