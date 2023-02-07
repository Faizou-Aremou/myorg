export type Color = string & { __brand: 'Color' };

export function createColor(color: string): Color {
  return color as Color;
}