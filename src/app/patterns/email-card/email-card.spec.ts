import { TestBed } from '@angular/core/testing';
import { EmailCard } from './email-card';

const EMAIL = 'hola@ejemplo.com';

function setup(writeText: (text: string) => Promise<void>) {
  const spy = vi.fn(writeText);
  vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText: spy } });
  const fixture = TestBed.createComponent(EmailCard);
  fixture.componentRef.setInput('email', EMAIL);
  fixture.detectChanges();
  const el = fixture.nativeElement as HTMLElement;
  const button = el.querySelector('button')!;
  const click = async () => {
    button.click();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  return { el, button, click, spy };
}

describe('EmailCard', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('muestra la etiqueta y un enlace mailto con el correo', () => {
    const { el } = setup(async () => {});
    const link = el.querySelector('a')!;
    expect(link.getAttribute('href')).toBe(`mailto:${EMAIL}`);
    expect(link.textContent?.trim()).toBe(EMAIL);
    expect(el.textContent).toContain('Correo directo');
  });

  it('el botón Copiar tiene un nombre accesible que incluye su texto visible', () => {
    const { button } = setup(async () => {});
    expect(button.textContent?.trim()).toBe('Copiar');
    expect(button.getAttribute('aria-label')).toBe(`Copiar el correo ${EMAIL}`);
  });

  it('copia el correo, cambia a "Copiado" y lo anuncia', async () => {
    const { el, button, click, spy } = setup(async () => {});
    await click();
    expect(spy).toHaveBeenCalledWith(EMAIL);
    expect(button.textContent?.trim()).toBe('Copiado');
    expect(el.querySelector('[aria-live="polite"]')?.textContent).toContain('copiado');
  });

  it('si el portapapeles falla, avisa y selecciona el correo', async () => {
    const { el, click } = setup(() => Promise.reject(new Error('denegado')));
    await click();
    expect(el.querySelector('[aria-live="polite"]')?.textContent).toContain('No se pudo copiar');
    expect(document.getSelection()?.toString()).toBe(EMAIL);
  });
});
