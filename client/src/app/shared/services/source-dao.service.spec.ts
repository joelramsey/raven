/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SourceDaoService } from './source-dao.service';

describe('Service: SourcesDao', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SourceDaoService]
    });
  });

  it('should ...', inject([SourceDaoService], (service: SourceDaoService) => {
    expect(service).toBeTruthy();
  }));
});
