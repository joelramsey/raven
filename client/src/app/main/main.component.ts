import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token/angular2-token';
import { Project } from '../shared/models/project.interface';
import { ProjectDaoService } from '../shared/services/project-dao.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'rvn-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  
  public projects: Array<Project> = [];
  public initialized: boolean = false;
  public options = {
    timeOut: 1500,
    lastOnBottom: true
  };

  constructor(public projectDaoService: ProjectDaoService,
              private _tokenService: Angular2TokenService,
              private _router: Router) {
    
    this._tokenService.init({
      validateTokenPath: environment.api + '/auth/validate_token',
      signOutPath: environment.api + '/auth/sign_out'
    });
  }

  ngOnInit() {
    this.projectDaoService.recentProjects(3, true).subscribe((projects: Array<Project>) => {
      if (projects.length) {
        this.projects = projects;

        if (!this.initialized) {
          this._router.navigate(['project', projects[0].id]);
        }
      } else {
        // Create default project for user
        //
        this.projectDaoService.createProject(this._createNewProject()).subscribe((project: Project) => {
          this.projects = [project];
          this._router.navigate(['project', project.id]);
        })
      }

      this.initialized = true;
    });
  }
  
  public signOut() {
    this._tokenService.signOut().subscribe(() => {
      this._router.navigate(['/login']);
    }, () => {
      this._router.navigate(['/login']);
    });
  }

  private _createNewProject(): Project {

    let newProject: Project = {
      id: null,
      name: 'New Project',
      description: 'Auto-generated project',
      updated_at: new Date().toDateString(),
    };

    return newProject;
  }
}
