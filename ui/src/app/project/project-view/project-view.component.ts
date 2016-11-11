import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import * as Moment from 'moment';
import 'rxjs/add/operator/distinctUntilChanged';

import { Project, Source } from '../../shared/models/index';
import { ProjectDaoService } from '../../shared/services/index';

@Component({
  selector: 'rvn-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {

  @Input() project:Project;
  @Input() visibleSources:Array<Source>;
  public notesControl:AbstractControl = new FormControl();
  public saveStatus:string;
  public hideSaveMessage:boolean = false;
  
  public configs = {
    'grid': {
      'margins': [5],
      'draggable': true,
      'resizable': true,
      'max_cols': 0,
      'max_rows': 0,
      'visible_cols': 0,
      'visible_rows': 0,
      'min_cols': 1,
      'min_rows': 1,
      'col_width': 2,
      'row_height': 2,
      'cascade': 'up',
      'min_width': 50,
      'min_height': 50,
      'fix_to_grid': false,
      'auto_style': true,
      'auto_resize': false,
      'maintain_ratio': false,
      'prefer_new': false,
      'zoom_on_drag': false,
      'limit_to_screen': true
    },
    'workspace': {
      'col': 3,      
      'row': 1,       
      'sizex': 1,      
      'sizey': 1,       
      'dragHandle': null,
      'resizeHandle': null,
                          
      'borderSize': 15,
      'fixed': false,
      'draggable': true,
      'resizable': true,
      'payload': null,
      'maxCols': 0,
      'minCols': 0,
      'maxRows': 0,
      'minRows': 0,
      'minWidth': 0,
      'minHeight': 0,
    },
    'table': {
      'col': 1,
      'row': 3,
      'sizex': 3,
      'sizey': 1,
      'dragHandle': null,
      'resizeHandle': null,

      'borderSize': 15,
      'fixed': false,
      'draggable': true,
      'resizable': true,
      'payload': null,
      'maxCols': 0,
      'minCols': 0,
      'maxRows': 0,
      'minRows': 0,
      'minWidth': 0,
      'minHeight': 0,
    },
    'treeMap': {
      'col': 1,
      'row': 1,
      'sizex': 2,
      'sizey': 1,
      'dragHandle': null,
      'resizeHandle': null,

      'borderSize': 15,
      'fixed': false,
      'draggable': true,
      'resizable': true,
      'payload': null,
      'maxCols': 0,
      'minCols': 0,
      'maxRows': 0,
      'minRows': 0,
      'minWidth': 0,
      'minHeight': 0,
    },
    'linkDiagram': {
      'col': 1,
      'row': 1,
      'sizex': 2,
      'sizey': 1,
      'dragHandle': null,
      'resizeHandle': null,

      'borderSize': 15,
      'fixed': false,
      'draggable': true,
      'resizable': true,
      'payload': null,
      'maxCols': 0,
      'minCols': 0,
      'maxRows': 0,
      'minRows': 0,
      'minWidth': 0,
      'minHeight': 0,
    }
  };

  private _noteChangeDebounceTime: number = 800;
  private _hideMessageTime: number = 4 * 1000;
  private _hideSaveMessageTimeout;

  constructor(private _projectDaoService:ProjectDaoService) {
  }

  ngOnInit() {

    // Subscribe to and update project notes value.
    // Save the project soon after typing stops.
    //
    this.notesControl.valueChanges
      .debounceTime(this._noteChangeDebounceTime)
      .distinctUntilChanged()
      .subscribe((value:string) => {
       
        if (this.project.notes === value) {
          
          // Update last saved and return immediately; no reason to save,
          // as the fact that we're here either implies identical notes
          // or application initialization.
          //
          this.saveStatus = 'Last saved ' + Moment(this.project.updated_at).fromNow();
          return;
        }
        
        // Update notes value and indicate to the user that
        // their project is saving.
        //
        this.project.notes = value;
        this.saveStatus = 'Saving...';
        this.hideSaveMessage = false;
       
        // Clear hide message timeout
        //
        clearTimeout(this._hideSaveMessageTimeout);
        
        this._projectDaoService.saveProject(this.project)
          .subscribe((project: Project) => {

            // Update project and save status
            //
            this.project = project;
            this.saveStatus = 'Last saved ' + Moment(project.updated_at).fromNow();
           
            // Set timeout to hide save message (no need for it to always show)
            //
            this._hideSaveMessageTimeout = setTimeout(() => {
              this.hideSaveMessage = true;
            }, this._hideMessageTime);
            
          }, () => {
            
            // Set save status to error - recommend the user copy their notes
            // and try again later
            //
            this.saveStatus = 'An error occurred trying to save your notes. If you want to keep them, it\'s probably ' +
                'a good idea to copy them elsewhere and try again later.';
          });
      })
  }
}
