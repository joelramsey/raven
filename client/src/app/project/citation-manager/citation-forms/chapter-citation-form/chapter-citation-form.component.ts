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
