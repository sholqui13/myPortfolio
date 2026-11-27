import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Button, Tag } from '../../ui';
import { Project } from '../../data/project';

/**
 * ProjectSlide — molécula. Captura de escritorio en marco de navegador con el
 * teléfono superpuesto, más la información y los botones del proyecto.
 * Sin capturas (p. ej. Avianca, confidencial) muestra un esqueleto decorativo.
 */
@Component({
  selector: 'g-project-slide',
  imports: [Button, Tag, RouterLink, NgOptimizedImage],
  encapsulation: ViewEncapsulation.None,
  styleUrl: './project-slide.scss',
  host: { class: 'g-project-slide' },
  template: `
    @let p = project();
    <div class="g-project-slide__media" [style.background]="p.tint ?? 'var(--violet-100)'">
      @if (p.desk; as desk) {
        <figure class="g-project-slide__frame">
          <div class="g-project-slide__browser">
            <span class="g-project-slide__dots" aria-hidden="true"
              ><span></span><span></span><span></span
            ></span>
            <!-- @for con track: NgOptimizedImage no admite cambios de tamaño tras iniciar. -->
            @for (img of [desk]; track img.src) {
              <img
                class="g-project-slide__desk"
                [ngSrc]="img.src"
                [width]="img.width"
                [height]="img.height"
                [alt]="img.alt"
              />
            }
          </div>
          @if (p.mob; as mob) {
            @for (img of [mob]; track img.src) {
              <img
                class="g-project-slide__mob"
                [ngSrc]="img.src"
                [width]="img.width"
                [height]="img.height"
                [alt]="img.alt"
              />
            }
          }
        </figure>
      } @else {
        <div class="g-project-slide__placeholder" aria-hidden="true">
          <div class="g-project-slide__page">
            <span class="g-project-slide__line"></span>
            <span class="g-project-slide__band"></span>
            <span class="g-project-slide__tiles"><span></span><span></span><span></span></span>
          </div>
        </div>
      }
    </div>

    <div class="g-project-slide__info">
      <p class="g-project-slide__meta">{{ meta() }}</p>
      <ul class="g-project-slide__tags" aria-label="Etiquetas">
        @for (tag of p.tags; track tag) {
          <li g-tag>{{ tag }}</li>
        }
      </ul>
      <h3 class="g-project-slide__title" aria-live="polite">{{ p.title }}</h3>
      <p class="g-project-slide__desc">{{ p.desc }}</p>
      <div class="g-project-slide__actions">
        @if (p.caseHref; as href) {
          <a g-button [routerLink]="href" trailingIcon="arrow-up-right">
            Ver caso de estudio<span class="g-sr">: {{ shortName() }}</span>
          </a>
        }
        @if (p.demo; as href) {
          <a g-button variant="secondary" icon="external" [href]="href" newTab>
            Ver demo en vivo<span class="g-sr"> de {{ shortName() }}</span>
          </a>
        }
        @if (p.repo; as href) {
          <a g-button variant="secondary" icon="github" [href]="href" newTab>
            Ver código en GitHub<span class="g-sr"> de {{ shortName() }}</span>
          </a>
        }
        @if (p.figma; as href) {
          <a g-button variant="secondary" icon="figma" [href]="href" newTab>
            Ver diseño en Figma<span class="g-sr"> de {{ shortName() }}</span>
          </a>
        }
      </div>
      <ng-content />
    </div>
  `,
})
export class ProjectSlide {
  readonly project = input.required<Project>();
  /** Ej. “Proyecto 1 de 3”. */
  readonly position = input<string>();

  protected readonly shortName = computed(() => this.project().title.split(':')[0]);
  protected readonly meta = computed(() => {
    const pos = this.position();
    return pos ? `${pos} · ${this.project().org}` : this.project().org;
  });
}
