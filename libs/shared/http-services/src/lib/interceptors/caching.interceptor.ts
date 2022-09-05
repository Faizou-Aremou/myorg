import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpRequestCache } from '../services/http-request-cache';
import { isCacheable } from '../utils';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private readonly cache: HttpRequestCache) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!isCacheable(request, this.cache.cacheableUrls)) {
      return next.handle(request);
    }

    const cachedResponse = this.cache.get(request);
    return cachedResponse
      ? of(cachedResponse)
      : sendRequest(request, next, this.cache);
  }
}

function sendRequest(
  request: HttpRequest<unknown>,
  next: HttpHandler,
  cache: HttpRequestCache
): Observable<HttpEvent<unknown>> {
  return next.handle(request).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        cache.put(request, event);
      }
    })
  );
}
