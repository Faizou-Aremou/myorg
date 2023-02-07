import { Height } from './domain-objects/height';
import { Width } from './domain-objects/width';
export type Widthwise = {
  width: number;
};
export type Heightwise = {
  width: number;
};

export type GetWidth = (widthable: Widthwise) => Width;
export type GetHeight = (Heightwise: Heightwise) => Height;
