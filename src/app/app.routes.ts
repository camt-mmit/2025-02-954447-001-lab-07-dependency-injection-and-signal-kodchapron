import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'assignment', pathMatch: 'full' },
  { path: 'example', loadChildren: () => import('./example/routes') },
  { path: 'assignment', loadChildren: () => import('./assignment/routes') },
];
