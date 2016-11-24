import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { Angular2TokenService, AuthData } from 'angular2-token/angular2-token';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/throw';

import { Source, Project, Record, SOURCE_TYPES } from '../models/index';
import { environment } from '../../../environments/environment';

@Injectable()
export class SourceDaoService {

  constructor(private _http:Http,
              private _tokenService: Angular2TokenService) {
  }

  public createSources(sources:Array<Source>, project:Project):Observable<Source> {
    return new Observable<Source>((observer:Observer<Source>) => {

      sources.forEach((source:Source) => {
        this._http.post(this._getCreateEndpoint(project), {
          project_id: project.id,
          project: project.id,
          source: source
        }, {
          search: this._getURLParams(source),
          headers: this._getAuthHeaders()
        })
          .map((response:Response):Source => {
            let record:any = response.json();
            
            return {
              id: record.id,
              type: SOURCE_TYPES.url,
              title: record.title || record.result.title || record.result.text.substring(0,10),
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
  
  public saveSources(sources:Array<Source>, project:Project):Observable<Source> {
    return new Observable<Source>((observer:Observer<Source>) => {

      sources.forEach((source:Source) => {
        this._http.put(this._getSaveEndpoint(source, project), {
          title: source.title
        }, {
          headers: this._getAuthHeaders()
        })
          .map((response:Response):Source => {
            let record:any = response.json();

            return {
              id: record.id,
              type: source.type,
              title: record.title || record.result.title || record.result.text.substring(0,10),
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

    return this._http.get(this._getCreateEndpoint(project), {
      headers: this._getAuthHeaders()
    })
      .map((response:Response):Array<Source> => {
        let records:Array<any> = response.json();

        // Temporarily extract source from Alchemy record
        //
        return records.map((record:Record):Source => {
          return {
            id: record.id,
            type: SOURCE_TYPES.url,
            title: record.title || record.result.title || record.result.text.substring(0, 10),
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
  
  private _getSaveEndpoint(source: Source, project:Project):string {
    return environment.api + '/projects/' + project.id + '/records/' + source.id;
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
  
  private _getAuthHeaders(): Headers {

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

export interface SourceDaoOptions {
  includeRecords:boolean;
}
