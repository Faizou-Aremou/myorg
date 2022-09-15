import { TestBed } from '@angular/core/testing';

import { TrackingAndShowingRequestProgressService } from './tracking-and-showing-request-progress.service';

describe('TrackingAndShowingRequestProgressService', () => {
  let service: TrackingAndShowingRequestProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackingAndShowingRequestProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
