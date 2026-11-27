import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CaseShell } from './case-shell';

@Component({
  imports: [CaseShell],
  template: `
    <g-case-shell
      slug="veyra"
      [forward]="{ label: 'Siguiente: Avianca', route: '/proyectos/avianca' }"
      [next]="{ slug: 'avianca', title: 'Avianca' }"
      note="Nota"
    >
      <h1>Título</h1>
    </g-case-shell>
  `,
})
class Host {}

describe('CaseShell', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter([])] }));

  it('aplica el tema, proyecta el contenido en main y enlaza la barra', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const shell = el.querySelector('g-case-shell')!;
    expect(shell.getAttribute('data-case')).toBe('veyra');
    expect(shell.classList).toContain('g-case');
    expect(el.querySelector('main#caso h1')?.textContent).toBe('Título');
    expect(el.querySelector('a.g-skip')?.getAttribute('href')).toBe('proyectos/veyra#caso');
    const links = el.querySelectorAll<HTMLAnchorElement>('.g-case-bar a');
    expect(links.length).toBe(3);
    expect(links[0].getAttribute('href')).toBe('/#portafolio');
    expect(links[1].querySelector('img')?.alt).toContain('Genuina');
    expect(links[2].getAttribute('href')).toBe('/proyectos/avianca');
    expect(el.querySelector('.g-case-footer')?.textContent).toContain('Nota');
  });

  it('la tarjeta siguiente lleva el tema del proyecto destino', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const next = (fixture.nativeElement as HTMLElement).querySelector('a.g-case-next')!;
    expect(next.getAttribute('data-case')).toBe('avianca');
    expect(next.getAttribute('href')).toBe('/proyectos/avianca');
  });
});
