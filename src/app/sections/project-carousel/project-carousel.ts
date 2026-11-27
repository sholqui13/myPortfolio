import { Component, ViewEncapsulation, computed, input, signal } from '@angular/core';
import { IconButton } from '../../ui';
import { ProjectSlide } from '../../patterns';
import { Project } from '../../data/project';
import { PROJECTS } from '../../data/projects';

/** Desplazamiento horizontal mínimo para contar un gesto como swipe. */
const SWIPE_THRESHOLD = 50;

/**
 * ProjectCarousel — organismo. Encabezado con flechas, una ProjectSlide a la
 * vez y puntos de posición. Navegación circular, sin avance automático;
 * en pantallas táctiles también se desliza con el dedo.
 */
@Component({
  selector: 'g-project-carousel',
  imports: [IconButton, ProjectSlide],
  encapsulation: ViewEncapsulation.None,
  styleUrl: './project-carousel.scss',
  template: `
    <section
      class="g-container g-carousel"
      id="portafolio"
      aria-labelledby="g-port-title"
      aria-roledescription="carrusel"
    >
      <div class="g-carousel__head">
        <h2 class="g-section__title g-carousel__title" id="g-port-title">
          Echa un vistazo<br />a mi <em>portafolio</em>
        </h2>
        <div class="g-carousel__controls">
          <button
            g-icon-button
            size="lg"
            variant="outline"
            icon="arrow-left"
            label="Proyecto anterior"
            (click)="prev()"
          ></button>
          <button
            g-icon-button
            size="lg"
            variant="highlight"
            icon="arrow-right"
            label="Proyecto siguiente"
            (click)="next()"
          ></button>
        </div>
      </div>

      <div
        class="g-carousel__viewport"
        aria-roledescription="diapositiva"
        [attr.aria-label]="position()"
        (pointerdown)="onPointerDown($event)"
        (pointerup)="onPointerUp($event)"
        (pointercancel)="startX = null"
      >
        <g-project-slide [project]="current()" [position]="position()">
          <div class="g-carousel__dots" aria-hidden="true">
            @for (p of projects(); track p.slug) {
              <span
                class="g-carousel__dot"
                [class.g-carousel__dot--active]="$index === index()"
              ></span>
            }
          </div>
        </g-project-slide>
      </div>
    </section>
  `,
})
export class ProjectCarousel {
  readonly projects = input<Project[]>(PROJECTS);

  protected readonly index = signal(0);
  protected readonly current = computed(() => this.projects()[this.index()]);
  protected readonly position = computed(
    () => `Proyecto ${this.index() + 1} de ${this.projects().length}`,
  );

  protected startX: number | null = null;

  prev(): void {
    this.go(-1);
  }

  next(): void {
    this.go(1);
  }

  private go(step: number): void {
    const n = this.projects().length;
    this.index.update((i) => (((i + step) % n) + n) % n);
  }

  protected onPointerDown(event: PointerEvent): void {
    this.startX = event.pointerType === 'mouse' ? null : event.clientX;
  }

  protected onPointerUp(event: PointerEvent): void {
    if (this.startX === null) return;
    const dx = event.clientX - this.startX;
    this.startX = null;
    if (Math.abs(dx) >= SWIPE_THRESHOLD) this.go(dx < 0 ? 1 : -1);
  }
}
