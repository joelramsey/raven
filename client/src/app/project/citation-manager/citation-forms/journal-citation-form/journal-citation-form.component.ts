import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { JournalPublicationType } from '../../../../shared/models/index';
import { AbstractCitationFormComponent } from '../abstract-citation-form/abstract-citation-form.component';

@Component({
  selector: 'rvn-journal-citation-form',
  templateUrl: './journal-citation-form.component.html',
  styleUrls: ['./journal-citation-form.component.scss']
})
export class JournalCitationFormComponent extends AbstractCitationFormComponent implements OnInit {

  @Input() model: JournalPublicationType;
  @Input() saveDisabled: boolean;
  @Output() publishData: EventEmitter<any> = new EventEmitter<any>();

  public attributes: Array<string> = [
    'title',
    'issue',
    'volume',
    'restarts',
    'series',
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
  }

}
