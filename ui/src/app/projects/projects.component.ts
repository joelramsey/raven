import { Component, OnInit } from '@angular/core';
import { ProjectDaoService } from '../shared/services/index';
import { Project } from '../shared/models/index';

@Component({
  selector: 'rvn-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public projects: Array<Project> = [];
  
  constructor(private _projectDaoService: ProjectDaoService) { }

  ngOnInit() {
    this._projectDaoService.getProjects().subscribe((projects: Array<Project>) => {
      this.projects = projects;
    });
  }
  
  removeProject(project: Project) {
    let projectIdx = this.projects.indexOf(project);
    
    if (projectIdx > -1) {
      this.projects.splice(projectIdx, 1);
    }
  }
}
