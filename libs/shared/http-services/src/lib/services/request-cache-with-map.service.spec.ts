import { HttpRequest, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CACHEABLE_URLS } from '../tokens/cacheable-urls';
import { MAX_AGE } from '../tokens/max-age';

import { RequestCacheWithMapService } from './request-cache-with-map.service';

describe('RequestCacheWithMapService', () => {
  let requestCacheWithMapService: RequestCacheWithMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CACHEABLE_URLS, useValue: ['/test'] },
        { provide: MAX_AGE, useValue: 3000 },
      ],
    });
    requestCacheWithMapService = TestBed.inject(RequestCacheWithMapService);
  });

  it('should be created', () => {
    expect(requestCacheWithMapService).toBeTruthy();
  });
  jest.useFakeTimers();
  it('should get cached response', () => {
    const url = '/test';
    const request = new HttpRequest('GET', url);
    const response = new HttpResponse({
      body: 'response',
    });
    requestCacheWithMapService.put(request, response);
    expect(
      requestCacheWithMapService.get(new HttpRequest('GET', '/falseUrl'))
    ).toEqual(undefined);

    expect(requestCacheWithMapService.get(new HttpRequest('GET', url))).toEqual(
      new HttpResponse({
        body: 'response',
      })
    );
    jest.advanceTimersByTime(4000);
    requestCacheWithMapService.put(
      new HttpRequest('GET', '/test-expiration'),
      response
    );
    expect(
      requestCacheWithMapService.get(new HttpRequest('GET', '/test-expiration'))
    ).toEqual(undefined);
  });
});
