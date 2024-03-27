import {Component} from '@angular/core';
import {ShipService} from 'src/app/services/MD/ship.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Router, ActivatedRoute} from '@angular/router';
import {ShipFilter} from 'src/app/@filter/MD/ship.filter';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {SHIP_RIGHTS} from 'src/app/utils/constant/index';
@Component({
  selector: 'app-ship-edit',
  templateUrl: './ship-edit.component.html',
  styleUrls: ['./ship-edit.component.scss'],
})
export class ShipEditComponent {
  shipForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';
  tonage: number = 0;
  isActive: boolean | null = null;
  filter = new ShipFilter();
  optionsGroup: optionsGroup[] = [];
  SHIP_RIGHTS = SHIP_RIGHTS;
  filterGroup = new BaseFilter();

  constructor(
    private _service: ShipService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.shipForm = this._fb.group({
      code: [{value: '', disabled: true}],
      name: ['', [Validators.required]],
      tonage: ['', [Validators.required, Validators.min(1)]],
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
    return this.shipForm.controls;
  }

  ngOnInit() {
    this.shipForm?.get('code')?.setValue(this.code);
    this.shipForm?.get('name')?.setValue(this.name);
    this.shipForm?.get('tonage')?.setValue(this.tonage);
    this.shipForm?.get('isActive')?.setValue(this.isActive || false);
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
      name: '',
      tonage: 0,
      isActive: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
    this.shipForm?.get('code')?.setValue('');
    this.shipForm?.get('name')?.setValue('');
    this.shipForm?.get('tonage')?.setValue('');
    this.shipForm?.get('isActive')?.setValue(true);
  }

  onEdit() {
    this.submitted = true;
    if (this.shipForm.invalid) {
      return;
    }
    this._service
      .Update({
        code: this.code.trim(),
        name: this.shipForm.value.name.trim(),
        tonage: this.shipForm.value.tonage,
        isActive: this.shipForm.value.isActive,
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
