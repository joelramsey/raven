import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { SearchFacet, SearchFilter, SearchConstants } from '../../shared/models/index';
import { WindowRefService } from '../../shared/services/index';

@Component({
  selector: 'rvn-available-facet',
  templateUrl: './available-facet.component.html',
  styleUrls: ['./available-facet.component.scss']
})
export class AvailableFacetComponent implements OnInit {

  facetTypes = SearchConstants.FACET_TYPES;
  validationMessage = 'Your input doesn\'t look quite right.';
  showValidationMessage = false;

  // For range types
  //
  min: string = '';
  max: string = '';

  @Input() facet: SearchFacet;
  @Output() facetClicked: EventEmitter<SearchFilter> = new EventEmitter<SearchFilter>();

  /**
   * Used for facets which are of a single value (e.g., binary search facets)
   */
  private _facetRef: SearchFacet;

  constructor(private _windowRef: WindowRefService) {
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

  handleRangeClick(label: string, min: string, max: string) {

    if (!this.validRange) {
      this.showValidationMessage = true;
      return;
    }

    this.showValidationMessage = false;

    if (this._facetRef) {
      this._facetRef.value = [+min, +max];
    } else {
      this._facetRef = {
        label: label,
        value: [+min, +max],
        type: this.facet.type
      };
    }

    this.facetClicked.emit(this._facetRef);
  }

  get validRange() {

    // Check for valid input
    //
    if (!this.min ||
      !this.max ||
      this._windowRef.nativeWindow.isNaN(this.min) ||
      this._windowRef.nativeWindow.isNaN(this.max)) {
      return false;
    }

    // Check for correct range
    //
    return +this.min <= +this.max;
  }
}
