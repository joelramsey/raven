import { CommonModule } from '@angular/common';
import {
  MdButtonModule, MdIconModule, MdInputModule, MdListModule, MdProgressSpinnerModule,
  MdCheckboxModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SourceSearchComponent } from './source-search.component';
import { AccordionModule } from '../../shared/accordion/accordion.module';
import { PillListModule } from '../../shared/pill-list/pill-list.module';
import { InPlaceFilterService } from './in-place-filter.service';
import { AvailableFacetComponent } from '../available-facet/available-facet.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdCheckboxModule,
    MdProgressSpinnerModule,
    AccordionModule,
    PillListModule
  ],
  declarations: [
    SourceSearchComponent,
    AvailableFacetComponent
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
