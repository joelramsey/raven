import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';
import { User } from '../shared/models/index';
import { environment } from '../../environments/environment';

@Component({
  selector: 'rvn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
              private _router:Router) {

    this._tokenService.init({
      registerAccountPath: environment.api + '/auth',
      validateTokenPath: environment.api + '/auth/validate_token',
      signInPath: environment.api + '/auth/sign_in'
    });
  }

  ngOnInit() {
  }

  logIn() {

    // Do log in
    //
    this._tokenService.signIn(
      this.login.email,
      this.login.password
    ).subscribe(() => {
      this._router.navigate(['/projects']);
    }, (error) => {
      this.errorMessage = error.json().errors;
    });
  }

  register() {

    // Do registration
    //
    this._tokenService.registerAccount(
      this.registration.email,
      this.registration.password,
      this.registration.passwordConfirmation
    ).subscribe(() => {
      this._router.navigate(['/projects']);
    }, (error: Response) => {
      this.errorMessage = error.json().errors.full_messages.join('\n');
    });
  }
}
