import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

import { SourceSearchService, ObservableResultHandlerService } from '../../shared/services/index';
import {
  SearchResult,
  SearchResultListItem,
  SearchFacet,
  SearchFilter,
  PillClickEvent,
  SearchConstants,
  SearchResultListItemAddEvent
} from '../../shared/models/index';

import { InPlaceFilterService } from './in-place-filter.service';

@Component({
  selector: 'rvn-source-search',
  templateUrl: './source-search.component.html',
  styleUrls: ['./source-search.component.scss']
})
export class SourceSearchComponent implements OnInit {

  @Input() public searchTerm: string = '';
  @Input() public paginationSize: number = 30;
  @Input() public addEnabled: boolean = false;

  @Output() public resultSelected: EventEmitter<SearchResultListItem> = new EventEmitter<SearchResultListItem>();
  @Output() public addSearchResult: EventEmitter<SearchResultListItemAddEvent> = new EventEmitter<SearchResultListItemAddEvent>();

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
      .debounceTime(900)
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
      }, (error: any) => {
        this.searching = false;
        this._observableResultHandlerService.failure(error);
      });
  }

  /**
   * Adds a filter if it doesn't already exist.
   *
   * @param $event
   */
  public addFilter($event: SearchFilter) {

    let filterIdx = -1;
    let isBinaryFilter = SearchConstants.BINARY_FACET_TYPES.indexOf($event.type) > -1;
    let filterExists = this.appliedFilters.some((filter: SearchFilter, index) => {
      if (filter.label === $event.label) {

        // If the filter is a binary type, we only need to match on label.
        // Otherwise, we need to match on value too.
        //
        if (isBinaryFilter || filter.value === $event.value) {

          filterIdx = index;
          return true;
        }
      }

      return false;
    });

    // Add if the filter doesn't already exist
    //
    if (!filterExists) {

      let newFilter: SearchFilter = {
        prettyName: $event.label + ':' + $event.value,
        type: $event.type,
        label: $event.label,
        value: $event.value
      };
      this.appliedFilters.push(newFilter);

      // Filter results
      //
      this._inPlaceFilterService.addFilter(this.filteredResults, newFilter);
      this._resetPaginatedResults();
    } else if (isBinaryFilter) {


      // Reset results
      //
      this.filteredResults = this.results.slice();

      // Remove old filter
      //
      this.appliedFilters.splice(filterIdx, 1);

      // Update value for binary filter
      //
      this.appliedFilters.push({
        prettyName: $event.label + ':' + $event.value,
        type: $event.type,
        label: $event.label,
        value: $event.value
      });

      // Re-apply filters
      //
      this.appliedFilters.forEach(filter => this._inPlaceFilterService
        .addFilter(this.filteredResults, filter));

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

      this.filteredResults = this.results.slice();
      this.appliedFilters.splice(filterIdx, 1);
      this.appliedFilters.forEach(filter => this._inPlaceFilterService.addFilter(this.filteredResults, filter));
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
   * Emits the clicked item as an abstract to be added
   * @param $event
   * @param item
   */
  public handleAddAsAbstract($event: any, item: any) {
    $event.stopPropagation();
    this.addSearchResult.emit({
      type: 'abstract',
      record: item
    });
  }

  /**
   * Emits the clicked item as a full text to be added
   * @param $event
   * @param item
   */
  public handleAddAsFullText($event: any, item: any) {
    $event.stopPropagation();
    this.addSearchResult.emit({
      type: 'fullText',
      record: item
    });
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
