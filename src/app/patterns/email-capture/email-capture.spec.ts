import { TestBed } from '@angular/core/testing';
import { EmailCapture } from './email-capture';
import { ContactService } from './contact.service';

function setup(send: (email: string) => Promise<void>) {
  const spy = vi.fn(send);
  TestBed.configureTestingModule({
    providers: [{ provide: ContactService, useValue: { send: spy } }],
  });
  const fixture = TestBed.createComponent(EmailCapture);
  const submitted: string[] = [];
  fixture.componentInstance.submitted.subscribe((e) => submitted.push(e));
  fixture.detectChanges();
  const el = fixture.nativeElement as HTMLElement;
  const input = el.querySelector<HTMLInputElement>('#g-email')!;
  const form = el.querySelector('form')!;
  const type = (v: string) => {
    input.value = v;
    input.dispatchEvent(new Event('input'));
  };
  const submit = async () => {
    form.dispatchEvent(new Event('submit'));
    await fixture.whenStable();
    fixture.detectChanges();
  };
  return { fixture, el, input, type, submit, spy, submitted };
}

describe('EmailCapture', () => {
  it('etiqueta visible asociada y campo de correo', () => {
    const { el, input } = setup(async () => {});
    expect(el.querySelector('label')?.getAttribute('for')).toBe('g-email');
    expect(input.type).toBe('email');
    expect(input.getAttribute('autocomplete')).toBe('email');
  });

  it('valida requerido y formato, con el error en aria-describedby', async () => {
    const { el, input, type, submit, spy } = setup(async () => {});
    await submit();
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toBe('g-email-error');
    expect(el.querySelector('#g-email-error')?.textContent).toContain('Escribe tu correo');

    type('no-es-correo');
    await submit();
    expect(el.querySelector('#g-email-error')?.textContent).toContain('formato');
    expect(spy).not.toHaveBeenCalled();
  });

  it('envía, anuncia el éxito en role="status" y emite submitted', async () => {
    const { el, type, submit, spy, submitted } = setup(async () => {});
    type('hola@ejemplo.com');
    await submit();
    expect(spy).toHaveBeenCalledWith('hola@ejemplo.com');
    expect(el.querySelector('[role="status"]')?.textContent).toContain('¡Gracias!');
    expect(submitted).toEqual(['hola@ejemplo.com']);
  });

  it('si falla, muestra el error y ofrece reintentar', async () => {
    const { el, type, submit } = setup(() => Promise.reject(new Error('500')));
    type('hola@ejemplo.com');
    await submit();
    expect(el.querySelector('[role="status"]')?.textContent).toContain('No se pudo enviar');
    expect(el.querySelector('button')?.textContent?.trim()).toBe('Reintentar');
  });

  it('el honeypot lleno no envía nada', async () => {
    const { fixture, type, submit, spy } = setup(async () => {});
    type('hola@ejemplo.com');
    const trap = (fixture.nativeElement as HTMLElement).querySelector<HTMLInputElement>(
      '[name="_gotcha"]',
    )!;
    trap.value = 'bot';
    trap.dispatchEvent(new Event('input'));
    await submit();
    expect(spy).not.toHaveBeenCalled();
  });
});
