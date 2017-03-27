import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { Project } from '../../shared/models/index';

@Component({
  selector: 'rvn-citation-manager',
  templateUrl: './citation-manager.component.html',
  styleUrls: ['./citation-manager.component.scss']
})
export class CitationManagerComponent implements OnInit {

  @Input() public project: Project;

  showNewSourceView: boolean = false;

  constructor(public dialogRef: MdDialogRef<CitationManagerComponent>) {}

  ngOnInit() {
  }
}
