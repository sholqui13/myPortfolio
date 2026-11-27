import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { IconButton } from './icon-button';

@Component({
  imports: [IconButton],
  template: `
    <button g-icon-button id="b" icon="arrow-right" label="Proyecto siguiente"></button>
    <a
      g-icon-button
      id="a"
      icon="github"
      label="GitHub"
      href="https://github.com"
      variant="attention"
      size="lg"
      newTab
    ></a>
  `,
})
class Host {}

describe('IconButton', () => {
  let el: HTMLElement;
  beforeEach(() => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('usa label como aria-label y el ícono es decorativo', () => {
    const b = el.querySelector<HTMLButtonElement>('#b')!;
    expect(b.getAttribute('aria-label')).toBe('Proyecto siguiente');
    expect(b.className).toContain('g-icon-button--inverse');
    expect(b.type).toBe('button');
    expect(b.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('enlace externo: variante, tamaño y aviso en el nombre accesible', () => {
    const a = el.querySelector<HTMLAnchorElement>('#a')!;
    expect(a.className).toContain('g-icon-button--attention');
    expect(a.className).toContain('g-icon-button--lg');
    expect(a.target).toBe('_blank');
    expect(a.rel).toBe('noopener');
    expect(a.getAttribute('aria-label')).toBe('GitHub (abre en una pestaña nueva)');
  });
});
