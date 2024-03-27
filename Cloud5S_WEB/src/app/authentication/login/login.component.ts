import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {TranslateService} from '@ngx-translate/core';
import {Login} from 'src/app/models/Authentication/login.model';
import {TranferObject} from 'src/app/models/Common/tranfer-object.model';
import {environment} from 'src/environments/environment';
import {GlobalService} from '../../services/Common/global.service';
import {HandleResponse} from 'src/app/utils/utils';
import {METHOD} from 'src/app/utils/constant/index';
import {AccountService} from 'src/app/services/AD/account.service';
import {utils} from 'src/app/utils/utils';

declare function Message(response: TranferObject): any;
declare function ShowLoading(): any;
declare function HideLoading(): any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    public translate: TranslateService,
    private router: Router,
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private globalService: GlobalService,
    private handleResponse: HandleResponse,
    private accountService: AccountService,
    private utils: utils,
  ) {}

  editInfor() {
    this.router.navigate(['password-retrieval']);
  }

  invalidLogin?: boolean;

  apiUrl: string = environment.baseApiUrl;

  loginRequest: Login = {
    userName: '',
    password: '',
  };

  public login = () => {
    document.getElementById('indeterminate-progress-bar-login')!.style.display = 'block';
    this.http
      .post<TranferObject>(this.apiUrl + 'Auth/Login', this.loginRequest, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .subscribe({
        next: (response: any) => {
          document.getElementById('indeterminate-progress-bar-login')!.style.display = 'none';
          if (response.status) {
            localStorage.setItem('jwt', response?.data?.accessToken);
            this.globalService.setUserInfo(response.data?.accountInfo);
            this.invalidLogin = false;
            this.accountService
              .getRightOfUser({
                username: response?.data?.accountInfo?.userName,
              })
              .subscribe(({data}: any) => {
                this.globalService.setRightData(JSON.stringify(data));
              });
            this.router.navigate(['report/dashboard']);
          } else {
            this.handleResponse.showMessage(response, METHOD.GET);
          }
        },
      });
  };

  isUserAuthenticated() {
    const token = localStorage.getItem('jwt');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }
}
