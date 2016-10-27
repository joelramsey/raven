import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SourcesListComponent } from './sources-list/sources-list.component';
import { SourcePillComponent } from './source-pill/source-pill.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SourcesListComponent,
    SourcePillComponent
  ],
  exports: [
    SourcesListComponent,
    SourcePillComponent
  ]
})
export class SharedModule { }
