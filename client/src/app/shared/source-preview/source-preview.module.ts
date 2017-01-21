import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdTooltipModule, MdIconModule } from '@angular/material';

import { SourcePreviewComponent } from './source-preview.component';

@NgModule({
  imports: [
    CommonModule,
    MdTooltipModule,
    MdIconModule
  ],
  declarations: [
    SourcePreviewComponent
  ],
  exports: [
    SourcePreviewComponent
  ]
})
export class SourcePreviewModule {
}
