import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NewspaperPublicationType, SourceData } from '../../../../shared/models/index';
import { AbstractCitationFormComponent } from '../abstract-citation-form/abstract-citation-form.component';

@Component({
  selector: 'rvn-newspaper-citation-form',
  templateUrl: './newspaper-citation-form.component.html',
  styleUrls: ['./newspaper-citation-form.component.scss']
})
export class NewspaperCitationFormComponent extends AbstractCitationFormComponent implements OnInit {

  @Input() model: NewspaperPublicationType;
  @Input() sourceData: SourceData;
  @Input() saveDisabled: boolean;
  @Output() publishData: EventEmitter<any> = new EventEmitter<any>();

  public attributes: Array<string> = [
    'title',
    'edition',
    'section',
    'city',
    'day',
    'month',
    'year',
    'start',
    'end',
    'nonconsecutive'
  ];

  constructor() {
    super();
  }

  ngOnInit() {
    this.setAttributes();

    if (!this.sourceData) {
      this.sourceData.title = '';
    }
  }

}
