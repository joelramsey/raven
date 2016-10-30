import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Source, Project } from '../models/index';
import 'rxjs/add/observable/throw';

@Injectable()
export class SourceDaoService {

  constructor(private _http: Http) { }
  
  public createSources(sources: Array<Source>, project: Project): Observable<Source> {
    return new Observable<Source>((observer: Observer<Source>) => {
      
      sources.forEach((source: Source) => {
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
  
  private _getCreateEndpoint(project: Project) {
    return '/api/projects/' + project.id + '/sources';
  }
}
