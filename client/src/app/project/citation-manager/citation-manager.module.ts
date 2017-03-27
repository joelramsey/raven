import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MdButtonModule, MdTooltipModule, MdIconModule } from '@angular/material';

import { CitationManagerComponent } from './citation-manager.component';


@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdTooltipModule,
    MdIconModule
  ],
  declarations: [
    CitationManagerComponent
  ],
  exports: [
    CitationManagerComponent
  ],
  entryComponents: [
    CitationManagerComponent
  ]
})
export class CitationManagerModule { }
