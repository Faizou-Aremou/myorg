import { Observable } from "rxjs";
import { FileSize } from "../types/file-size.model";
import { FileUnit } from "../types/file-unit.enum";

export abstract class FileInterface {
    abstract selectFiles(event: Event, maxSizeByFile?: number): File[];

    abstract filesSizeInByte(files: File[]): number;
  
    abstract convertFileToDataUrl(file: File): Promise<string>;
  
    abstract convertFileToObjectUrl(file: File): string;
  
    abstract freeObjectUrlInMemory(url: string): void;
  
    abstract reduceOctetToAppropriateUnit(size: number): FileSize;
  
    abstract recursionReduceOctetToAppropriateUnit(
      size: number,
      fileUnitList: FileUnit[]
    ): FileSize;
  
    abstract downloadFileFromObjectUrl(url: string, fileName: string): void;
  
    abstract downloadFileFromDataUrl(dataUrl: string, fileName: string): void;
  
    abstract uploadDataWithTrackingProgress<T>(
      fileData: T,
      url: string
    ): Observable<unknown>;

}