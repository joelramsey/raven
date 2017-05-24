import { NgModule } from '@angular/core';
import {
  MdCardModule, MdIconModule, MdButtonModule, MdCheckboxModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ProjectStarterComponent } from './project-starter.component';
import { TitlePageComponent } from './title-page/title-page.component';
import { BodyPageComponent } from './body-page/body-page.component';
import { ProjectStarterDialogComponent } from './project-starter-dialog/project-starter-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MdCardModule,
    MdIconModule,
    MdCheckboxModule,
    MdButtonModule,
  ],
  declarations: [
    ProjectStarterComponent,
    TitlePageComponent,
    BodyPageComponent,
    ProjectStarterDialogComponent
  ],
  exports: [
    ProjectStarterComponent,
    ProjectStarterDialogComponent
  ]
})
export class ProjectStarterModule {
}
