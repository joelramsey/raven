import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Source } from '../models/source.interface';

@Component({
  selector: 'rvn-source-pill',
  templateUrl: './source-pill.component.html',
  styleUrls: ['./source-pill.component.scss']
})
export class SourcePillComponent implements OnInit {

  @Input() source:Source;
  @Output() pillClickEventEmitter: EventEmitter<Source> = new EventEmitter<Source>();
  
  constructor() { }

  ngOnInit() {
  }
  
  pillClicked() {
    if (this.source && !this.source.disabled) {
      this.pillClickEventEmitter.emit(this.source);
      console.log(this.source);
    }
  }
}
