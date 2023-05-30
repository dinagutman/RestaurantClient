import { Directive, HostListener, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appWarningBorder]'
})
export class WarningBorderDirective {


  @Input() amount;
  amountBerder: string;

  constructor(private rend: Renderer2) { }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {
    this.amount = this.amount ? this.amount : 0;
  }
  @HostListener('click')onSubmit() {
    if (this.amount.value === '0') {
      this.rend.setStyle(this.amount, 'border-color', 'red');
      this.rend.setStyle(this.amount, 'border-width', '3px');
    }
    else if (this.amount.value !== '0') {
      this.rend.setStyle(this.amount, 'border-width', 'none');
      this.rend.setStyle(this.amount, 'border-width', '1px');
      this.rend.setStyle(this.amount, 'border-color', 'black');
    }
  }
}
