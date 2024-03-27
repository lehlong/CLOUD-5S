import {Component} from '@angular/core';
import {AccountService} from 'src/app/services/AD/account.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {GlobalService} from 'src/app/services/Common/global.service';

@Component({
  selector: 'app-profile-infor',
  templateUrl: './profile-infor.component.html',
  styleUrls: ['./profile-infor.component.scss'],
})
export class ProfileInforComponent {
  // ex
  isShowPass: boolean = false;
  isShowNewPass: boolean = false;
  isShowRePass: boolean = false;

  currentPassType: string = 'password';
  newPassType: string = 'password';
  rePassType: string = 'password';

  profileForm: FormGroup;
  changePassForm: FormGroup;
  submittedEdit: boolean = false;
  submittedChangePassword: boolean = false;
  currentTab: number = 1;

  userName: string = '';
  fullName: string = '';
  address: string = '';
  email: string = '';
  phoneNumber: string = '';

  constructor(
    private _service: AccountService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private globalService: GlobalService,
  ) {
    this.profileForm = this._fb.group({
      userName: [{value: '', disabled: true}],
      fullName: ['', [Validators.required, this.utils.trimSpace]],
      address: ['', [Validators.required, this.utils.trimSpace]],
      email: ['', [Validators.required, Validators.email, this.utils.trimSpace]],
      phoneNumber: ['', [Validators.required, this.utils.trimSpace]],
    });
    let UserInfo = this.globalService.getUserInfo();
    this.userName = UserInfo?.userName;

    this.changePassForm = this._fb.group(
      {
        oldPassword: [
          '',
          [
            Validators.required,
            this.utils.trimSpace,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$/),
          ],
        ],
        newPassword: [
          '',
          [
            Validators.required,
            this.utils.trimSpace,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$/),
          ],
        ],
        rePassword: [
          '',
          [
            Validators.required,
            this.utils.trimSpace,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$/),
          ],
        ],
      },
      {validator: this.checkPasswordsMatch},
    );
  }
  checkPasswordsMatch(formGroup: FormGroup) {
    const newPassword = formGroup.controls['newPassword'];
    const rePassword = formGroup.controls['rePassword'];
    if (newPassword.value !== rePassword.value) {
      rePassword.setErrors({mismatch: true});
    }
  }

  ngOnInit() {
    this.loadInforForm();
  }

  loadInforForm() {
    this._service.getDetail(this.userName).subscribe(
      (data) => {
        console.log(data, 'tue');
        const arrInfor = data.data;
        this.fullName = arrInfor?.fullName;
        this.address = arrInfor?.address;
        this.email = arrInfor?.email;
        this.phoneNumber = arrInfor?.phoneNumber;
        this.profileForm?.get('userName')?.setValue(this.userName);
        this.profileForm?.get('fullName')?.setValue(this.fullName);
        this.profileForm?.get('address')?.setValue(this.address);
        this.profileForm?.get('email')?.setValue(this.email);
        this.profileForm?.get('phoneNumber')?.setValue(this.phoneNumber);
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
  get f() {
    return this.profileForm.controls;
  }
  get _f() {
    return this.changePassForm.controls;
  }
  changeTab(tab: number) {
    this.currentTab = tab;
    this.drawerService.returnData({
      type: 'tab',
      tab: tab,
    });
  }
  close() {}

  save() {
    console.log(this.currentTab);
    if (this.currentTab == 2) {
      this.onEdit();
    } else if (this.currentTab == 3) {
      this.onChangePass();
    }
  }

  onEdit() {
    this.submittedEdit = true;
    if (this.profileForm.invalid) {
      return;
    }
    this._service
      .UpdateInformation({
        ...this.profileForm.value,
        email: this.profileForm.value.email,
        userName: this.userName,
        phoneNumber: this.profileForm.value.phoneNumber,
        address: this.profileForm.value.address,
        fullName: this.profileForm.value.fullName,
      })
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submittedEdit = false;
          this.loadInforForm();
          this.currentTab = 1;
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
  onChangePass() {
    this.submittedChangePassword = true;
    if (this.changePassForm.invalid) {
      return;
    }
    this._service
      .changePassWord({
        userName: this.userName,
        oldPassword: this.changePassForm.value.oldPassword.trim(),
        newPassword: this.changePassForm.value.newPassword.trim(),
      })
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submittedChangePassword = false;
          this.changePassForm?.get('oldPassword')?.setValue('');
          this.changePassForm?.get('newPassword')?.setValue('');
          this.changePassForm?.get('rePassword')?.setValue('');
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
  handleTogglePass(type: string) {
    switch (type) {
      case 'password':
        if (this.isShowPass === false) {
          this.isShowPass = true;
          this.currentPassType = 'text';
        } else {
          this.isShowPass = false;
          this.currentPassType = 'password';
        }
        break;
      case 'newpassword':
        if (this.isShowNewPass === false) {
          this.isShowNewPass = true;
          this.newPassType = 'text';
        } else {
          this.isShowNewPass = false;
          this.newPassType = 'password';
        }
        break;
      case 'repassword':
        if (this.isShowRePass === false) {
          this.isShowRePass = true;
          this.rePassType = 'text';
        } else {
          this.isShowRePass = false;
          this.rePassType = 'password';
        }
        break;
    }
  }
}
