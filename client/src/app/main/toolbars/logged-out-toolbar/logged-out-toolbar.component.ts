import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MdDialog } from '@angular/material';

import { LoginDialogComponent } from '../../../login/login-dialog.component';

@Component({
  selector: 'rvn-logged-out-toolbar',
  templateUrl: 'logged-out-toolbar.component.html',
  styleUrls: ['logged-out-toolbar.component.scss']
})
export class LoggedOutToolbarComponent implements OnInit {

  @Output() loggedIn: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _dialog: MdDialog) { }

  ngOnInit() {
  }

  showLogin() {
    this._dialog.open(LoginDialogComponent, {
      width: '300px',
      // height: '90%'
    })
      .afterClosed()
      .subscribe(success => {
        if (success) {
          this.loggedIn.emit()
        }
      });
  }
}
