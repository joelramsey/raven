import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdCardModule, MdListModule } from '@angular/material';

import { EntityCardComponent } from './entity-card.component';
import { SourcePreviewModule } from '../source-preview/source-preview.module';

@NgModule({
  imports: [
    CommonModule,
    MdCardModule,
    MdListModule,
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
