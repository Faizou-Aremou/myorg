import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Credentials } from '../models/credential.model';
import { User } from '../models/user.model';
import { Authorization } from '../services/authorization';

import { AuthorizationInterceptor } from './authorization.interceptor';

class AuthService extends Authorization {
  login(credentials: Credentials): Observable<User> {
    throw new Error('Method not implemented.');
  }
  logout(): Observable<void> {
    throw new Error('Method not implemented.');
  }
  isAuth(): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
  getAuthorizationToken(): string {
    return 'some-auth-token';
  }
}

describe('AuthorizationInterceptor', () => {
  let interceptor: AuthorizationInterceptor;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthorizationInterceptor,
        { provide: Authorization, useClass: AuthService },
      ],
    });
    interceptor = TestBed.inject(AuthorizationInterceptor);
  });

  it('should created AuthorizationInterceptor', () => {
    expect(interceptor).toBeTruthy();
  });

  it('intercept', () => {
    class SimpleHttpHandler extends HttpHandler {
      handle(req:HttpRequest<unknown>): Observable<HttpEvent<unknown>> {
        return of(new HttpResponse({ body: 'test', headers: req.headers }));
      }
    }
    const requestMock = new HttpRequest('GET', '/test');
    interceptor
      .intercept(requestMock, new SimpleHttpHandler())
      .subscribe((response )=>{
       expect((response as HttpResponse<unknown>).headers.get('Authorization')).toBe('some-auth-token');
      });
  });
});
