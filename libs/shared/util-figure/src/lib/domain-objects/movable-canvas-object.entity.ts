import { PosionableCanvasObject } from "./positionable-canvas-object.entity";
import { Speed } from "./speed.value-object";

export type MovableCanvasObject = PosionableCanvasObject & {
    readonly speed: Speed;
  };