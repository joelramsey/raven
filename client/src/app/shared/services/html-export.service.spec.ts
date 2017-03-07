import { TestBed, inject } from '@angular/core/testing';

import { HtmlDocxConverterService } from './html-docx-converter.service';

describe('HtmlDocxConverterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HtmlDocxConverterService]
    });
  });

  it('should ...', inject([HtmlDocxConverterService], (service: HtmlDocxConverterService) => {
    expect(service).toBeTruthy();
  }));
});
