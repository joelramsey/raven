import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/throw';

import { Source, Project } from '../models/index';
import { Record } from '../models/record.interface';

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

  public getSources(project:Project, options?:SourceDaoOptions):Observable<Array<Source>> {

    // TODO: Uncomment this upon API completion
    //
    // let excludeRecords:boolean = !options || !options.includeRecords;
    //
    // let params:URLSearchParams = new URLSearchParams();
    // params.append('includeRecords', (!excludeRecords).toString());
    //
    // return this._http.get(this._getCreateEndpoint(project), {
    //   search: params
    // })
    //   .map((response:Response):Array<Source> => {
    //     return response.json();
    //   });
    
    return this._http.get('api/records').map((response: Response) => {
      let records: Array<any> = response.json();
     
      // Temporarily extract source from Alchemy record
      //
      return records.map((record: Record): Source => {
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
    return '/api/projects/' + project.id + '/sources';
  }
}

export interface SourceDaoOptions {
  includeRecords:boolean;
}
