import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/throw';

import { Source, Project, Record } from '../models/index';
import { environment } from '../../../environments/environment';

@Injectable()
export class SourceDaoService {

  constructor(private _http:Http) {
  }

  public createSources(sources:Array<Source>, project:Project):Observable<Source> {
    return new Observable<Source>((observer:Observer<Source>) => {

      sources.forEach((source:Source) => {
        this._http.post(this._getCreateEndpoint(project), {
          source: source
        }).subscribe(() => {
          observer.next(source);
        }, () => {
          observer.next(source);
        });

      });
    });
  }

  public getSources(project:Project):Observable<Array<Source>> {
    
    return this._http.get(this._getCreateEndpoint(project))
      .map((response:Response):Array<Source> => {
        let records:Array<any> = response.json();

        // Temporarily extract source from Alchemy record
        //
        return records.map((record:Record):Source => {
          return {
            id: record.id,
            type: 'url',
            title: record.result.title,
            content: record.result.text,
            record: record,
            visible: true
          };
          });
      });
  }

  private _getCreateEndpoint(project:Project) {
    return environment.api + '/projects/' + project.id + '/records';
  }
}

export interface SourceDaoOptions {
  includeRecords:boolean;
}
