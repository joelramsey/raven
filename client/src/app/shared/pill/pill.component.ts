import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { MdTooltip } from '@angular/material';
import { PillModel } from '../models/index';

@Component({
  selector: 'rvn-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.scss']
})
export class PillComponent {

  @Input() text:string;
  @Input() model:PillModel;
  @Input() primaryIcon:string;
  @Input() secondayIcon:string;
  @Input() showPrimaryIcon:boolean;
  @Input() showSecondaryIcon:boolean;
  @Output() pillClicked: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(MdTooltip) tooltip:MdTooltip;

  constructor() { }

  handlePillClick() {
    this.pillClicked.emit(this.model);
  }
}
