import { Designation, Percentage } from '@myorg/shared-util-functionnal';

export type RawMaterial = {
  readonly designation: Designation;
  readonly percentage?: Percentage;
}
export function theRawMaterial(
  designation: Designation,
  percentage?: Percentage
): RawMaterial {
  return {
    designation: designation,
    percentage: percentage,
  };
}
export function theDesignation(rawMaterial: RawMaterial): Designation {
  return rawMaterial.designation;
}
export function thePercentage(
  rawMaterial: RawMaterial
): Percentage | undefined {
  return rawMaterial.percentage;
}
