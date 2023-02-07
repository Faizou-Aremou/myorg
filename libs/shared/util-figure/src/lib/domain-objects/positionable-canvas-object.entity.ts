import { CanvasObject } from "./canvas-object.entity";
import { Position } from "./position.value-object";

export type PosionableCanvasObject = CanvasObject & {
    readonly position: Position;
  };