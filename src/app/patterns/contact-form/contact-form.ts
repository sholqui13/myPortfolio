import {
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Button } from '../../ui';
import { ContactMessage, ContactService } from './contact.service';

type Status = 'idle' | 'sending' | 'success' | 'error';
type Field = 'name' | 'message' | 'email';

const MESSAGE_MIN = 10;

/** Requerido sin contar espacios: "   " no vale como nombre ni mensaje. */
function requiredTrimmed(control: AbstractControl<string>): ValidationErrors | null {
  return control.value.trim() ? null : { required: true };
}

/**
 * ContactForm — molécula. Nombre, mensaje y correo; el correo va en la píldora
 * con el botón de envío. Validación por campo (error en aria-describedby y foco
 * al primer campo inválido), honeypot anti-spam y estados:
 * enviando (botón deshabilitado) · éxito (role="status") · error (reintentar).
 */
@Component({
  selector: 'g-contact-form',
  imports: [ReactiveFormsModule, Button],
  encapsulation: ViewEncapsulation.None,
  // Reutiliza las clases g-text-field__* del átomo TextField.
  styleUrls: ['../../ui/text-field/text-field.scss', './contact-form.scss'],
  template: `
    <form class="g-contact-form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
      <div class="g-contact-form__group">
        <label class="g-text-field__label" [for]="ids().name">Tu nombre</label>
        <input
          class="g-text-field__input g-contact-form__box"
          [id]="ids().name"
          type="text"
          name="name"
          autocomplete="name"
          placeholder="¿Cómo te llamas?"
          formControlName="name"
          [attr.aria-invalid]="error('name') ? 'true' : null"
          [attr.aria-describedby]="error('name') ? ids().name + '-error' : null"
        />
        @if (error('name'); as text) {
          <p class="g-contact-form__error" [id]="ids().name + '-error'">{{ text }}</p>
        }
      </div>

      <div class="g-contact-form__group">
        <label class="g-text-field__label" [for]="ids().message">Tu mensaje</label>
        <textarea
          class="g-text-field__input g-contact-form__box g-contact-form__box--area"
          [id]="ids().message"
          name="message"
          rows="5"
          placeholder="Cuéntame sobre tu proyecto, plazos o idea."
          formControlName="message"
          [attr.aria-invalid]="error('message') ? 'true' : null"
          [attr.aria-describedby]="error('message') ? ids().message + '-error' : null"
        ></textarea>
        @if (error('message'); as text) {
          <p class="g-contact-form__error" [id]="ids().message + '-error'">{{ text }}</p>
        }
      </div>

      <div class="g-contact-form__group">
        <label class="g-text-field__label" [for]="ids().email">{{ emailLabel() }}</label>
        <div class="g-contact-form__row">
          <input
            class="g-text-field__input"
            [id]="ids().email"
            type="email"
            name="email"
            autocomplete="email"
            placeholder="nombre@correo.com"
            formControlName="email"
            [attr.aria-invalid]="error('email') ? 'true' : null"
            [attr.aria-describedby]="error('email') ? ids().email + '-error' : null"
          />
          <!-- Honeypot: invisible para personas; si se llena, no se envía nada. -->
          <input
            class="g-contact-form__trap"
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
        @if (error('email'); as text) {
          <p class="g-contact-form__error" [id]="ids().email + '-error'">{{ text }}</p>
        }
      </div>

      <p
        class="g-contact-form__status"
        [class.g-contact-form__status--error]="status() === 'error'"
        role="status"
      >
        {{ statusText() }}
      </p>
    </form>
  `,
})
export class ContactForm {
  /** Prefijo de los id de los campos (debe ser único en la página). */
  readonly idPrefix = input('g-contact');
  readonly emailLabel = input('Tu correo electrónico');
  readonly cta = input('Enviar');
  readonly successText = input('¡Gracias! Te responderé muy pronto.');
  /** Se emite con los datos después de un envío exitoso. */
  readonly submitted = output<ContactMessage>();

  private readonly contact = inject(ContactService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [requiredTrimmed] }),
    message: new FormControl('', {
      nonNullable: true,
      validators: [requiredTrimmed, Validators.minLength(MESSAGE_MIN)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    trap: new FormControl('', { nonNullable: true }),
  });

  protected readonly status = signal<Status>('idle');
  private readonly attempted = signal(false);
  /** Cambia con cada edición para que los errores se recalculen. */
  private readonly values = toSignal(this.form.valueChanges);

  protected readonly ids = computed(() => {
    const p = this.idPrefix();
    return { name: `${p}-nombre`, message: `${p}-mensaje`, email: `${p}-correo` };
  });

  private readonly errors = computed<Record<Field, string | null>>(() => {
    this.values();
    const c = this.form.controls;
    return {
      name: c.name.errors ? 'Escribe tu nombre para saber a quién respondo.' : null,
      message: c.message.errors?.['required']
        ? 'Escribe tu mensaje: cuéntame qué necesitas.'
        : c.message.errors?.['minlength']
          ? `El mensaje es muy corto: usa al menos ${MESSAGE_MIN} caracteres.`
          : null,
      email: c.email.errors?.['required']
        ? 'Escribe tu correo para poder responderte.'
        : c.email.errors?.['email']
          ? 'Revisa el correo: debe tener el formato nombre@correo.com.'
          : null,
    };
  });

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

  /** Mensaje de error visible del campo (solo después del primer intento de envío). */
  protected error(field: Field): string | null {
    return this.attempted() ? this.errors()[field] : null;
  }

  protected async submit(): Promise<void> {
    this.attempted.set(true);
    if (this.status() === 'sending') return;
    if (this.form.invalid) {
      this.focusFirstInvalid();
      return;
    }

    const { name, message, email, trap } = this.form.getRawValue();
    // Bot: finge éxito sin enviar.
    if (trap) {
      this.status.set('success');
      return;
    }

    const data: ContactMessage = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    };
    this.status.set('sending');
    try {
      await this.contact.send(data);
      this.status.set('success');
      this.form.reset();
      this.attempted.set(false);
      this.submitted.emit(data);
    } catch {
      this.status.set('error');
    }
  }

  private focusFirstInvalid(): void {
    const order: Field[] = ['name', 'message', 'email'];
    const first = order.find((f) => this.form.controls[f].invalid);
    if (!first) return;
    this.host.nativeElement.querySelector<HTMLElement>(`#${this.ids()[first]}`)?.focus();
  }
}
