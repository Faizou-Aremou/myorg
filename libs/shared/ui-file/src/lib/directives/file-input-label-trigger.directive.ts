import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[myorgFileInputLabelTrigger]'
})
export class FileInputLabelTriggerDirective {
  constructor(public templateRef: TemplateRef<unknown>) { }
}
