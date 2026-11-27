import { Component, ViewEncapsulation, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Button } from '../../../ui';
import { LINKS } from '../../../data/links';
import { CaseShell } from '../case-shell';

/** Frente de trabajo con su ícono (paths del lienzo CasoAvianca). */
interface WorkArea {
  title: string;
  text: string;
  /** Fondo y color del ícono: tokens de Genuina. */
  tone: 'violet' | 'orange' | 'teal' | 'slate';
  paths: string[];
  circles?: { cx: number; cy: number; r: number }[];
  rects?: { x: number; y: number; width: number; height: number; rx: number }[];
}

/**
 * Caso de estudio Avianca — lienzo CasoAvianca. Capturas del sitio de
 * Avianca aportadas por la autora; colores de marca en [data-case='avianca'].
 */
@Component({
  selector: 'g-avianca-case',
  imports: [CaseShell, NgOptimizedImage, RouterLink, Button],
  templateUrl: './avianca-case.html',
  styleUrl: './avianca-case.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AviancaCase {
  protected readonly links = LINKS;
  protected readonly img = 'assets/img/casos/';

  protected readonly areas: WorkArea[] = [
    {
      title: 'Accesibilidad WCAG',
      text: 'Buenas prácticas WCAG en componentes y vistas: semántica, navegación por teclado, foco visible y etiquetas claras.',
      tone: 'violet',
      circles: [{ cx: 12, cy: 4.5, r: 1.8 }],
      paths: ['M5 8.5l7 1.5 7-1.5', 'M12 10v5l-3 6M12 15l3 6'],
    },
    {
      title: 'Performance',
      text: 'Optimización Front-End para mejorar los tiempos de carga y la experiencia, sobre todo en dispositivos móviles.',
      tone: 'orange',
      paths: ['M13 2 4 14h7l-1 8 9-12h-7l1-8z'],
    },
    {
      title: 'Responsive y cross-browser',
      text: 'Vistas Mobile-First con Angular, TypeScript y SASS, fieles a Figma y probadas en Chrome, Safari, Edge y Firefox.',
      tone: 'teal',
      rects: [
        { x: 2, y: 4, width: 14, height: 11, rx: 2 },
        { x: 16, y: 8, width: 6, height: 12, rx: 1.5 },
      ],
      paths: ['M6 19h6'],
    },
    {
      title: 'Contenido y entrega',
      text: 'Gestión de contenido en Umbraco, Git por ramas, despliegue y monitoreo en Azure y documentación técnica para el equipo.',
      tone: 'slate',
      circles: [
        { cx: 6, cy: 6, r: 2.5 },
        { cx: 6, cy: 18, r: 2.5 },
        { cx: 18, cy: 12, r: 2.5 },
      ],
      paths: ['M6 8.5v7M8.5 6h3a4 4 0 0 1 4 4v0'],
    },
  ];

  constructor() {
    inject(Meta).updateTag({
      name: 'description',
      content:
        'Caso de estudio de Avianca: desarrollo Front-End del flujo de reservas y del área LifeMiles en FLYR Labs, con accesibilidad WCAG, performance y pruebas cross-browser.',
    });
  }
}
