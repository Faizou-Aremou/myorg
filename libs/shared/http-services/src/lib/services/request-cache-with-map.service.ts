import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { RequestCacheEntry } from '../types/request-cache-entry.model';
import { CACHEABLE_URLS } from '../tokens/cacheable-urls';
import { MAX_AGE } from '../tokens/max-age';
import { HttpRequestCacheInterface } from '../interfaces/http-request-cache.interface';
import { ApiUrl } from '@myorg/shared-util-functionnal';
import { CacheableUrls } from '../types/cacheable-urls';

@Injectable({
  providedIn: 'root',
})
export class RequestCacheWithMapService implements HttpRequestCacheInterface {
  private readonly cache = new Map<ApiUrl, RequestCacheEntry>();

  constructor(
    @Inject(CACHEABLE_URLS) public cacheableUrls: CacheableUrls,
    @Inject(MAX_AGE) public maxAge: number
  ) {}

  get(request: HttpRequest<unknown>): HttpResponse<unknown> | undefined {
    const url = request.urlWithParams;
    const cached = this.cache.get(url);

    if (!cached) {
      return undefined;
    }

    const isExpired = cached.lastRead < this.getDateNowLessMaxAge();
    return isExpired ? undefined : cached.response;
  }

  put(request: HttpRequest<unknown>, response: HttpResponse<unknown>): void {
    const url = request.urlWithParams;
    if (!this.cacheableUrls.some((cacheableUrl) => cacheableUrl === url)) {
      return;
    }
    const newEntry = { url, response, lastRead: Date.now() };
    this.cache.set(url, newEntry);
    const date = this.getDateNowLessMaxAge();

    this.removeExpiredCachedResponses(date);
  }

  private removeExpiredCachedResponses(date: number) {
    this.cache.forEach((entry) => {
      if (entry.lastRead < date) {
        this.cache.delete(entry.url);
      }
    });
  }

  private getDateNowLessMaxAge(){
    return Date.now() - this.maxAge;
  }
}
