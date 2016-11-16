import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../shared/models/index';
import { ProjectDaoService } from '../../shared/services/index';

@Component({
  selector: 'rvn-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input() project:Project;
  @Input() editing:boolean = false;
  @Input() canEdit:boolean = true;
  @Input() canDelete:boolean = true;
  @Input() pendingDelete:boolean = false;
  @Output() deleted:EventEmitter<Project> = new EventEmitter<Project>();
  @Output() saved:EventEmitter<Project> = new EventEmitter<Project>();
  @Output() created:EventEmitter<Project> = new EventEmitter<Project>();

  constructor(private _projectDaoService:ProjectDaoService, private _router:Router) { }

  ngOnInit() {
  }

  save() {
    this.editing = false;
    this.pendingDelete = false;

    if (this.project.id) {
      this._projectDaoService.saveProject(this.project)
        .subscribe((project:Project) => {
          this.project = project;
          this.saved.emit(this.project);
        });
    } else {
      this._projectDaoService.createProject(this.project)
        .subscribe((project:Project) => {
          this.project = project;
          this.created.emit(this.project);
        });
    }
  }

  cancel() {
    this.editing = false;
    this.pendingDelete = false;
  }

  edit() {
    this.editing = true;
    this.pendingDelete = false;
  }

  destroy() {
    
    if (this.pendingDelete) {
      this._projectDaoService.deleteProject(this.project)
        .subscribe(() => {
          this.deleted.emit(this.project);
        });
    } else {
      this.pendingDelete = true;
    }
  }
  
  launch() {
    this._router.navigate(['project', this.project.id]);
  }
}
