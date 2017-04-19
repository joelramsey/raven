import { TestBed, inject } from '@angular/core/testing';

import { CitationDaoService } from './citation-export.service';

describe('CitationDaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CitationDaoService]
    });
  });

  it('should ...', inject([CitationDaoService], (service: CitationDaoService) => {
    expect(service).toBeTruthy();
  }));
});
