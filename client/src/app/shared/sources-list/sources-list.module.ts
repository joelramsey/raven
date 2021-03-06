import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdIconModule } from '@angular/material';
import { SourcesListComponent } from './sources-list.component';
import { SourcePillModule } from '../source-pill/source-pill.module';

@NgModule({
  imports: [
    CommonModule,
    MdIconModule,
    MdButtonModule,
    SourcePillModule
  ],
  declarations: [
    SourcesListComponent
  ],
  exports: [
    SourcesListComponent
  ]
})
export class SourcesListModule { }
