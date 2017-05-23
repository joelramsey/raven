import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'rvn-register-dialog',
  templateUrl: 'register-dialog.component.html',
  styleUrls: ['register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<RegisterDialogComponent>) { }

  ngOnInit() {
  }

}
