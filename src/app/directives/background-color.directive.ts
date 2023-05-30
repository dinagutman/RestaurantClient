import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appBackgroundColor]'
})
export class BackgroundColorDirective {

  @Input() appBorder;
  constructor(private element: ElementRef, private rend: Renderer2) { }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {
    this.appBorder = this.appBorder ? this.appBorder : 'goldenrod';
  }

  @HostListener('click')onClick(){
    this.rend.setStyle(this.element.nativeElement, 'backgroundColor', 'goldenrod');
  }
}
