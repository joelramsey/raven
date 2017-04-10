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
  @Output() publishData: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    super();
  }

  ngOnInit() {
    if (!this.model) {
      // Initialize blank model if none is provided
      //
      this.model = {
        title: '',
        issue: '',
        volume: '',
        restarts: '',
        series: '',
        year: '',
        start: '',
        end: '',
        nonconsecutive: '',
      };
    }
  }

}
