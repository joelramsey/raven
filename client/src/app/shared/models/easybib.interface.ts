// http://developer.easybib.com/citation-formatting-api/citation-specification/

export const CITATION_SOURCE_TYPES = {
  book: {
    key: 'book',
    name: 'Book',
    publicationType: 'pubnonperiodical'
  },
  chapter: {
    key: 'chapter',
    name: 'Chapter',
    publicationType: 'pubnonperiodical'
  },
  journal: {
    key: 'journal',
    name: 'Journal',
    publicationType: 'pubjournal'
  },
  magazine: {
    key: 'magazine',
    name: 'Magazine',
    publicationType: 'pubmagazine'
  },
  newspaper: {
    key: 'newspaper',
    name: 'Newspaper',
    publicationType: 'pubjournal'
  },
  website: {
    key: 'website',
    name: 'Website',
    publicationType: 'pubonline'
  }
};

export const CITATION_STYLES = {
  mla7: {
    key: 'mla7',
    name: 'MLA'
  },
  apa: {
    key: 'apa',
    name: 'APA'
  },
  chicagob: {
    key: 'chicagob',
    name: 'Chicago'
  },
};

export interface CitationRequest {
  key: string;
  source: 'book' | 'chapter' | 'magazine' | 'newspaper' | 'journal' | 'website';
  style: 'mla7' | 'apa' | 'chicagob';
  pubtype: PublicationType;

  // NOTE: EasyBib's API documentation incorrectly dictates that this attribute
  // is to be added under the PublicationType object. In reality, this attribute
  // must be specified here, else a blank string is returned.
  //
  contributors: Array<Contributor>;

  book?: BookSource;
  chapter?: ChapterSource;
  magazine?: MagazineSource;
  newspaper?: NewspaperSource;
  journal?: JournalSource;
  website?: WebsiteSource;

  // Again, EasyBib's API spec is out-of-date on the matter, incorrectly
  // specifying that
  pubnonperiodical?: NonPeriodicalPublicationType;
  pubmagazine?: MagazinePublicationType;
  pubnewspaper?: NewspaperPublicationType;
  pubjournal?: JournalPublicationType;
  pubonline?: OnlinePublicationType;
}

export interface PublicationType {
  main: 'pubnonperiodical' | 'pubmagazine' | 'pubnewspaper' | 'pubjournal' | 'pubonline';
}

export interface Contributor {
  'function': 'author' | 'editor' | 'compiler' | 'translator' | 'section_author' | 'section_editor';
  first: string;
  middle: string;
  last: string;
}

export interface SourceData {
  title?: string;
  type?:string;
}

/**
 * PUBLICATION TYPES
 */
export interface NonPeriodicalPublicationType {
  title: string;
  publisher: string;
  city: string;
  state: string;
  vol: string;
  editiontext: string;
  year: string;
  start?: string;
  end?: string
}

export interface MagazinePublicationType {
  title: string;
  vol: string;
  day: string;
  month: string;
  year: string;
  start: string;
  end: string;
  nonconsecutive: string;
}

export interface NewspaperPublicationType {
  title: string;
  edition: string;
  section: string;
  city: string;
  day: string;
  month: string;
  year: string;
  start: string;
  end: string;
  nonconsecutive: string;
}

export interface JournalPublicationType {
  title: string;
  issue: string;
  volume: string;
  restarts: string;
  series: string;
  year: string;
  start: string;
  end: string;
  nonconsecutive: string;
}

export interface OnlinePublicationType {
  title: string;
  inst: string;
  day: string;
  month: string;
  year: string;
  url: string;
  dayaccessed: string;
  monthaccessed: string;
  yearaccessed: string;
}

/**
 * SOURCE TYPES
 **/
export interface BookSource {
}

export interface ChapterSource {
  type: 'story' | 'essay';
  title: string;
}

export interface MagazineSource {
  title: string;
}

export interface NewspaperSource {
  title: string;
}

export interface JournalSource {
  title: string;
}

export interface WebsiteSource {
  title: string;
}
