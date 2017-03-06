import { CommonModule } from '@angular/common';
import { MdInputModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { SourceSearchComponent } from './source-search.component';

@NgModule({
  imports: [
    CommonModule,
    MdInputModule
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
