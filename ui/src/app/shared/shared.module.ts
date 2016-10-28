import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SourcesListComponent } from './sources-list/sources-list.component';
import { SourcePillComponent } from './source-pill/source-pill.component';
import { NewUrlSourceComponent } from './new-source/index';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SourcesListComponent,
    SourcePillComponent,
    NewUrlSourceComponent
  ],
  exports: [
    SourcesListComponent,
    SourcePillComponent,
    NewUrlSourceComponent
  ]
})
export class SharedModule { }
