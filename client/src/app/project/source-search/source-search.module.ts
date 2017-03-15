import { CommonModule } from '@angular/common';
import { MdInputModule, MdListModule, MdProgressSpinnerModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SourceSearchComponent } from './source-search.component';
import { AccordionModule } from '../../shared/accordion/accordion.module';
import { PillListModule } from '../../shared/pill-list/pill-list.module';
import { InPlaceFilterService } from './in-place-filter.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MdProgressSpinnerModule,
    MdInputModule,
    MdListModule,
    AccordionModule,
    PillListModule
  ],
  declarations: [
    SourceSearchComponent
  ],
  exports: [
    SourceSearchComponent
  ],
  providers: [
    InPlaceFilterService
  ]
})
export class SourceSearchModule {
}
