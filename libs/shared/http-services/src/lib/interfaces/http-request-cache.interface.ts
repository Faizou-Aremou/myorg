import { HttpRequest, HttpResponse } from '@angular/common/http';
import { CacheableUrls } from '../types/cacheable-urls';

export abstract class HttpRequestCacheInterface {
  abstract readonly cacheableUrls: CacheableUrls;
  abstract get(req: HttpRequest<unknown>): HttpResponse<unknown> | undefined;
  abstract put(
    req: HttpRequest<unknown>,
    response: HttpResponse<unknown>
  ): void;
}
