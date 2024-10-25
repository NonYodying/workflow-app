// app.routes.ts
import { Routes } from '@angular/router';
import { DemoComponent } from './demo/demo.component';

export const routes: Routes = [
  { path: 'demo', component: DemoComponent},
  { path: 'budget', loadChildren: () => import('./budget/budget.routes') }
];
