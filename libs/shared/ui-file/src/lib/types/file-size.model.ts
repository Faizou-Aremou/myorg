import { BitInString } from '@myorg/shared-util-functionnal';
import { FileUnit } from './file-unit.enum';

export interface FileSize {
  size: BitInString;
  unit: FileUnit;
}

export function TheFileSize(size: BitInString, unit: FileUnit) {
  return { size: size, unit: unit };
}

export function size(fileSize: FileSize) {
  return fileSize.size;
}
export function unit(fileSize: FileSize) {
  return fileSize.unit;
}
