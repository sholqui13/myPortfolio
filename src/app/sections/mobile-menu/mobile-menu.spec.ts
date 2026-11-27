import { TestBed } from '@angular/core/testing';
import { MobileMenu } from './mobile-menu';

async function setup() {
  const fixture = TestBed.createComponent(MobileMenu);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  const el = fixture.nativeElement as HTMLElement;
  const toggle = el.querySelector<HTMLButtonElement>('.g-mobile-menu__bar button')!;
  return { fixture, el, toggle };
}

describe('MobileMenu', () => {
  afterEach(() => (document.body.style.overflow = ''));

  it('cerrado: botón con aria-expanded=false y sin panel', async () => {
    const { el, toggle } = await setup();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(toggle.getAttribute('aria-controls')).toBe('g-mobile-menu-panel');
    expect(el.querySelector('[role="dialog"]')).toBeNull();
  });

  it('abre un diálogo modal, bloquea el scroll y enfoca el primer enlace', async () => {
    const { fixture, el, toggle } = await setup();
    toggle.click();
    fixture.detectChanges();
    await fixture.whenStable();
    const dialog = el.querySelector('[role="dialog"]')!;
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(document.body.style.overflow).toBe('hidden');
    expect(document.activeElement?.textContent).toContain('Inicio');
    expect(dialog.querySelectorAll('.g-mobile-menu__link').length).toBe(5);
    const cv = Array.from(dialog.querySelectorAll<HTMLAnchorElement>('a')).find((a) =>
      a.textContent?.includes('Ver mi CV'),
    )!;
    expect(cv.target).toBe('_blank');
    expect(cv.textContent).toContain('abre en una pestaña nueva');
  });

  it('Esc cierra, libera el scroll y devuelve el foco al botón', async () => {
    const { fixture, el, toggle } = await setup();
    toggle.click();
    fixture.detectChanges();
    await fixture.whenStable();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(el.querySelector('[role="dialog"]')).toBeNull();
    expect(document.body.style.overflow).toBe('');
    expect(document.activeElement).toBe(toggle);
  });
});
