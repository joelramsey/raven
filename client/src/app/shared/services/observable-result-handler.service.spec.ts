/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ObservableResultHandlerService } from './observable-result-handler.service';

describe('Service: ObservableResultHandler', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObservableResultHandlerService]
    });
  });

  it('should ...', inject([ObservableResultHandlerService], (service: ObservableResultHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
