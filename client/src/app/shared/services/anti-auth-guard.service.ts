import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { environment } from '../../../environments/environment';
import { InitialNavigationService } from './initial-navigation.service';

@Injectable()
export class AntiAuthGuard implements CanActivate {
  
  constructor(private _tokenService:Angular2TokenService,
              private _initialNavigationService: InitialNavigationService) {
    
    this._tokenService.init({
      validateTokenPath: environment.api + '/auth/validate_token',
    });
    
  }

  canActivate():Observable<boolean>|boolean {
    
    return this._tokenService.validateToken()
      .map(() => {
        this._initialNavigationService.navigate();
        
        return false;
      }).catch(() => {
        
        // Good to hit the login page
        //
        return Observable.of(true);
      });
       
  }
}