import { Height, Width } from '@web-times-team/util-ui';
import { FillColor } from './fill-color';
import { Position } from './position.value-object';
import { Speed } from './speed.value-object';
import { StrokeColor } from './stroke-color';

export type CanvasObject = {
  readonly id: CanvasObjectId;
  readonly position: Position;
  readonly width: Width;
  readonly height: Height;
  readonly fillColor: FillColor;
  readonly speed: Speed;
  readonly strokeColor: StrokeColor;
};

export type CanvasObjectId = string & { __brand: 'CanvasObject' };

export function createCanvasObjectId(id: string): CanvasObjectId {
  return id as CanvasObjectId;
}
