import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { OnlinePublicationType } from '../../../../shared/models/index';
import { AbstractCitationFormComponent } from '../abstract-citation-form/abstract-citation-form.component';

@Component({
  selector: 'rvn-website-citation-form',
  templateUrl: './website-citation-form.component.html',
  styleUrls: ['./website-citation-form.component.scss']
})
export class WebsiteCitationFormComponent extends AbstractCitationFormComponent implements OnInit {

  @Input() model: OnlinePublicationType;
  @Output() publishData: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    super();
  }

  ngOnInit() {
    if (!this.model) {
      this.model = {
        title: '',
        inst: '',
        day: '',
        month: '',
        year: '',
        url: '',
        dayaccessed: '',
        monthaccessed: '',
        yearaccessed: ''
      }
    }
  }

}
