import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Button } from './button';

@Component({
  imports: [Button],
  template: `
    <button g-button id="b1">Enviar</button>
    <button g-button id="b2" type="submit" variant="secondary" size="sm" icon="github">
      Código
    </button>
    <a g-button id="a1" href="https://example.com" newTab trailingIcon="arrow-up-right">Ver demo</a>
    <a g-button id="a2" href="/x" variant="highlight">Portafolio</a>
  `,
})
class Host {}

describe('Button', () => {
  let el: HTMLElement;
  beforeEach(() => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('mantiene el elemento nativo y la variante primary por defecto', () => {
    const b = el.querySelector<HTMLButtonElement>('#b1')!;
    expect(b.tagName).toBe('BUTTON');
    expect(b.className).toContain('g-button');
    expect(b.className).toContain('g-button--primary');
    expect(b.type).toBe('button');
  });

  it('aplica variante, tamaño, tipo e ícono inicial', () => {
    const b = el.querySelector<HTMLButtonElement>('#b2')!;
    expect(b.className).toContain('g-button--secondary');
    expect(b.className).toContain('g-button--sm');
    expect(b.type).toBe('submit');
    expect(b.querySelector('.g-icon--sm')).not.toBeNull();
  });

  it('como enlace con newTab: target, rel y aviso para lectores', () => {
    const a = el.querySelector<HTMLAnchorElement>('#a1')!;
    expect(a.target).toBe('_blank');
    expect(a.rel).toBe('noopener');
    expect(a.getAttribute('type')).toBeNull();
    expect(a.querySelector('.g-sr')?.textContent).toContain('abre en una pestaña nueva');
    expect(a.querySelector('.g-icon--trail')).not.toBeNull();
  });

  it('un enlace sin newTab no abre pestaña nueva', () => {
    const a = el.querySelector<HTMLAnchorElement>('#a2')!;
    expect(a.className).toContain('g-button--highlight');
    expect(a.getAttribute('target')).toBeNull();
    expect(a.querySelector('.g-sr')).toBeNull();
  });
});
