import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

import { Source } from '../../../shared/models/index';

@Component({
  selector: 'rvn-citation-list',
  templateUrl: 'citation-list.component.html',
  styleUrls: ['citation-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CitationListComponent implements OnInit {

  @Input() sources: Array<Source> = [];
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();

  cssClasses = {
    sortAscending: 'material-icons icon-down',
    sortDescending: 'material-icons icon-up',
    pagerLeftArrow: 'material-icons icon-left',
    pagerRightArrow: 'material-icons icon-right',
    pagerPrevious: 'material-icons icon-prev',
    pagerNext: 'material-icons icon-skip'
  };

  constructor() { }

  ngOnInit() {
  }
}
