import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdCardModule, MdInputModule, MdButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { ProjectsComponent } from './projects.component';
import { ProjectCardComponent } from './project-card/project-card.component';

@NgModule({
  imports: [
    CommonModule,
    MdCardModule,
    MdButtonModule,
    MdInputModule,
    FormsModule
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
