import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rvn-chapter-citation-form',
  templateUrl: 'chapter-citation-form.component.html',
  styleUrls: ['chapter-citation-form.component.scss']
})
export class ChapterCitationFormComponent implements OnInit {

  @Output() publishData: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
