import {Directive, ElementRef, Input, Renderer2} from '@angular/core';
import {GlobalService} from 'src/app/services/Common/global.service';

@Directive({
  selector: '[appPermission]',
})
export class PermissionDirective {
  @Input('appPermission') permission: string = '';
  permissions: string[] = [];

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private globalService: GlobalService) {
    this.permissions = this.globalService.getRightData();
  }

  ngOnInit() {
    if (!this.hasPermission()) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
    }
  }

  private hasPermission(): boolean {
    if (!this.permissions) {
      return false;
    }
    return this.permissions.includes(this.permission);
  }
}
