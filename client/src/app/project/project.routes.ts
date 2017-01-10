import { Routes } from '@angular/router';
import { ProjectComponent } from './project.component';
import { SourceUploaderComponent } from './source-uploader/source-uploader.component';
import { ProjectSourceComponent } from './project-source/project-source.component';

export const ProjectRoutes:Routes = [
  {
    path: 'project/new',
    component: ProjectComponent
  },
  {
    path: 'project/:id',
    component: ProjectComponent
  },
  {
    path: 'project/:id/sources',
    component: ProjectSourceComponent,
    children: [
      { path: '', redirectTo: 'upload', pathMatch: 'full' },
      { path: 'upload', component: SourceUploaderComponent }
    ]
  }
];