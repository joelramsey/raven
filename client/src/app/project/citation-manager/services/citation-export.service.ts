import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class CitationExportService {

  constructor(private _http: Http) { }

  getCitation(contributors: Array<any>, pubData: any, sourceType: any,
              citationStyle: string): Observable<string> {

    let data = {
      key: '0766166f184cebd0adb65ea9dd89b4a8',
      source: sourceType.key,
      style: citationStyle,
      pubtype: {
        main: sourceType.publicationType,
      },
      contributors: contributors
    };

    data.pubtype[sourceType.publicationType] = pubData;

    // TODO Add forms for dis
    data[sourceType.key] = {};

    console.log(data);

    return this._http.put('https://api.citation-api.com/2.1/rest/cite', data)
      .map((response: Response) => response.json())
      .map((citation: any) => citation.data);
  }
}
