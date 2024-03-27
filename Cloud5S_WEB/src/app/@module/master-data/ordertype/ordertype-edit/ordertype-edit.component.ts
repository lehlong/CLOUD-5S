import {Component} from '@angular/core';
import {OrderTypeService} from 'src/app/services/MD/order-type.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Router, ActivatedRoute} from '@angular/router';
import {OrderTypeFilter} from 'src/app/@filter/MD/order-type.filter';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
@Component({
  selector: 'app-ordertype-edit',
  templateUrl: './ordertype-edit.component.html',
  styleUrls: ['./ordertype-edit.component.scss'],
})
export class OrdertypeEditComponent {
  orderTypeForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';
  isActive: boolean | null = null;
  filter = new OrderTypeFilter();
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  constructor(
    private _service: OrderTypeService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.orderTypeForm = this._fb.group({
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
    return this.orderTypeForm.controls;
  }

  ngOnInit() {
    this.orderTypeForm?.get('code')?.setValue(this.code);
    this.orderTypeForm?.get('name')?.setValue(this.name);
    this.orderTypeForm?.get('isActive')?.setValue(this.isActive || false);
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
    this.orderTypeForm?.get('code')?.setValue('');
    this.orderTypeForm?.get('name')?.setValue('');
    this.orderTypeForm?.get('isActive')?.setValue(true);
  }

  onEdit() {
    this.submitted = true;
    if (this.orderTypeForm.invalid) {
      return;
    }
    this._service
      .Update(
        {
          code: this.code.trim(),
          name: this.orderTypeForm.value.name.trim(),
          isActive: this.orderTypeForm.value.isActive,
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
