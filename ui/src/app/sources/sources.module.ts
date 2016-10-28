import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SourcesComponent } from './sources.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SourcesComponent
  ],
  exports: [
    SourcesComponent
  ]
})
export class SourcesModule { }
