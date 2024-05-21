import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
 selector: '[onlyNumbers]'
})
export class OnlyNumbersDirective {
 constructor(private el: ElementRef) {}

 @HostListener('input', ['$event']) onInputChange(event :any) {
  const initalValue = this.el.nativeElement.value;

  //*** TEMPORAL SOLO ENTEROS  ****/
  this.el.nativeElement.value = initalValue.replace(/[^0-9.]/g, '');
  if (initalValue !== this.el.nativeElement.value) {
    event.stopPropagation();
  }
}
}
