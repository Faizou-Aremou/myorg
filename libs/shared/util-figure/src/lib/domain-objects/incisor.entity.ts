import { Height, Width } from '@web-times-team/util-ui';
import { Position } from './position.value-object';

export type Incisor = {
  readonly incisorId: IncisorId;
  readonly position: Position;
  readonly width: Width;
  readonly height: Height;
};

export type IncisorId = string & { __brand: 'IncisorId' };

export function createIncisorId(id: string): IncisorId {
  return id as IncisorId;
}
