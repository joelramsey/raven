import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'rvn-project-starter-dialog',
  templateUrl: './project-starter-dialog.component.html',
  styleUrls: ['./project-starter-dialog.component.scss']
})
export class ProjectStarterDialogComponent implements OnInit {

  constructor(public mdDialog: MdDialogRef<ProjectStarterDialogComponent>) { }

  ngOnInit() {
  }

}
