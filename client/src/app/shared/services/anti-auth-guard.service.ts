import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { environment } from '../../../environments/environment';

@Injectable()
export class AntiAuthGuard implements CanActivate {
  
  constructor(private _tokenService:Angular2TokenService,
              private _router:Router) {
    
    this._tokenService.init({
      validateTokenPath: environment.api + '/auth/validate_token',
    });
    
  }

  canActivate():Observable<boolean>|boolean {
    
    return this._tokenService.validateToken()
      .map(() => {
        
        // Redirect to projects - this means we're logged in
        // and shouldn't be able to log in twice.
        //
        this._router.navigate(['/projects']);
        
        return false;
      }).catch(() => {
        
        // Good to hit the login page
        //
        return Observable.of(true);
      });
       
  }
}