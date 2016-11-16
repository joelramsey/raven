import { Component, OnInit, Input, ViewChild, style, state, animate, transition, trigger } from '@angular/core';
import { DataTableRow } from './data-table.interface';

@Component({
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

  @ViewChild('rvnDataTable') table;
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
    this.table.toggleExpandRow(row);
  }

  rowExpandedState(state:number) {
    return state === 1 ? 'expanded' : 'collapsed';
  }
}
