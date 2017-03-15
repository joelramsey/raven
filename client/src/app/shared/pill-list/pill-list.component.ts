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

import { PillClickEvent } from '../models/index';

@Component({
  selector: 'rvn-pill-list',
  templateUrl: './pill-list.component.html',
  styleUrls: ['./pill-list.component.scss'],
  animations: [
    trigger('pillInOut', [
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
export class PillListComponent implements OnInit {

  @Input() public models:Array<any>;
  @Input() public modelTitleAttribute:string;
  @Input() public showAdd: boolean;
  @Input() public showPrimaryIcons: boolean;
  @Input() public showSecondaryIcons: boolean;
  @Input() public showNoModelsMessage: boolean;
  @Output() public addModelClicked:EventEmitter<any> = new EventEmitter<any>();
  @Output() public pillClicked:EventEmitter<PillClickEvent> = new EventEmitter<PillClickEvent>();

  constructor() {
  }

  ngOnInit() {
  }

  handlePillClick($model: any, $i: number) {
    this.pillClicked.emit({
      model: $model,
      index: $i
    });
  }
}
