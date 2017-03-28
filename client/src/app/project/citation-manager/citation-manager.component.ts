import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { Project, Source } from '../../shared/models/index';

@Component({
  selector: 'rvn-citation-manager',
  templateUrl: './citation-manager.component.html',
  styleUrls: ['./citation-manager.component.scss']
})
export class CitationManagerComponent implements OnInit {

  @Input() public project: Project;

  showNewSourceView: boolean = false;
  activeSource: Source;

  constructor() {
  }

  ngOnInit() {
  }

  handleSelected($event: Source) {
    this.activeSource = $event;
  }
}
