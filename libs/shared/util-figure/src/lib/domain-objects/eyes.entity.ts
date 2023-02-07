import { Color, Height, Width } from '@web-times-team/util-ui';
import { Eye } from './eye.entity';

export class Eyes {
  readonly id: EyesId;
  readonly right: RightEye;
  readonly left: LeftEye;
  readonly color: Color;
  readonly width: Width;
  readonly height: Height;
}
export type EyesId = string & { __brand: 'EyesId' };

export function createEyesId(id: string): EyesId {
  return id as EyesId;
}

export type RightEye = Eye & { __brand: 'RightEye' };

export function createRightEye(eye: Eye): RightEye {
  return eye as RightEye;
}
export type LeftEye = Eye & { __brand: 'LeftEye' };

export function createLeftEye(eye: Eye): LeftEye {
  return eye as LeftEye;
}
