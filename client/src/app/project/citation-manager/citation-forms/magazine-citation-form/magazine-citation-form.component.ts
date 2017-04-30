import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MagazinePublicationType, SourceData } from '../../../../shared/models/index';
import { AbstractCitationFormComponent } from '../abstract-citation-form/abstract-citation-form.component';

@Component({
  selector: 'rvn-magazine-citation-form',
  templateUrl: './magazine-citation-form.component.html',
  styleUrls: ['./magazine-citation-form.component.scss']
})
export class MagazineCitationFormComponent extends AbstractCitationFormComponent implements OnInit {

  @Input() model: MagazinePublicationType;
  @Input() sourceData: SourceData;
  @Input() saveDisabled: boolean;
  @Output() publishData: EventEmitter<any> = new EventEmitter<any>();

  public attributes: Array<string> = [
    'title',
    'vol',
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
    this.sourceData.title = '';
  }

}
