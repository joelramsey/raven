import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

import { SourceSearchService, ObservableResultHandlerService } from '../../shared/services/index';
import { SearchResult, SearchResultListItem, SearchFacet, SearchFilter, PillClickEvent } from '../../shared/models/index';
import { InPlaceFilterService } from './in-place-filter.service';

@Component({
  selector: 'rvn-source-search',
  templateUrl: './source-search.component.html',
  styleUrls: ['./source-search.component.scss']
})
export class SourceSearchComponent implements OnInit {

  @Input() public searchTerm: string = '';
  @Input() public paginationSize: number = 30;

  @Output() public resultSelected: EventEmitter<SearchResultListItem> = new EventEmitter<SearchResultListItem>();

  public searchControl: FormControl = new FormControl();
  public results: Array<SearchResultListItem> = [];
  public facets: Array<SearchFacet> = [];
  public paginatedResults: Array<SearchResultListItem> = [];
  public filteredResults: Array<SearchResultListItem> = [];
  public appliedFilters: Array<SearchFilter> = [];
  public paginationIndex: number = 0;
  public searching: boolean = false;
  public firstSearch: boolean = true;

  constructor(private _sourceSearchService: SourceSearchService,
              private _inPlaceFilterService: InPlaceFilterService,
              private _observableResultHandlerService: ObservableResultHandlerService) {

  }

  ngOnInit() {
    this.searchControl.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => {
        this.searching = true;
        this.firstSearch = false;
        this.searchTerm = term;
        return this._sourceSearchService.search(term)
      })
      .subscribe((value: SearchResult) => {

        if (value.results.length) {
          this.results = value.results;
          this.filteredResults = value.results.slice();
          this.appliedFilters = [];
          this._resetPaginatedResults();
        } else {
          this.results = [];
          this.filteredResults = [];
          this.paginatedResults = [];
          this.paginationIndex = 0;
          this.appliedFilters = [];
        }

        this.facets = value.facets;
        this.searching = false;
      }, (error:any) => {
        this.searching = false;
        this._observableResultHandlerService.failure(error);
      });
  }

  /**
   * Adds a filter if it doesn't already exist.
   *
   * @param label
   * @param value
   */
  public addFilter(label: string, value: string) {

    let filterExists = this.appliedFilters.some((filter: SearchFilter) => {
      return (filter.label === label && filter.value === value);
    });

    // Add if the filter doesn't already exist
    //
    if (!filterExists) {

      let newFilter: SearchFilter = {
        prettyName: label + ':' + value,
        label: label,
        value: value
      };
      this.appliedFilters.push(newFilter);

      // Filter results
      //
      this._inPlaceFilterService.addFilter(this.filteredResults, newFilter);
      this._resetPaginatedResults();
    }
  }

  /**
   * Removes a particular filter.
   *
   * @param $event
   */
  public removeFilter($event: PillClickEvent) {
    let filterIdx = this.appliedFilters.indexOf($event.model);
    if (filterIdx > -1) {
      this.appliedFilters.splice(filterIdx, 1);

      // Un-filter results
      //
      this._inPlaceFilterService.removeFilter(this.results, this.filteredResults, $event.model);
      this._resetPaginatedResults();
    }
  }

  /**
   * Emits the clicked item.
   * @param $item
   */
  public handleSearchClick($item: any) {
    this.resultSelected.emit($item);
  }

  /**
   * Moves to the next page of search results.
   */
  public nextPage() {

    if (this.nextPageEnabled) {
      // Move to next page
      //
      this.paginationIndex += this.paginationSize;
      this.paginatedResults = this.filteredResults.slice(this.paginationIndex - 1, this.paginationIndex + this.paginationSize - 1);
    }
  }

  /**
   * Moves to the previous page of search results.
   */
  public previousPage() {

    if (this.previousPageEnabled) {
      // Move to next page
      //
      this.paginationIndex -= this.paginationSize;
      this.paginatedResults = this.filteredResults.slice(this.paginationIndex - 1, this.paginationIndex + this.paginationSize - 1);
    }
  }

  get paginatedResultsLength() {

    if (this.paginatedResults.length > 0) {
      return this.paginationIndex + this.paginatedResults.length - 1;
    }

    return 0;
  }

  get nextPageEnabled() {
    return this.paginationIndex + this.paginationSize < this.filteredResults.length;
  }

  get previousPageEnabled() {
    return this.paginationIndex - this.paginationSize > -1;
  }

  private _resetPaginatedResults() {
    this.paginatedResults = this.filteredResults.slice(0, this.paginationSize);
    this.paginationIndex = this.paginatedResults.length ? 1 : 0;
  }
}
