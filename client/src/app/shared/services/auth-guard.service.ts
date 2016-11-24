import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { environment } from '../../../environments/environment';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private _tokenService:Angular2TokenService,
              private _router:Router) {
    
    this._tokenService.init({
      validateTokenPath: environment.api + '/auth/validate_token',
    });
    
  }

  canActivate():Observable<boolean>|boolean {
    
    return this._tokenService.validateToken()
      .map((response: Response) => {
        
        // All good, carry on
        //
        return response.ok && response.json().success;
        
      }).catch(() => {
        
        // Redirect to login
        //
        this._router.navigate(['/login']);
        return Observable.of(false);
      });
       
  }
}