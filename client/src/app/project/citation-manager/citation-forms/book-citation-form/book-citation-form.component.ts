import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NonPeriodicalPublicationType } from '../../../../shared/models/index';
import { AbstractCitationFormComponent } from '../abstract-citation-form/abstract-citation-form.component';

@Component({
  selector: 'rvn-book-citation-form',
  templateUrl: './book-citation-form.component.html',
  styleUrls: ['./book-citation-form.component.scss']
})
export class BookCitationFormComponent extends AbstractCitationFormComponent implements OnInit {

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
    'year'
  ];

  constructor() {
    super();
  }

  ngOnInit() {
    this.setAttributes();
  }
}
