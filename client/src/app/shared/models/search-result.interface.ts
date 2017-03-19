export interface SearchResult {
  results: Array<SearchResultListItem>;
  facets: Array<SearchFacet>;
}

export interface SearchFacet {
  label: string;
  type: string; // ordinal, nominal, range, boolean
  value: Array<any>;
}

export interface SearchFilter {
  label: string;
  value: any;
  type: string; // ordinal, nominal, range, boolean
  prettyName?:string;
}

export interface SearchResultListItem {
  title: string;
  description: string;
  facets: Array<SearchFacet>;
  sourceUrl?: string;
  citation?: Citation;
}

export interface Citation {
  text: string;
}

export class SearchConstants {
  public static FACET_TYPES = {
    Boolean: 'boolean',
    Nominal: 'nominal'
  };

  public static BINARY_FACET_TYPES = [SearchConstants.FACET_TYPES.Boolean];
}
