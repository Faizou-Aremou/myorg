import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TrackingAndShowingRequestProgressService } from './tracking-and-showing-request-progress.service';
import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { ApiUrl } from '@myorg/shared-util-functionnal';

describe('TrackingAndShowingRequestProgressService', () => {
  let service: TrackingAndShowingRequestProgressService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TrackingAndShowingRequestProgressService);
  });
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#trackingRequest', () => {
    let startReceptionEvent: HttpEvent<unknown>;
    let uploadReceptionEvent: HttpEvent<unknown>;
    let endReceptionEvent: HttpEvent<unknown>;
    let apiUrl:ApiUrl;
    beforeEach(() => {
      startReceptionEvent = {
        type: HttpEventType.Sent,
      };
      uploadReceptionEvent = {
        type: HttpEventType.UploadProgress,
        loaded: 30,
      };
      endReceptionEvent = new HttpResponse();
      apiUrl='/test';
    });
    it('should return start Reception Event ', () => {
      service.trackingRequest<string>('text', apiUrl ).subscribe({
        next: received => expect(received).toBe(0),
        error: requestFail,
      });
      const request = httpTestingController.expectOne(apiUrl);
      expect(request.request.method).toBe('POST');
      request.flush(startReceptionEvent);
    });

    it('should return upload Reception Event ', () => {
      service.trackingRequest<string>('text', apiUrl ).subscribe({
        next: received => expect(received).toBe(30),
        error: requestFail,
      });
      const request = httpTestingController.expectOne(apiUrl);
      expect(request.request.method).toBe('POST');
      request.flush(uploadReceptionEvent);
    });


    it('should return end reception event ', () => {
      service.trackingRequest<string>('text', apiUrl ).subscribe({
        next: received => expect(received).toBe(100),
        error: requestFail,
      });
      const request = httpTestingController.expectOne(apiUrl);
      expect(request.request.method).toBe('POST');
      request.flush(endReceptionEvent);
    });

  });
});
function requestFail(reason = "fail was called in a test.") {
  throw new Error(reason);
}