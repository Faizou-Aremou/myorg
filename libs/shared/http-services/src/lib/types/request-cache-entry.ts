import { HttpResponse } from '@angular/common/http';
import { Url } from '@myorg/shared-util-functionnal';

export interface RequestCacheEntry {
  url: Url;
  response: HttpResponse<unknown>;
  lastRead: number;
}

export function theRequestCacheEntry(
  url: Url,
  response: HttpResponse<unknown>,
  lastRead: number
): RequestCacheEntry {
  return {
    url: url,
    response: response,
    lastRead: lastRead,
  };
}

export function theUrl(RequestCacheEntry: RequestCacheEntry): Url {
  return RequestCacheEntry.url;
}
export function theResponse(RequestCacheEntry: RequestCacheEntry): Url {
  return RequestCacheEntry.url;
}
export function thelastRead(RequestCacheEntry: RequestCacheEntry): Url {
  return RequestCacheEntry.url;
}
