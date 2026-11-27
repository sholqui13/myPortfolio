import { TestBed } from '@angular/core/testing';
import { Logo } from './logo';

function render(inputs: Record<string, unknown> = {}) {
  const fixture = TestBed.createComponent(Logo);
  for (const [k, v] of Object.entries(inputs)) fixture.componentRef.setInput(k, v);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('Logo', () => {
  it('por defecto es la versión dark, tamaño md, sin enlace', () => {
    const el = render();
    const img = el.querySelector('img')!;
    expect(el.querySelector('span.g-logo')).not.toBeNull();
    expect(img.getAttribute('src')).toContain('genuina-logo-horizontal-dark.svg');
    expect(img.alt).toBe('Genuina Multimedia');
  });

  it('versión light, tamaño y enlace con alt de destino', () => {
    const el = render({ on: 'light', size: 'lg', href: '/', alt: 'Genuina Multimedia, inicio' });
    const a = el.querySelector('a')!;
    expect(a.className).toBe('g-logo g-logo--lg');
    expect(a.getAttribute('href')).toBe('/');
    expect(a.querySelector('img')?.getAttribute('src')).toContain('light');
    expect(a.querySelector('img')?.alt).toBe('Genuina Multimedia, inicio');
  });
});
