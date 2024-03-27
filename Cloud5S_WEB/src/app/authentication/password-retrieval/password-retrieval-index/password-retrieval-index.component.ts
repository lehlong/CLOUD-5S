import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {SendOTP} from 'src/app/models/Authentication/send-otp.model';
import {SendOTPService} from 'src/app/services/AD/send-otp.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password-retrieval-index',
  templateUrl: './password-retrieval-index.component.html',
  styleUrls: ['./password-retrieval-index.component.scss'],
})
export class PasswordRetrievalIndexComponent {
  sendotpForm: FormGroup;
  enterOTPForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();
  stage = 'send-otp';
  enterOTPSubmitted: boolean = false;
  passwordsMatch: boolean = false;

  constructor(private _service: SendOTPService, private _fb: FormBuilder, private utils: utils) {
    this.sendotpForm = this._fb.group({
      userName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-_]*$/), this.utils.trimSpace]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.enterOTPForm = this._fb.group({
      userName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-_]*$/), this.utils.trimSpace]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      otp: ['', [Validators.required]],
    });
  }

  get f() {
    return this.sendotpForm.controls;
  }

  onCreate() {
    this.submitted = true;
    if (this.sendotpForm.invalid) {
      return;
    }

    this._service
      .SendOTP({
        userName: this.sendotpForm.value.userName.trim(),
        email: this.sendotpForm.value.email,
      })
      .subscribe((response: any) => {
        console.log(response.data);
        if (response.data == true) {
          this.stage = 'enter-otp';
        }
      });
  }
  get fEnter() {
    return this.enterOTPForm.controls;
  }
  onEnterOTP() {
    this.enterOTPSubmitted = true;
    if (!this.enterOTPForm.valid) {
      return;
    }
    if (this.enterOTPForm.value.password !== this.enterOTPForm.value.confirmPassword) {
      Swal.fire({
        showCloseButton: true,
        title: 'Nhập lại mật khẩu mới không chính xác',
        icon: 'error',
        color: '#1ab394',
        position: 'top-end',
        width: 400,
        showConfirmButton: false,
        timer: 5000,
        toast: true,
      });
      return;
    }

    this._service.enterOTP(this.enterOTPForm.value).subscribe((response) => {
      console.log(response);
    });
  }
}
