export type Distance = number & { __brand: 'Distance' };

export function createDistance(distance: number): Distance {
  return distance as Distance;
}
