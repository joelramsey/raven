import { Route } from '@angular/router';
import { ProjectComponent } from './project.component';

export const ProjectRoutes:Route[] = [
  {
    path: 'project',
    component: ProjectComponent
  },
  {
    path: 'project/:id',
    component: ProjectComponent
  },
];