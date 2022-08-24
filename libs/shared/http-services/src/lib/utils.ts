import { HttpRequest } from "@angular/common/http";

export function isCacheable(request: HttpRequest<unknown>, cacheableUrls:string[]) {
    return request.method === 'GET' &&
      -1 < cacheableUrls.indexOf(request.url);
  }