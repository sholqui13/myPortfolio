import { Component, ViewEncapsulation, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../ui';
import { CaseShell } from '../case-shell';

/** Caso de estudio Novasec — lienzo CasoNovasec. */
@Component({
  selector: 'g-novasec-case',
  imports: [CaseShell, NgOptimizedImage, RouterLink, Icon],
  templateUrl: './novasec-case.html',
  styleUrl: './novasec-case.scss',
  encapsulation: ViewEncapsulation.None,
})
export class NovasecCase {
  protected readonly img = 'assets/img/casos/';

  constructor() {
    inject(Meta).updateTag({
      name: 'description',
      content:
        'Caso de estudio de Novasec: plataforma de operaciones de seguridad diseñada en Figma con su propio sistema de diseño y construida en Angular por Stefania Holguin.',
    });
  }
}
