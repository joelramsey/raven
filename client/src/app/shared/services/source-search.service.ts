import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Angular2TokenService, AuthData } from 'angular2-token';
import { Observable } from 'rxjs/Observable';

import { ObservableResultHandlerService } from './observable-result-handler.service';
import { SearchResultListItem } from '../models/index';

@Injectable()
export class SourceSearchService {

  constructor(private _http: Http,
              private _tokenService: Angular2TokenService,
              private _observableResultHandlerService: ObservableResultHandlerService) {
  }

  public search(searchTerm: string): Observable<Array<SearchResultListItem>> {
    return Observable.of([
      {
        title: 'Result 1',
        description: 'Mock of Result 1'
      },
      {
        title: 'Result 2',
        description: 'Mock of Result 2'
      },
      {
        title: 'Result 3',
        description: 'Mock of Result 3'
      }
    ]);
  }

  private _getAuthHeaders() {

    let authData: AuthData = this._tokenService.currentAuthData;

    return new Headers({
      'access-token': authData.accessToken,
      'client': authData.client,
      'expiry': authData.expiry,
      'token-type': authData.tokenType,
      'uid': authData.uid
    });
  }
}
