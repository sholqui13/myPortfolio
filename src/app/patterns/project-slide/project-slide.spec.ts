import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProjectSlide } from './project-slide';
import { PROJECTS } from '../../data/projects';

function render(index: number, position?: string) {
  TestBed.configureTestingModule({ providers: [provideRouter([])] });
  const fixture = TestBed.createComponent(ProjectSlide);
  fixture.componentRef.setInput('project', PROJECTS[index]);
  if (position) fixture.componentRef.setInput('position', position);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('ProjectSlide', () => {
  it('con capturas: imágenes con alt y tamaño declarado', () => {
    const el = render(0, 'Proyecto 1 de 3');
    const desk = el.querySelector<HTMLImageElement>('.g-project-slide__desk')!;
    expect(desk.alt).toContain('Novasec');
    expect(desk.getAttribute('width')).toBe('1440');
    expect(desk.getAttribute('height')).toBe('900');
    expect(desk.getAttribute('loading')).toBe('lazy');
    expect(el.querySelector('.g-project-slide__mob')).not.toBeNull();
    expect(el.querySelector('.g-project-slide__meta')?.textContent).toBe(
      'Proyecto 1 de 3 · Proyecto para Inovisec',
    );
  });

  it('solo muestra los botones de los enlaces que existen; uno solo es primary', () => {
    const el = render(0);
    const buttons = Array.from(
      el.querySelectorAll<HTMLAnchorElement>('.g-project-slide__actions a'),
    );
    expect(buttons.map((b) => b.textContent?.trim().split(/\s+/).slice(0, 2).join(' '))).toEqual([
      'Ver caso',
      'Ver demo',
      'Ver código',
    ]);
    expect(buttons.filter((b) => b.className.includes('g-button--primary')).length).toBe(1);
    expect(buttons[0].getAttribute('href')).toBe('/proyectos/novasec');
    expect(buttons[0].querySelector('.g-sr')?.textContent).toBe(': Novasec');
    expect(buttons[1].target).toBe('_blank');
  });

  it('título con aria-live y etiquetas en una lista', () => {
    const el = render(1);
    expect(el.querySelector('h3')?.getAttribute('aria-live')).toBe('polite');
    expect(el.querySelectorAll('.g-project-slide__tags li').length).toBe(4);
    expect(el.querySelector('a[href*="figma.com"]')).not.toBeNull();
  });

  it('sin capturas usa el esqueleto decorativo', () => {
    const el = render(2);
    expect(el.querySelector('img')).toBeNull();
    expect(el.querySelector('.g-project-slide__placeholder')?.getAttribute('aria-hidden')).toBe(
      'true',
    );
  });
});
