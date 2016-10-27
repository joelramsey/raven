import { Component, OnInit } from '@angular/core';

import { Source } from '../models/source.interface';

@Component({
  selector: 'rvn-sources-list',
  templateUrl: './sources-list.component.html',
  styleUrls: ['./sources-list.component.scss']
})
export class SourcesListComponent implements OnInit {

  public sources: Array<Source> = [
    {
      type: 'url',
      title: 'Source 1'
    },
    {
      type: 'document',
      title: 'Intro to Differential Equations'
    }
  ];
  
  constructor() { }

  ngOnInit() {
  }

  addSource() {
    this.sources.push({
      type: 'url',
      title: 'New source'
    });
  }
}
