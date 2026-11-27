import { Component, ViewEncapsulation, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../ui';
import { CaseShell } from '../case-shell';

/** Caso de estudio Veyra — lienzo CasoVeyra. */
@Component({
  selector: 'g-veyra-case',
  imports: [CaseShell, NgOptimizedImage, RouterLink, Icon],
  templateUrl: './veyra-case.html',
  styleUrl: './veyra-case.scss',
  encapsulation: ViewEncapsulation.None,
})
export class VeyraCase {
  protected readonly img = 'assets/img/casos/';

  constructor() {
    inject(Meta).updateTag({
      name: 'description',
      content:
        'Caso de estudio de Veyra: central de monitoreo de flotas en tiempo real diseñada en Figma por Stefania Holguin, con sistema de diseño propio, modo claro y oscuro y criterios WCAG 2.1 AA.',
    });
  }
}
