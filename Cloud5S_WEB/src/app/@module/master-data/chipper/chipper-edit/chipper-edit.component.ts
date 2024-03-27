import {Component} from '@angular/core';
import {ChipperService} from 'src/app/services/MD/chipper.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Router, ActivatedRoute} from '@angular/router';
import {ChipperFilter} from 'src/app/@filter/MD/chipper.filter';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';

import {CHIPPER_RIGHTS} from 'src/app/utils/constant/index';
@Component({
  selector: 'app-chipper-edit',
  templateUrl: './chipper-edit.component.html',
  styleUrls: ['./chipper-edit.component.scss'],
})
export class ChipperEditComponent {
  itemTypeForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';
  isActive: boolean | null = null;
  filter = new ChipperFilter();
  optionsGroup: optionsGroup[] = [];
  CHIPPER_RIGHTS = CHIPPER_RIGHTS;
  filterGroup = new BaseFilter();

  constructor(
    private _service: ChipperService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.itemTypeForm = this._fb.group({
      code: [{value: '', disabled: true}],
      name: ['', [Validators.required, this.utils.trimSpace]],
      isActive: ['', Validators.required],
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  get f() {
    return this.itemTypeForm.controls;
  }

  ngOnInit() {
    this.itemTypeForm?.get('code')?.setValue(this.code);
    this.itemTypeForm?.get('name')?.setValue(this.name);
    this.itemTypeForm?.get('isActive')?.setValue(this.isActive || false);
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
      name: '',
      isActive: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
    this.itemTypeForm?.get('code')?.setValue('');
    this.itemTypeForm?.get('name')?.setValue('');
    this.itemTypeForm?.get('isActive')?.setValue(true);
  }

  onEdit() {
    this.submitted = true;
    if (this.itemTypeForm.invalid) {
      return;
    }
    this._service
      .Update({
        code: this.code,
        name: this.itemTypeForm.value.name.trim(),
        isActive: this.itemTypeForm.value.isActive,
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
