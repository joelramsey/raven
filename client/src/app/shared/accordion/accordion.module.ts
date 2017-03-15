import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdIconModule } from '@angular/material';

import { AccordionComponent } from './accordion.component';

@NgModule({
  imports: [
    CommonModule,
    MdIconModule
  ],
  declarations: [
    AccordionComponent
  ],
  exports: [
    AccordionComponent
  ]
})
export class AccordionModule {
}
