import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appEmployeePasswordValidator]'
})
export class EmployeePasswordValidatorDirective {

  constructor(private element: ElementRef) { }

  @Input() appEmployeePasswordValidator = 2;
  s: string;

  @HostListener('keypress') onkeypress() {
    this.s = this.element.nativeElement.value;
    if (this.s.length > this.appEmployeePasswordValidator) {
      alert('STOP!! password contains only 3 characters');
      this.element.nativeElement.value = null;
      this.s = null;
    }
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {
    this.appEmployeePasswordValidator = this.appEmployeePasswordValidator ? this.appEmployeePasswordValidator : 2;
  }
}
