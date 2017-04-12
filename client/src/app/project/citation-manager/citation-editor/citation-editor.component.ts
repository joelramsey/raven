import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Source } from '../../../shared/models/index';
import { CitationExportService } from '../services/index';

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
    publicationType: 'pubjournal'
  },
  website: {
    key: 'website',
    name: 'Website',
    publicationType: 'pubonline'
  }
};

const CITATION_STYLES = {
  mla7: 'MLA',
  apa: 'APA',
  chicagob: 'Chicago',
};

@Component({
  selector: 'rvn-citation-editor',
  templateUrl: './citation-editor.component.html',
  styleUrls: ['./citation-editor.component.scss']
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

  constructor(private _citationExportService: CitationExportService) { }

  ngOnInit() {
    this.sourceTypeList = Object.keys(this.sourceTypes)
      .map(sourceTypeKey => this.sourceTypes[sourceTypeKey]);

    this.citationStyleList = Object.keys(this.citationStyles)
      .map(citationStyleKey => this.citationStyles[citationStyleKey]);
  }

  saveCitation(citationData: any) {
    this._citationExportService.getCitation(
      this.contributors,
      citationData,
      this.sourceType,
      this.citationStyle
    ).subscribe((formattedCitation: string) => {

      console.log(formattedCitation);

      // TODO: Update record with citation and JSON data
      //
    });
  }

  addContributor($event: any) {
    this.contributors.push($event);
    this.showContributorForm = false;
  }

  get canSave() {
    return this.contributors.length > 0;
  }
}
