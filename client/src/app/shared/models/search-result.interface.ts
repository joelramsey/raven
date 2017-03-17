export interface SearchResult {
  results: Array<SearchResultListItem>;
  facets: Array<SearchFacet>;
}

export interface SearchFacet {
  label: string;
  type: string; // ordinal, nominal, range, boolean
  values: Array<any>;
}

export interface SearchFilter {
  label: string;
  value: any;
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
