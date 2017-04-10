import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NewspaperPublicationType } from '../../../../shared/models/index';
import { AbstractCitationFormComponent } from '../abstract-citation-form/abstract-citation-form.component';

@Component({
  selector: 'rvn-newspaper-citation-form',
  templateUrl: './newspaper-citation-form.component.html',
  styleUrls: ['./newspaper-citation-form.component.scss']
})
export class NewspaperCitationFormComponent extends AbstractCitationFormComponent implements OnInit {

  @Input() model: NewspaperPublicationType;
  @Output() publishData: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    super();
  }

  ngOnInit() {
    if (!this.model) {
      this.model = {
        title: '',
        edition: '',
        section: '',
        city: '',
        day: '',
        month: '',
        year: '',
        start: '',
        end: '',
        nonconsecutive: '',
      }
    }
  }

}
