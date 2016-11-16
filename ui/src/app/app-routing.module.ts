import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjectsRoutes } from './projects/projects.routes';
import { SourcesRoutes } from './sources/sources.routes';
import { ProjectRoutes } from './project/project.routes';
import { NotFoundRoutes } from './not-found/not-found.routes';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        children: [
          ...ProjectRoutes,
          ...ProjectsRoutes,
          ...SourcesRoutes,
        ]
      },
      ...NotFoundRoutes
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
