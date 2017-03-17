import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchFacet, SearchFilter } from '../../shared/models/index';

@Component({
  selector: 'rvn-available-facet',
  templateUrl: './available-facet.component.html',
  styleUrls: ['./available-facet.component.scss']
})
export class AvailableFacetComponent implements OnInit {

  @Input() facet: SearchFacet;
  @Output() facetClicked: EventEmitter<SearchFilter> = new EventEmitter<SearchFilter>();

  constructor() { }

  ngOnInit() {
  }

  handleFacetClick(label: string, value: any) {
    console.log(label);
    console.log(value);
    this.facetClicked.emit({
      label: label,
      value: value
    });
  }
}
