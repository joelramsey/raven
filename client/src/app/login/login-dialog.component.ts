import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'rvn-login-dialog',
  templateUrl: 'login-dialog.component.html',
  styleUrls: ['login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<LoginDialogComponent>) { }

  ngOnInit() {
  }

}
