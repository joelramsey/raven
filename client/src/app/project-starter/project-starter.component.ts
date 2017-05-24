import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'rvn-project-starter',
  templateUrl: './project-starter.component.html',
  styleUrls: ['./project-starter.component.scss']
})
export class ProjectStarterComponent implements OnInit {

  @Output() cancelled: EventEmitter<any> = new EventEmitter<any>();
  @Output() create: EventEmitter<any> = new EventEmitter<any>();

  titleData = {};
  bodyData = {};
  isTitlePage: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  toBody($event) {
    this.titleData = $event;
    this.isTitlePage = false;
  }

  toTitle($event) {
    this.bodyData = $event;
    this.isTitlePage = true;
  }

  done($event) {
    this.bodyData = $event;
    this.create.emit({
      title: this.titleData,
      body: this.bodyData
    });
  }
}
