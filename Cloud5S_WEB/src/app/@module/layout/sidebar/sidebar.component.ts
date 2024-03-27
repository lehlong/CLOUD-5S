import {Component, OnInit, ElementRef, ViewChild, HostListener, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/AD/user.service';
import {NavigationEnd} from '@angular/router';
import {GlobalService} from 'src/app/services/Common/global.service';
import {TranslateService} from '@ngx-translate/core';
import {utils} from 'src/app/utils/utils';

@Component({
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScroll();
  }
  @ViewChild('sidebarNav') sidebarNav!: ElementRef;
  isHovering: boolean = false;
  haveScroll: boolean | null = null;
  scrollingTimer: any = null;
  dataUser = JSON.parse(localStorage.getItem('user') || '{}');
  ROUTE_DATA: any = [];
  opened: boolean;
  show: boolean;
  urlAvartar: string = '';
  currentRoute: string = '';
  elem: any;
  loading: boolean = false;
  dataSource: any = [];
  currentModule: string = window.location?.pathname;
  username: string = '';
  fullName: string = '';
  dataRouter: string[] = [];
  constructor(
    private router: Router,
    private userService: UserService,
    public translate: TranslateService,
    private globalService: GlobalService,
    private utils: utils,
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    this.opened = true;
    this.show = true;
    const UserInfo = this.globalService.getUserInfo();
    this.username = UserInfo?.userName;
    this.fullName = UserInfo?.fullName;
    this.globalService.rightSubject.subscribe((item) => {
      this.loadInit();
    });
    this.currentModule = window.location?.pathname;
    // translate.addLangs(['vi', 'en']);
    // translate.setDefaultLang('vi');
    this.globalService.toggleSidebarSubject.subscribe((value) => {
      this.show = value;
    });
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentRoute = val.url;
        if (UserInfo == null) {
          if (this.currentRoute.includes('xhxb-full-screen') || this.currentRoute.includes('dh-full-screen')) {
            return;
          } else {
            this.router.navigate(['/Login']);
          }
        }
      }
    });
  }

  checkScroll() {
    setTimeout(() => {
      const element = this.sidebarNav.nativeElement;
      this.haveScroll = element.scrollHeight > element.clientHeight;
    }, 350);
  }

  onScrollSidebar(event: Event) {
    const element = event.target as HTMLElement;
    if (element.scrollTop > 0) {
      this.isHovering = true;
    }
    if (this.scrollingTimer) {
      clearTimeout(this.scrollingTimer);
    }
    this.scrollingTimer = setTimeout(() => {
      this.isHovering = false;
    }, 500);
  }

  loadInit() {
    try {
      if (this.username) {
        this.userService.getMenuOfUser(this.username).subscribe(({data}: any) => {
          this.ROUTE_DATA = data?.children;
          const flatten = (children: any, getChildren: any, level?: any, parent?: any) =>
            Array.prototype.concat.apply(
              children.map((x: any) => ({
                ...x,
                level: level || 1,
                parent: parent || null,
              })),
              children.map((x: any) => flatten(getChildren(x) || [], getChildren, (level || 1) + 1, x.id)),
            );
          const extractChildren = (x: any) => x.Children;

          this.dataRouter = data?.children
            ?.reduce((result: any, item: any) => {
              return [
                ...result,
                ...flatten(extractChildren(item) || [], extractChildren).map((x) => delete x.Children && x),
              ];
            }, [])
            .map((element: any) => `/Home/${element.url}`);
          this.categoryParent();
        });
      }
    } catch (e) {
      console.log('e: ', e);
    }
  }

  sidebarToggle() {
    this.globalService.setToggleSidebar(!this.globalService.toggleSidebar);
  }

  ngAfterViewInit() {
    this.loadInit();
  }

  ngOnInit(): void {
    this.currentModule = window.location?.pathname;
    this.globalService.getLoading().subscribe((value) => {
      this.loading = value;
    });
  }

  logOut() {
    localStorage.clear();
    window.location.reload();
  }

  reload() {
    location.reload();
  }

  openUrl(url: string) {
    this.router.navigate(['/Home/' + url]);
  }

  categoryParent() {
    var userInfo = this.globalService.getUserInfo();
    var listRole = userInfo.listRole || [];
    var menu: any = [];

    for (let j = 0; j < this.ROUTE_DATA?.length; j++) {
      if (!this.ROUTE_DATA[j]['roles'] || this.intersectArray(this.ROUTE_DATA[j]['roles'], listRole) > -1) {
        var item: any = {};
        item['name'] = this.ROUTE_DATA[j]['name'];
        item['icon'] = this.ROUTE_DATA[j]['icon'];
        item['url'] = this.ROUTE_DATA[j]['url'];

        if (this.ROUTE_DATA[j]['children'] && this.ROUTE_DATA[j]['children']?.length > 0) {
          item['children'] = this.categoryChild(listRole, this.ROUTE_DATA[j]['children']);
          if (item['children']?.length > 0) {
            const currentModule = this.currentModule.substring(1);
            item['openDefault'] =
              this.utils.getDataFromTree(item['children'], [], 'url')?.includes(this.currentModule) ||
              this.utils.getDataFromTree(item['children'], [], 'url')?.includes(currentModule);
          }
        } else {
          item['url'] = this.ROUTE_DATA[j]['url'];
          item['openDefault'] = `/${item['url']}` === this.currentModule || item['url'] === this.currentModule;
        }
        menu.push(item);
      }
    }

    this.dataSource = menu;
    setTimeout(() => {
      this.checkScroll();
      const clickableElements = document.querySelectorAll('.bi-chevron-down');
      clickableElements.forEach((element: Element) => {
        const htmlElement = element as HTMLElement;
        htmlElement.addEventListener('click', () => {
          this.checkScroll();
        });
      });
    }, 100);
  }

  // kiem tra xem list role cua user va list role cua menu/submenu co chung role khong
  intersectArray(arr1: any, arr2: any) {
    for (var i = 0; i < arr1.length; i += 1) {
      if (arr2.indexOf(arr1[i]) > -1) {
        return 1;
      }
    }
    return -1;
  }

  categoryChild(listRole: any, subRoute: any) {
    var subMenu: any = [];
    for (let i = 0; i < subRoute.length; i++) {
      if (!subRoute[i]['roles'] || this.intersectArray(subRoute[i]['roles'], listRole) > -1) {
        var subItem: any = {};
        subItem['name'] = subRoute[i]['name'];
        if (subRoute[i]['children'] && subRoute[i]['children']?.length > 0) {
          subItem['children'] = this.categoryChild(listRole, subRoute[i]['children']);
          if (subItem['children']?.length > 0) {
            const currentModule = this.currentModule.substring(1);
            subItem['openDefault'] =
              this.utils.getDataFromTree(subItem['children'], [], 'url')?.includes(this.currentModule) ||
              this.utils.getDataFromTree(subItem['children'], [], 'url')?.includes(currentModule);
          }
        } else {
          subItem['url'] = subRoute[i]['url'];
          subItem['openDefault'] = `/${subItem['url']}` === this.currentModule || subItem['url'] === this.currentModule;
        }
        subMenu.push(subItem);
      }
    }
    return subMenu;
  }
}
