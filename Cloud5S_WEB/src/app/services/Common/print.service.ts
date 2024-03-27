import {Injectable} from '@angular/core';
import * as printJS from 'print-js';

@Injectable({
  providedIn: 'root',
})
export class PrintService {
  private readonly stylesheetPath = 'assets/css/print/';
  constructor() {}

  printComponent(data: any = null, component: any, viewContainerRef: any, stylesheetName: string = '') {
    const componentRef = viewContainerRef.createComponent(component);
    (componentRef.instance as any).data = data;
    setTimeout(() => {
      const componentElement = componentRef.location.nativeElement;
      const componentHtml = componentElement.innerHTML;
      const printableElement = document.createElement('div');
      printableElement.innerHTML = componentHtml;
      printJS({
        printable: printableElement,
        type: 'html',
        css: [`${this.stylesheetPath}${stylesheetName}`, 'assets/css/print/common.css'],
        scanStyles: false,
        font_size: '',
      });
      componentRef.destroy();
    }, 0);
  }
}
