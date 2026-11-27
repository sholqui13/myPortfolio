import { Component, ViewEncapsulation, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Bubble, Button } from '../../ui';
import { StatItem } from '../../patterns';

/**
 * Hero — organismo. Bubble → h1 (nombre en violeta) → fila: cita + cifra ·
 * escenario (círculo action, orbes, foto, botones) · columna vacía.
 * Contiene el único h1 de la Home.
 */
@Component({
  selector: 'g-hero',
  imports: [Bubble, Button, StatItem, NgOptimizedImage],
  encapsulation: ViewEncapsulation.None,
  styleUrl: './hero.scss',
  template: `
    <section class="g-container g-hero" id="inicio" aria-labelledby="g-hero-title">
      <g-bubble>¡Hola!</g-bubble>
      <h1 class="g-hero__title" id="g-hero-title">
        Soy <em>{{ name() }}</em><br />{{ role() }}
      </h1>

      <div class="g-hero__row">
        <div class="g-hero__aside">
          <svg class="g-hero__mark" viewBox="0 0 34 26" aria-hidden="true" focusable="false">
            <path
              d="M0 26V14C0 6 4 1 13 0l1 4c-5 1-7 4-7 8h6v14H0zm20 0V14c0-8 4-13 13-14l1 4c-5 1-7 4-7 8h6v14H20z"
            />
          </svg>
          <p class="g-hero__quote">{{ quote() }}</p>
          <g-stat-item [value]="statValue()" [label]="statLabel()" />
        </div>

        <div class="g-hero__stage">
          <div class="g-hero__circle" aria-hidden="true"></div>
          <div class="g-hero__orb g-hero__orb--a" aria-hidden="true"></div>
          <div class="g-hero__orb g-hero__orb--b" aria-hidden="true"></div>
          <img
            class="g-hero__photo"
            [ngSrc]="photo()"
            width="900"
            height="900"
            [alt]="photoAlt()"
            priority
          />
          <svg class="g-hero__doodle" viewBox="0 0 90 70" aria-hidden="true" focusable="false">
            <path d="M4 6c6 30 30 52 76 54" />
            <path d="m72 52 9 8-10 6" />
          </svg>
          <div class="g-hero__ctas">
            <a g-button variant="highlight" href="#portafolio" trailingIcon="arrow-up-right"
              >Portafolio</a
            >
            <a g-button variant="light" href="#contacto">Contrátame</a>
          </div>
        </div>

        <div class="g-hero__spacer" aria-hidden="true"></div>
      </div>
    </section>
  `,
})
export class Hero {
  readonly name = input('Stefania,');
  readonly role = input('Front-End Developer & UI/UX Designer');
  readonly quote = input(
    'Convierto diseños de Figma en interfaces accesibles, rápidas y fieles, para que más personas puedan usarlas sin fricción.',
  );
  readonly statValue = input('4+');
  readonly statLabel = input('años de experiencia Front-End');
  readonly photo = input('assets/img/stefania-retrato.webp');
  readonly photoAlt = input('Retrato de Stefania Holguin sonriendo, con camisa verde oliva');
}
