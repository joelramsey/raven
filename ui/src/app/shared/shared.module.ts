import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SourcesListComponent } from './sources-list/sources-list.component';
import { SourcePillComponent } from './source-pill/source-pill.component';
import { NewSourceComponent } from './new-source/index';
import {FileDropDirective} from 'ng2-file-upload/ng2-file-upload';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SourcesListComponent,
    SourcePillComponent,
    NewSourceComponent,
    FileDropDirective
  ],
  exports: [
    SourcesListComponent,
    SourcePillComponent,
    NewSourceComponent
  ]
})
export class SharedModule { }
