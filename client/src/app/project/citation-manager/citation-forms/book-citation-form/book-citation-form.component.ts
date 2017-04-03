import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BookSource } from '../../../../shared/models/index';

@Component({
  selector: 'rvn-book-citation-form',
  templateUrl: './book-citation-form.component.html',
  styleUrls: ['./book-citation-form.component.scss']
})
export class BookCitationFormComponent implements OnInit {

  @Input() model: BookSource;
  @Output() publishData: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    if (!this.model) {
      // Initialize blank model if none is provided
      //
      // this.model = {};
    }
  }

}
