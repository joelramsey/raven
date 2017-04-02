import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Source } from '../../../shared/models/index';

@Component({
  selector: 'rvn-citation-editor',
  templateUrl: './citation-editor.component.html',
  styleUrls: ['./citation-editor.component.scss']
})
export class CitationEditorComponent implements OnInit {

  @Input() source: Source;
  @Input() sourceType: string = 'Book';
  @Output() backClicked: EventEmitter<any> = new EventEmitter<any>();
  sourceTypesList = [];

  SOURCE_TYPES = {
    book: 'Book',
    chapter: 'Chapter',
    journal: 'Journal',
    magazine: 'Magazine',
    newspaper: 'Newspaper',
    website: 'Website'
  };

  constructor() { }

  ngOnInit() {
    this.sourceTypesList = Object.keys(this.SOURCE_TYPES)
      .map(sourceTypeKey => this.SOURCE_TYPES[sourceTypeKey]);
  }

}
