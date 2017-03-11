export interface SearchResultListItem {
  title: string;
  description: string;
  sourceUrl?: string;
  citation?: Citation;
}

export interface Citation {
  text: string;
}
