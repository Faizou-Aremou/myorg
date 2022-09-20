import { TestBed } from '@angular/core/testing';

import { SimpleFileService } from './simple-file.service';

describe('SimpleFileService', () => {
  let service: SimpleFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpleFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
