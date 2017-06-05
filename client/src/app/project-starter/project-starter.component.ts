import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectDaoService } from '../shared/services/index';
import { Project } from '../shared/models/index';

@Component({
  selector: 'rvn-project-starter',
  templateUrl: './project-starter.component.html',
  styleUrls: ['./project-starter.component.scss']
})
export class ProjectStarterComponent implements OnInit {

  @Output() cancelled: EventEmitter<any> = new EventEmitter<any>();
  @Output() create: EventEmitter<any> = new EventEmitter<any>();

  titleData = {};
  bodyData = {};
  isTitlePage: boolean = true;

  constructor(private _projectDaoService: ProjectDaoService,
              private _router: Router) {
  }

  ngOnInit() {
  }

  toBody($event) {
    this.titleData = $event;
    this.isTitlePage = false;
  }

  toTitle($event) {
    this.bodyData = $event;
    this.isTitlePage = true;
  }

  done($event) {
    this.bodyData = $event;
    let newProject: Project = {
      id: null,
      name: this.titleData['title'],
      template_type: this.titleData['type'] ? this.titleData['type'].key : null,
      citation_style: this.titleData['citationStyle'] ? this.titleData['citationStyle'].key : null,
      font_size: this.bodyData['fontSize'] ? this.bodyData['fontSize'].key : null,
      margin: this.bodyData['margin'] ? this.bodyData['margin'].key : null,
      line_spacing: this.bodyData['lineSpacing'] ? this.bodyData['lineSpacing'].key : null
    };

    this._projectDaoService.createProject(newProject)
      .subscribe((project: Project) => {
        this._router.navigate(['project', project.id])
      });
  }
}
