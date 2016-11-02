import { Component, OnInit } from '@angular/core';
import { Project } from './shared/models/index';
import { ProjectDaoService } from './shared/services/project-dao.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public projects: Array<Project> = [];
  public options = {
    timeOut: 1500,
    lastOnBottom: true
  };
  
  constructor(private _projectDaoService: ProjectDaoService) {
    
  }
  
  ngOnInit() {
    this._projectDaoService.getProjects(3).subscribe((projects: Array<Project>) => {
      this.projects = projects;
    })
  }
}
