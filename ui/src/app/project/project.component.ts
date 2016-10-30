import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Project, Source } from '../shared/models/index';
import { ProjectDaoService } from '../shared/services/index';

@Component({
  selector: 'rvn-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  /**
   * Current project. Initializes to empty.
   */
  project:Project = {
    id: null,
    name: 'New Project',
    description: 'This is a default project template.',
    sources: []
  };

  newSourceVisible: boolean;

  constructor(private _activatedRoute: ActivatedRoute, private _projectDaoService: ProjectDaoService) {
  }

  ngOnInit() {
    this._activatedRoute.params.forEach((params: Params) => {
     
      // Get project from service, if it exists.
      //
      if (params['id']) {
        let id = +params['id'];
        this._projectDaoService.getProject(id).subscribe(project => this.project = project);
      }
    });
  }
  
  showNewSource() {
    this.newSourceVisible = true;
  }
  
  hideNewSource() {
    this.newSourceVisible = false;
  }

  /**
   * Adds a new source to the project's list.
   * @param $newSource
   */
  addSource($newSource:Source) {
    
    this.newSourceVisible = false;
    
    if (this.project && this.project.sources instanceof Array) {
      this.project.sources.push($newSource);
    } else {
      throw new Error('Project sources are undefined; unable to add source.');
    }
  };
}
