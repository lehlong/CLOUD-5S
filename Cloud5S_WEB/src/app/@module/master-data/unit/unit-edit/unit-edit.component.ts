import {Component} from '@angular/core';
import {UnitService} from 'src/app/services/MD/unit.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Router, ActivatedRoute} from '@angular/router';
import {UnitFilter} from 'src/app/@filter/MD/unit.filter';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {UNIT_RIGHTS} from 'src/app/utils/constant/index';
@Component({
  selector: 'app-unit-edit',
  templateUrl: './unit-edit.component.html',
  styleUrls: ['./unit-edit.component.scss'],
})
export class UnitEditComponent {
  unitForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';
  UNIT_RIGHTS = UNIT_RIGHTS;
  isActive: boolean | null = null;
  filter = new UnitFilter();
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  constructor(
    private _service: UnitService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.unitForm = this._fb.group({
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
    return this.unitForm.controls;
  }

  ngOnInit() {
    this.unitForm?.get('code')?.setValue(this.code);
    this.unitForm?.get('name')?.setValue(this.name);
    this.unitForm?.get('isActive')?.setValue(this.isActive || false);
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
      name: '',
      isActive: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: {}});
    this.drawerService.close();
  }

  onEdit() {
    this.submitted = true;
    if (this.unitForm.invalid) {
      return;
    }
    this._service
      .Update(
        {
          code: this.code.trim(),
          name: this.unitForm.value.name.trim(),
          isActive: this.unitForm.value.isActive,
        },
        )
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
