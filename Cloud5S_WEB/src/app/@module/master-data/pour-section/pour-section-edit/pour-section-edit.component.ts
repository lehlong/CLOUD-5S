import {Component} from '@angular/core';
import {PourSectionService} from 'src/app/services/MD/pour-section.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Router, ActivatedRoute} from '@angular/router';
import {PourSectionFilter} from 'src/app/@filter/MD/pour-section.filter';
import {optionsGroup} from 'src/app/@filter/MD/pour-section.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {POURSECTION_RIGHTS} from 'src/app/utils/constant/index';
@Component({
  selector: 'app-pour-section-edit',
  templateUrl: './pour-section-edit.component.html',
  styleUrls: ['./pour-section-edit.component.scss'],
})
export class PourSectionEditComponent {
  poursectionForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';

  isActive: boolean | null = null;
  filter = new PourSectionFilter();
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();
  POURSECTION_RIGHTS = POURSECTION_RIGHTS;

  constructor(
    private _service: PourSectionService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.poursectionForm = this._fb.group({
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
    return this.poursectionForm.controls;
  }

  ngOnInit() {
    this.poursectionForm?.get('code')?.setValue(this.code);
    this.poursectionForm?.get('name')?.setValue(this.name);
    this.poursectionForm?.get('isActive')?.setValue(this.isActive || false);
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
    this.poursectionForm?.get('code')?.setValue('');
    this.poursectionForm?.get('name')?.setValue('');
    this.poursectionForm?.get('isActive')?.setValue(true);
  }

  onEdit() {
    this.submitted = true;
    if (this.poursectionForm.invalid) {
      return;
    }
    this._service
      .Update({
        code: this.code.trim(),
        name: this.poursectionForm.value.name.trim(),
        isActive: this.poursectionForm.value.isActive,
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
