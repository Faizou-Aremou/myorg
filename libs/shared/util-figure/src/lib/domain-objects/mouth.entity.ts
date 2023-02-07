
import { Height, Width } from '@web-times-team/util-ui';
import { Position } from './position.value-object';
import { Teeth } from './teeth.entity';


export type Mouth = {
  readonly id: MouthId;
  readonly position: Position;
  readonly teeth: Teeth;
  readonly width: Width;
  readonly height: Height;
};
export type MouthId = string & { __brand: 'MouthId' };

export function createMouthId(id: string): MouthId {
  return id as MouthId;
}
