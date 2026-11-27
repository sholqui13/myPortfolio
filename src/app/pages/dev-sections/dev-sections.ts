import { Component, ViewEncapsulation, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ContactService } from '../../patterns';
import {
  ContactSection,
  Hero,
  Marquee,
  MobileMenu,
  ProjectCarousel,
  ServicesSection,
  SiteFooter,
  SiteHeader,
  Timeline,
  WhySection,
} from '../../sections';

/** En /dev/organismos el formulario simula un envío exitoso. */
const FAKE_CONTACT: Pick<ContactService, 'send'> = {
  send: () => new Promise((resolve) => setTimeout(resolve, 800)),
};

/**
 * Página interna /dev/organismos: cada organismo en el orden de la plantilla
 * Home, con una etiqueta para revisarlo. SiteHeader se ve desde 1024 px y
 * MobileMenu por debajo.
 */
@Component({
  selector: 'g-dev-sections',
  imports: [
    SiteHeader,
    MobileMenu,
    Hero,
    ServicesSection,
    Timeline,
    WhySection,
    ProjectCarousel,
    ContactSection,
    Marquee,
    SiteFooter,
  ],
  providers: [{ provide: ContactService, useValue: FAKE_CONTACT }],
  encapsulation: ViewEncapsulation.None,
  template: `
    <a class="g-skip" href="/dev/organismos#contenido">Saltar al contenido</a>
    <p class="g-dev-label g-container">SiteHeader (≥ 1024 px) · MobileMenu (&lt; 1024 px)</p>
    <g-site-header />
    <div class="g-container g-dev-mobile"><g-mobile-menu /></div>

    <main id="contenido">
      <p class="g-dev-label g-container">Hero</p>
      <g-hero />
      <p class="g-dev-label g-container">ServicesSection</p>
      <g-services-section />
      <p class="g-dev-label g-container">Timeline</p>
      <g-timeline />
      <p class="g-dev-label g-container">¿Por qué trabajar conmigo? (WhySection)</p>
      <g-why-section />
      <p class="g-dev-label g-container">ProjectCarousel</p>
      <g-project-carousel />
      <p class="g-dev-label g-container">ContactSection (envío simulado)</p>
      <g-contact-section />
      <p class="g-dev-label g-container">Marquee</p>
      <g-marquee />
    </main>
    <p class="g-dev-label g-container">SiteFooter</p>
    <g-site-footer />
  `,
  styles: `
    .g-dev-label {
      margin: var(--space-6) auto var(--space-2);
      font: var(--text-tag);
      color: var(--action);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .g-dev-mobile {
      padding-top: var(--space-4);
    }
  `,
})
export class DevSections {
  constructor() {
    inject(Meta).updateTag({ name: 'robots', content: 'noindex' });
  }
}
