import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { SKILLS, SKILL_CATEGORIES, SkillCategory } from '../../data/skills';

type SkillFilter = 'all' | SkillCategory;

/**
 * “Mi stack tecnológico” — lienzo Main, entre Servicios y Experiencia.
 * Filtros por categoría (botones con aria-pressed), rejilla de tarjetas y
 * una banda decorativa de logos en movimiento.
 */
@Component({
  selector: 'g-skills-section',
  imports: [NgOptimizedImage],
  encapsulation: ViewEncapsulation.None,
  styleUrl: './skills-section.scss',
  template: `
    <section class="g-container g-skills" id="stack" aria-labelledby="g-stack-title">
      <div class="g-skills__head">
        <div class="g-skills__intro">
          <span class="g-skills__tag">Herramientas del día a día</span>
          <h2 class="g-section__title g-skills__title" id="g-stack-title">
            Mi stack <em>tecnológico</em>
          </h2>
          <p class="g-skills__lead">
            Lo que uso para pasar de la idea en Figma a una interfaz accesible en producción.
          </p>
        </div>

        <div class="g-skills__filters" role="group" aria-label="Filtrar tecnologías">
          @for (f of filters(); track f.id) {
            <button
              type="button"
              class="g-skills__chip"
              [attr.aria-pressed]="filter() === f.id"
              (click)="filter.set(f.id)"
            >
              {{ f.label }} <span class="g-skills__count">{{ f.count }}</span>
            </button>
          }
        </div>
      </div>

      <p class="g-sr" role="status">{{ status() }}</p>

      <ul class="g-skills__grid">
        @for (s of shown(); track s.name; let k = $index) {
          <li class="g-tech" [style.--g-tech-color]="s.color" [style.--g-tech-k]="k">
            <img class="g-tech__logo" [ngSrc]="s.logo" width="60" height="60" alt="" />
            <span class="g-tech__name">{{ s.name }}</span>
            <span class="g-tech__cat">{{ labels[s.cat] }}</span>
            <span class="g-tech__bar" aria-hidden="true"></span>
          </li>
        }
      </ul>

      <div class="g-skills__band" aria-hidden="true">
        <div class="g-skills__track">
          @for (s of band; track $index) {
            <span class="g-skills__badge">
              <img [ngSrc]="s.logo" width="32" height="32" alt="" />
            </span>
          }
        </div>
      </div>
    </section>
  `,
})
export class SkillsSection {
  protected readonly labels = SKILL_CATEGORIES;
  /** Lista duplicada: la banda se desplaza un 50 % y vuelve sin salto. */
  protected readonly band = [...SKILLS, ...SKILLS];

  readonly filter = signal<SkillFilter>('all');

  protected readonly shown = computed(() => {
    const f = this.filter();
    return f === 'all' ? SKILLS : SKILLS.filter((s) => s.cat === f);
  });

  protected readonly filters = computed(() => [
    { id: 'all' as SkillFilter, label: 'Todo', count: SKILLS.length },
    ...(Object.keys(SKILL_CATEGORIES) as SkillCategory[]).map((id) => ({
      id: id as SkillFilter,
      label: SKILL_CATEGORIES[id],
      count: SKILLS.filter((s) => s.cat === id).length,
    })),
  ]);

  protected readonly status = computed(() => {
    const f = this.filter();
    return f === 'all'
      ? ''
      : `Mostrando ${this.shown().length} tecnologías de ${SKILL_CATEGORIES[f]}`;
  });
}
