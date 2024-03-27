import { Component, ComponentRef, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent {
  openDrawer:boolean = false;
  @ViewChild('contentContainer', { read: ViewContainerRef, static: true }) contentContainer!: ViewContainerRef;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.close();
      }
    });
  }

  setContent(componentRef: ComponentRef<any>) {
    this.contentContainer.clear();
    this.contentContainer.insert(componentRef.hostView);
  }

  close() {
    this.openDrawer = false;
  }
}
