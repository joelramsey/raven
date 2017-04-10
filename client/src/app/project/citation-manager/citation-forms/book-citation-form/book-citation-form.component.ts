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
        publisher: '',
        city: '',
        state: '',
        vol: '',
        editiontext: '',
        year: '',
        start: '',
        end: ''
      };
    }
  }
}
