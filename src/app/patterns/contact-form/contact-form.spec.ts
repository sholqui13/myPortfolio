import { TestBed } from '@angular/core/testing';
import { ContactForm } from './contact-form';
import { ContactMessage, ContactService } from './contact.service';

const VALID: ContactMessage = {
  name: 'Ana',
  email: 'hola@ejemplo.com',
  message: 'Quiero rediseñar mi sitio web.',
};

function setup(send: (data: ContactMessage) => Promise<void>) {
  const spy = vi.fn(send);
  TestBed.configureTestingModule({
    providers: [{ provide: ContactService, useValue: { send: spy } }],
  });
  const fixture = TestBed.createComponent(ContactForm);
  const submitted: ContactMessage[] = [];
  fixture.componentInstance.submitted.subscribe((e) => submitted.push(e));
  fixture.detectChanges();
  const el = fixture.nativeElement as HTMLElement;
  const name = el.querySelector<HTMLInputElement>('#g-contact-nombre')!;
  const message = el.querySelector<HTMLTextAreaElement>('#g-contact-mensaje')!;
  const email = el.querySelector<HTMLInputElement>('#g-contact-correo')!;
  const form = el.querySelector('form')!;
  const type = (field: HTMLInputElement | HTMLTextAreaElement, v: string) => {
    field.value = v;
    field.dispatchEvent(new Event('input'));
  };
  const fill = (data: ContactMessage) => {
    type(name, data.name);
    type(message, data.message);
    type(email, data.email);
  };
  const submit = async () => {
    form.dispatchEvent(new Event('submit'));
    await fixture.whenStable();
    fixture.detectChanges();
  };
  return { fixture, el, name, message, email, type, fill, submit, spy, submitted };
}

describe('ContactForm', () => {
  it('nombre, mensaje y correo con etiquetas visibles asociadas', () => {
    const { el, name, message, email } = setup(async () => {});
    for (const id of ['g-contact-nombre', 'g-contact-mensaje', 'g-contact-correo']) {
      expect(el.querySelector(`label[for="${id}"]`)).not.toBeNull();
    }
    expect(name.getAttribute('autocomplete')).toBe('name');
    expect(message.tagName).toBe('TEXTAREA');
    expect(email.type).toBe('email');
    expect(email.getAttribute('autocomplete')).toBe('email');
  });

  it('valida los tres campos, enlaza cada error y enfoca el primero inválido', async () => {
    const { el, name, message, email, type, submit, spy } = setup(async () => {});
    await submit();
    expect(name.getAttribute('aria-invalid')).toBe('true');
    expect(name.getAttribute('aria-describedby')).toBe('g-contact-nombre-error');
    expect(message.getAttribute('aria-describedby')).toBe('g-contact-mensaje-error');
    expect(email.getAttribute('aria-describedby')).toBe('g-contact-correo-error');
    expect(el.querySelector('#g-contact-correo-error')?.textContent).toContain('Escribe tu correo');
    expect(document.activeElement).toBe(name);

    type(name, 'Ana');
    type(message, 'corto');
    type(email, 'no-es-correo');
    await submit();
    expect(name.getAttribute('aria-invalid')).toBeNull();
    expect(el.querySelector('#g-contact-mensaje-error')?.textContent).toContain('muy corto');
    expect(el.querySelector('#g-contact-correo-error')?.textContent).toContain('formato');
    expect(document.activeElement).toBe(email);
    expect(spy).not.toHaveBeenCalled();
  });

  it('un nombre de solo espacios no es válido', async () => {
    const { name, fill, submit, spy } = setup(async () => {});
    fill({ ...VALID, name: '   ' });
    await submit();
    expect(name.getAttribute('aria-invalid')).toBe('true');
    expect(spy).not.toHaveBeenCalled();
  });

  it('envía los tres campos, anuncia el éxito en role="status" y emite submitted', async () => {
    const { el, fill, submit, spy, submitted } = setup(async () => {});
    fill({ ...VALID, name: '  Ana  ' });
    await submit();
    expect(spy).toHaveBeenCalledWith(VALID);
    expect(el.querySelector('[role="status"]')?.textContent).toContain('¡Gracias!');
    expect(submitted).toEqual([VALID]);
  });

  it('si falla, muestra el error y ofrece reintentar', async () => {
    const { el, fill, submit } = setup(() => Promise.reject(new Error('500')));
    fill(VALID);
    await submit();
    expect(el.querySelector('[role="status"]')?.textContent).toContain('No se pudo enviar');
    expect(el.querySelector('button')?.textContent?.trim()).toBe('Reintentar');
  });

  it('el honeypot lleno no envía nada', async () => {
    const { el, fill, type, submit, spy } = setup(async () => {});
    fill(VALID);
    type(el.querySelector<HTMLInputElement>('[name="_gotcha"]')!, 'bot');
    await submit();
    expect(spy).not.toHaveBeenCalled();
  });
});
