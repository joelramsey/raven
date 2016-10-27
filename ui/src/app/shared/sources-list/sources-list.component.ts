import { Component, OnInit, style, animate, state, transition, trigger, group } from '@angular/core';

import { Source } from '../models/source.interface';

@Component({
  selector: 'rvn-sources-list',
  templateUrl: './sources-list.component.html',
  styleUrls: ['./sources-list.component.scss'],
  animations: [
    trigger('sourceInOut', [
      state('*', style({width: '*', transform: 'translateX(0)', opacity: 1})),
      transition('void => *', [
        style({width: 10, transform: 'translateX(50px)', opacity: 0}),
        group([
          animate('0.3s 0.1s ease', style({
            transform: 'translateX(0)',
            width: '*'
          })),
          animate('0.3s ease', style({
            opacity: 1
          }))
        ])
      ]),
      transition('* => void', [
        group([
          animate('0.3s ease', style({
            margin: 0,
            width: 0
          })),
          animate('0.3s 0.2s ease', style({
            opacity: 0
          }))
        ])
      ])
    ])
  ]
})
export class SourcesListComponent implements OnInit {

  public sources: Array<Source> = [
    {
      type: 'url',
      title: 'Source 1'
    },
    {
      type: 'document',
      title: 'Intro to Differential Equations',
      disabled: true
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
