import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { SourcesComponent } from './sources/sources.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsRoutes } from './projects/projects.routes';
import { SourcesRoutes } from './sources/sources.routes';
import { ProjectRoute } from './project/project.route';
import { SourcesListComponent } from './shared/sources-list/sources-list.component';
import { SourcePillComponent } from './shared/source-pill/source-pill.component';
import { NewSourceComponent } from './shared/new-source/index';
import {FileDropDirective} from 'ng2-file-upload/ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    SourcesComponent,
    ProjectComponent,
    SourcesListComponent,
    SourcePillComponent,
    NewSourceComponent,
    FileDropDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
    MaterialModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
