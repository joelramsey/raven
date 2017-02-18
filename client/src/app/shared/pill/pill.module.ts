import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdCardModule, MdTooltipModule, MdIconModule } from '@angular/material';
import { PillComponent } from './pill.component';

@NgModule({
  imports: [
    MdCardModule,
    MdTooltipModule,
    MdIconModule,
    CommonModule
  ],
  declarations: [
    PillComponent
  ],
  exports: [
    PillComponent
  ]
})
export class PillModule {
}
