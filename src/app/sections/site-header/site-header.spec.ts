import { TestBed } from '@angular/core/testing';
import { SiteHeader } from './site-header';

describe('SiteHeader', () => {
  it('nav etiquetada, enlace actual con aria-current y logo hacia el inicio', () => {
    const fixture = TestBed.createComponent(SiteHeader);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('nav')?.getAttribute('aria-label')).toBe('Principal');
    const current = el.querySelectorAll('[aria-current="page"]');
    expect(current.length).toBe(1);
    expect(current[0].textContent?.trim()).toBe('Inicio');
    expect(el.querySelector('a[href="#contacto"]')).not.toBeNull();
  });
});
