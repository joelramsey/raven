import { Routes } from '@angular/router';

import { SourcesRoutes } from '../sources/sources.routes';
import { ProjectsRoutes } from '../projects/projects.routes';
import { ProjectRoutes } from '../project/project.routes';
import { ProfileRoutes } from '../profile/profile.routes';
import { ProjectStarterRoutes } from '../project-starter/project-starter.routes';

import { MainComponent } from './main.component';

import { AuthGuard, AuthenticationResolve } from '../shared/services/index';

export const MainRoutes:Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    component: MainComponent,
    resolve: {
      loggedIn: AuthenticationResolve
    },
    children: [
      ...ProjectRoutes,
      ...ProjectsRoutes,
      ...SourcesRoutes,
      ...ProfileRoutes,
      ...ProjectStarterRoutes
    ]
  }
];
