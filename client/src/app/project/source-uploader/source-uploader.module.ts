import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MdCardModule,
  MdButtonModule,
  MdProgressBarModule,
  MdInputModule,
  MdIconModule,
  MdTooltipModule,
  MdDialogModule
} from '@angular/material';
import { FileDropDirective, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

import { SourceUploaderComponent } from './source-uploader.component';
import { SourceConcatPipe, TextSourceParserPipe, FileSourceParserPipe } from './pipes/index';
import { SourcesListModule } from '../../shared/sources-list/sources-list.module';
import { SourceSearchModule } from '../source-search/source-search.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdCardModule,
    MdInputModule,
    MdIconModule,
    MdButtonModule,
    MdTooltipModule,
    MdDialogModule,
    MdProgressBarModule,
    SourcesListModule,
    SourceSearchModule
  ],
  declarations: [
    SourceUploaderComponent,
    SourceConcatPipe,
    FileDropDirective,
    FileSelectDirective,
    TextSourceParserPipe,
    FileSourceParserPipe
  ],
  exports: [
    SourceUploaderComponent
  ],
  providers: [
    TextSourceParserPipe,
    FileSourceParserPipe
  ]
})
export class SourceUploaderModule {
}
