import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpXsrfTokenExtractor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class XsrfInterceptor implements HttpInterceptor {
  constructor(private httpXsrfTokenExtractor: HttpXsrfTokenExtractor) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const cookieXsrfHeaderName = 'X-XSRF-TOKEN';
    if (this.httpXsrfTokenExtractor.getToken() !== null && !request.headers.has(cookieXsrfHeaderName)) {
      request = request.clone({
        headers: request.headers.set(cookieXsrfHeaderName, this.httpXsrfTokenExtractor.getToken() as string),
      });
    }
    return next.handle(request);
  }
}
