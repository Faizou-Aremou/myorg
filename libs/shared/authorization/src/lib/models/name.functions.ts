import { Name } from './name.types';

export function theFirst(name: Name): string {
  return name.first;
}
export function theLast(name: Name): string {
  return name.last;
}
