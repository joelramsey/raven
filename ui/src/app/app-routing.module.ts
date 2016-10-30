import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjectsRoutes } from './projects/projects.routes';
import { SourcesRoutes } from './sources/sources.routes';
import { ProjectRoutes } from './project/project.routes';

@NgModule({
  imports: [
    RouterModule.forRoot([
      ...ProjectRoutes,
      ...ProjectsRoutes,
      ...SourcesRoutes,
      {
        path: '',
        redirectTo: '/project',
        pathMatch: 'full'
      },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
