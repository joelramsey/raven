import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../shared/models/index';

@Component({
  selector: 'rvn-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input() project: Project;
  @Input() editing: boolean = false;
  @Input() canEdit: boolean = true;
  @Input() canDelete: boolean = true;
  
  constructor() { }

  ngOnInit() {
  }
  
  save() {
    this.editing = false;
  }
  
  cancel() {
    this.editing = false;
  }
  
  edit() {
    this.editing = true;
  }
  
  destroy() {
    console.log('Project deletion is not yet implemented.');
  }
}
