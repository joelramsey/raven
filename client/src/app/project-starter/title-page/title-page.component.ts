import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CITATION_STYLES } from '../../shared/models/index';
import { PROJECT_TEMPLATE_TYPES } from '../../shared/models/project-template.interface';

@Component({
  selector: 'rvn-title-page',
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-page.component.scss']
})
export class TitlePageComponent implements OnInit {

  @Input() titleData = {
    citationStyle: CITATION_STYLES.mla7
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
      .map(citationStyleKey => this.citationStyles[citationStyleKey]);

    this.projectTemplateTypeList = Object.keys(this.projectTemplateTypes)
      .map(projectTemplateTypeKey => this.projectTemplateTypes[projectTemplateTypeKey]);
  }

  handleSubmit() {
    this.next.emit(this.titleData);
  }
}
