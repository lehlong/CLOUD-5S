import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RightService} from 'src/app/services/AD/right.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {ROLE_RIGHTS} from 'src/app/utils/constant/index';

@Component({
  selector: 'app-right-create',
  templateUrl: './right-create.component.html',
  styleUrls: ['./right-create.component.scss'],
})
export class RightCreateComponent {
  nodeForm: FormGroup;
  submitted: boolean = false;
  id: string = '';
  name: string = '';
  pId: string = '';
  ROLE_RIGHTS = ROLE_RIGHTS;

  constructor(private _rs: RightService, private _fb: FormBuilder, private _ds: DrawerService) {
    this.nodeForm = this._fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      pId: [''],
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
  }

  close() {
    this._ds.close();
    this.nodeForm?.get('id')?.setValue('');
    this.nodeForm?.get('name')?.setValue('');
    this.nodeForm?.get('pId')?.setValue('');
  }

  onCreate() {
    this.submitted = true;
    if (this.nodeForm.invalid) {
      return;
    }
    this._rs
      .insert({
        id: this.nodeForm.value.id,
        name: this.nodeForm.value.name,
        pId: this.nodeForm.value.pId,
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
