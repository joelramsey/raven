import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { SearchResultListItem, SearchConstants, SearchFacet } from '../../shared/models/index';

@Component({
  selector: 'rvn-record-view',
  templateUrl: './record-view.component.html',
  styleUrls: ['./record-view.component.scss']
})
export class RecordViewComponent implements OnInit {

  @Input() record: SearchResultListItem;
  @Input() addEnabled: boolean = false;

  private _exclusions = [
    SearchConstants.ERIC_LABEL_MAP.FULLTEXT_AVAILABLE.label,
    SearchConstants.ERIC_LABEL_MAP.PEER_REVIEWED.label
  ];

  constructor(public dialogRef: MdDialogRef<RecordViewComponent>) {}

  ngOnInit() {
  }

  isExclusion(facet: SearchFacet) {
    return this._exclusions.indexOf(facet.label) > -1;
  }

  transformLabel(label: string): string {
    return label.charAt(0).toUpperCase() + label.slice(1);
  }

  transformValue(value): string {

    if (!value || !value.length) {
      return 'N/A';
    } else if (value instanceof Array) {
      return value.toString().replace(/,/g,', ')
    }

    return value;
  }
}
