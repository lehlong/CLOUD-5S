import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[submitForm]'
})
export class ScrollToErrorDirective {
  constructor(private el: ElementRef) {}

  @HostListener('click')
  onClick() {
    setTimeout(() => {
      this.scrollToFirstError();
    });
  }

  private scrollToFirstError() {
    const firstInvalidControl = document.querySelector('.ng-invalid .is-invalid');
    if (firstInvalidControl) {
      firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center'});
    }
  }
}
