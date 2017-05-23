import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Project } from '../shared/models/project.interface';
import { ProjectDaoService } from '../shared/services/project-dao.service';
import { InitialNavigationService } from '../shared/services/initial-navigation.service';

@Component({
  selector: 'rvn-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public projects: Array<Project> = [];
  public initialized: boolean = false;
  public loggedIn: boolean = false;
  public options = {
    timeOut: 1500,
    lastOnBottom: true
  };

  constructor(public projectDaoService: ProjectDaoService,
              private _router: Router,
              private _initialNavigationService: InitialNavigationService,
              private _route: ActivatedRoute) { }

  ngOnInit() {
    this.loggedIn = this._route.snapshot.data['loggedIn'];

    if (this.loggedIn) {
      this.loginInit();
    }
  }

  loginInit() {
    this.projectDaoService.recentProjects(3, true).subscribe((projects: Array<Project>) => {

      if (projects.length) {
        this.projects = projects;
        this._initialNavigationService.navigate();
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

  authenticated() {
    this.loggedIn = true;
    this.loginInit();
  }

  signedOut() {
    this.loggedIn = false;
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
