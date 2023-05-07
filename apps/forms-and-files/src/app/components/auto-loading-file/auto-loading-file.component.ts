import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'myorg-auto-loading-file',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auto-loading-file.component.html',
  styleUrls: ['./auto-loading-file.component.css'],
})
export class AutoLoadingFileComponent {
  isSend=false //TODO:find better way to handle this
  uploadFileWithoutParameters(): void { return }
  sendForm(event: Event): void { event.preventDefault(); }

}
