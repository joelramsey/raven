import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import {
  LINE_SPACING,
  FONT_SIZE_PX,
  MARGINS
} from '../../shared/models/index';

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


  lineSpacingOptions = LINE_SPACING;
  lineSpacingOptionList = [];

  fontSizeOptions = FONT_SIZE_PX;
  fontSizeOptionList = [];

  marginOptions = MARGINS;
  marginOptionList = [];

  constructor() { }

  ngOnInit() {

    this.lineSpacingOptionList = Object.keys(this.lineSpacingOptions)
      .map(key => {
        return {
          key: key,
          name: this.lineSpacingOptions[key].name
        };
      });
    this.bodyData['lineSpacing'] = this.lineSpacingOptionList[0];

    this.fontSizeOptionList = Object.keys(this.fontSizeOptions)
      .map(key => {
        return {
          key: key,
          name: this.fontSizeOptions[key].name
        };
      });
    this.bodyData['fontSize'] = this.fontSizeOptionList[0];

    this.marginOptionList = Object.keys(this.marginOptions)
      .map(key => {
        return {
          key: key,
          name: this.marginOptions[key].name
        };
      });
    this.bodyData['margin'] = this.marginOptionList[0];
  }

  handleSubmit() {
    this.done.emit(this.bodyData);
  }
}
