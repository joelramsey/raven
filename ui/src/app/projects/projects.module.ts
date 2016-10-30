import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdCardModule } from '@angular/material';

import { ProjectsComponent } from './projects.component';
import { ProjectCardComponent } from './project-card/project-card.component';

@NgModule({
  imports: [
    CommonModule,
    MdCardModule
  ],
  declarations: [
    ProjectsComponent,
    ProjectCardComponent
  ],
  exports: [
    ProjectsComponent
  ]
})
export class ProjectsModule { }
