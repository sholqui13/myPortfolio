import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Bubble } from './bubble';

@Component({
  imports: [Bubble],
  template: `<g-bubble id="a">Hola</g-bubble><g-bubble id="b" />`,
})
class Host {}

describe('Bubble', () => {
  it('proyecta el contenido, usa “¡Hola!” por defecto y oculta el destello', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('#a')?.textContent?.trim()).toBe('Hola');
    expect(el.querySelector('#b')?.textContent?.trim()).toBe('¡Hola!');
    expect(el.querySelector('.g-bubble__spark')?.getAttribute('aria-hidden')).toBe('true');
  });
});
