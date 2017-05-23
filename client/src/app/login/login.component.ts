import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';

import { environment } from '../../environments/environment';
import { User } from '../shared/models/index';
import { Observable } from "rxjs/Observable";

declare const gapi: any;
declare const FB: any;
declare const IN: any;
declare const Codebird: any;

@Component({
  selector: 'rvn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() loggedIn: EventEmitter<any> = new EventEmitter<any>();

  public auth2: any;
  token: any;
  gauth: any;
  public results: any;
  public errorMessage:string = '';
  public cb: any;

  public login: User = {
    email: '',
    password: ''
  };

  public registration: User = {
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  constructor(private _tokenService: Angular2TokenService,
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
      appId: '1817001431894719',
      status: true,
      xfbml: true,
      cookie: true,
      version: 'v2.8'
    });
    gapi.load('auth2', () => {
        gapi.auth2.init()
      }
    );

    this.cb = new Codebird;
    this.cb.setConsumerKey("iqBIJ8ZVYPwPS3fdPqzd9bQxa", "zhGwtjtww9MXSDxF5CwL03dKQJz6Y3X4EKrVGOvYlzdquuIuKf");
    this.cb.setUseProxy(false);
  }

  logIn() {

    this.errorMessage = '';

    // Do log in
    //
    this._tokenService.signIn({
      email: this.login.email,
      password: this.login.password
    }).subscribe(() => {
      this.loggedIn.emit();
    }, (error) => {
      this.errorMessage = error.json().errors;
    });
  }

  facebookLogin() {
    FB.getLoginStatus((response) => {
      if (response.status === "connected") {
        FB.api('/me?fields=email', (res) => {
          if (!res || res.error) {
            this.errorMessage = res.error;
          } else {
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
          if (response.status === "connected") {
            FB.api('/me?fields=email', (res) => {
              if (!res || res.error) {
                this.errorMessage = res.error
              } else {
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

  linkeidLogin(){
    let _this = this;

    IN.User.authorize(function(){
      // called when thre was auth success

      IN.API.Profile("me").fields("first-name", "last-name", "email-address", "picture-url", "id").result(function (res) {
        _this.sendToBackend('api/auth/linkedin', res);
      }).error(function (err) {
        this.errorMessage = err;
      });
    }, function () {
      // will be called anyway
    });
  }

  twitterLogin(){

    let _this = this;

    let headers = new Headers({ 'Content-Type': 'application/json' });

    // set here correct url in production for sending info to back end

    return this.http.get('https://ravenanalytics.io/api/twitter-request-token', headers)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
      .subscribe(
        data => _this.openAuthWindow(data),
        error => _this.errorMessage = error
      );
  }

  openAuthWindow(reply){
  localStorage.setItem('twRequestToken', reply['data']['token']);
  localStorage.setItem('twRequestSecret', reply['data']['secret']);
  window.open(reply['data']['url'], 'targetWindow','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=650,height=500');
}


googleLogin(){
    if (typeof(this.gauth) == "undefined"){
      this.gauth = gapi.auth2.getAuthInstance();
    }
    if (!this.gauth.isSignedIn.get()) {
      this.gauth.signIn().then(() => {
        this.sendToBackend('api/auth/google', this._fetchGoogleUserDetails());
      });
    } else {
      this.sendToBackend('api/auth/google', this._fetchGoogleUserDetails());
    }


  }

  private _fetchGoogleUserDetails() {
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
  sendToBackend(url, data) {
    let body = JSON.stringify(data);

    let headers = new Headers({'Content-Type': 'application/json'});

    // set here correct url in production for sending info to back end

    return this.http.post('https://www.ravenanalytics.io/' + url, body, {headers: headers})
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
      .subscribe(
        data => this.setLocalItems(data),
        error => this.errorMessage = error
      );

  }

  // parse response with token from back end and validate it
  setLocalItems(data) {
    localStorage.setItem('accessToken', data['data']['access-token']);
    localStorage.setItem('client', data['data']['client']);
    localStorage.setItem('expiry', data['data']['expiry']);
    localStorage.setItem('tokenType', data['data']['token-type']);
    localStorage.setItem('uid', data['data']['uid']);
    this._tokenService.validateToken();
    location.assign('https://www.ravenanalytics.io');

    this.loggedIn.emit();
  }

}
