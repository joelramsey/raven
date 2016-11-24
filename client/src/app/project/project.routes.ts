import { Routes } from '@angular/router';
import { ProjectComponent } from './project.component';

export const ProjectRoutes:Routes = [
  {
    path: 'project/new',
    component: ProjectComponent
  },
  {
    path: 'project/:id',
    component: ProjectComponent
  },
];