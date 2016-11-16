import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/throw';

import { Source, Project, Record, SOURCE_TYPES } from '../models/index';
import { environment } from '../../../environments/environment';

@Injectable()
export class SourceDaoService {

  constructor(private _http:Http) {
  }

  public createSources(sources:Array<Source>, project:Project):Observable<Source> {
    return new Observable<Source>((observer:Observer<Source>) => {

      sources.forEach((source:Source) => {
        this._http.post(this._getCreateEndpoint(project), {
          project_id: project.id,
          project: project.id,
          source: source
        }, {
          search: this._getURLParams(source)
        })
          .map((response:Response):Source => {
            let record:any = response.json();
            
            return {
              id: record.id,
              type: SOURCE_TYPES.url,
              title: record.result.title,
              content: record.result.text,
              record: record,
              visible: true
            };
          })
          .subscribe((createdSource:Source) => {
            observer.next(createdSource);
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
            type: SOURCE_TYPES.url,
            title: record.result.title,
            content: record.result.text,
            record: record,
            visible: true
          };
        });
      });
  }

  private _getCreateEndpoint(project:Project):string {
    return environment.api + '/projects/' + project.id + '/records';
  }

  /**
   * Append Alchemy params for a particular source.
   * @param source Source to append params to.
   * @private
   */
  private _getURLParams(source:Source):URLSearchParams {
    let params:URLSearchParams = new URLSearchParams();

    if (source.type === SOURCE_TYPES.text || source.type === SOURCE_TYPES.url) {
      params.append('type', source.type);
    }

    params.append('q', source.content);
    params.append('commit', 'Analyze');
    params.append('utf8', '%E2%9C%93');

    return params;
  }
}

export interface SourceDaoOptions {
  includeRecords:boolean;
}
