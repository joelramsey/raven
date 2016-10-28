import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { Source } from '../models/index';
import { MdTooltip } from '@angular/material';

@Component({
  selector: 'rvn-source-pill',
  templateUrl: './source-pill.component.html',
  styleUrls: ['./source-pill.component.scss']
})
export class SourcePillComponent {

  @Input() source:Source;
  @Output() pillClickEventEmitter: EventEmitter<Source> = new EventEmitter<Source>();
  @ViewChild(MdTooltip) tooltip:MdTooltip;
  
  constructor() { }
  
  pillClicked() {
    if (this.source && !this.source.disabled) {
      this.pillClickEventEmitter.emit(this.source);

      // TODO: Remove this once https://github.com/angular/material2/pull/1470 is merged.
      //
      this.tooltip.hide();
    }
  }
}
