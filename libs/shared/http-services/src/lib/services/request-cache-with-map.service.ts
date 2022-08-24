import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { RequestCacheEntry } from '../interfaces/request-cache-entry';
import { CACHEABLE_URLS } from '../tokens/cacheable-urls';
import { MAX_AGE } from '../tokens/max-age';
import { HttpRequestCache } from './http-request-cache';


@Injectable({
  providedIn: 'root'
})
export class RequestCacheWithMapService extends HttpRequestCache{

  private cache = new Map<string, RequestCacheEntry>();

  constructor(@Inject(CACHEABLE_URLS) public cacheableUrls: string[], @Inject(MAX_AGE) public maxAge: number ) {
    super()
   }

  get(request: HttpRequest<unknown>): HttpResponse<unknown> | undefined {
    const url = request.urlWithParams;
    const cached = this.cache.get(url);

    if (!cached) {
      return undefined;
    }

    const isExpired = cached.lastRead < (Date.now() - this.maxAge);
    return isExpired ? undefined : cached.response;
  }

  put(req: HttpRequest<unknown>, response: HttpResponse<unknown>): void {
    const url = req.urlWithParams;

    const newEntry = { url, response, lastRead: Date.now() };
    this.cache.set(url, newEntry);

    // remove expired cache entries
    const expired = Date.now() - this.maxAge;
    this.cache.forEach(entry => {
      if (entry.lastRead < expired) {
        this.cache.delete(entry.url);
      }
    });
  }
}
