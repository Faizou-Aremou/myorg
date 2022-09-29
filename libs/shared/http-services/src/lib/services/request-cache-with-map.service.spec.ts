import { TestBed } from '@angular/core/testing';
import { CACHEABLE_URLS } from '../tokens/cacheable-urls';
import { MAX_AGE } from '../tokens/max-age';

import { RequestCacheWithMapService } from './request-cache-with-map.service';

describe('RequestCacheWithMapService', () => {
  let service: RequestCacheWithMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CACHEABLE_URLS, useValue: ['/test'] },
        { provide: MAX_AGE, useValue: 3000 },
      ],
    });
    service = TestBed.inject(RequestCacheWithMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  // it('should get cached response', () => {
  //   expect(service).toBeTruthy();
  // });
  // it('should put response in cache', () => {
  //   expect(service).toBeTruthy();
  // });
});
