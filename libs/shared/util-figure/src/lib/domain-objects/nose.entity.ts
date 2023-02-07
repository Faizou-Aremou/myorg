import { Height, Width } from '@web-times-team/util-ui';
import { Position } from './position.value-object';

export class Nose {
  readonly noseId: NoseId;
  readonly position: Position;
  readonly width: Width;
  readonly height: Height;
}

export type NoseId = string & { __brand: 'NoseId' };

export function createNoseId(id: string): NoseId {
  return id as NoseId;
}
