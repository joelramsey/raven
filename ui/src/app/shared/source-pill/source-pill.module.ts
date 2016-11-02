import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdCardModule, MdTooltipModule, MdIconModule } from '@angular/material';
import { SourcePillComponent } from './source-pill.component';

@NgModule({
  imports: [
    MdCardModule,
    MdTooltipModule,
    MdIconModule,
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
