import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { CommonService } from '../Common/common.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private cookie: CookieService, private _common : CommonService) { }

  token = localStorage.getItem('jwt');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`,
    'Language' : this.cookie.get('lang')
  });
  requestOptions = { headers: this.headers };
  apiUrl: string = environment.baseApiUrl;

  getMenuOfUser(userName: string) {
    return this._common
      .getRequest(`Menu/getMenuOfUser?userName=${userName}`)
  }

  logOut() {
    localStorage.removeItem('UserInfo');
    localStorage.removeItem('userRights');
  }

}