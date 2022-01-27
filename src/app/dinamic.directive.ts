import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDinamic]',
})
export class DinamicDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
