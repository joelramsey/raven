import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SourcePreviewComponent } from './source-preview.component';

@NgModule({
  imports: [
    CommonModule
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
