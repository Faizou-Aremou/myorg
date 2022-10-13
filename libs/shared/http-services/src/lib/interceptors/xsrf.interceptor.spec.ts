import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpXsrfTokenExtractor,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { XsrfInterceptor } from './xsrf.interceptor';
class SimpleHttpXsrfTokenExtractor extends HttpXsrfTokenExtractor {
  getToken(): string | null {
    return 'token';
  }
}
describe('XsrfInterceptor', () => {
  let interceptor: XsrfInterceptor;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        XsrfInterceptor,
        { provide: HttpXsrfTokenExtractor, useClass: SimpleHttpXsrfTokenExtractor },
      ],
    });
    interceptor = TestBed.inject(XsrfInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('intercept', () => {
    class SimpleHttpHandler extends HttpHandler {
      handle(request: HttpRequest<unknown>): Observable<HttpEvent<unknown>> {
        return of(new HttpResponse({ body: 'test', headers: request.headers }));
      }
    }
    const requestMock1 = new HttpRequest('GET', '/test');
    interceptor.intercept(requestMock1, new SimpleHttpHandler()).subscribe();
  });
});
