import { Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { AntiAuthGuard } from '../shared/services/index';
import { RegisterComponent } from '../register/register.component';
import { TwitterCallbackComponent } from "../twitter-callback/twitter-callback.component";

export const LoginRoutes:Routes = [
  {
    path: 'login',
    canActivate: [AntiAuthGuard],
    component: LoginComponent
  },
  { path: 'register',
    component: RegisterComponent
  },
  {
  // your twitter callback url here:
  path: 'url_of_your_callback',
  component: TwitterCallbackComponent
}

];
