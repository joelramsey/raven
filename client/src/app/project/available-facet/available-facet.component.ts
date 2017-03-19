import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchFacet, SearchFilter } from '../../shared/models/index';
import { SearchConstants } from '../../shared/models/search-result.interface';

@Component({
  selector: 'rvn-available-facet',
  templateUrl: './available-facet.component.html',
  styleUrls: ['./available-facet.component.scss']
})
export class AvailableFacetComponent implements OnInit {

  facetTypes = SearchConstants.FACET_TYPES;

  @Input() facet: SearchFacet;
  @Output() facetClicked: EventEmitter<SearchFilter> = new EventEmitter<SearchFilter>();

  /**
   * Used for facets which are of a single value (e.g., binary search facets)
   */
  private _facetRef: SearchFacet;

  constructor() {
  }

  ngOnInit() {
  }

  handleFacetClick(label: string, value: any) {

    if (this._facetRef) {
      this._facetRef.value = value;
    } else {
      this._facetRef = {
        label: label,
        value: value,
        type: this.facet.type
      };
    }

    this.facetClicked.emit(this._facetRef);
  }
}
