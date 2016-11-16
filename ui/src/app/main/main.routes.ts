import { Routes } from '@angular/router';
import { SourcesRoutes } from '../sources/sources.routes';
import { ProjectsRoutes } from '../projects/projects.routes';
import { ProjectRoutes } from '../project/project.routes';
import { MainComponent } from './main.component';

export const MainRoutes:Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      ...ProjectRoutes,
      ...ProjectsRoutes,
      ...SourcesRoutes
    ]
  }
];