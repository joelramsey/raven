import { Routes } from '@angular/router';

import { LandingComponent } from './landing.component';
import { LoginComponent } from '../login/login.component'
import { RegisterComponent } from '../register/register.component';

export const LandingRoutes:Routes = [
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: 'register',
    component: RegisterComponent
  }

];
