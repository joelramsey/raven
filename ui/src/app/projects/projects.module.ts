import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsComponent } from './projects.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProjectsComponent
  ],
  exports: [
    ProjectsComponent
  ]
})
export class ProjectsModule { }
