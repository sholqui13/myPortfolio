import { Component, ViewEncapsulation, input } from '@angular/core';
import { IconButton, IconButtonVariant, IconName } from '../../ui';
import { LINKS } from '../../data/links';

export interface SocialLinkItem {
  icon: IconName;
  label: string;
  href: string;
  variant?: IconButtonVariant;
  newTab?: boolean;
}

export const DEFAULT_SOCIAL_LINKS: SocialLinkItem[] = [
  { icon: 'linkedin', label: 'LinkedIn de Stefania Holguin', href: LINKS.linkedin, newTab: true },
  { icon: 'github', label: 'GitHub de Stefania Holguin', href: LINKS.github, newTab: true },
  { icon: 'mail', label: 'Enviar correo', href: LINKS.mailto },
  { icon: 'download', label: 'Ver CV en PDF', href: LINKS.cv, variant: 'attention', newTab: true },
];

/** SocialLinks — molécula. Fila de IconButton; el CV usa `attention`. */
@Component({
  selector: 'g-social-links',
  imports: [IconButton],
  encapsulation: ViewEncapsulation.None,
  styleUrl: './social-links.scss',
  template: `
    <ul class="g-social">
      @for (item of items(); track item.href) {
        <li>
          <a
            g-icon-button
            [href]="item.href"
            [icon]="item.icon"
            [label]="item.label"
            [variant]="item.variant ?? 'inverse-raised'"
            [newTab]="item.newTab ?? false"
          ></a>
        </li>
      }
    </ul>
  `,
})
export class SocialLinks {
  readonly items = input<SocialLinkItem[]>(DEFAULT_SOCIAL_LINKS);
}
