import {Directive, ElementRef, Input, Renderer2} from '@angular/core';
import {envAttachment} from 'src/environments/env-attachment';

@Directive({
  selector: '[srcImg]',
})
export class ImageDirective {
  @Input('srcImg') srcImg: string = '';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.elementRef.nativeElement.src = envAttachment.baseUrl + this.srcImg;
  }
}
