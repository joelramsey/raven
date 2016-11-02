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
      sources: [
        {
          id: 1,
          type: 'url',
          title: 'google.com',
          content: 'https://google.com'
        },
        {
          id: 2,
          type: 'file',
          title: 'Test File',
          content: 'fribble'
        },
        {
          id: 3,
          type: 'text',
          title: 'Spongebob Transcript',
          content: 'I\'M READYYYYY'
        }
      ]
    });
  }

  public getProjects(limit?:number):Observable<Array<Project>> {
    return Observable.of([
      {
        id: 1,
        name: 'Biology 101',
        description: 'Lorem ipsum',
        sources: [
          {
            id: 1,
            type: 'url',
            title: 'google.com',
            content: 'https://google.com'
          },
          {
            id: 2,
            type: 'file',
            title: 'Test File',
            content: 'fribble'
          },
          {
            id: 3,
            type: 'text',
            title: 'Spongebob Transcript',
            content: 'I\'M READYYYYY'
          }
        ]
      },
      {
        id: 2,
        name: 'English 101',
        description: 'Lorem ipsum',
        sources: [
          {
            id: 1,
            type: 'url',
            title: 'google.com',
            content: 'https://google.com'
          },
          {
            id: 2,
            type: 'file',
            title: 'Test File',
            content: 'fribble'
          },
          {
            id: 3,
            type: 'text',
            title: 'Spongebob Transcript',
            content: 'I\'M READYYYYY'
          }
        ]
      },
      {
        id: 3,
        name: 'Calculus 101',
        description: 'Lorem ipsum',
        sources: [
          {
            id: 1,
            type: 'url',
            title: 'google.com',
            content: 'https://google.com'
          },
          {
            id: 2,
            type: 'file',
            title: 'Test File',
            content: 'fribble'
          },
          {
            id: 3,
            type: 'text',
            title: 'Spongebob Transcript',
            content: 'I\'M READYYYYY'
          }
        ]
      }
    ]);
  }

  public saveProject(project:Project):Observable<Project> {
    this._observableResultHandlerService.success('Project mockfully saved!');
    return Observable.of(project);
  }

  public deleteProject(project:Project):Observable<Project> {
    this._observableResultHandlerService.success('Project mockfully deleted!');
    return Observable.of(project);
  }
}
