export interface SearchResult {
  results: Array<SearchResultListItem>;
  facets: Array<SearchFacet>;
}

export interface SearchFacet {
  label: string;
  type: string; // ordinal, nominal, range
  values: Array<string>;
}

export interface SearchResultListItem {
  title: string;
  description: string;
  sourceUrl?: string;
  citation?: Citation;
}

export interface Citation {
  text: string;
}
