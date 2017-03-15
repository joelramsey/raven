import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rvn-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.scss']
})
export class PillComponent {

  @Input() text:string;
  @Input() model:any;
  @Input() modelTitleAttribute:string;
  @Input() primaryIcon:string;
  @Input() secondayIcon:string;
  @Input() showPrimaryIcon:boolean;
  @Input() showSecondaryIcon:boolean;
  @Output() pillClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  handlePillClick() {
    this.pillClicked.emit(this.model);
  }
}
