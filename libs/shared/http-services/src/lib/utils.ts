import { HttpRequest } from "@angular/common/http";
import { CacheableUrls } from "./types/cacheable-urls";

export function isCacheable(request: HttpRequest<unknown>, cacheableUrls:CacheableUrls) {
    return request.method === 'GET' &&
      -1 < cacheableUrls.indexOf(request.url);
  }