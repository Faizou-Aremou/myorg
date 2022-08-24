import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Authorization } from '../services/authorization';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private authorizationService: Authorization) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authorizationToken = this.authorizationService.getAuthorizationToken();
    const authorizationReq = request.clone({ setHeaders: { Authorization: authorizationToken } });
    return next.handle(authorizationReq);
  }
}
