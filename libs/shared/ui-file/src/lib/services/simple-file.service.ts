import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bit, MegaBit, WebPageUrl } from '@myorg/shared-util-functionnal';
import { FileSize } from '../types/file-size.model';
import { FileUnit } from '../types/file-unit.enum';


@Injectable({
  providedIn: 'root'
})
export class SimpleFileService {

  constructor(private http: HttpClient) { }

  selectFiles(event: Event, maxSizeByFile:MegaBit): File[] {//maxSizeByFile in MB
    const fileList = (event.target as HTMLInputElement).files as FileList;
    let fileSequence: File[] = [];
    for (let index = 0; index < fileList.length; index++) {
      fileSequence = this.filterInvalidFileSize(fileList, index, maxSizeByFile, fileSequence);
    }
    return fileSequence;
  }


  filesSize(files: File[]): Bit {
    return files.reduce((sizeInByte, file) => {
      return sizeInByte + file.size;
    }, 0);
  }

  convertFileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  convertFileToObjectUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  freeObjectUrlInMemory(url: string): void {
    URL.revokeObjectURL(url);
  }

  reduceOctetToAppropriateUnit(size: Bit): FileSize {
    let reductionNumber = size;
    let index = 0;
    while (reductionNumber > 1 && index < Object.values(FileUnit).length) {
      reductionNumber = size / 1024;
      index++;
    }
    return {
      size: reductionNumber.toFixed(3),
      unit: Object.values(FileUnit)[index],
    };
  }

  recursionReduceOctetToAppropriateUnit(
    size: Bit,
    fileUnitList: FileUnit[]
  ): FileSize {
    const [element, ...rest] = fileUnitList;
    if (size === 0 && fileUnitList.length === 1) {
      return {
        size: size.toFixed(3),
        unit: element,
      };
    } else if (size === 0 && fileUnitList.length > 0) {
      return {
        size: size.toFixed(3),
        unit: element,
      };
    } else if (size > 0 && fileUnitList.length === 1) {
      return {
        size: size.toFixed(3),
        unit: element,
      };
    } else {
      if (size > 1) {
        return this.recursionReduceOctetToAppropriateUnit(size / 1024, rest);
      } else {
        return {
          size: size.toFixed(3),
          unit: element,
        };
      }
    }
  }

  downloadFileFromObjectUrl(url: WebPageUrl, fileName: string): void {
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = fileName;
    downloadLink.click();
    this.freeObjectUrlInMemory(url);
  }

  downloadFileFromDataUrl(dataUrl: WebPageUrl, fileName: string): void {
    const downloadLink = document.createElement("a");
    downloadLink.href = dataUrl;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  private filterInvalidFileSize(fileList: FileList, index: number, maxSizeByFile: MegaBit, fileSequence: File[]) {
    if (fileList[index].size <= maxSizeByFile * 1024 * 1024) {
      fileSequence = [...fileSequence, fileList[index]];
    }
    return fileSequence;
  }
}
