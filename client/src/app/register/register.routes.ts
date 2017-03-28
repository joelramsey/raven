import { Routes } from '@angular/router';

import { RegisterComponent } from './register.component';
import { AntiAuthGuard } from '../shared/services/index';

export const RegisterRoutes:Routes = [
  {
    path: 'login',
    canActivate: [AntiAuthGuard],
    component: RegisterComponent
  },

  { path: 'login',
    component: RegisterComponent
  }
];
