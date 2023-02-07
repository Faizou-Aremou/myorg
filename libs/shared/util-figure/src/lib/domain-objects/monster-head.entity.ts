import { AdvanceDistance } from './advancement';
import { Eyes } from './eyes.entity';
import { Mouth } from './mouth.entity';
import { MovableCanvasObject } from './movable-canvas-object.entity';
import { Nose } from './nose.entity';

export type MonsterHead = MovableCanvasObject & {
  readonly id: MonsterHeadId;
  readonly eyes: Eyes;
  readonly nose: Nose;
  readonly mouth: Mouth;
  readonly advanceDistance: AdvanceDistance;
} ;

export type MonsterHeadId = string & { __brand: 'MonsterHeadId' };

export function createMonsterHeadId(id: string): MonsterHeadId {
  return id as MonsterHeadId;
}
