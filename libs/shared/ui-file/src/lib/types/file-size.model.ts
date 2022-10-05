import { BitString } from '@myorg/shared-util-functionnal';
import { FileUnit } from './file-unit.enum';

export interface FileSize {
  size: BitString;
  unit: FileUnit;
}

export function TheFileSize(size: BitString, unit: FileUnit) {
  return { size: size, unit: unit };
}

export function size(fileSize: FileSize) {
  return fileSize.size;
}
export function unit(fileSize: FileSize) {
  return fileSize.unit;
}
