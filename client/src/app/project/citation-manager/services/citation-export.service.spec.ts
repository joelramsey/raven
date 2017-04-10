import { TestBed, inject } from '@angular/core/testing';

import { CitationExportService } from './citation-export.service';

describe('CitationExportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CitationExportService]
    });
  });

  it('should ...', inject([CitationExportService], (service: CitationExportService) => {
    expect(service).toBeTruthy();
  }));
});
