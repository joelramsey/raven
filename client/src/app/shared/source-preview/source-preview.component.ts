import { Component, OnInit, Input, style, state, animate, transition, trigger } from '@angular/core';
import { Source } from '../models/index';

@Component({
  selector: 'rvn-source-preview',
  templateUrl: './source-preview.component.html',
  styleUrls: ['./source-preview.component.scss'],
  animations: [
    trigger('sourceState', [
      transition('void => *', [
        style({
          height: 0,
          opacity: 0
        }),
        animate('150ms ease-in'),
      ]),
      transition('* => void', animate('150ms ease-out', style({
        height: 0,
        opacity: 0
      })))
    ]),
    trigger('expandedState', [
      state('expanded', style({
        transform: 'rotate(90deg)'
      })),
      state('collapsed',   style({
        transform: 'rotate(0deg)'
      })),
      transition('expanded => collapsed', animate('100ms ease-in')),
      transition('collapsed => expanded', animate('100ms ease-out'))
    ])
  ]
})
export class SourcePreviewComponent implements OnInit {

  @Input() source: Source;
  @Input() highlight: string;
  
  public expanded: boolean;
  
  constructor() { }

  ngOnInit() {
  }

  toggleDrawer() {
    this.expanded = !this.expanded;
  }
  
  get expandedState() {
    return !!this.expanded ? 'expanded' : 'collapsed';
  }
}
