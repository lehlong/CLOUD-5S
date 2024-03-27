import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MenuService} from 'src/app/services/AD/menu.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {MENU_RIGHTS} from 'src/app/utils/constant/index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-create',
  templateUrl: './menu-create.component.html',
  styleUrls: ['./menu-create.component.scss'],
})
export class MenuCreateComponent {
  nodeForm: FormGroup;
  submitted: boolean = false;
  id: string = '';
  name: string = '';
  pId: string = '';
  rightId: string = '';
  url: string = '';
  icon: string = '';
  MENU_RIGHTS = MENU_RIGHTS;
  @Output() updateNodeForm = new EventEmitter<any>();

  constructor(private _ms: MenuService, private _fb: FormBuilder, private _ds: DrawerService) {
    this.nodeForm = this._fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      url: ['', Validators.required],
      pId: [''],
      icon: [''],
      rightId: [''],
      children: [],
    });
  }

  get f() {
    return this.nodeForm.controls;
  }

  ngOnInit() {
    this.nodeForm?.get('id')?.setValue(this.id);
    this.nodeForm?.get('name')?.setValue(this.name);
    this.nodeForm?.get('pId')?.setValue(this.pId);
    this.nodeForm?.get('rightId')?.setValue(this.rightId);
    this.nodeForm?.get('url')?.setValue(this.url);
    this.nodeForm?.get('icon')?.setValue(this.icon);
  }

  close() {
    this._ds.close();
    this.nodeForm?.get('id')?.setValue('');
    this.nodeForm?.get('name')?.setValue('');
    this.nodeForm?.get('pId')?.setValue('');
    this.nodeForm?.get('url')?.setValue('');
    this.nodeForm?.get('icon')?.setValue('');
    this.nodeForm?.get('rightId')?.setValue('');
  }

  onCreate() {
    this.submitted = true;
    if (this.nodeForm.invalid) {
      return;
    }
    let check = this.nodeForm.value.id.split('MNU')[1];
    if (!check) {
      Swal.fire({
        showCloseButton: true,
        title: 'Vui lòng nhập mã menu đúng định dạng, ví dụ: MNU1.2',
        icon: 'warning',
        showConfirmButton: false,
        toast: true,
        position: 'top-right',
        allowOutsideClick: true,
        timer: 2000,
      });
      return;
    }
    if (this.nodeForm.value.pId == '') {
      Swal.fire({
        showCloseButton: true,
        title: 'Chưa có PID',
        icon: 'warning',
        showConfirmButton: false,
        toast: true,
        position: 'top-right',
        allowOutsideClick: true,
        timer: 2000,
      });
      return;
    }
    this._ms
      .addItem({
        id: this.nodeForm.value.id,
        name: this.nodeForm.value.name,
        pId: this.nodeForm.value.pId,
        rightId: this.nodeForm.value.rightId,
        url: this.nodeForm.value.url,
        icon: this.nodeForm.value.icon,
        children: [],
      })
      .subscribe(
        (data: any): void => {
          this._ds.returnData(data);
          this.submitted = false;
        },
        (error: any) => {
          console.log('error: ', error);
        },
      );
  }
}
