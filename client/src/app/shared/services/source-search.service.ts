import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Angular2TokenService, AuthData } from 'angular2-token';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';

import { SearchResult } from '../models/index';
import { SearchResultsDeserializerService } from './search-results-deserializer.service';

import { environment } from '../../../environments/environment';
import { WindowRefService } from './window-ref.service';

@Injectable()
export class SourceSearchService {

  constructor(private _http: Http,
              private _windowRef: WindowRefService,
              private _tokenService: Angular2TokenService,
              private _searchResultsDeserializer: SearchResultsDeserializerService) {
  }

  /**
   * Performs a basic keyword search.
   * @param searchTerm
   * @returns {Observable<R>}
   */
  public search(searchTerm: string): Observable<SearchResult> {
    let params = new URLSearchParams();
    params.set('q', this._windowRef.nativeWindow.encodeURI(searchTerm));

    return this._http.get(environment.api + '/articles.json', {
      headers: this._getAuthHeaders(),
      search: params
    })
      .switchMap(response => this._searchResultsDeserializer.deserialize(response));
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
