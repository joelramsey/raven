import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MdButtonModule, MdCardModule, MdTooltipModule, MdIconModule, MdSelectModule,
  MdInputModule, MdCheckboxModule
} from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CitationManagerComponent } from './citation-manager.component';
import { CitationListComponent } from './citation-list/citation-list.component';
import { HasCitationPipe } from './pipes/has-citation.pipe';
import { CitationEditorComponent } from './citation-editor/citation-editor.component';
import { AccordionModule } from '../../shared/accordion/accordion.module';
import { ChapterCitationFormComponent } from './citation-forms/chapter-citation-form/chapter-citation-form.component';
import { BookCitationFormComponent } from './citation-forms/book-citation-form/book-citation-form.component';
import { MagazineCitationFormComponent } from './citation-forms/magazine-citation-form/magazine-citation-form.component';
import { NewspaperCitationFormComponent } from './citation-forms/newspaper-citation-form/newspaper-citation-form.component';
import { JournalCitationFormComponent } from './citation-forms/journal-citation-form/journal-citation-form.component';
import { WebsiteCitationFormComponent } from './citation-forms/website-citation-form/website-citation-form.component';
import { ContributorFormComponent } from './citation-forms/contributor-form/contributor-form.component';
import { CitationExportService } from './services/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdButtonModule,
    MdCardModule,
    MdTooltipModule,
    MdIconModule,
    MdInputModule,
    MdCheckboxModule,
    MdSelectModule,
    NgxDatatableModule,
    AccordionModule
  ],
  declarations: [
    CitationManagerComponent,
    CitationListComponent,
    HasCitationPipe,
    CitationEditorComponent,
    ChapterCitationFormComponent,
    BookCitationFormComponent,
    MagazineCitationFormComponent,
    NewspaperCitationFormComponent,
    JournalCitationFormComponent,
    WebsiteCitationFormComponent,
    ContributorFormComponent
  ],
  exports: [
    CitationManagerComponent
  ],
  entryComponents: [
    CitationManagerComponent
  ],
  providers: [
    CitationExportService
  ]
})
export class CitationManagerModule {
}
