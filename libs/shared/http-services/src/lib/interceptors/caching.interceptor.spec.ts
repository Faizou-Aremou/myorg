import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpRequestCacheInterface } from '../interfaces/http-request-cache.interface';
import { RequestCacheWithMapService } from '../services/request-cache-with-map.service';
import { CACHEABLE_URLS } from '../tokens/cacheable-urls';
import { MAX_AGE } from '../tokens/max-age';

import { CachingInterceptor } from './caching.interceptor';

describe('CachingInterceptor', () => {
  let interceptor: CachingInterceptor;
  let cache: RequestCacheWithMapService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CachingInterceptor,
        { provide: HttpRequestCacheInterface, useClass: RequestCacheWithMapService },
        { provide: CACHEABLE_URLS, useValue: ['/test'] },
        { provide: MAX_AGE, useValue: 3000 },
      ],
    });
    interceptor = TestBed.inject(CachingInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
  it('intercept', () => {
    class SimpleHttpHandler extends HttpHandler {
      handle(request:HttpRequest<unknown>): Observable<HttpEvent<unknown>> {
        return of(new HttpResponse({ body: 'test', headers: request.headers }));
      }
    }
    const requestMock1 = new HttpRequest('GET', '/test');
    interceptor
      .intercept(requestMock1, new SimpleHttpHandler())
      .subscribe(()=>{
       expect( cache.get(requestMock1)).toEqual(new HttpResponse({ body: 'test', headers: requestMock1.headers }));
      });
    const requestMock2 = new HttpRequest('GET', '/test2');
    interceptor
      .intercept(requestMock2, new SimpleHttpHandler())
      .subscribe(()=>{
       expect( cache.get(requestMock2)).toBe(undefined);
      });
  });
});
