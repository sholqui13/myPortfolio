import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from '../../ui';
import { ContactService } from './contact.service';

type Status = 'idle' | 'sending' | 'success' | 'error';

/**
 * EmailCapture — molécula. Campo de correo en una píldora con botón de envío.
 * Validación (requerido + formato), honeypot anti-spam y estados:
 * enviando (botón deshabilitado) · éxito (role="status") · error (reintentar).
 */
@Component({
  selector: 'g-email-capture',
  imports: [ReactiveFormsModule, Button],
  encapsulation: ViewEncapsulation.None,
  // Reutiliza las clases g-text-field__* del átomo TextField.
  styleUrls: ['../../ui/text-field/text-field.scss', './email-capture.scss'],
  template: `
    <form class="g-email-capture" [formGroup]="form" (ngSubmit)="submit()" novalidate>
      <label class="g-text-field__label" [for]="fieldId()">{{ label() }}</label>
      <div class="g-email-capture__row">
        <input
          class="g-text-field__input"
          [id]="fieldId()"
          type="email"
          name="email"
          autocomplete="email"
          placeholder="nombre@correo.com"
          formControlName="email"
          [attr.aria-invalid]="showError() ? 'true' : null"
          [attr.aria-describedby]="showError() ? errorId() : null"
        />
        <!-- Honeypot: invisible para personas; si se llena, no se envía nada. -->
        <input
          class="g-email-capture__trap"
          type="text"
          name="_gotcha"
          formControlName="trap"
          tabindex="-1"
          autocomplete="off"
          aria-hidden="true"
        />
        <button g-button type="submit" [disabled]="status() === 'sending'">
          {{ buttonText() }}
        </button>
      </div>
      @if (showError()) {
        <p class="g-email-capture__error" [id]="errorId()">{{ errorText() }}</p>
      }
      <p
        class="g-email-capture__status"
        [class.g-email-capture__status--error]="status() === 'error'"
        role="status"
      >
        {{ statusText() }}
      </p>
    </form>
  `,
})
export class EmailCapture {
  readonly fieldId = input('g-email');
  readonly label = input('Tu correo electrónico');
  readonly cta = input('Enviar');
  readonly successText = input('¡Gracias! Te responderé muy pronto.');
  /** Se emite con el correo después de un envío exitoso. */
  readonly submitted = output<string>();

  private readonly contact = inject(ContactService);

  protected readonly form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    trap: new FormControl('', { nonNullable: true }),
  });

  protected readonly status = signal<Status>('idle');
  private readonly attempted = signal(false);
  private readonly emailErrors = signal<'required' | 'email' | null>(null);

  protected readonly errorId = computed(() => `${this.fieldId()}-error`);
  protected readonly showError = computed(() => this.attempted() && this.emailErrors() !== null);
  protected readonly errorText = computed(() =>
    this.emailErrors() === 'required'
      ? 'Escribe tu correo para poder responderte.'
      : 'Revisa el correo: debe tener el formato nombre@correo.com.',
  );
  protected readonly buttonText = computed(() => {
    switch (this.status()) {
      case 'sending':
        return 'Enviando…';
      case 'error':
        return 'Reintentar';
      default:
        return this.cta();
    }
  });
  protected readonly statusText = computed(() => {
    switch (this.status()) {
      case 'success':
        return this.successText();
      case 'error':
        return 'No se pudo enviar. Revisa tu conexión e intenta de nuevo.';
      default:
        return '';
    }
  });

  constructor() {
    this.form.controls.email.valueChanges.subscribe(() => this.syncErrors());
  }

  protected async submit(): Promise<void> {
    this.attempted.set(true);
    this.syncErrors();
    if (this.form.invalid || this.status() === 'sending') return;

    const email = this.form.controls.email.value.trim();
    // Bot: finge éxito sin enviar.
    if (this.form.controls.trap.value) {
      this.status.set('success');
      return;
    }

    this.status.set('sending');
    try {
      await this.contact.send(email);
      this.status.set('success');
      this.form.reset();
      this.attempted.set(false);
      this.submitted.emit(email);
    } catch {
      this.status.set('error');
    }
  }

  private syncErrors(): void {
    const errors = this.form.controls.email.errors;
    this.emailErrors.set(errors?.['required'] ? 'required' : errors?.['email'] ? 'email' : null);
  }
}
