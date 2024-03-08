import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./features/home/pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Product list',
  },
  {
    path: 'details/:id',
    loadComponent: () => import('./features/details/pages/details/details.component').then((m) => m.DetailsComponent),
    title: 'Product details',
  },
  {
    path: 'info',
    loadComponent: () => import('./features/info/pages/info/info.component').then((m) => m.InfoComponent),
    title: 'General information',
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
