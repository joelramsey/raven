import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProjectsRoutes } from './projects/projects.routes';
import { SourcesRoutes } from './sources/sources.routes';
import { ProjectRoute } from './project/project.route';
import { ProjectModule } from './project/project.module';
import { SourcesModule } from './sources/sources.module';
import { ProjectsModule } from './projects/projects.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot([
      ...ProjectRoute,
      ...ProjectsRoutes,
      ...SourcesRoutes,
      {
        path: '',
        redirectTo: '/project',
        pathMatch: 'full'
      },
    ]),
    HttpModule,
    ProjectModule,
    ProjectsModule,
    SourcesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
