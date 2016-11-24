import { Component, OnInit } from '@angular/core';
import { SourceDaoService, ProjectDaoService } from '../shared/services/index';
import { Project, Source, SOURCE_TYPES } from '../shared/models/index';

@Component({
  selector: 'rvn-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.scss']
})
export class SourcesComponent implements OnInit {

  public projects:Array<Project> = [];
  public editing: boolean = false;

  constructor(private _projectDaoService:ProjectDaoService, private _sourceDaoService:SourceDaoService) {
  }

  ngOnInit() {
    
    // Get sources
    //
    this._projectDaoService.getProjects()
      .subscribe((projects:Array<Project>) => {
        
        // Assign to local variable
        //
        this.projects = projects;
       
        // Fetch sources for each project
        //
        projects.forEach((project:Project) => {
          this._sourceDaoService.getSources(project)
            .subscribe((sources:Array<Source>) => {
              project.sources = sources;
            });
        });
      });
  }
  
  edit() {
    this.editing = true;
  }
  
  cancel() {
    this.editing = false;
  }
  
  save(project: Project) {
    this._sourceDaoService.saveSources(project.sources, project).subscribe((source: Source) => {
      this.editing = false;
    });
  }
  
  sourceIcon(source: Source) {

    let icon = '';

    switch (source.type) {
      case SOURCE_TYPES.file:
        icon = 'insert_drive_file';
        break;
      case SOURCE_TYPES.url:
        icon = 'link';
        break;
      case SOURCE_TYPES.text:
        icon = 'text_fields';
        break;
      default:
        icon = '';
    }

    return icon;
  }
}
