import { ElementRef, HostListener, Input } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appNumOfDigits]'
})
export class NumOfDigitsDirective {

  constructor(private element: ElementRef) { }

  @Input() length: number;
  @Input() type: string;
   s: string;

  @HostListener('change') onMouseleave() {
    this.s = this.element.nativeElement.value;
    if (this.s.length !== this.length) {
      this.element.nativeElement.value = '';
      this.element.nativeElement.value = this.type;
    }
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {
    this.s = this.s ? this.s : this.s;
  }
}
