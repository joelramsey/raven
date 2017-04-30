import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { OnlinePublicationType, SourceData } from '../../../../shared/models/index';
import { AbstractCitationFormComponent } from '../abstract-citation-form/abstract-citation-form.component';

@Component({
  selector: 'rvn-website-citation-form',
  templateUrl: './website-citation-form.component.html',
  styleUrls: ['./website-citation-form.component.scss']
})
export class WebsiteCitationFormComponent extends AbstractCitationFormComponent implements OnInit {

  @Input() model: OnlinePublicationType;
  @Input() sourceData: SourceData;
  @Input() saveDisabled: boolean;
  @Output() publishData: EventEmitter<any> = new EventEmitter<any>();

  public attributes: Array<string> = [
    'title',
    'inst',
    'day',
    'month',
    'year',
    'url',
    'dayaccessed',
    'monthaccessed',
    'yearaccessed'
  ];

  constructor() {
    super();
  }

  ngOnInit() {
    this.setAttributes();
    this.sourceData.title = '';
  }

}
