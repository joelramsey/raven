import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { Source } from '../models/index';
import { MdTooltip } from '@angular/material';
import { SOURCE_TYPES } from '../models/source.interface';

@Component({
  selector: 'rvn-source-pill',
  templateUrl: './source-pill.component.html',
  styleUrls: ['./source-pill.component.scss']
})
export class SourcePillComponent {

  @Input() source:Source;
  @Input() showIcon:boolean;
  @Input() showVisibilityIcon:boolean;
  @Output() pillClicked: EventEmitter<Source> = new EventEmitter<Source>();
  @ViewChild(MdTooltip) tooltip:MdTooltip;
  
  constructor() { }
  
  handlePillClick() {
    if (this.source && !this.source.disabled) {
      this.pillClicked.emit(this.source);

      // TODO: Remove this once https://github.com/angular/material2/pull/1470 is merged.
      //
      this.tooltip.hide();
    }
  }
  
  get sourceIcon() {
    
    let icon = '';
    
    switch (this.source.type) {
      case SOURCE_TYPES.file:
        icon = 'insert_drive_file';
        break;
      case SOURCE_TYPES.url:
        icon = 'link';
        break;
      case SOURCE_TYPES.text:
        icon = 'text_fields';
        break;
      default:
        icon = '';
    }
    
    return icon;
  }
}
