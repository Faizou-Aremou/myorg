import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Message } from '../services/message';

import { LoggingInterceptor } from './logging.interceptor';
class SimpleMessageService extends Message {
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
  let messenger: SimpleMessageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoggingInterceptor,
        { provide: Message, useClass: SimpleMessageService },
      ],
    });
    interceptor = TestBed.inject(LoggingInterceptor);
  });

  it('should created LoggingInterceptor ', () => {
    expect(interceptor).toBeTruthy();
  });
  it('intercept', () => {
    class SimpleHttpHandler extends HttpHandler{
      handle():Observable<HttpEvent<unknown>>{
        return of(new HttpResponse({body:'test'}))
      }
    }
    const requestMock = new HttpRequest('GET', '/test');
    interceptor.intercept(requestMock, new SimpleHttpHandler()).subscribe(() => {
     expect(messenger.messages).toBe("GET '/test' succeeded in 2741 ms.");
    });
  });
});
