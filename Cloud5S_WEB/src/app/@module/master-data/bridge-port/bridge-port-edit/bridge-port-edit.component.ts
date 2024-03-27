import {Component} from '@angular/core';
import {BridgePortService} from 'src/app/services/MD/bridge-port.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Router, ActivatedRoute} from '@angular/router';
import {BridgePortFilter} from 'src/app/@filter/MD/bridge-port.filter';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {BRIDGE_RIGHTS} from 'src/app/utils/constant/index';

@Component({
  selector: 'app-bridge-port-edit',
  templateUrl: './bridge-port-edit.component.html',
  styleUrls: ['./bridge-port-edit.component.scss'],
})
export class BridgePortEditComponent {
  areaForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';
  BRIDGE_RIGHTS = BRIDGE_RIGHTS;

  isActive: boolean | null = null;
  filter = new BridgePortFilter();
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  constructor(
    private _service: BridgePortService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.areaForm = this._fb.group({
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
    return this.areaForm.controls;
  }

  ngOnInit() {
    this.areaForm?.get('code')?.setValue(this.code);
    this.areaForm?.get('name')?.setValue(this.name);
    this.areaForm?.get('isActive')?.setValue(this.isActive || false);
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
    this.areaForm?.get('code')?.setValue('');
    this.areaForm?.get('name')?.setValue('');
    this.areaForm?.get('isActive')?.setValue(true);
  }

  onEdit() {
    this.submitted = true;
    if (this.areaForm.invalid) {
      return;
    }
    this._service
      .Update({
        code: this.code.trim(),
        name: this.areaForm.value.name.trim(),
        isActive: this.areaForm.value.isActive,
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
