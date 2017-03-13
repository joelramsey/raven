import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

import { SourceSearchService, ObservableResultHandlerService } from '../../shared/services/index';
import { SearchResult, SearchResultListItem } from '../../shared/models/index';

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
  public searching: boolean = false;

  constructor(private _sourceSearchService: SourceSearchService,
              private _observableResultHandlerService: ObservableResultHandlerService) {

  }

  ngOnInit() {
    this.searchControl.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => {
        this.searching = true;
        this.searchTerm = term;
        return this._sourceSearchService.search(term)
      })
      .subscribe((value: SearchResult) => {
        if (value.results.length) {
          this.results = value.results;
          this.paginatedResults = this.results.slice(0, this.paginationSize - 1);
          this.paginationIndex = 1;
        } else {
          this.results = value.results;
          this.paginatedResults = [];
          this.paginationIndex = 0;
        }

        this.searching = false;
        console.log(value);
      }, (error:any) => {
        this.searching = false;
        this._observableResultHandlerService.failure(error);
      });
  }

  public handleSearchClick($item: any) {
    console.log($item);
    this.resultSelected.emit($item);
  }

  get paginatedResultsLength() {

    if (this.paginatedResults.length > 0) {
      return this.paginationIndex + this.paginatedResults.length - 1;
    }

    return 0;
  }

}
