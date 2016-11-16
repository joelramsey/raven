import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Project, Source } from '../shared/models/index';
import { ProjectDaoService, SourceDaoService } from '../shared/services/index';
import { SourcePillClickEvent } from '../shared/models/source-pill-click-event.interface';

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
  visibleSources: Array<Source> = [];
  showNoSourcesMessage: boolean;
  

  constructor(private _activatedRoute: ActivatedRoute, 
              private _projectDaoService: ProjectDaoService,
              private _sourceDaoService: SourceDaoService) {
  }

  ngOnInit() {
    this._activatedRoute.params.forEach((params: Params) => {
     
      // Get project from service, if it exists.
      //
      if (params['id']) {
        let id = +params['id'];
        this._projectDaoService.getProject(id)
          .switchMap((project:Project) => {
            this.project = project;
            
            return this._sourceDaoService.getSources(project);
          })
          .subscribe((sources: Array<Source>) => {
            this.project.sources = sources;
            
            // Copy for usage in displaying data
            //
            this.visibleSources = sources.slice();
            
            // Set message if no sources
            //
            if (!sources.length) {
              this.showNoSourcesMessage = true;
            }
          });
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
   * Toggles a source's visibility; if it's supposed to be
   * visible, the source is added to the visible sources
   * array; otherwise it is removed.
   * 
   * @param $source
   */
  toggleVisibility($source:SourcePillClickEvent) {
    $source.source.visible = !$source.source.visible;
   
    if ($source.source.visible) {
      
      // Add to visible sources
      //
      if (this.visibleSources.indexOf($source.source) === -1) {
        this.visibleSources.push($source.source);
      }
      
    } else {
      
      // Remove from visible sources
      //
      let sourceIdx: number = this.visibleSources.indexOf($source.source);

      if (sourceIdx > -1) {
        this.visibleSources.splice(sourceIdx, 1);
      }
    }
   
    // Because Angular 2 Change Detection doesn't seem to think that
    // removing/adding an element counts as a "valid" change...
    //
    this.visibleSources = this.visibleSources.slice();
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
