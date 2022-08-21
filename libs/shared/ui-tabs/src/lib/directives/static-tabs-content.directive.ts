import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[myorgStaticTabsContent]'
})
export class StaticTabsContentDirective {
  constructor(public templateRef: TemplateRef<unknown>) { }
}
