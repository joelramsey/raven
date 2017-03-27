import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MdButtonModule, MdCardModule, MdTooltipModule, MdIconModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CitationManagerComponent } from './citation-manager.component';
import { CitationListComponent } from './citation-list/citation-list.component';
import { HasCitationPipe } from './pipes/has-citation.pipe';
import { CitationEditorComponent } from './citation-editor/citation-editor.component';
import { AccordionModule } from '../../shared/accordion/accordion.module';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdCardModule,
    MdTooltipModule,
    MdIconModule,
    NgxDatatableModule,
    AccordionModule
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
