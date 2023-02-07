export type Radians = number & { __brand: 'Radians' };

export function createRadians(radians: number): Radians {
  return radians as Radians;
}