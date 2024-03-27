import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appSelectOnFocus]',
})
export class SelectOnFocusDirective {
  constructor(private el: ElementRef) {}

  @HostListener('focus', ['$event.target'])
  onFocus(target: HTMLInputElement): void {
    target.select();
  }
}
