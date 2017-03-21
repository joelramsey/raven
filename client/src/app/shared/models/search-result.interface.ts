export interface SearchResult {
  results: Array<SearchResultListItem>;
  facets: Array<SearchFacet>;
}

export interface SearchFacet {
  label: string;
  type: string; // ordinal, nominal, range, boolean
  value: Array<any>;
  count?: { [valueKey: string]: number }
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
  peerReviewed?: boolean;
  sourceUrl?: string;
  citation?: Citation;
}

export interface SearchResultListItemAddEvent {
  type: string;
  record: SearchResultListItem;
}

export interface Citation {
  text: string;
}

export class SearchConstants {
  public static FACET_TYPES = {
    Boolean: 'boolean',
    Nominal: 'nominal',
    Range: 'range'
  };

  public static BINARY_FACET_TYPES = [
    SearchConstants.FACET_TYPES.Boolean,
    SearchConstants.FACET_TYPES.Range
  ];

  public static ERIC_LABEL_MAP = {
    LANGUAGE: {
      eric: 'dc:language',
      label: 'language',
      type: 'nominal'
    },
    SUBJECT: {
      eric: 'dc:subject',
      label: 'subject',
      type: 'nominal'
    },
    TYPE: {
      eric: 'dc:type',
      label: 'type',
      type: 'nominal'
    },
    EDUCATION_LEVEL: {
      eric: 'dcterms:educationLevel',
      label: 'education level',
      type: 'nominal'
    },
    SPONSOR: {
      eric: 'eric:sponsor',
      label: 'sponsor',
      type: 'nominal'
    },
    AUDIENCE: {
      eric: 'dcterms:audience',
      label: 'audience',
      type: 'nominal'
    },
    FULLTEXT_AVAILABLE: {
      eric: 'dcterms:accessRights',
      label: 'full text available',
      type: 'boolean'
    },
    PEER_REVIEWED: {
      eric: 'eric:peer_reviewed',
      label: 'peer reviewed',
      type: 'boolean'
    },
    PUBLICATION_DATE: {
      eric: 'dc:date',
      label: 'publication year',
      type: 'range'
    }
  };
}
