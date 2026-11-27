import { TestBed } from '@angular/core/testing';
import { ContactService } from '../../patterns';
import { ContactSection } from './contact-section';

describe('ContactSection', () => {
  it('sección #contacto con h2 y formulario con nombre, mensaje y correo etiquetados', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: ContactService, useValue: { send: vi.fn() } }],
    });
    const fixture = TestBed.createComponent(ContactSection);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('section')?.id).toBe('contacto');
    expect(el.querySelector('h2')?.id).toBe('g-cta-title');
    const input = el.querySelector<HTMLInputElement>('#contacto-correo')!;
    expect(input.type).toBe('email');
    expect(el.querySelector('label[for="contacto-correo"]')).not.toBeNull();
    expect(el.querySelector('label[for="contacto-nombre"]')).not.toBeNull();
    expect(el.querySelector('textarea#contacto-mensaje')).not.toBeNull();
  });
});
