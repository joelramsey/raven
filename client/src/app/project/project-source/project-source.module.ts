import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MdCardModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { SourceUploaderModule } from '../source-uploader/source-uploader.module';

import { ProjectSourceComponent } from './project-source.component';

@NgModule({
  imports: [
    CommonModule,
    MdCardModule,
    SourceUploaderModule,
    RouterModule
  ],
  declarations: [
    ProjectSourceComponent,
  ],
  exports: [
    ProjectSourceComponent
  ]
})
export class ProjectSourceModule {
}
