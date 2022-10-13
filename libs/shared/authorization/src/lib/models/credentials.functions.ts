import { Credentials, Password, Username } from './credentials.types';

export function theUsername(credentials: Credentials): Username {
  return credentials.username;
}
export function thePassword(credentials: Credentials): Password {
  return credentials.password;
}
