import { TestBed } from '@angular/core/testing';

import { CvServeService } from './auth/cv-serve.service';

describe('CvServeService', () => {
  let service: CvServeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvServeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
