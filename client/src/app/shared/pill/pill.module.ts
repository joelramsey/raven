import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdCardModule, MdIconModule } from '@angular/material';
import { PillComponent } from './pill.component';

@NgModule({
  imports: [
    MdCardModule,
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
