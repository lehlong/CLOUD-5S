import {Component} from '@angular/core';
import {ItemTypeService} from 'src/app/services/MD/item-type.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {ITEMTYPE_RIGHTS} from 'src/app/utils/constant/index';
@Component({
  selector: 'app-item-type-create',
  templateUrl: './item-type-create.component.html',
  styleUrls: ['./item-type-create.component.scss'],
})
export class ItemTypeCreateComponent {
  itemtypeForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();
  ITEMTYPE_RIGHTS = ITEMTYPE_RIGHTS;

  constructor(
    private _service: ItemTypeService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.itemtypeForm = this._fb.group({
      code: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-_]*$/), this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      isActive: [true, [Validators.required]],
    });
  }

  get f() {
    return this.itemtypeForm.controls;
  }

  close() {
    this.drawerService.close();
    this.itemtypeForm?.get('code')?.setValue('');
    this.itemtypeForm?.get('name')?.setValue('');
    this.itemtypeForm?.get('isActive')?.setValue(true);
  }

  onCreate() {
    this.submitted = true;
    // this.itemtypeForm.setValue({
    //   ...this.itemtypeForm.value,
    //   taxCode: this.itemtypeForm.value.taxCode.trim(),
    // });
    if (this.itemtypeForm.invalid) {
      return;
    }
    this._service
      .Insert({
        code: this.itemtypeForm.value.code.trim(),
        name: this.itemtypeForm.value.name.trim(),
        isActive: this.itemtypeForm.value.isActive,
      })
      .subscribe(
        (data) => {
          this.drawerService.returnData(data);
          this.submitted = false;
          // this.itemtypeForm?.get('code')?.setValue('');
          // this.itemtypeForm?.get('name')?.setValue('');
          // this.itemtypeForm?.get('isActive')?.setValue(true);
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
