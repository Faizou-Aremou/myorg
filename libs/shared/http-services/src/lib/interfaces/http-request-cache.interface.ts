import { HttpRequest, HttpResponse } from '@angular/common/http';

export abstract class HttpRequestCacheInterface {
  abstract readonly cacheableUrls: string[];
  abstract get(req: HttpRequest<unknown>): HttpResponse<unknown> | undefined;
  abstract put(
    req: HttpRequest<unknown>,
    response: HttpResponse<unknown>
  ): void;
}
