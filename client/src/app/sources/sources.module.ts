import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdCardModule, MdInputModule, MdIconModule, MdButtonModule } from '@angular/material';

import { SourcesComponent } from './sources.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MdCardModule,
    MdInputModule,
    MdIconModule,
    MdButtonModule,
    FormsModule
  ],
  declarations: [
    SourcesComponent
  ],
  exports: [
    SourcesComponent
  ]
})
export class SourcesModule { }
