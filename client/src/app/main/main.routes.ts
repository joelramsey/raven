import { Routes } from '@angular/router';
import { SourcesRoutes } from '../sources/sources.routes';
import { ProjectsRoutes } from '../projects/projects.routes';
import { ProjectRoutes } from '../project/project.routes';
import { MainComponent } from './main.component';
import { AuthGuard } from '../shared/services/auth-guard.service';

export const MainRoutes:Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: MainComponent,
    children: [
      ...ProjectRoutes,
      ...ProjectsRoutes,
      ...SourcesRoutes
    ]
  }
];