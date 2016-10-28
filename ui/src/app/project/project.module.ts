import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { NewSourceModule } from '../shared/new-source/new-source.module';
import { ProjectComponent } from './project.component';
import { SourcesListModule } from '../shared/sources-list/sources-list.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NewSourceModule,
    SourcesListModule
  ],
  declarations: [
    ProjectComponent
  ],
  exports: [
    ProjectComponent
  ]
})
export class ProjectModule { }
