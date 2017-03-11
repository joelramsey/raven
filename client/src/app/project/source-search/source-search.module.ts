import { CommonModule } from '@angular/common';
import { MdInputModule, MdListModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SourceSearchComponent } from './source-search.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MdInputModule,
    MdListModule
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
