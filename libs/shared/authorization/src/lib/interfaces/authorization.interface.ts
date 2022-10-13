import { Observable } from "rxjs";
import { Credentials } from "../models/credentials.types";
import { User } from "../models/user.types";

export abstract class AuthorizationInterface {
  abstract login(credentials: Credentials): Observable<User>;
  abstract logout(): Observable<void>;
  abstract isAuth(): Observable<boolean>;
  abstract getAuthorizationToken(): string;
}
