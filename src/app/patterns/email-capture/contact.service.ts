import { Service } from '@angular/core';
import { environment } from '../../../environments/environment';

/** Envía el correo de contacto al servicio de formularios (Formspree). */
@Service()
export class ContactService {
  private readonly endpoint = environment.contactEndpoint;

  async send(email: string): Promise<void> {
    if (!this.endpoint) {
      throw new Error('contactEndpoint no está configurado en environment.ts');
    }
    const res = await fetch(this.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) {
      throw new Error(`Formspree respondió ${res.status}`);
    }
  }
}
