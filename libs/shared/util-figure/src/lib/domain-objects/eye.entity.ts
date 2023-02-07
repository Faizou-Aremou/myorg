import { Position } from './position.value-object';

export class Eye {
  id: EyeId;
  position: Position;
}

export type EyeId = string & { __brand: 'EyeId' };

export function eyeId(id: string): EyeId {
  return id as EyeId;
}
