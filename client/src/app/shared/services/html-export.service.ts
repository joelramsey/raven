import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { CloudConvertProcessResponse, CloudConvertCompletedResponse } from '../models/index';

@Injectable()
export class HtmlExportService {

  private static API_URL: string = 'https://api.cloudconvert.com';
  private static API_KEY: string = 'buMoHP3EOFlyo4d2iUbg5NQUQ_06LJq6zPGYkrNG1OUNiCscwB4Wre0JKoo1GvDJ44DvLf0vbY_14KvJUCEIsQ';

  constructor(private _http: Http) {
  }

  public exportToDocx(projectName: string, html: string): Observable<CloudConvertCompletedResponse> {
    let base64: any = btoa(html);

    return this._http.post(HtmlExportService.API_URL + '/process', {
      inputformat: 'html',
      outputformat: 'docx'
    }, {
      headers: this._getAuthHeaders()
    })
      .map((response: Response) => {
        return response.json();
      })
      .switchMap((response: CloudConvertProcessResponse) => {
        return this._http.post('https:' + response.url, {
          input: 'base64',
          file: base64,
          filename: projectName + '.html',
          outputformat: 'docx',
          wait: true
        });
      }).map((response: Response) => {
        return response.json();
      });
  }

  private _getAuthHeaders() {

    return new Headers({
      'authorization': 'Bearer ' + HtmlExportService.API_KEY,
      'content-type': 'application/json'
    });
  }

}
