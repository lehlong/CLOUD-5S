import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MenuService} from 'src/app/services/AD/menu.service';
import {RightService} from 'src/app/services/AD/right.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {ROLE_RIGHTS} from 'src/app/utils/constant/index';

@Component({
  selector: 'app-right-edit',
  templateUrl: './right-edit.component.html',
  styleUrls: ['./right-edit.component.scss'],
})
export class RightEditComponent {
  nodeForm: FormGroup;
  submitted: boolean = false;
  id: string = '';
  name: string = '';
  pId: string = '';
  orderNumber: number = 0;
  ROLE_RIGHTS = ROLE_RIGHTS;

  constructor(private _rs: RightService, private _fb: FormBuilder, private _ds: DrawerService) {
    this.nodeForm = this._fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      pId: [''],
      orderNumber: [''],
    });
  }

  get f() {
    return this.nodeForm.controls;
  }

  ngOnInit() {
    this.nodeForm?.get('id')?.setValue(this.id);
    this.nodeForm?.get('name')?.setValue(this.name);
  }

  close() {
    this._ds.close();
    this.nodeForm?.get('id')?.setValue('');
    this.nodeForm?.get('name')?.setValue('');
  }

  onEdit() {
    this.submitted = true;
    if (this.nodeForm.invalid) {
      return;
    }
    this._rs
      .Update({
        id: this.nodeForm.value.id,
        name: this.nodeForm.value.name,
        pId: this.nodeForm.value.pId,
      })
      .subscribe(
        (data: any): void => {
          data.action = 'update';
          data.data = this.nodeForm.value;
          this._ds.returnData(data);
          this.submitted = false;
        },
        (error: any) => {
          console.log('error: ', error);
        },
      );
  }

  onDelete() {
    this._rs
      .delete({
        id: this.nodeForm.value.id,
        name: this.nodeForm.value.name,
        pId: this.nodeForm.value.pId,
        orderNumber: 0,
        isChecked: true,
        children:[]
      })
      .subscribe(
        (data: any): void => {
          data.action = 'delete';
          this._ds.returnData(data);
          this.submitted = false;
        },
        (error: any) => {
          console.log('error: ', error);
        },
      );
  }
}
