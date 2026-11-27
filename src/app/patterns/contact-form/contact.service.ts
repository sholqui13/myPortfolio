import { Service } from '@angular/core';
import { environment } from '../../../environments/environment';

/** Datos que la persona envía desde el formulario de contacto. */
export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

/** Envía el mensaje de contacto al servicio de formularios (Formspree). */
@Service()
export class ContactService {
  private readonly endpoint = environment.contactEndpoint;

  async send(data: ContactMessage): Promise<void> {
    if (!this.endpoint) {
      throw new Error('contactEndpoint no está configurado en environment.ts');
    }
    const res = await fetch(this.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      // Formspree usa `email` como dirección de respuesta y `_subject` como asunto.
      body: JSON.stringify({ ...data, _subject: `Portafolio · mensaje de ${data.name}` }),
    });
    if (!res.ok) {
      throw new Error(`Formspree respondió ${res.status}`);
    }
  }
}
