import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';

import { environment } from '../../environments/environment';
import { User } from '../shared/models/index';
import { InitialNavigationService } from '../shared/services/index';

@Component({
  selector: 'rvn-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public errorMessage:string = '';

  public login:User = {
    email: '',
    password: ''
  };

  public registration:User = {
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  constructor(private _tokenService:Angular2TokenService,
              private _initialNavigationService: InitialNavigationService) {

    this._tokenService.init({
      registerAccountPath: environment.api + '/auth',
      validateTokenPath: environment.api + '/auth/validate_token',
      signInPath: environment.api + '/auth/sign_in'
    });
  }

  ngOnInit() {
  }

  register() {

    // Do registration
    //
    this._tokenService.registerAccount({
      email: this.registration.email,
      password: this.registration.password,
      passwordConfirmation: this.registration.passwordConfirmation
    }).subscribe(() => {
      this._initialNavigationService.navigate();
    }, (error: Response) => {
      this.login.password = '';
      this.errorMessage = error.json().errors.full_messages.join('\n');
    });
  }
}
