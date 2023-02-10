export type FontStyle = string & { __brand: 'FontStyle' };

export function createFontStyle(fontStyle: string): FontStyle {
  return fontStyle as FontStyle;
}