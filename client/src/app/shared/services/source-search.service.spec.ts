import { TestBed, inject } from '@angular/core/testing';

import { SourceSearchService } from './source-search.service';

describe('SourceSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SourceSearchService]
    });
  });

  it('should ...', inject([SourceSearchService], (service: SourceSearchService) => {
    expect(service).toBeTruthy();
  }));
});
