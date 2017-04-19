import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { Source, CitationRequest } from '../../../shared/models/index';
import { Angular2TokenService, AuthData } from 'angular2-token';

@Injectable()
export class CitationDaoService {

  constructor(private _http:Http,
              private _tokenService: Angular2TokenService) { }

  getCitation(data: CitationRequest): Observable<string> {

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    console.log(data);


    return this._http.post(environment.api + '/cite', {citation: data}, {
      headers: headers
    })
      .map((response: Response) => response.json())
      .map((citation: any) => citation.data);
  }

  createCitation(source: Source, citationString: string,
               citationRequest: CitationRequest): Observable<any> {

    return this._http.post(environment.api + '/citations.json', {
      record_id: source.id,
      text: citationString,
      json: JSON.stringify(citationRequest)
    }, {
      headers: this._getAuthHeaders()
    }).map((response: Response) => {

      console.log(response.json());
      return response.json();
    });
  }

  private _getAuthHeaders() {

    let authData: AuthData = this._tokenService.currentAuthData;

    return new Headers({
      'access-token': authData.accessToken,
      'client':       authData.client,
      'expiry':       authData.expiry,
      'token-type':   authData.tokenType,
      'uid':          authData.uid
    });
  }
}
