import { Component, OnInit } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';

import { environment } from '../../environments/environment';
import { User } from '../shared/models/index';
import { InitialNavigationService } from '../shared/services/index';
import {Observable} from "rxjs/Observable";

declare const gapi: any;
declare const FB: any;

@Component({
  selector: 'rvn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public auth2: any;
  token: any;
  gauth: any;
  public results: any;

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
              private _initialNavigationService: InitialNavigationService,
              private http: Http) {

    this._tokenService.init({
      registerAccountPath: environment.api + '/auth',
      validateTokenPath: environment.api + '/auth/validate_token',
      signInPath: environment.api + '/auth/sign_in'
    });
  }

  // Here set your Facebook app id
  ngOnInit() {
    FB.init({
      appId      : '1817001431894719',
      status     : true,
      xfbml      : true,
      cookie     : true,
      version    : 'v2.8'
    });
    gapi.load('auth2', () => {
        gapi.auth2.init()
      }
    )
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

  facebookLogin(){
    FB.getLoginStatus((response) => {
      if(response.status === "connected"){
        FB.api('/me?fields=email', (res) => {
          if(!res || res.error){
            this.errorMessage = res.error;
          }else {
            let userDetails = {
              email: res.email,
              uid: res.id,
              provider: "facebook",
              token: response.authResponse.accessToken
            }
            this.sendToBackend('api/auth/facebook', userDetails);
          }
        });
      }
      else {
        FB.login((response) => {
          if(response.status === "connected"){
            FB.api('/me?fields=email', (res) => {
              if(!res || res.error){
                this.errorMessage = res.error
              }else{
                let userDetails = {
                  email: res.email,
                  uid: res.id,
                  provider: "facebook",
                  token: response.authResponse.accessToken
                }
                this.sendToBackend('api/auth/facebook', userDetails);
              }
            });
          }
        }, {scope: 'email'});
      }

    });

  }

  googleLogin(){
    if (typeof(this.gauth) == "undefined"){
      this.gauth = gapi.auth2.getAuthInstance();
    }
    if(!this.gauth.isSignedIn.get()){
      this.gauth.signIn().then(() => {
        this.sendToBackend('api/auth/google', this._fetchGoogleUserDetails());
      });
    }else{
      this.sendToBackend('api/auth/google', this._fetchGoogleUserDetails());
    }


  }

  private _fetchGoogleUserDetails(){
    let currentUser = this.gauth.currentUser.get();
    let profile = currentUser.getBasicProfile();
    let idToken = currentUser.getAuthResponse().id_token;
    return {
      token: idToken,
      uid: profile.getId(),
      name: profile.getName(),
      email: profile.getEmail(),
      image: profile.getImageUrl(),
      provider: "google"
    };
  }

  // send data from auth to back-end to get token
  sendToBackend(url, data){
    let body = JSON.stringify(data);

    let headers = new Headers({ 'Content-Type': 'application/json' });

    // set here correct url in production for sending info to back end

    return this.http.post('https://www.ravenanalytics.io/' + url, body, { headers: headers })
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
      .subscribe(
        data => this.setLocalItems(data),
        error => this.errorMessage = error
      );

  }

  // parse response with token from back end and validate it
  setLocalItems(data){
    localStorage.setItem('accessToken', data['data']['access-token']);
    localStorage.setItem('client', data['data']['client']);
    localStorage.setItem('expiry', data['data']['expiry']);
    localStorage.setItem('tokenType', data['data']['token-type']);
    localStorage.setItem('uid', data['data']['uid']);
    this._tokenService.validateToken();
    location.assign("https://www.ravenanalytics.io");
  }

}
