import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MdButtonModule, MdTooltipModule } from '@angular/material';

import { RecordViewComponent } from './record-view.component';


@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdTooltipModule
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
