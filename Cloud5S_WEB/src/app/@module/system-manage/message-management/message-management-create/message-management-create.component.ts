import {Component} from '@angular/core';
import {MessageManagementService} from 'src/app/services/System-manage/message-management.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {MESSAGE_RIGHTS} from 'src/app/utils/constant';
@Component({
  selector: 'app-message-management-create',
  templateUrl: './message-management-create.component.html',
  styleUrls: ['./message-management-create.component.scss'],
})
export class MessageManagementCreateComponent {
  messageForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();
  MESSAGE_RIGHTS = MESSAGE_RIGHTS;

  constructor(
    private _service: MessageManagementService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.messageForm = this._fb.group({
      code: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-_]*$/), this.utils.trimSpace]],
      value: ['', [Validators.required, this.utils.trimSpace]],
    });
  }

  get f() {
    return this.messageForm.controls;
  }

  close() {
    this.drawerService.close();
    this.messageForm?.get('code')?.setValue('');
    this.messageForm?.get('value')?.setValue('');
  }

  onCreate() {
    this.submitted = true;
    this.messageForm.setValue({
      ...this.messageForm.value,
      code: this.messageForm.value.code.trim(),
    });
    if (this.messageForm.invalid) {
      return;
    }
    this._service
      .Insert({
        code: this.messageForm.value.code.trim(),
        value: this.messageForm.value.value.trim(),
      })
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
