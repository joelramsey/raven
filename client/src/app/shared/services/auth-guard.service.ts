import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { environment } from '../../../environments/environment';
import { InitialNavigationService } from './initial-navigation.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _tokenService:Angular2TokenService,
              private _initialNavigationService: InitialNavigationService,
              private _router:Router) {

    this._tokenService.init({
      validateTokenPath: environment.api + '/auth/validate_token',
    });

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>|boolean {

    this._initialNavigationService.setIntendedDestination(state);

    return this._tokenService.validateToken()
      .map((response: Response) => {

        // All good, carry on
        //
        return response.ok && response.json().success;

      }).catch(() => {

        // Redirect to login
        //
        this._router.navigate(['/landing']);
        return Observable.of(false);
      });

  }
}
