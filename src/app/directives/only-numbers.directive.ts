import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]'
})
export class OnlyNumbersDirective {
  @Input() appOnlyNumbers;
  s: string;
  constructor(private element: ElementRef) { }
  @HostListener('change') onMouseleave() {
    debugger
    this.s = this.element.nativeElement.value;
    const numbersRegex = /^\d+$/;
    if (!this.s.match(numbersRegex)) {
      this.appOnlyNumbers.value = '';
      // this.appOnlyNumbers.value = undefined;
    }
  }

  
}
