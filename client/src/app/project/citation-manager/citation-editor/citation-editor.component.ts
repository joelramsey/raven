import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ObservableResultHandlerService } from '../../../shared/services/index';
import { Source, CitationRequest } from '../../../shared/models/index';
import { CitationDaoService } from '../services/index';

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
  mla7: {
    key: 'mla7',
    name: 'MLA'
  },
  apa: {
    key: 'apa',
    name: 'APA'
  },
  chicagob: {
    key: 'chicagob',
    name: 'Chicago'
  },
};

@Component({
  selector: 'rvn-citation-editor',
  templateUrl: './citation-editor.component.html',
  styleUrls: ['./citation-editor.component.scss']
})
export class CitationEditorComponent implements OnInit {

  @Input() source: Source;
  @Input() sourceType: any = SOURCE_TYPES.book;
  @Input() citationStyle: any = CITATION_STYLES.mla7;
  @Output() backClicked: EventEmitter<any> = new EventEmitter<any>();

  showContributorForm: boolean = true;
  sourceTypes = SOURCE_TYPES;
  citationStyles = CITATION_STYLES;
  sourceTypeList = [];
  citationStyleList = [];
  contributors = [];
  citationData = {};
  sourceData = {};

  constructor(private _citationDao: CitationDaoService,
              private _observableResultHandlerService: ObservableResultHandlerService) {
  }

  ngOnInit() {
    this.sourceTypeList = Object.keys(this.sourceTypes)
      .map(sourceTypeKey => this.sourceTypes[sourceTypeKey]);

    this.citationStyleList = Object.keys(this.citationStyles)
      .map(citationStyleKey => this.citationStyles[citationStyleKey]);

    if (this.source.record.citation) {
      let json = JSON.parse(this.source.record.citation.json);
      this.contributors = json.contributors;
      this.sourceType = this.sourceTypes[json.source];
      this.citationStyle = this.citationStyles[json.style];
      this.citationData = json[json.pubtype.main];
      this.sourceData = json[json.source];
    }
  }

  saveCitation(citationData: any) {

    let data: CitationRequest = {
      key: '0766166f184cebd0adb65ea9dd89b4a8',
      source: this.sourceType.key,
      style: this.citationStyle.key,
      pubtype: {
        main: this.sourceType.publicationType,
      },
      contributors: this.contributors
    };

    data[this.sourceType.publicationType] = citationData.model;
    data[this.sourceType.key] = citationData.sourceData;

    this._citationDao.getCitation(data)
      .switchMap((formattedCitation: string) => {
        return this._citationDao.createCitation(this.source, formattedCitation, data);
      })
      .subscribe(() => {
        this._observableResultHandlerService.success('Citation saved!');
      }, (error: any) => {
        this._observableResultHandlerService.failure(error);
      });
  }

  addContributor($event: any) {

    if (!this.contributors) {
      this.contributors = [];
    }

    this.contributors.push($event);
    this.showContributorForm = false;
  }

  get canSave() {
    return this.contributors && this.contributors.length > 0;
  }
}
