import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorizationInterface } from '../interfaces/authorization.interface';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private authorizationService: AuthorizationInterface) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authorizationToken = this.authorizationService.getAuthorizationToken();
    const authorizationReq = request.clone({ setHeaders: { Authorization: authorizationToken } });
    return next.handle(authorizationReq);
  }
}
