import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';

import { Project } from '../models/index';
import { ProjectDaoService } from './project-dao.service';

@Injectable()
export class InitialNavigationService {

  private _intendedState: RouterStateSnapshot;
  
  constructor(private _projectDaoService: ProjectDaoService,
              private _router: Router) { }

  public navigate() {
    
    if (this._intendedState && this._router.url !== this._intendedState.url) {
      
      // Navigate to intended route
      //
      this._router.navigateByUrl(this._intendedState.url);
      
    } else {
      
      // Navigate to first project if applicable; otherwise navigate to all projects.
      //
      return this._projectDaoService.recentProjects(3, true).subscribe((projects: Array<Project>) => {
        if (projects.length) {

          // Redirect to first available project
          //
          this._router.navigate(['/project', projects[0].id]);

        } else {

          // Redirect to all projects.
          //
          this._router.navigate(['/projects']);
        }
      });
    }
  }
  
  public setIntendedDestination(state: RouterStateSnapshot) {
    this._intendedState = state;
  }
}
