import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewSourceModule } from './new-source/new-source.module';
import { SourcesListModule } from './sources-list/sources-list.module';
import { SourcePillModule } from './source-pill/source-pill.module';

@NgModule({
  imports: [
    CommonModule,
    NewSourceModule,
    SourcesListModule,
    SourcePillModule
  ]
})
export class SharedModule { }
