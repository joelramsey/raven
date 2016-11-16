import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from './shared/models/index';
import { ProjectDaoService } from './shared/services/project-dao.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public projects: Array<Project> = [];
  public initialized: boolean = false;
  public options = {
    timeOut: 1500,
    lastOnBottom: true
  };
  
  constructor(private _projectDaoService: ProjectDaoService,
              private _router: Router) {
  }
  
  ngOnInit() {
    this._projectDaoService.recentProjects(3, true).subscribe((projects: Array<Project>) => {
      if (projects.length) {
        this.projects = projects;

        if (!this.initialized) {
          this._router.navigate(['project', projects[0].id]);
        }
      } else {
        // Create default project for user
        //
        this._projectDaoService.createProject(this._createNewProject()).subscribe((project: Project) => {
          this.projects = [project];
          this._router.navigate(['project', project.id]);
        })
      }

      this.initialized = true;
    });
  }
  
  private _createNewProject(): Project {
    
    let newProject: Project = {
      id: null,
      name: 'New Project',
      description: 'Auto-generated project',
      updated_at: new Date().toDateString(),
    };

    //TODO: Remove this once the backend can handle adding user id
    //
    newProject['user_id'] = 1;
    
    return newProject;
  }
}
