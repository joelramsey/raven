import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token/angular2-token';

import { ProjectDaoService } from '../../../shared/services/index';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'rvn-logged-in-toolbar',
  templateUrl: 'logged-in-toolbar.component.html',
  styleUrls: ['logged-in-toolbar.component.scss']
})
export class LoggedInToolbarComponent implements OnInit {

  @Output() menuClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() signedOut: EventEmitter<any> = new EventEmitter<any>();

  constructor(private projectDaoService: ProjectDaoService,
              private _tokenService: Angular2TokenService,
              private _router: Router) {

    this._tokenService.init({
      validateTokenPath: environment.api + '/auth/validate_token',
      signOutPath: environment.api + '/auth/sign_out'
    });
  }

  ngOnInit() {
  }

  public showProfile() {
    this._router.navigate(['/profile']);
  }

  public signOut() {
    this._tokenService.signOut().subscribe(() => {
      this._router.navigate(['/']);
    }, () => {
      this._router.navigate(['/']);
    });

    this.signedOut.emit();
  }
}
