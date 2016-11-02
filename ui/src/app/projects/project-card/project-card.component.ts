import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../../shared/models/index';
import { ProjectDaoService } from '../../shared/services/project-dao.service';

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
  @Output() deleted:EventEmitter<Project> = new EventEmitter<Project>();

  constructor(private _projectDaoService:ProjectDaoService) {
  }

  ngOnInit() {
  }

  save() {
    this.editing = false;
    this._projectDaoService.saveProject(this.project)
      .subscribe((project:Project) => {
        this.project = project;
      });
  }

  cancel() {
    this.editing = false;
  }

  edit() {
    this.editing = true;
  }

  destroy() {
    this._projectDaoService.deleteProject(this.project)
      .subscribe(() => {
        this.deleted.emit(this.project);
      });
  }
}
