import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProjectCarousel } from './project-carousel';

function setup() {
  TestBed.configureTestingModule({ providers: [provideRouter([])] });
  const fixture = TestBed.createComponent(ProjectCarousel);
  fixture.detectChanges();
  const el = fixture.nativeElement as HTMLElement;
  const btn = (label: string) =>
    el.querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`)!;
  const step = (label: string) => {
    btn(label).click();
    fixture.detectChanges();
  };
  const title = () => el.querySelector('h3')?.textContent?.trim();
  const active = () =>
    Array.from(el.querySelectorAll('.g-carousel__dot')).findIndex((d) =>
      d.classList.contains('g-carousel__dot--active'),
    );
  return { el, step, title, active };
}

describe('ProjectCarousel', () => {
  it('etiqueta la diapositiva con su posición', () => {
    const { el } = setup();
    const viewport = el.querySelector('.g-carousel__viewport')!;
    expect(viewport.getAttribute('aria-label')).toBe('Proyecto 1 de 3');
    expect(el.querySelector('section')?.getAttribute('aria-roledescription')).toBe('carrusel');
  });

  it('siguiente avanza y da la vuelta al final', () => {
    const { step, title, active } = setup();
    expect(title()).toContain('Novasec');
    step('Proyecto siguiente');
    expect(active()).toBe(1);
    step('Proyecto siguiente');
    step('Proyecto siguiente');
    expect(active()).toBe(0);
    expect(title()).toContain('Novasec');
  });

  it('anterior desde el primero va al último', () => {
    const { step, active } = setup();
    step('Proyecto anterior');
    expect(active()).toBe(2);
  });
});
