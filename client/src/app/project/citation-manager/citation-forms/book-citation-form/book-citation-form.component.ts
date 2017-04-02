import { Component, OnInit, Input } from '@angular/core';
import { BookSource } from '../../../../shared/models/index';

@Component({
  selector: 'rvn-book-citation-form',
  templateUrl: './book-citation-form.component.html',
  styleUrls: ['./book-citation-form.component.scss']
})
export class BookCitationFormComponent implements OnInit {

  @Input() model: BookSource;

  constructor() { }

  ngOnInit() {
  }

}
