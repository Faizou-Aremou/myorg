import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpProgressEvent,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl, Path, Percentage} from '@myorg/shared-util-functionnal';
import { map, Observable } from 'rxjs';
import { TrackingAndShowingRequestProgressInterface } from '../interfaces/tracking-and-showing-request-progress.interface';

@Injectable({
  providedIn: 'root',
})
export class TrackingAndShowingRequestProgressService implements TrackingAndShowingRequestProgressInterface {
  constructor(private http: HttpClient) {}

  trackingRequest<T>(data: T, path: ApiUrl): Observable<Percentage> {
    const request = new HttpRequest('POST', path, data, {
      reportProgress: true,
    });
    return this.http
      .request(request)
      .pipe(map((event) => this.getEventPercent(event)));
  }
  private getEventPercent(event: HttpEvent<unknown>): Percentage {
    switch (event.type) {
      case HttpEventType.Sent:
        return 0;
      case HttpEventType.UploadProgress: {
        return this.computeAndShowThePercentDone(event);
      }

      case HttpEventType.Response:
        return 100;

      default:
        return 0;
    }
  }
  private computeAndShowThePercentDone(event: HttpProgressEvent):Percentage{
    return event.total
    ? Math.round((100 * event.loaded) / event.total)
    : 0;
  }
}
