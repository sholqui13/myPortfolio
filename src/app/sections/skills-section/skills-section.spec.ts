import { TestBed } from '@angular/core/testing';
import { SkillsSection } from './skills-section';

describe('SkillsSection', () => {
  function setup() {
    const fixture = TestBed.createComponent(SkillsSection);
    fixture.detectChanges();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  }

  it('muestra las 15 tecnologías y “Todo” activo', () => {
    const { el } = setup();
    expect(el.querySelector('section')?.id).toBe('stack');
    expect(el.querySelectorAll('.g-skills__grid > li').length).toBe(15);
    const chips = el.querySelectorAll<HTMLButtonElement>('.g-skills__chip');
    expect(chips.length).toBe(4);
    expect(chips[0].getAttribute('aria-pressed')).toBe('true');
    expect(el.querySelector('[role="status"]')?.textContent?.trim()).toBe('');
  });

  it('filtra por categoría y lo anuncia', () => {
    const { fixture, el } = setup();
    const design = el.querySelectorAll<HTMLButtonElement>('.g-skills__chip')[2];
    design.click();
    fixture.detectChanges();
    expect(design.getAttribute('aria-pressed')).toBe('true');
    expect(el.querySelectorAll('.g-skills__grid > li').length).toBe(2);
    expect(el.querySelector('[role="status"]')?.textContent?.trim()).toBe(
      'Mostrando 2 tecnologías de Diseño',
    );
  });

  it('la banda de logos es decorativa', () => {
    const { el } = setup();
    const band = el.querySelector('.g-skills__band');
    expect(band?.getAttribute('aria-hidden')).toBe('true');
    expect(band?.querySelectorAll('img').length).toBe(30);
  });
});
