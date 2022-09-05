import { HttpResponse } from "@angular/common/http";

export interface RequestCacheEntry {
    url: string;
    response: HttpResponse<unknown>;
    lastRead: number;
  }