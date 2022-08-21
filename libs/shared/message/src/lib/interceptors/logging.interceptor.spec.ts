import { HttpClient, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { MessageService } from '../services/message.service';

import { LoggingInterceptor } from './logging.interceptor';
class SimpleMessageService extends MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}



describe('LoggingInterceptor', () => {
  let interceptor: LoggingInterceptor;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let messenger: SimpleMessageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LoggingInterceptor,
        { provide: MessageService, useClass: SimpleMessageService },
      ],
    });
    interceptor = TestBed.inject(LoggingInterceptor);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created interceptor ', () => {
    expect(interceptor).toBeTruthy();
  });
  it('intercept', () => {
    class SimpleHttpHandler extends HttpHandler{
      handle():Observable<HttpEvent<any>>{
        return of(new HttpResponse({body:'test'}))
      }
    }
    const requestMock = new HttpRequest('GET', '/test');
    interceptor.intercept(requestMock, new SimpleHttpHandler()).subscribe(() => {
     expect(messenger.messages).toBe("GET '/test' succeeded in 2741 ms.");
    });
  });
});
