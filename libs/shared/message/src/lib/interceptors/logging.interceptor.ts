import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Message } from '../services/message';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private messenger: Message) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const started = Date.now();
    let ok: string;

    return next.handle(request).pipe(
      tap({
        next: (event) =>
          (ok = event instanceof HttpResponse ? 'succeeded' : ''),
          error: () => (ok = 'failed')
      }),
      finalize(() => {
        const elapsed = Date.now() - started;
        const message = `${request.method} "${request.urlWithParams}" ${ok} in ${elapsed} ms.`;
        this.messenger.add(message);
      })
    );
  }
}
