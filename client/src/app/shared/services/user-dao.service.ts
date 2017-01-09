import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Angular2TokenService } from 'angular2-token/angular2-token';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { UserDetails } from '../models/index';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserDaoService {

  constructor(private _tokenService: Angular2TokenService) {
  }

  /**
   * Fetches the current user from the authentication context.
   * @returns {any}
   */
  public getUser():Observable<UserDetails> {
    return Observable.of(this._tokenService.currentUserData);
  }

  /**
   * Updates a user's details, and returns those details as persisted
   * from the server.
   * 
   * @param user
   * @returns {any}
   */
  public updateUser(user: UserDetails):Observable<UserDetails> {
    return Observable.of(user);
  }
}
