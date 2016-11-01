import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ProjectComponent } from './project.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { MdCardModule } from '@angular/material';

@NgModule({
  imports: [
    SharedModule,
    MdCardModule
  ],
  declarations: [
    ProjectComponent,
    ProjectViewComponent
  ],
  exports: [
    ProjectComponent
  ]
})
export class ProjectModule { }
