import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { SearchResultListItem } from '../../shared/models/index';

@Component({
  selector: 'rvn-record-view',
  templateUrl: './record-view.component.html',
  styleUrls: ['./record-view.component.scss']
})
export class RecordViewComponent implements OnInit {

  @Input() record: SearchResultListItem;
  @Input() addEnabled: boolean = false;

  constructor(public dialogRef: MdDialogRef<RecordViewComponent>) {}

  ngOnInit() {
  }
}
