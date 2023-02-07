export type AdvanceDistance = number & { __brand: 'AdvanceDistance' };

export function createAdvanceDistance(advancement: number): AdvanceDistance {
  return advancement as AdvanceDistance;
}
