import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdCardModule, MdButtonModule, MdProgressBarModule } from '@angular/material';
import { FileDropDirective, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

import { NewSourceComponent } from './new-source.component';
import { SourcesListModule } from '../sources-list/sources-list.module';
import { SourceConcatPipe, TextSourceParserPipe, FileSourceParserPipe } from './pipes/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdCardModule,
    MdButtonModule,
    MdProgressBarModule,
    SourcesListModule
  ],
  declarations: [
    NewSourceComponent,
    SourceConcatPipe,
    FileDropDirective,
    FileSelectDirective,
    TextSourceParserPipe,
    FileSourceParserPipe
  ],
  exports: [
    NewSourceComponent
  ],
  providers: [
    TextSourceParserPipe,
    FileSourceParserPipe
  ]
})
export class NewSourceModule {
}