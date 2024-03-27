import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {GlobalService} from 'src/app/services/Common/global.service';

@Component({
  selector: 'navbar-cmp',
  templateUrl: 'navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  openSidebar: boolean = true;
  breadcrumbs: any = this.globalService.breadcrumb || [];
  lstRight = JSON.parse(localStorage.getItem('lstRight') || '{}');
  lang = localStorage.getItem('language');
  token = localStorage.getItem('jwt');
  username: string = '';
  fullName: string = '';
  constructor(public translate: TranslateService, private globalService: GlobalService) {
    this.globalService.toggleSidebarSubject.subscribe((value) => {
      this.openSidebar = value;
    });
    this.globalService.breadcrumbSubject.subscribe((value) => {
      this.breadcrumbs = value;
    });
    const UserInfo = this.globalService.getUserInfo();
    this.username = UserInfo?.userName;
    this.fullName = UserInfo?.fullName;
  }

  ngOnInit() {
    this.lang = this.translate.store.currentLang ? this.translate.store.currentLang : this.translate.store.defaultLang;
  }

  sidebarToggle() {
    this.globalService.setToggleSidebar(!this.globalService.toggleSidebar);
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    this.lang = lang;
    localStorage.setItem('language', lang);
  }

  logOut() {
    localStorage.clear();
    window.location.reload();
  }
}
