import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appCommaSeparated]',
})
export class CommaSeparatedDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const value = event.target.value.replace(/[^0-9]/g, '');
    event.target.value = this.formatNumber(value);
  }

  formatNumber(value: string): string {
    const parts = value.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
}
