import { MovableCanvasObject } from './movable-canvas-object.entity';
import { Radius } from './radius';

export type RoundedRectangle = MovableCanvasObject & {
  readonly radius: Radius;
};
