import { TestBed, inject } from '@angular/core/testing';

import { SearchResultsDeserializerService } from './search-results-deserializer.service';

describe('SearchResultsDeserializerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchResultsDeserializerService]
    });
  });

  it('should ...', inject([SearchResultsDeserializerService], (service: SearchResultsDeserializerService) => {
    expect(service).toBeTruthy();
  }));
});
