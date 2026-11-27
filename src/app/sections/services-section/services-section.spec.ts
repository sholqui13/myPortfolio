import { TestBed } from '@angular/core/testing';
import { ServicesSection } from './services-section';

describe('ServicesSection', () => {
  it('tres tarjetas en una lista, una destacada, sección etiquetada por su h2', () => {
    const fixture = TestBed.createComponent(ServicesSection);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const section = el.querySelector('section')!;
    expect(el.querySelector(`#${section.getAttribute('aria-labelledby')}`)?.tagName).toBe('H2');
    expect(el.querySelectorAll('ul > li.g-service-card').length).toBe(3);
    expect(el.querySelectorAll('.g-service-card--featured').length).toBe(1);
  });
});
