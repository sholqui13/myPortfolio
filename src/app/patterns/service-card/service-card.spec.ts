import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ServiceCard } from './service-card';

@Component({
  imports: [ServiceCard],
  template: `
    <ul>
      <li g-service-card id="a" title="Diseño UX/UI" text="Prototipos" href="#p" featured>
        <img media src="x.webp" alt="" />
      </li>
      <li
        g-service-card
        id="b"
        title="Front-End"
        text="Angular"
        actionLabel="Ver Front-End"
        href="#p"
      ></li>
      <li g-service-card id="c" title="Sin enlace" text="…"></li>
    </ul>
  `,
})
class Host {}

describe('ServiceCard', () => {
  let el: HTMLElement;
  beforeEach(() => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('featured: fondo action, botón highlight y nombre accesible por defecto', () => {
    const card = el.querySelector('#a')!;
    expect(card.classList).toContain('g-service-card--featured');
    expect(card.querySelector('h3')?.textContent).toBe('Diseño UX/UI');
    const action = card.querySelector('a')!;
    expect(action.className).toContain('g-icon-button--highlight');
    expect(action.getAttribute('aria-label')).toBe('Ver proyectos de Diseño UX/UI');
  });

  it('proyecta la ilustración en un contenedor decorativo', () => {
    const media = el.querySelector('#a .g-service-card__media')!;
    expect(media.getAttribute('aria-hidden')).toBe('true');
    expect(media.querySelector('img')).not.toBeNull();
  });

  it('usa actionLabel y la variante inverse en tarjetas normales', () => {
    const action = el.querySelector('#b a')!;
    expect(action.className).toContain('g-icon-button--inverse');
    expect(action.getAttribute('aria-label')).toBe('Ver Front-End');
  });

  it('sin href no dibuja el botón', () => {
    expect(el.querySelector('#c a')).toBeNull();
  });
});
