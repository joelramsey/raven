import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  CITATION_STYLES,
  PROJECT_TEMPLATE_TYPES
} from '../../shared/models/index';

@Component({
  selector: 'rvn-title-page',
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-page.component.scss']
})
export class TitlePageComponent implements OnInit {

  @Input() titleData = {
  };
  @Output() cancelled: EventEmitter<any> = new EventEmitter<any>();
  @Output() next: EventEmitter<any> = new EventEmitter<any>();

  citationStyles = CITATION_STYLES;
  citationStyleList = [];

  projectTemplateTypes = PROJECT_TEMPLATE_TYPES;
  projectTemplateTypeList = [];

  constructor() { }

  ngOnInit() {
    this.citationStyleList = Object.keys(this.citationStyles)
      .map(key => {
        return {
          key: key,
          name: this.citationStyles[key].name
        }
      });
    this.titleData['citationStyle'] = this.citationStyleList[0];

    this.projectTemplateTypeList = Object.keys(this.projectTemplateTypes)
      .map(key => {
        return {
          key: key,
          name: this.projectTemplateTypes[key].name
        };
      });
    this.titleData['type'] = this.projectTemplateTypeList[0];
  }

  handleSubmit() {
    this.next.emit(this.titleData);
  }
}
