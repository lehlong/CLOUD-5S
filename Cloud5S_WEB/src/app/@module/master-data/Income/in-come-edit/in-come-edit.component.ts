import {Component} from '@angular/core';
import {IncomeTypeService} from 'src/app/services/MD/in-come.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Router, ActivatedRoute} from '@angular/router';
import {IncomeFilter} from 'src/app/@filter/MD/in-come.filter';
import {optionsGroup} from 'src/app/@filter/MD/area.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {INCOMETYPE_RIGHTS} from 'src/app/utils/constant/index';
@Component({
  selector: 'app-in-come-edit',
  templateUrl: './in-come-edit.component.html',
  styleUrls: ['./in-come-edit.component.scss'],
})
export class InComeEditComponent {
  incomeform: FormGroup;
  submitted: boolean = false;
  id: string = '';
  name: string = '';
  note: string = '';
  INCOMETYPE_RIGHTS = INCOMETYPE_RIGHTS;
  isActive: boolean | null = null;
  filter = new IncomeFilter();
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  constructor(
    private _service: IncomeTypeService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.incomeform = this._fb.group({
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
    return this.incomeform.controls;
  }

  ngOnInit() {
    this.incomeform?.get('id')?.setValue(this.id);
    this.incomeform?.get('name')?.setValue(this.name);
    this.incomeform?.get('note')?.setValue(this.note);
    this.incomeform?.get('isActive')?.setValue(this.isActive || false);
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
    if (this.incomeform.invalid) {
      return;
    }
    this._service
      .Update(
        {
          id: this.incomeform.value.id,
          name: this.incomeform.value.name.trim(),
          note: this.incomeform.value.note.trim(),
          isActive: this.incomeform.value.isActive,
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