import {Component} from '@angular/core';
import {PourlineService} from 'src/app/services/MD/pour-line.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {optionsGroup} from 'src/app/@filter/MD/pour-line.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {PourSectionService} from 'src/app/services/MD/pour-section.service';
import {POURLINE_RIGHTS} from 'src/app/utils/constant/index';
@Component({
  selector: 'app-pour-line-create',
  templateUrl: './pour-line-create.component.html',
  styleUrls: ['./pour-line-create.component.scss'],
})
export class PourLineCreateComponent {
  pourlineForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();
  pourSections: any = [];
  POURLINE_RIGHTS = POURLINE_RIGHTS;

  constructor(
    private _service: PourlineService,
    private PourSectionService: PourSectionService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
  ) {
    this.pourlineForm = this._fb.group({
      code: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-_]*$/), this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      sectionCode: ['', [Validators.required, this.utils.trimSpace]],
      isActive: [true, [Validators.required]],
    });
  }

  get f() {
    return this.pourlineForm.controls;
  }

  close() {
    this.drawerService.close();
    this.pourlineForm?.get('code')?.setValue('');
    this.pourlineForm?.get('name')?.setValue('');
    this.pourlineForm?.get('sectionCode')?.setValue('');
    this.pourlineForm?.get('isActive')?.setValue(true);
  }

  ngOnInit() {
    this.PourSectionService.getAll().subscribe((result: any) => {
      this.pourSections = result.data;
    });
  }

  onCreate() {
    this.submitted = true;
    this.pourlineForm.setValue({
      ...this.pourlineForm.value,
      code: this.pourlineForm.value.code.trim(),
    });
    if (this.pourlineForm.invalid) {
      return;
    }
    this._service
      .Insert({
        code: this.pourlineForm.value.code.trim(),
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
