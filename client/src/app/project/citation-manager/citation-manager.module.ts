import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MdButtonModule, MdTooltipModule, MdIconModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CitationManagerComponent } from './citation-manager.component';
import { CitationListComponent } from './citation-list/citation-list.component';
import { HasCitationPipe } from './pipes/has-citation.pipe';
import { CitationEditorComponent } from './citation-editor/citation-editor.component';


@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdTooltipModule,
    MdIconModule,
    NgxDatatableModule,
  ],
  declarations: [
    CitationManagerComponent,
    CitationListComponent,
    HasCitationPipe,
    CitationEditorComponent
  ],
  exports: [
    CitationManagerComponent
  ],
  entryComponents: [
    CitationManagerComponent
  ]
})
export class CitationManagerModule { }
