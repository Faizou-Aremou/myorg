export type Radius = number & { __brand: 'RectangleId' };

export function createRadius(radius: number): Radius {
  return radius as Radius;
}
