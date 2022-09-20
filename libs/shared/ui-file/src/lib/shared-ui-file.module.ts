import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { FileInputLabelTriggerDirective } from './directives/file-input-label-trigger.directive';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [UploadFilesComponent, FileInputLabelTriggerDirective],
})
export class SharedUiFileModule {}
