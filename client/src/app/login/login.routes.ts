import { Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { AntiAuthGuard } from '../shared/services/index';

export const LoginRoutes:Routes = [
  {
    path: 'login',
    canActivate: [AntiAuthGuard],
    component: LoginComponent
  }
];