import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { ProjectModule } from './project/project.module';
import { SourcesModule } from './sources/sources.module';
import { ProjectsModule } from './projects/projects.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    HttpModule,
    AppRoutingModule,
    ProjectModule,
    ProjectsModule,
    SourcesModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }