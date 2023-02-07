export type Width = number & { __brand: 'Width' };

export function createWidth(width: number): Width {
  return width as Width;
}
