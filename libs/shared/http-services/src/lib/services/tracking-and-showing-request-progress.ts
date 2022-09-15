import { Percentage } from "@myorg/shared-util-functionnal";
import { Observable } from "rxjs";

export abstract class TrackingAndShowingRequestProgress {
   abstract trackingRequest<T>(fileData: T, url: string): Observable<Percentage> 
  }