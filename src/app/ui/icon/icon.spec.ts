import { TestBed } from '@angular/core/testing';
import { Icon } from './icon';

function render(inputs: Record<string, unknown>) {
  const fixture = TestBed.createComponent(Icon);
  for (const [k, v] of Object.entries(inputs)) fixture.componentRef.setInput(k, v);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('Icon', () => {
  it('dibuja los paths del ícono con la clase g-icon', () => {
    const el = render({ name: 'arrow-right' });
    expect(el.classList).toContain('g-icon');
    expect(el.querySelectorAll('path').length).toBe(2);
    expect(el.querySelector('svg')?.getAttribute('viewBox')).toBe('0 0 24 24');
  });

  it('es decorativo sin label', () => {
    const svg = render({ name: 'mail' }).querySelector('svg')!;
    expect(svg.getAttribute('aria-hidden')).toBe('true');
    expect(svg.getAttribute('role')).toBeNull();
  });

  it('con label es role="img" con nombre accesible', () => {
    const svg = render({ name: 'mail', label: 'Correo' }).querySelector('svg')!;
    expect(svg.getAttribute('role')).toBe('img');
    expect(svg.getAttribute('aria-label')).toBe('Correo');
    expect(svg.getAttribute('aria-hidden')).toBeNull();
  });

  it('aplica el tamaño sm y el trazo 3 en check', () => {
    const el = render({ name: 'check', size: 'sm' });
    expect(el.classList).toContain('g-icon--sm');
    expect(el.querySelector('svg')?.getAttribute('stroke-width')).toBe('3');
  });

  it('usa el viewBox 26 × 26 en spark', () => {
    expect(render({ name: 'spark' }).querySelector('svg')?.getAttribute('viewBox')).toBe(
      '0 0 26 26',
    );
  });
});
