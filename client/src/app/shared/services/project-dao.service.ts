import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { Angular2TokenService, AuthData } from 'angular2-token/angular2-token';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/of';

import { Project } from '../models/index';
import { ObservableResultHandlerService } from './observable-result-handler.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProjectDaoService {

  private _recentProjectsObservable:Observable<Array<Project>>;
  private _recentProjectsObserver:Observer<Array<Project>>;
  private _recentProjects:Array<Project> = [];
  private _activeProject: Project;

  constructor(private _http:Http,
              private _tokenService: Angular2TokenService,
              private _observableResultHandlerService:ObservableResultHandlerService) {

    this._recentProjectsObservable = new Observable<Array<Project>>((observer:Observer<Array<Project>>) => {
      this._recentProjectsObserver = observer;
    });
  }

  public getProject(id:number):Observable<Project> {
    return this._http.get(environment.api + '/projects/' + id + '.json', {
      headers: this._getAuthHeaders()
    })
      .map((response:Response):Project => {
        return response.json();
      });
  }
  
  public set activeProject(project: Project) {
    this._activeProject = project;
  }
  
  public get activeProject() {
    return this._activeProject;
  }

  public getProjects(limit?:number):Observable<Array<Project>> {

    let options = {
      headers: this._getAuthHeaders()
    };

    // Add query params for three most recent projects
    //
    if (limit) {
      let params:URLSearchParams = new URLSearchParams();
      params.append('limit', limit.toString());

      options['search'] = params;
    }

    return this._http.get(environment.api + '/projects', options)
      .map((response:Response):Array<Project> => {
        return response.json();
      });
  }

  /**
   * This function provides an observable which publishes the most recent
   * active projects `n` at a time, where `n` is the (optional) value
   * specified in the `limit` parameter.
   * @param limit
   * @param isInit
   */
  public recentProjects(limit?:number, isInit?:boolean):Observable<Array<Project>> {

    // Do initial call
    //
    if (isInit) {
      this.getProjects(limit).subscribe((projects:Array<Project>) => {

        this._recentProjects = projects;

        // Publishes the most recent projects - note that a new value will *not*
        // have to be emitted unless the referrence to `this._recentProjects` changes
        // (e.g., if it is initializes to a new array)
        //
        if (this._recentProjectsObserver) {
          this._recentProjectsObserver.next(this._recentProjects);
        }

      }, (error:any) => {
        this._observableResultHandlerService.failure(error);
      });
    }
    return this._recentProjectsObservable;
  }

  public saveProject(project:Project):Observable<Project> {
    return this._http.put(environment.api + '/projects/' + project.id + '.json', project, {
      headers: this._getAuthHeaders()
    })
      .map((response:Response):Project => {

        let savedProject:Project = response.json();

        // Remove current project reference from the recent project list,
        // and put the new reference at the beginning.
        //
        let projectIdx = -1;
        this._recentProjects.some((recentProject:Project, i:number) => {
          if (savedProject.id === recentProject.id) {
            projectIdx = i;
            return true;
          }

          return false;
        });

        if (projectIdx > -1) {
          this._recentProjects.splice(projectIdx, 1);
        }

        this._recentProjects.unshift(savedProject);

        return savedProject;
      });
  }

  public createProject(project:Project):Observable<Project> {

    return this._http.post(environment.api + '/projects.json', project, {
      headers: this._getAuthHeaders()
    })
      .map((response:Response):Project => {

        let newProject:Project = response.json();

        // Add to recent
        //
        this._recentProjects.unshift(newProject);

        return newProject;
      });
  }

  /**
   * 
   * @param project
   * @returns {Observable<R>}
   */
  public deleteProject(project:Project):Observable<any> {
    return this._http.delete(environment.api + '/projects/' + project.id, {
      headers: this._getAuthHeaders()
    })
      .map((response:Response) => {

        // Remove from recent projects
        //
        let projectIdx = -1;
        this._recentProjects.some((recentProject:Project, i:number) => {
          if (project.id === project.id) {
            projectIdx = i;
            return true;
          }

          return false;
        });

        if (projectIdx > -1) {
          this._recentProjects.splice(projectIdx, 1);
        }
        
        return response;
      });
  }
  
  private _getAuthHeaders() {
    
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
