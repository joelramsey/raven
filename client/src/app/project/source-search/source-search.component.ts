import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'rvn-source-search',
  templateUrl: './source-search.component.html',
  styleUrls: ['./source-search.component.scss']
})
export class SourceSearchComponent implements OnInit {

  @Input() public searchTerm: string = '';
  @Output() public resultSelected: EventEmitter<any> = new EventEmitter<any>();

  public results: Array<any> = [];

  constructor() { }

  ngOnInit() {
  }

}
