import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MagazinePublicationType } from '../../../../shared/models/index';
import { AbstractCitationFormComponent } from '../abstract-citation-form/abstract-citation-form.component';

@Component({
  selector: 'rvn-magazine-citation-form',
  templateUrl: './magazine-citation-form.component.html',
  styleUrls: ['./magazine-citation-form.component.scss']
})
export class MagazineCitationFormComponent extends AbstractCitationFormComponent implements OnInit {

  @Input() model: MagazinePublicationType;
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
        vol: '',
        day: '',
        month: '',
        year: '',
        start: '',
        end: '',
        nonconsecutive: '',
      };
    }
  }

}
