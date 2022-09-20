import { Percentage } from "@myorg/shared-util-functionnal";
import { Observable } from "rxjs";

export abstract class TrackingAndShowingRequestProgressInterface {
   abstract trackingRequest<T>(fileData: T, url: string): Observable<Percentage> 
  }