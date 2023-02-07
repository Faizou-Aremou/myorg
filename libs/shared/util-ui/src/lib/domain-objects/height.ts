export type Height = number & { __brand: 'Height' };

export function createHeight(height: number): Height {
  return height as Height;
}
