import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TextField } from './text-field';

@Component({
  imports: [TextField, ReactiveFormsModule],
  template: `
    <g-text-field
      label="Tu correo"
      type="email"
      autocomplete="email"
      describedBy="err"
      invalid
      [formControl]="ctrl"
    />
  `,
})
class Host {
  ctrl = new FormControl('inicial', { nonNullable: true });
}

describe('TextField', () => {
  function setup() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    return { fixture, el, input: el.querySelector('input')!, label: el.querySelector('label')! };
  }

  it('asocia la etiqueta visible con el campo', () => {
    const { input, label } = setup();
    expect(label.textContent).toBe('Tu correo');
    expect(label.htmlFor).toBe(input.id);
    expect(input.type).toBe('email');
    expect(input.getAttribute('autocomplete')).toBe('email');
  });

  it('expone el error por aria-describedby y aria-invalid', () => {
    const { input } = setup();
    expect(input.getAttribute('aria-describedby')).toBe('err');
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('sincroniza el valor con Reactive Forms en ambos sentidos', () => {
    const { fixture, input } = setup();
    expect(input.value).toBe('inicial');

    input.value = 'hola@ejemplo.com';
    input.dispatchEvent(new Event('input'));
    expect(fixture.componentInstance.ctrl.value).toBe('hola@ejemplo.com');

    fixture.componentInstance.ctrl.setValue('otro@ejemplo.com');
    fixture.detectChanges();
    expect(input.value).toBe('otro@ejemplo.com');

    fixture.componentInstance.ctrl.disable();
    fixture.detectChanges();
    expect(input.disabled).toBe(true);
  });
});
