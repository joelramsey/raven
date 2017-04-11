import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rvn-journal-citation-form',
  templateUrl: 'journal-citation-form.component.html',
  styleUrls: ['journal-citation-form.component.scss']
})
export class JournalCitationFormComponent implements OnInit {

  @Output() publishData: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
