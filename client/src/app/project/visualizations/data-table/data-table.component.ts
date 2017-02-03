import {
  Component, OnInit, Input, ViewChild, style, state, animate, transition, trigger,
  ViewEncapsulation
} from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

import { DataTableRow } from './data-table.interface';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'rvn-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  animations: [
    trigger('iconExpandTransition', [
      state('collapsed', style({
        transform: 'rotate(0deg)'
      })),
      state('expanded', style({
        transform: 'rotate(90deg)'
      })),
      transition('collapsed => expanded', animate('100ms ease-out')),
      transition('expanded => collapsed', animate('100ms ease-out'))
    ])
  ]
})
export class DataTableComponent implements OnInit {

  @ViewChild('rvnDataTable') table: DatatableComponent;
  @Input() rows: Array<DataTableRow> = [];
  
  cssClasses = {
    sortAscending: 'material-icons icon-down',
    sortDescending: 'material-icons icon-up',
    pagerLeftArrow: 'material-icons icon-left',
    pagerRightArrow: 'material-icons icon-right',
    pagerPrevious: 'material-icons icon-prev',
    pagerNext: 'material-icons icon-skip'    
  };

  constructor() {
  }

  ngOnInit() {
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  rowExpandedState(state:number) {
    return state === 1 ? 'expanded' : 'collapsed';
  }
}
