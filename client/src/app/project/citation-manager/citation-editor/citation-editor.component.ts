import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Source } from '../../../shared/models/index';

@Component({
  selector: 'rvn-citation-editor',
  templateUrl: './citation-editor.component.html',
  styleUrls: ['./citation-editor.component.scss']
})
export class CitationEditorComponent implements OnInit {

  @Input() source: Source;
  @Output() backClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
