import {Injectable} from '@angular/core';
import {AbstractControl, ValidationErrors} from '@angular/forms';
import {METHOD} from './constant/index';
import Swal from 'sweetalert2';
import {Router, Route} from '@angular/router';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root',
})
export class utils {
  constructor(private router: Router) {}
  trimSpace(control: AbstractControl): ValidationErrors | null {
    if (control.value && control.value.toString().trim() == '') {
      return {cannotContainSpace: true};
    }
    return null;
  }

  timeToShift(time: string) {
    try {
      const hour = parseInt(moment(time).format('HH'));
      let shift: string = 'Ca 3 (24h → 7h)';
      if (hour >= 7 && hour < 15) {
        shift = 'Ca 1 (7h → 15h)';
      } else if (hour >= 23 && hour < 24) {
        shift = 'Ca 2 (23h → 24h)';
      } else if (hour >= 15 && hour < 23) {
        shift = 'Ca 3 (15h → 23h)';
      }
      return shift;
    } catch (error) {
      return '';
    }
  }

  getDataFromTree(datas: any[], dataArray: string[] = [], key: string = 'id'): string[] {
    for (const item of datas) {
      if (item[key]) {
        dataArray.push(item[key]);
      }
      if (item.children && item.children.length > 0) {
        dataArray = this.getDataFromTree(item.children, dataArray, key);
      }
    }
    return dataArray;
  }

  generateId() {
    return new Date().getTime();
  }

  checkComponent(Component: any) {
    const allRoutes = this.getAllRoutes(this.router.config);
    const componentRoute = allRoutes.find((route) => route.component === Component);
    return componentRoute?.path === window.location.pathname.split('/')[2];
  }

  formatNumber(value: string | number): string {
    if (value == null) return '';

    if (typeof value === 'number') {
      if (value % 1 === 0) {
        return value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      } else {
        return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    } else if (typeof value !== 'string') {
      return '';
    }
    const [integerPart, decimalPart] = value.split('.');
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (decimalPart === undefined) {
      return formattedIntegerPart;
    }
    return formattedIntegerPart + '.' + decimalPart;
  }

  getAllRoutes(routes: Route[]): Route[] {
    let allRoutes: Route[] = [];
    routes?.forEach((route) => {
      allRoutes.push(route);
      if (route.children) {
        route.children.forEach((routeChild: any) => {
          const childRoutes = this.getAllRoutes(routeChild?._loadedRoutes);
          allRoutes = allRoutes.concat(childRoutes);
        });
      }
    });
    return allRoutes;
  }

  handleTable() {
    const styleTd = setInterval(() => {
      const tdElements = document.querySelectorAll('td');
      if (tdElements?.length == 0) {
        this.handleTable();
      } else {
        tdElements.forEach((td: any) => {
          if (td.offsetWidth > 150) {
            td.classList.add('long-content');
          } else {
            td.classList.remove('long-content');
          }
        });
        clearInterval(styleTd);
      }
    }, 200);
  }
}

export class HandleResponse {
  showMessage(response: any, method: string) {
    if (response?.messageObject?.code !== '') {
      const res = response?.messageObject;
      if (!res?.messageType) {
        return;
      }
      switch (res.messageType) {
        case 'S':
          if (method != METHOD.GET && method != METHOD.UPLOAD) {
            Swal.fire({
        showCloseButton: true,
              icon: 'success',
              color: '#1ab394',
              title: response?.messageObject?.message,
              position: 'top-end',
              width: 400,
              showConfirmButton: false,
              timer: 5000,
              toast: true,
            });
          }
          break;
        case 'W':
          Swal.fire({
        showCloseButton: true,
            // icon: 'warning',
            color: '#f8bb86',
            title: `MSG${res.code} ${res.message}`,
            text: res.messageDetail,
            width: 600,
            footer: `LogID - ${res.logId}`,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
          });
          break;
        case 'E':
          Swal.fire({
        showCloseButton: true,
            // icon: 'error',
            color: '#e74c3c',
            title: `MSG${res.code} ${res.message}`,
            width: 600,
            text: res.messageDetail,
            footer: `LogID - ${res.logId}`,
            position: 'top-end',
            showConfirmButton: false,
            allowOutsideClick: true,
          });
          break;
        default:
          break;
      }
    }
  }
}
