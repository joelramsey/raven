import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MdButtonModule } from '@angular/material';

import { RecordViewComponent } from './record-view.component';


@NgModule({
  imports: [
    CommonModule,
    MdButtonModule
  ],
  declarations: [
    RecordViewComponent
  ],
  exports: [
    RecordViewComponent
  ],
  entryComponents: [
    RecordViewComponent
  ]
})
export class RecordViewModule { }
