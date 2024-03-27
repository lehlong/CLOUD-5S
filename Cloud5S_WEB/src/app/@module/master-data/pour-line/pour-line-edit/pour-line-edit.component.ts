import {Component} from '@angular/core';
import {PourlineService} from 'src/app/services/MD/pour-line.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Router, ActivatedRoute} from '@angular/router';
import {PourlineFilter} from 'src/app/@filter/MD/pour-line.filter';
import {optionsGroup} from 'src/app/@filter/MD/pour-line.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {PourSectionService} from 'src/app/services/MD/pour-section.service';
import {POURLINE_RIGHTS} from 'src/app/utils/constant/index';
@Component({
  selector: 'app-pour-line-edit',
  templateUrl: './pour-line-edit.component.html',
  styleUrls: ['./pour-line-edit.component.scss'],
})
export class PourLineEditComponent {
  pourlineForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';
  sectionCode: string = '';
  pourSections: any = [];
  POURLINE_RIGHTS = POURLINE_RIGHTS;

  isActive: boolean | null = null;
  filter = new PourlineFilter();
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();

  constructor(
    private _service: PourlineService,
    private _fb: FormBuilder,
    private PourSectionService: PourSectionService,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.pourlineForm = this._fb.group({
      code: [{value: '', disabled: true}],
      name: ['', [Validators.required, this.utils.trimSpace]],
      sectionCode: ['', [Validators.required, this.utils.trimSpace]],
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
    return this.pourlineForm.controls;
  }

  ngOnInit() {
    this.pourlineForm?.get('code')?.setValue(this.code);
    this.pourlineForm?.get('name')?.setValue(this.name);
    this.pourlineForm?.get('sectionCode')?.setValue(this.sectionCode);
    this.pourlineForm?.get('isActive')?.setValue(this.isActive || false);
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
      name: '',
      sectionCode: '',

      isActive: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
    this.pourlineForm?.get('code')?.setValue('');
    this.pourlineForm?.get('name')?.setValue('');
    this.pourlineForm?.get('sectionCode')?.setValue('');
    this.pourlineForm?.get('isActive')?.setValue(true);
  }

  ngAfterViewInit() {
    this.PourSectionService.getAll().subscribe((result: any) => {
      this.pourSections = result.data;
    });
  }

  onEdit() {
    this.submitted = true;
    if (this.pourlineForm.invalid) {
      return;
    }
    this._service
      .Update({
        code: this.code.trim(),
        name: this.pourlineForm.value.name.trim(),
        sectionCode: this.pourlineForm.value.sectionCode,
        isActive: this.pourlineForm.value.isActive,
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
