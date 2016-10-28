import { Component, OnInit, Input } from '@angular/core';
import { Project, Source } from '../shared/models/index';

@Component({
  selector: 'rvn-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  /**
   * Current project.
   */
  @Input() project:Project;

  newSourceVisible: boolean;

  constructor() {
    this.project = {
      sources: [
        {
          type: 'url',
          title: 'Source 1',
          content: ''
        },
        {
          type: 'document',
          title: 'Intro to Differential Equations',
          content: '',
          disabled: true
        }
      ]
    }
  }

  ngOnInit() {
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
