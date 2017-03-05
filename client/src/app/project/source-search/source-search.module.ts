import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SourceSearchComponent } from './source-search.component';

@NgModule({
  imports: [
    CommonModule
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
