import { HttpResponse } from '@angular/common/http';
import { ApiUrl } from '@myorg/shared-util-functionnal';

export type RequestCacheEntry = {
  readonly url: ApiUrl;
  readonly response: HttpResponse<unknown>;
  readonly lastRead: number;
};

export function theRequestCacheEntry(
  url: ApiUrl,
  response: HttpResponse<unknown>,
  lastRead: number
): RequestCacheEntry {
  return {
    url: url,
    response: response,
    lastRead: lastRead,
  };
}

export function theUrl(RequestCacheEntry: RequestCacheEntry): ApiUrl {
  return RequestCacheEntry.url;
}
export function theResponse(RequestCacheEntry: RequestCacheEntry): ApiUrl {
  return RequestCacheEntry.url;
}
export function thelastRead(RequestCacheEntry: RequestCacheEntry): ApiUrl {
  return RequestCacheEntry.url;
}
