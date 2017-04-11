import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Source } from '../../../shared/models/index';

const SOURCE_TYPES = {
  book: {
    key: 'book',
    name: 'Book',
    publicationType: 'pubnonperiodical'
  },
  chapter: {
    key: 'chapter',
    name: 'Chapter',
    publicationType: 'pubnonperiodical'
  },
  journal: {
    key: 'journal',
    name: 'Journal',
    publicationType: 'pubjournal'
  },
  magazine: {
    key: 'magazine',
    name: 'Magazine',
    publicationType: 'pubmagazine'
  },
  newspaper: {
    key: 'newspaper',
    name: 'Newspaper',
    publicationType: ''
  },
  website: {
    key: 'website',
    name: 'Website',
    publicationType: ''
  }
};

const CITATION_STYLES = {
  mla7: 'MLA',
  apa: 'APA',
  chicagob: 'Chicago',
};

@Component({
  selector: 'rvn-citation-editor',
  templateUrl: 'citation-editor.component.html',
  styleUrls: ['citation-editor.component.scss']
})
export class CitationEditorComponent implements OnInit {

  @Input() source: Source;
  @Input() sourceType: any = SOURCE_TYPES.book;
  @Input() citationStyle: string = CITATION_STYLES.mla7;
  @Output() backClicked: EventEmitter<any> = new EventEmitter<any>();

  showContributorForm: boolean = false;
  sourceTypes = SOURCE_TYPES;
  citationStyles = CITATION_STYLES;
  sourceTypeList = [];
  citationStyleList = [];
  contributors = [];

  constructor() { }

  ngOnInit() {
    this.sourceTypeList = Object.keys(this.sourceTypes)
      .map(sourceTypeKey => this.sourceTypes[sourceTypeKey]);

    this.citationStyleList = Object.keys(this.citationStyles)
      .map(citationStyleKey => this.citationStyles[citationStyleKey]);
  }

  saveCitation(citationData: any) {
    console.log(this.sourceType);
    console.log(citationData);
  }

  addContributor($event: any) {
    console.log($event);

    // TODO: Add $event to this.contributors
    this.showContributorForm = false;
  }
}
