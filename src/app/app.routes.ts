import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dev/ui',
    title: 'Genuina UI · /dev/ui',
    loadComponent: () => import('./pages/dev-ui/dev-ui').then((m) => m.DevUi),
  },
];
