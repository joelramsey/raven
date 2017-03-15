import { TestBed, inject } from '@angular/core/testing';

import { InPlaceFilterService } from './in-place-filter.service';

describe('InPlaceFilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InPlaceFilterService]
    });
  });

  it('should ...', inject([InPlaceFilterService], (service: InPlaceFilterService) => {
    expect(service).toBeTruthy();
  }));
});
