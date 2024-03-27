import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public static readonly appVersion: string = '1.0.0';
  public static readonly apiVersion: string = '1.0';
  private loading: BehaviorSubject<boolean>;

  rightSubject: Subject<string> = new Subject<string>();
  rightData: any = [];

  toggleSidebarSubject: Subject<boolean> = new Subject<boolean>();
  toggleSidebar: any = true;

  breadcrumbSubject: Subject<boolean> = new Subject<boolean>();
  breadcrumb: any = [];

  constructor() {
    this.loading = new BehaviorSubject<boolean>(false);
    this.rightSubject.subscribe((value) => {
      localStorage.setItem('userRights', value);
      this.rightData = value;
    });
    this.toggleSidebarSubject.subscribe((value) => {
      this.toggleSidebar = value;
    });
    this.breadcrumbSubject.subscribe((value) => {
      this.breadcrumb = value;
    });
  }

  setBreadcrumb(value: any) {
    localStorage.setItem('breadcrumb', JSON.stringify(value));
    this.breadcrumbSubject.next(value);
  }

  getBreadcrumb() {
    try {
      if (this.breadcrumb && this.breadcrumb?.length > 0) {
        return this.breadcrumb;
      }
      const breadcrumb = localStorage.getItem('breadcrumb');
      return breadcrumb ? JSON.parse(breadcrumb) : null;
    } catch (e) {
      return null;
    }
  }

  setToggleSidebar(value: boolean) {
    this.toggleSidebarSubject.next(value);
  }

  getUserInfo() {
    try {
      const info = localStorage.getItem('UserInfo');
      return info ? JSON.parse(info) : null;
    } catch (e) {
      return null;
    }
  }

  setUserInfo(value: any) {
    localStorage.setItem('UserInfo', JSON.stringify(value));
  }

  setRightData(data: any) {
    this.rightSubject.next(data);
  }

  getRightData() {
    try {
      if (this.rightData?.length > 0) {
        return this.rightData;
      }
      const rights = localStorage.getItem('userRights');
      return rights ? JSON.parse(rights) : null;
    } catch (e) {
      return null;
    }
  }

  checkPermissions(permissions: string) {
    try {
      const listPermissions = localStorage.getItem('userRights');
      if (listPermissions) {
        return JSON.parse(listPermissions)?.includes(permissions);
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  getLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }

  setLoading(newValue: boolean): void {
    setTimeout(() => {
      this.loading.next(newValue);
    });
  }
}
