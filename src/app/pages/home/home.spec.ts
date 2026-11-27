import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { HOME_DESCRIPTION, Home } from './home';

describe('Home', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter([])] }));

  it('una sola h1, landmarks y salto al contenido', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('h1').length).toBe(1);
    expect(el.querySelectorAll('main').length).toBe(1);
    expect(el.querySelector('main')?.id).toBe('contenido');
    expect(el.querySelector('a.g-skip')?.getAttribute('href')).toBe('#contenido');
    expect(el.querySelector('footer')).not.toBeNull();
  });

  it('enlaces externos se abren en pestaña nueva con rel seguro', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    el.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]').forEach((a) =>
      expect(a.rel).toContain('noopener'),
    );
  });

  it('publica la meta descripción', () => {
    TestBed.createComponent(Home);
    expect(TestBed.inject(Meta).getTag('name="description"')?.content).toBe(HOME_DESCRIPTION);
  });
});
