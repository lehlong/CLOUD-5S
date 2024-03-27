import {Component} from '@angular/core';
import {PayTypeService} from 'src/app/services/MD/pay-type.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Router, ActivatedRoute} from '@angular/router';
import {PayFilter} from 'src/app/@filter/MD/pay.filter';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {PAYTYPE_RIGHTS} from 'src/app/utils/constant/index';

@Component({
  selector: 'app-pay-edit',
  templateUrl: './pay-edit.component.html',
  styleUrls: ['./pay-edit.component.scss'],
})
export class PayEditComponent {
  payform: FormGroup;
  submitted: boolean = false;
  id: string = '';
  name: string = '';
  note: string = '';
  PAYTYPE_RIGHTS = PAYTYPE_RIGHTS;

  isActive: boolean | null = null;
  filter = new PayFilter();
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  constructor(
    private _service: PayTypeService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.payform = this._fb.group({
      id: ['', [Validators.required, this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      isActive: ['', Validators.required],
      note: ['', [, this.utils.trimSpace]],
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  get f() {
    return this.payform.controls;
  }

  ngOnInit() {
    this.payform?.get('id')?.setValue(this.id);
    this.payform?.get('name')?.setValue(this.name);
    this.payform?.get('note')?.setValue(this.note);
    this.payform?.get('isActive')?.setValue(this.isActive || false);
  }

  close() {
    this.filter = {
      ...this.filter,
      id: '',
      name: '',
      note: '',
      isActive: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: {}});
    this.drawerService.close();
  }

  onEdit() {
    this.submitted = true;
    if (this.payform.invalid) {
      return;
    }
    this._service
      .Update(
        {
          id: this.payform.value.id,
          name: this.payform.value.name.trim(),
          note: this.payform.value.note.trim(),
          isActive: this.payform.value.isActive,
        },
        false,
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
