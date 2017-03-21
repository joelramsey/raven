import { Injectable } from '@angular/core';
import { SearchResultListItem, SearchFilter, SearchFacet, SearchConstants } from '../../shared/models/index';

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
        return facet.value.some((value: string) => {
          // Range check
          //
          if (filter.type === SearchConstants.FACET_TYPES.Range) {
            let numValue = +value;
            return numValue >= filter.value[0] && numValue <= filter.value[1];
          }

          // Equality check
          //
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
}
