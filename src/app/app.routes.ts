import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dev/ui',
    title: 'Genuina UI · /dev/ui',
    loadComponent: () => import('./pages/dev-ui/dev-ui').then((m) => m.DevUi),
  },
  {
    path: 'dev/organismos',
    title: 'Organismos · Genuina UI',
    loadComponent: () => import('./pages/dev-sections/dev-sections').then((m) => m.DevSections),
  },
];
