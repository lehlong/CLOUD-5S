import {Component, OnInit} from '@angular/core';
import {GlobalService} from 'src/app/services/Common/global.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  openSidebar: boolean = true;
  constructor(public globalService: GlobalService) {
    this.globalService.toggleSidebarSubject.subscribe((value) => {
      this.openSidebar = value;
    });
  }
  ngOnInit() {}
}
