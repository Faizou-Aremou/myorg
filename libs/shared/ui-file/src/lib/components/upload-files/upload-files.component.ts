import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { uniqBy } from 'ramda';
import { FileInputLabelTriggerDirective } from '../../directives/file-input-label-trigger.directive';
import { FileInterface } from '../../interfaces/file.interface';

@Component({
  selector: 'myorg-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss'],
})
export class UploadFilesComponent implements OnInit {
  isDisabled = false;
  @Input() multiple = false;
  @Input() maxSizeByFile?: number;
  @Input() allowedExtensions?: string[];

  @Output() uploadedFiles = new EventEmitter<File[]>();

  @ContentChild(FileInputLabelTriggerDirective)
  labelFileInputTrigger?: FileInputLabelTriggerDirective;
  files: File[] = [];
  onChange?: (files: File[]) => void;
  onTouched?: (files: File[]) => void;

  constructor(
    @Self() @Optional() public controlDir: NgControl,
    private fileService: FileInterface
  ) {
    if (controlDir) {
      controlDir.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    const control = this.controlDir?.control;
    const validators = control?.validator;
    if (validators !== undefined) {
      control?.setValidators(validators);
    }
    control?.updateValueAndValidity();
  }
  writeValue(files: File[]): void {
    this.files = [...new Set(files)];
  }
  registerOnChange(fn: (files: File[]) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: (files: File[]) => void): void {
    this.onTouched = fn;
  }
  selectFiles(event: Event) {
    this.files = this.maxSizeByFile
      ? uniqBy(
          (file) => file.name,
          [
            ...this.files,
            ...this.fileService.selectFiles(event, this.maxSizeByFile),
          ]
        )
      : uniqBy(
          (file) => file.name,
          [...this.files, ...this.fileService.selectFiles(event)]
        );
    if (this.files.length > 0) {
      this.uploadedFiles.emit(this.files);
      if (this.onChange) {
        this.onChange(this.files);
      }
    }
  }

  downloadFile(index: number): void {
    //TODO: use case composition
    this.fileService.downloadFileFromObjectUrl(
      this.fileService.convertFileToObjectUrl(this.files[index]),
      this.files[index].name
    );
  }

  removeFile(index: number): void {
    this.files = this.files.filter((file, i) => i !== index);
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
