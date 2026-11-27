import { Component, ViewEncapsulation, afterNextRender, inject, signal } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  Bubble,
  Button,
  ButtonVariant,
  ICON_NAMES,
  Icon,
  IconButton,
  IconButtonVariant,
  Logo,
  Tag,
  TextField,
} from '../../ui';
import {
  CheckList,
  ContactService,
  ContactForm,
  ProjectSlide,
  ServiceCard,
  SocialLinks,
  StatItem,
  TimelineItem,
} from '../../patterns';
import { PROJECTS } from '../../data/projects';
import { TIMELINE } from '../../data/timeline';

/** En /dev/ui el formulario simula un envío exitoso (no llama a Formspree). */
const FAKE_CONTACT: Pick<ContactService, 'send'> = {
  send: () => new Promise((resolve) => setTimeout(resolve, 800)),
};

const PRIMITIVES = [
  'navy-900',
  'navy-800',
  'navy-700',
  'violet-700',
  'violet-500',
  'violet-100',
  'pink-500',
  'orange-400',
  'orange-100',
  'teal-700',
  'teal-400',
  'teal-100',
  'slate-600',
  'slate-300',
  'slate-200',
  'slate-100',
  'gray-50',
  'white',
];
const SEMANTIC = [
  'surface',
  'surface-raised',
  'surface-inverse',
  'surface-inverse-raised',
  'ink',
  'ink-muted',
  'ink-inverse',
  'ink-inverse-muted',
  'action',
  'action-hover',
  'on-action',
  'highlight',
  'on-highlight',
  'attention',
  'on-attention',
  'success',
  'success-text',
  'border',
  'border-inverse',
  'focus-ring',
  'focus-ring-inverse',
];
const TYPE_STYLES = [
  'display-xl',
  'heading-1',
  'heading-2',
  'heading-3',
  'heading-4',
  'heading-5',
  'stat',
  'body-lg',
  'body',
  'body-sm',
  'label',
  'caption',
  'tag',
];
const SPACES = [1, 2, 3, 4, 5, 6, 8, 10, 12, 18, 24];
const RADII = ['sm', 'md', 'lg', 'xl', 'pill', 'round'];
const SHADOWS = ['sm', 'md', 'lg'];

/** Página interna /dev/ui: tokens y átomos del Genuina Design System. */
@Component({
  selector: 'g-dev-ui',
  imports: [
    Icon,
    Button,
    IconButton,
    Tag,
    Bubble,
    Logo,
    TextField,
    ReactiveFormsModule,
    StatItem,
    ServiceCard,
    TimelineItem,
    ProjectSlide,
    ContactForm,
    SocialLinks,
    CheckList,
  ],
  providers: [{ provide: ContactService, useValue: FAKE_CONTACT }],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dev-ui.html',
  styleUrl: './dev-ui.scss',
})
export class DevUi {
  protected readonly primitives = PRIMITIVES;
  protected readonly semantic = SEMANTIC;
  protected readonly typeStyles = TYPE_STYLES;
  protected readonly spaces = SPACES;
  protected readonly radii = RADII;
  protected readonly shadows = SHADOWS;
  protected readonly icons = ICON_NAMES;

  protected readonly buttonVariants: ButtonVariant[] = [
    'primary',
    'highlight',
    'secondary',
    'outline-action',
    'light',
    'attention',
  ];
  protected readonly iconButtonVariants: IconButtonVariant[] = [
    'inverse',
    'inverse-raised',
    'highlight',
    'attention',
    'outline',
  ];

  protected readonly projects = PROJECTS;
  protected readonly timeline = TIMELINE.slice(0, 3);
  protected readonly lastSubmitted = signal('');

  protected readonly email = new FormControl('', { nonNullable: true });

  /** Valores resueltos de cada token (se leen del CSS en el navegador). */
  protected readonly resolved = signal<Record<string, string>>({});

  constructor() {
    inject(Meta).updateTag({ name: 'robots', content: 'noindex' });
    afterNextRender(() => {
      const css = getComputedStyle(document.documentElement);
      const out: Record<string, string> = {};
      for (const t of [...PRIMITIVES, ...SEMANTIC]) {
        out[t] = css.getPropertyValue(`--${t}`).trim();
      }
      this.resolved.set(out);
    });
  }
}
