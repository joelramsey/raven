import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'rvn-magazine-citation-form',
  templateUrl: './magazine-citation-form.component.html',
  styleUrls: ['./magazine-citation-form.component.scss']
})
export class MagazineCitationFormComponent implements OnInit {

  @Output() publishData: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
