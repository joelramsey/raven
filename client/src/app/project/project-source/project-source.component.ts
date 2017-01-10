import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Source, Project, SourceCreator } from '../../shared/models/index';

@Component({
  selector: 'rvn-project-source',
  templateUrl: './project-source.component.html',
  styleUrls: ['./project-source.component.scss']
})
export class ProjectSourceComponent implements OnInit, SourceCreator {

  @Input() public project:Project;
  @Output() public created:EventEmitter<Source> = new EventEmitter<Source>();
  @Output() public done:EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public cancelled:EventEmitter<any> = new EventEmitter<any>();
  
  projectId: string;
  
  constructor(private _activatedRoute: ActivatedRoute) {
    
  }

  ngOnInit():void {
    this._activatedRoute.params.forEach((params: Params) => {
      this.projectId = params['id'];
    });
  }
}
