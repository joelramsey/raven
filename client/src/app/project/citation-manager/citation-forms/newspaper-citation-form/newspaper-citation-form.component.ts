import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rvn-newspaper-citation-form',
  templateUrl: 'newspaper-citation-form.component.html',
  styleUrls: ['newspaper-citation-form.component.scss']
})
export class NewspaperCitationFormComponent implements OnInit {

  @Output() publishData: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
