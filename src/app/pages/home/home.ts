import { Component, ViewEncapsulation, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import {
  ContactSection,
  Hero,
  Marquee,
  MobileMenu,
  ProjectCarousel,
  ServicesSection,
  SiteFooter,
  SiteHeader,
  SkillsSection,
  Timeline,
  WhySection,
} from '../../sections';

export const HOME_DESCRIPTION =
  'Portafolio de Stefania Holguin Quiroz, Front-End Developer y UI/UX Designer. Convierto diseños de Figma en interfaces accesibles, rápidas y fieles.';

/**
 * Home — plantilla del lienzo Main: barra (SiteHeader desde 1024 px,
 * MobileMenu por debajo), las secciones en orden y el pie de página.
 */
@Component({
  selector: 'g-home',
  imports: [
    SiteHeader,
    MobileMenu,
    Hero,
    ServicesSection,
    SkillsSection,
    Timeline,
    WhySection,
    ProjectCarousel,
    ContactSection,
    Marquee,
    SiteFooter,
  ],
  encapsulation: ViewEncapsulation.None,
  styleUrl: './home.scss',
  template: `
    <a class="g-skip" href="#contenido">Saltar al contenido</a>
    <g-site-header />
    <header class="g-container g-home__mobile-bar">
      <g-mobile-menu />
    </header>

    <main id="contenido" class="g-home">
      <g-hero />
      <g-services-section />
      <g-skills-section />
      <g-timeline />
      <g-why-section />
      <g-project-carousel />
      <g-contact-section />
      <g-marquee />
    </main>

    <g-site-footer />
  `,
})
export class Home {
  constructor() {
    inject(Meta).updateTag({ name: 'description', content: HOME_DESCRIPTION });
  }
}
