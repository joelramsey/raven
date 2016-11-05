import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Project } from '../models/index';
import { ObservableResultHandlerService } from './observable-result-handler.service';

@Injectable()
export class ProjectDaoService {

  constructor(private _observableResultHandlerService:ObservableResultHandlerService) {
  }

  public getProject(id:number):Observable<Project> {
    return Observable.of({
      id: id,
      name: 'Sample Project',
      sources: []
    });
  }

  public getProjects(limit?:number):Observable<Array<Project>> {
    return Observable.of([
      {
        id: 1,
        name: 'Biology 101',
        description: 'Lorem ipsum',
        sources: []
      },
      {
        id: 2,
        name: 'English 101',
        description: 'Lorem ipsum',
        sources: []
      },
      {
        id: 3,
        name: 'Calculus 101',
        description: 'Lorem ipsum',
        sources: []
      }
    ]);
  }

  public saveProject(project:Project):Observable<Project> {
    this._observableResultHandlerService.success('Project mockfully saved!');
    return Observable.of(project);
  }

  public createProject(project:Project):Observable<Project> {
    this._observableResultHandlerService.success('Project mockfully created!');
    project.id = Math.floor(Math.random() * 1000);
    return Observable.of(project);
  }
  
  public deleteProject(project:Project):Observable<Project> {
    this._observableResultHandlerService.success('Project mockfully deleted!');
    return Observable.of(project);
  }
}
