import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdIconModule } from '@angular/material';
import { PillListComponent } from './pill-list.component';
import { PillModule } from '../pill/pill.module';

@NgModule({
  imports: [
    CommonModule,
    MdIconModule,
    PillModule
  ],
  declarations: [
    PillListComponent
  ],
  exports: [
    PillListComponent
  ]
})
export class PillListModule { }
