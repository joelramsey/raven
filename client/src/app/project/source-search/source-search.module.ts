import { CommonModule } from '@angular/common';
import { MdInputModule, MdListModule, MdProgressSpinnerModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SourceSearchComponent } from './source-search.component';
import { AccordionModule } from '../../shared/accordion/accordion.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MdProgressSpinnerModule,
    MdInputModule,
    MdListModule,
    AccordionModule
  ],
  declarations: [
    SourceSearchComponent
  ],
  exports: [
    SourceSearchComponent
  ]
})
export class SourceSearchModule {
}
