
import { FillColor } from './fill-color';
import { Position } from './position.value-object';
import { Radius } from './radius';
import { Speed } from './speed.value-object';
import { StrokeColor } from './stroke-color';

export type Ball = {
  readonly ballId: BallId;
  readonly position: Position;
  readonly radius: Radius;
  readonly speed: Speed;
  readonly fillColor: FillColor;
  readonly strokeColor:StrokeColor;
};

export type BallId = string & { __brand: 'BallId' };

export function createBallId(id: string): BallId {
  return id as BallId;
}
