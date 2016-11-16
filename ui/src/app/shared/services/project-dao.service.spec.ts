/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProjectDaoService } from './project-dao.service';

describe('Service: ProjectDao', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectDaoService]
    });
  });

  it('should ...', inject([ProjectDaoService], (service: ProjectDaoService) => {
    expect(service).toBeTruthy();
  }));
});
