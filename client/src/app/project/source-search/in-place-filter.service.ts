import { Injectable } from '@angular/core';
import { SearchResultListItem, SearchFilter, SearchFacet } from '../../shared/models/index';

@Injectable()
export class InPlaceFilterService {

  constructor() { }

  /**
   * Removes elements based on the provided array of results. Performing this action in-place has the advantage of
   * allowing us to use 'indexOf', which is rather faster than comparing results one-by-one.
   *
   * @param filteredResults
   * @param filter
   */
  public addFilter(filteredResults: Array<SearchResultListItem>, filter: SearchFilter) {

    let indexesToRemove: Array<number> = [];

    filteredResults.forEach((result: SearchResultListItem, index: number) => {

      let foundFacetMatch = result.facets.some((facet: SearchFacet) => {

        // If any facets match the filter exactly, we're good here; no need to remove element
        //
        if (facet.label !== filter.label) {
          return false;
        }

        // If we're here,the label matches
        //
        return facet.values.some((value: string) => {
          return value === filter.value;
        });
      });

      if (!foundFacetMatch) {
        indexesToRemove.push(index);
      }
    });

    // Remove elements
    //
    if (indexesToRemove.length) {
      for(let i = indexesToRemove.length - 1; i > -1; i--) {
        filteredResults.splice(indexesToRemove[i], 1);
      }
    }
  }

  /**
   * Adds elements based on the provided array of results. Performing this action in-place has the advantage of
   * allowing us to use 'indexOf', which is rather faster than comparing results one-by-one.
   *
   * @param results
   * @param filteredResults
   * @param filter
   */
  public removeFilter(results: Array<SearchResultListItem>, filteredResults: Array<SearchResultListItem>, filter: SearchFilter) {

    let indexesToAdd: Array<number> = [];

    results.forEach((result: SearchResultListItem, index: number) => {

      let foundFacetMatch = result.facets.some((facet: SearchFacet) => {

        // If any facets match the filter exactly, we're good here and should match the element.
        //
        if (facet.label !== filter.label) {
          return false;
        }

        // If we're here,the label matches
        //
        return facet.values.some((value: string) => {
          return value === filter.value;
        });
      });

      if (!foundFacetMatch) {
        indexesToAdd.push(index);
      }
    });

    // Add elements if they don't already exist in the filtered list.
    //
    indexesToAdd.forEach((i: number) => {
      if (filteredResults.indexOf(results[i]) === -1) {
        filteredResults.push(results[i]);
      }
    });
  }
}
