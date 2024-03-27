import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {EnterOTP, SendOTP} from 'src/app/models/Authentication/send-otp.model';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SendOTPService {
  constructor(private _commonService: CommonService, private http: HttpClient) {}
  SendOTP(data?: SendOTP) {
    // return this.http.post('http://42.1.65.237:8086/api/Auth/SendOTP', data);
    return this._commonService.postRequest(`Auth/SendOTP`, data);
  }
  enterOTP(data?: EnterOTP) {
    // return this.http.put('http://42.1.65.237:8086/api/Auth/ForgotPassword', data);
    return this._commonService.putRequest(`Auth/ForgotPassword`, data);
  }
}
