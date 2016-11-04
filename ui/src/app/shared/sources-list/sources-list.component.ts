import {
  Component,
  OnInit,
  style,
  animate,
  state,
  transition,
  trigger,
  group,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { Source, SourcePillClickEvent } from '../models/index';

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

  @Input() public sources:Array<Source>;
  @Input() public showAdd: boolean;
  @Input() public showIcons: boolean;
  @Input() public showVisibilityIcons: boolean;
  @Output() public addSourceClicked:EventEmitter<any> = new EventEmitter<any>();
  @Output() public pillClicked:EventEmitter<SourcePillClickEvent> = new EventEmitter<SourcePillClickEvent>();

  constructor() {
  }

  ngOnInit() {
  }
  
  handlePillClick($source: Source, $i: number) {
    this.pillClicked.emit({
      source: $source,
      index: $i
    });
  }
}
