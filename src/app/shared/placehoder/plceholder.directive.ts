import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlceholder]',
})
export class PlceholderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
