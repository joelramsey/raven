import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';

import { environment } from '../../environments/environment';
import { User } from '../shared/models/index';
import { InitialNavigationService } from '../shared/services/index';
// import { OutputComponent } from '../shared/models/output/output.component';

@Component({
  selector: 'rvn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  output: any;

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
      registerAccountPath: 'http://localhost:3000/auth',
      validateTokenPath: 'http://localhost:3000/auth/validate_token',
      signInPath:'http://localhost:3000/auth/sign_in',
      //Use the URL of your server. In routes.rb, all the routes are scoped with /api. I would suggest
      //mounting everything outside the scope
      oAuthBase: 'http://localhost:3000',
      // oAuthPaths: {
      //   facebook:'auth/facebook'
      // },
    });
  }

  ngOnInit() {

  }

  // Submit Data to Backend
  fbSignIn() {

    this.output = null;
    this._tokenService.signInOAuth('facebook').subscribe((res) => {
        console.log(res);
        //Get the login result here.
      
      },
      (error) => {
        //Get login failure here
        console.log(error);
      });
  }

  logIn() {

    this.errorMessage = '';

    // Do log in
    //
    this._tokenService.signIn({
      email: this.login.email,
      password: this.login.password
    }).subscribe(() => {
      this._initialNavigationService.navigate();
    }, (error) => {
      this.errorMessage = error.json().errors;
    });
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
