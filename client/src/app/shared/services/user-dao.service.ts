import { Injectable } from '@angular/core';
import { Response, Headers, Http } from '@angular/http';
import { Angular2TokenService, AuthData } from 'angular2-token/angular2-token';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { UserDetails } from '../models/index';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserDaoService {

  constructor(private _tokenService:Angular2TokenService,
              private _http:Http) {
  }

  /**
   * Fetches the current user from the authentication context.
   * @returns {any}
   */
  public getUser():Observable<UserDetails> {
    return this._http.get(environment.api + '/users/' + this._tokenService.currentUserData.id, {
      headers: this._getAuthHeaders()
    })
      .map((response:Response):UserDetails => {
        let rawUser = response.json();
        
        rawUser.firstName = rawUser.first_name;
        rawUser.lastName = rawUser.last_name;
        return rawUser;
      });
  }

  /**
   * Updates a user's details, and returns those details as persisted
   * from the server.
   *
   * @param user
   * @returns {any}
   */
  public updateUser(user:UserDetails):Observable<UserDetails> {

    let apiUser: any = {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email
    };
    
    return this._http.put(environment.api + '/users/' + user.id + '.json', apiUser, {
      headers: this._getAuthHeaders()
    })
      .map((response:Response):UserDetails => {
        return response.json();
      });
  }

  private _getAuthHeaders() {

    let authData:AuthData = this._tokenService.currentAuthData;

    return new Headers({
      'access-token': authData.accessToken,
      'client': authData.client,
      'expiry': authData.expiry,
      'token-type': authData.tokenType,
      'uid': authData.uid
    });
  }
}
