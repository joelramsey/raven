import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Angular2TokenService, AuthData } from 'angular2-token/angular2-token';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { Resolution } from '../models/index';
import { environment } from '../../../environments/environment';

@Injectable()
export class ResolutionDaoService {

  constructor(private _http:Http,
              private _tokenService:Angular2TokenService) {
  }

  public createResolution(resolution:Resolution):Observable<Resolution> {
    return this._http.post(environment.api + '/resolutions', resolution, {
      headers: this._getAuthHeaders()
    }).map((response:Response) => {
      return response.json();
    });
  }

  public saveResolution(resolution:Resolution):Observable<Resolution> {
    return this._http.put(environment.api + '/resolutions/' + resolution.id, resolution, {
      headers: this._getAuthHeaders()
    }).map((response:Response) => {
      return response.json();
    })
  }

  public getResolutions():Observable<Array<Resolution>> {

    return this._http.get(environment.api + '/resolutions', {
      headers: this._getAuthHeaders()
    }).map((response:Response):Array<Resolution> => {
        return response.json();
      });
  }

  private _getAuthHeaders():Headers {

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
