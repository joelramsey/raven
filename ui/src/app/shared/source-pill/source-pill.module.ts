import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SourcePillComponent } from './source-pill.component';
import { MdCardModule, MdTooltipModule } from '@angular/material';

@NgModule({
  imports: [
    MdCardModule,
    MdTooltipModule,
    CommonModule
  ],
  declarations: [
    SourcePillComponent
  ],
  exports: [
    SourcePillComponent
  ]
})
export class SourcePillModule {
}
