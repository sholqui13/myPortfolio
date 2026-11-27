import {
  Component,
  ViewEncapsulation,
  booleanAttribute,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextId = 0;

/**
 * TextField — átomo. Campo con etiqueta siempre visible, asociada por for/id.
 * Implementa ControlValueAccessor: funciona con Reactive Forms (formControlName, [formControl]).
 *
 *   <g-text-field label="Tu correo" type="email" autocomplete="email" formControlName="email" />
 */
@Component({
  selector: 'g-text-field',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './text-field.scss',
  host: { class: 'g-text-field' },
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextField), multi: true },
  ],
  template: `
    <label class="g-text-field__label" [attr.for]="inputId()">{{ label() }}</label>
    <input
      class="g-text-field__input"
      [id]="inputId()"
      [type]="type()"
      [attr.name]="name() || null"
      [attr.placeholder]="placeholder() || null"
      [attr.autocomplete]="autocomplete() || null"
      [attr.aria-describedby]="describedBy() || null"
      [attr.aria-invalid]="invalid() ? 'true' : null"
      [required]="required()"
      [disabled]="disabled()"
      [value]="value()"
      (input)="onInput($event)"
      (blur)="onTouched()"
    />
  `,
})
export class TextField implements ControlValueAccessor {
  readonly label = input.required<string>();
  readonly type = input('text');
  readonly name = input<string>();
  readonly placeholder = input<string>();
  readonly autocomplete = input<string>();
  readonly inputId = input(`g-field-${nextId++}`);
  /** id del mensaje de ayuda o error (aria-describedby). */
  readonly describedBy = input<string>();
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });

  protected readonly value = signal('');
  protected readonly disabled = signal(false);

  private onChange: (value: string) => void = () => {};
  protected onTouched: () => void = () => {};

  protected onInput(event: Event): void {
    const next = (event.target as HTMLInputElement).value;
    this.value.set(next);
    this.onChange(next);
  }

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
