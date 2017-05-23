import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Response } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { environment } from '../../../environments/environment';

@Injectable()
export class AuthenticationResolve implements Resolve<boolean> {

  constructor(private _tokenService: Angular2TokenService) {

    this._tokenService.init({
      validateTokenPath: environment.api + '/auth/validate_token',
    });

  }

  resolve(): Observable<boolean> {

    return this._tokenService.validateToken()
      .map((response: Response) => {

        // All good, carry on
        //
        return Observable.of(response.ok && response.json().success);
      }).catch(() => {
        return Observable.of(false);
      });

  }
}
