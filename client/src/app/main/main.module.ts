import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { ProjectsModule } from '../projects/projects.module';
import { ProjectModule } from '../project/project.module';
import { SourcesModule } from '../sources/sources.module';
import { SimpleNotificationsModule } from 'angular2-notifications/components';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot(),
    SimpleNotificationsModule,
    ProjectModule,
    ProjectsModule,
    SourcesModule,
    MainRoutingModule
  ],
  declarations: [
    MainComponent
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule { }
