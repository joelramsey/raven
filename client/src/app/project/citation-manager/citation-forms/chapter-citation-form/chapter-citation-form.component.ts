import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NonPeriodicalPublicationType } from '../../../../shared/models/index';
import { AbstractCitationFormComponent } from '../abstract-citation-form/abstract-citation-form.component';

@Component({
  selector: 'rvn-chapter-citation-form',
  templateUrl: './chapter-citation-form.component.html',
  styleUrls: ['./chapter-citation-form.component.scss']
})
export class ChapterCitationFormComponent extends AbstractCitationFormComponent implements OnInit {

  @Input() model: NonPeriodicalPublicationType;
  @Input() saveDisabled: boolean;
  @Output() publishData: EventEmitter<any> = new EventEmitter<any>();

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
  }

}
