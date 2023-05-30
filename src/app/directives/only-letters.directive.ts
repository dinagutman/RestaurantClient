import { ElementRef, HostListener } from '@angular/core';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appOnlyLetters]'
})
export class OnlyLettersDirective {
  @Input() appOnlyLetters;
  s: string;
  constructor(private element: ElementRef) { }
  @HostListener('change') onMouseleave() {
    this.s = this.element.nativeElement.value;
    const englishLlettersRegex = /^[A-Za-z ]+$/;
    const hebrewLettersRegex = /[\u0590-\u05FF]/;
    if ((!this.appOnlyLetters.value.match(englishLlettersRegex) && this.appOnlyLetters.value.search(hebrewLettersRegex) === -1) ||
      (!this.appOnlyLetters.value.includes(' ') || this.appOnlyLetters.value[0] === ' ' ||
        this.appOnlyLetters.value[this.s.length - 1] === ' ')) {
      this.appOnlyLetters.value = '';
    }
  }
}
