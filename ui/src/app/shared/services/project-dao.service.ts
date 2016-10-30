import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Project } from '../models/index';
import 'rxjs/add/observable/of';

@Injectable()
export class ProjectDaoService {

  constructor() {
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

}
