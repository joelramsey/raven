import { Component, OnInit, Input } from '@angular/core';
import { Project, Source } from '../../shared/models/index';

@Component({
  selector: 'rvn-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {

  @Input() project: Project;
  @Input() visibleSources: Array<Source>;
  workspaceText: string = '';
  
  constructor() { }

  ngOnInit() {
  }

}
