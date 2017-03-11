import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

import { SourceSearchService } from '../../shared/services/index';
import { SearchResultListItem } from '../../shared/models/search-result.interface';

@Component({
  selector: 'rvn-source-search',
  templateUrl: './source-search.component.html',
  styleUrls: ['./source-search.component.scss']
})
export class SourceSearchComponent implements OnInit {

  @Input() public searchTerm: string = '';
  @Output() public resultSelected: EventEmitter<SearchResultListItem> = new EventEmitter<SearchResultListItem>();

  public searchControl: FormControl = new FormControl();
  public results: Array<SearchResultListItem> = [];
  public paginatedResults: Array<SearchResultListItem> = [];
  public paginationSize: number = 10;
  public paginationIndex: number = 0;

  constructor(private _sourceSearchService: SourceSearchService) { }

  ngOnInit() {
    this.searchControl.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this._sourceSearchService.search(term))
      .subscribe((value: Array<SearchResultListItem>) => {
        this.results = value;
        this.paginatedResults = this.results.slice(0, this.paginationSize - 1);
        this.paginationIndex = 1;
      });
  }

  public handleSearchClick($item: any) {
    console.log($item);
  }

  get paginatedResultsLength() {

    if (this.paginatedResults.length > 0) {
      return this.paginationIndex + this.paginatedResults.length - 1;
    }

    return 0;
  }

}
