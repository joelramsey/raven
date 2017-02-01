import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdCardModule, MdButtonToggleModule, MdIconModule, MdButtonModule } from '@angular/material';

import { EntityCardComponent } from './entity-card.component';
import { SourcePreviewModule } from '../source-preview/source-preview.module';

@NgModule({
  imports: [
    CommonModule,
    MdCardModule,
    MdButtonToggleModule,
    MdIconModule,
    MdButtonModule,
    SourcePreviewModule
  ],
  declarations: [
    EntityCardComponent
  ],
  exports: [
    EntityCardComponent
  ]
})
export class EntityCardModule {
}
