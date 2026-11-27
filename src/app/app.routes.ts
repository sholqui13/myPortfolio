import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Stefania Holguin · Front-End Developer & UI/UX Designer',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'proyectos/novasec',
    title: 'Caso de estudio: Novasec · Stefania Holguin',
    loadComponent: () =>
      import('./pages/case-study/novasec/novasec-case').then((m) => m.NovasecCase),
  },
  {
    path: 'proyectos/veyra',
    title: 'Caso de estudio: Veyra · Stefania Holguin',
    loadComponent: () => import('./pages/case-study/veyra/veyra-case').then((m) => m.VeyraCase),
  },
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
  { path: '**', redirectTo: '' },
];
