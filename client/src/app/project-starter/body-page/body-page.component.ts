import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'rvn-body-page',
  templateUrl: './body-page.component.html',
  styleUrls: ['./body-page.component.scss']
})
export class BodyPageComponent implements OnInit {

  @Input() bodyData = {};
  @Output() cancelled: EventEmitter<any> = new EventEmitter<any>();
  @Output() back: EventEmitter<any> = new EventEmitter<any>();
  @Output() done: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  handleSubmit() {
    this.done.emit(this.bodyData);
  }
}
