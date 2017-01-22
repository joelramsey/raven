import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdTooltipModule, MdIconModule } from '@angular/material';

import { SourcePreviewComponent } from './source-preview.component';
import { SharedPipesModule } from '../pipes/shared-pipes.module';

@NgModule({
  imports: [
    CommonModule,
    MdTooltipModule,
    MdIconModule,
    SharedPipesModule
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
