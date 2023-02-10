export type Font = string & { __brand: 'Font' };

export function createFont(font: string): Font {
  return font as Font;
}