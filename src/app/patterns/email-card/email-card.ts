import {
  Component,
  DOCUMENT,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { Button, Icon } from '../../ui';

type CopyState = 'idle' | 'copied' | 'failed';

/** Tiempo que el botón muestra "Copiado" antes de volver a "Copiar". */
const RESET_MS = 2500;

/**
 * EmailCard — molécula. Correo directo en una tarjeta: ícono, etiqueta, enlace
 * mailto y botón para copiar al portapapeles. El resultado de copiar se anuncia
 * en una región aria-live; si el portapapeles no está disponible se avisa y el
 * correo queda seleccionado para copiarlo a mano.
 */
@Component({
  selector: 'g-email-card',
  imports: [Button, Icon],
  encapsulation: ViewEncapsulation.None,
  styleUrl: './email-card.scss',
  template: `
    <div class="g-email-card">
      <span class="g-email-card__icon"><g-icon name="mail" /></span>
      <div class="g-email-card__text">
        <span class="g-email-card__label" [id]="labelId()">{{ label() }}</span>
        <a
          class="g-email-card__link"
          [href]="'mailto:' + email()"
          [attr.aria-describedby]="labelId()"
          >{{ email() }}</a
        >
      </div>
      <button
        g-button
        class="g-email-card__copy"
        variant="secondary"
        size="sm"
        [icon]="state() === 'copied' ? 'check' : 'copy'"
        [attr.aria-label]="state() === 'copied' ? null : 'Copiar el correo ' + email()"
        (click)="copy()"
      >
        {{ state() === 'copied' ? 'Copiado' : 'Copiar' }}
      </button>
      <p class="g-sr" aria-live="polite">{{ announcement() }}</p>
    </div>
  `,
})
export class EmailCard {
  readonly email = input.required<string>();
  readonly label = input('Correo directo');
  readonly labelId = input('g-email-card-label');

  private readonly document = inject(DOCUMENT);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly state = signal<CopyState>('idle');
  private timer: ReturnType<typeof setTimeout> | undefined;

  protected readonly announcement = computed(() => {
    switch (this.state()) {
      case 'copied':
        return 'Correo copiado al portapapeles.';
      case 'failed':
        return 'No se pudo copiar. El correo quedó seleccionado: usa Ctrl+C o Cmd+C.';
      default:
        return '';
    }
  });

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected async copy(): Promise<void> {
    clearTimeout(this.timer);
    try {
      const clipboard = this.document.defaultView?.navigator.clipboard;
      if (!clipboard) throw new Error('Portapapeles no disponible');
      await clipboard.writeText(this.email());
      this.state.set('copied');
      this.timer = setTimeout(() => this.state.set('idle'), RESET_MS);
    } catch {
      this.selectEmail();
      this.state.set('failed');
    }
  }

  /** Plan B: deja el correo seleccionado para copiarlo con el teclado. */
  private selectEmail(): void {
    const link = this.host.nativeElement.querySelector('.g-email-card__link');
    const selection = this.document.defaultView?.getSelection();
    if (!link || !selection) return;
    const range = this.document.createRange();
    range.selectNodeContents(link);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
