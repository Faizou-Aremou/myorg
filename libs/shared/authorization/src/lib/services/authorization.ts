import { Observable } from "rxjs";
import { Credentials } from "../models/credential.model";
import { User } from "../models/user.model";

export abstract class Authorization {
  abstract login(credentials: Credentials): Observable<User>;
  abstract logout(): Observable<void>;
  abstract isAuth(): Observable<boolean>;
  abstract getAuthorizationToken(): string;
}
