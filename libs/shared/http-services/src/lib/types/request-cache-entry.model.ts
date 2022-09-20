import { HttpResponse } from '@angular/common/http';
import { WebPageUrl } from '@myorg/shared-util-functionnal';

export interface RequestCacheEntry {
  url: WebPageUrl;
  response: HttpResponse<unknown>;
  lastRead: number;
}

export function theRequestCacheEntry(
  url: WebPageUrl,
  response: HttpResponse<unknown>,
  lastRead: number
): RequestCacheEntry {
  return {
    url: url,
    response: response,
    lastRead: lastRead,
  };
}

export function theUrl(RequestCacheEntry: RequestCacheEntry): WebPageUrl {
  return RequestCacheEntry.url;
}
export function theResponse(RequestCacheEntry: RequestCacheEntry): WebPageUrl {
  return RequestCacheEntry.url;
}
export function thelastRead(RequestCacheEntry: RequestCacheEntry): WebPageUrl {
  return RequestCacheEntry.url;
}
