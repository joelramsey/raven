import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'rvn-title-page',
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-page.component.scss']
})
export class TitlePageComponent implements OnInit {

  @Input() titleData = {};
  @Output() cancelled: EventEmitter<any> = new EventEmitter<any>();
  @Output() next: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  handleSubmit() {
    this.next.emit(this.titleData);
  }
}
