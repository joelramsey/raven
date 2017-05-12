import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NonPeriodicalPublicationType, SourceData } from '../../../../shared/models/index';
import { AbstractCitationFormComponent } from '../abstract-citation-form/abstract-citation-form.component';

const SOURCE_DATA_TYPES = {
  chapter: 'Chapter',
  essay: 'Essay'
};

@Component({
  selector: 'rvn-chapter-citation-form',
  templateUrl: './chapter-citation-form.component.html',
  styleUrls: ['./chapter-citation-form.component.scss']
})
export class ChapterCitationFormComponent extends AbstractCitationFormComponent implements OnInit {

  @Input() model: NonPeriodicalPublicationType;
  @Input() sourceData: SourceData;
  @Input() saveDisabled: boolean;
  @Output() publishData: EventEmitter<any> = new EventEmitter<any>();

  sourceDataTypes = SOURCE_DATA_TYPES;
  sourceDataTypeList = [];

  public attributes: Array<string> = [
    'title',
    'publisher',
    'city',
    'state',
    'vol',
    'editiontext',
    'year',
    'start',
    'end'
  ];

  constructor() {
    super();
  }

  ngOnInit() {
    this.setAttributes();

    if (!this.sourceData) {
      this.sourceData.title = '';
      this.sourceData.type = 'chapter';
    }

    this.sourceDataTypeList = Object.keys(this.sourceDataTypes)
      .map(sourceDataTypeKey => {
        return {
          value: sourceDataTypeKey,
          name: this.sourceDataTypes[sourceDataTypeKey]
        };
      });
  }
}
