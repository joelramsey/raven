import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rvn-website-citation-form',
  templateUrl: 'website-citation-form.component.html',
  styleUrls: ['website-citation-form.component.scss']
})
export class WebsiteCitationFormComponent implements OnInit {

  @Output() publishData: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
