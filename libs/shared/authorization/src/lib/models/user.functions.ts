import { Code, Email } from '@myorg/shared-util-functionnal';
import { Name } from './name.types';
import { User } from './user.types';

export function theId(user: User): Code {
  return user.id;
}
export function theName(user: User): Name {
  return user.name;
}
export function theEmail(user: User): Email {
  return user.email;
}
