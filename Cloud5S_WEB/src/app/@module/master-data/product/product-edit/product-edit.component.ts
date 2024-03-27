import {Component} from '@angular/core';
import {ProductService} from 'src/app/services/MD/product.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {Router, ActivatedRoute} from '@angular/router';
import {ProductFilter} from 'src/app/@filter/MD/product.filter';
import {optionsGroup} from 'src/app/@filter/MD/product.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {PRODUCT_RIGHTS} from 'src/app/utils/constant/index';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent {
  productForm: FormGroup;
  submitted: boolean = false;
  code: string = '';
  name: string = '';
  isActive: boolean | null = null;
  isManufacture: boolean | null = null;
  unitCode: string = '';
  typeCode: string = '';
  unitCodes: any[] = [];
  PRODUCT_RIGHTS = PRODUCT_RIGHTS;
  costPrice: string = '';
  sellPrice: string = '';
  isMainObject: boolean | null = null;
  isQuantitative: boolean | null = null;
  itemTypes: any[] = [];
  selectedItem: string = '';
  filter = new ProductFilter();
  optionsGroup: optionsGroup[] = [];
  currentTab: number = 1;

  constructor(
    private _service: ProductService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private _service1: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.productForm = this._fb.group({
      code: [{value: '', disabled: true}],
      name: ['', [Validators.required, this.utils.trimSpace]],
      isActive: ['', Validators.required],
      isManufacture: ['', Validators.required],
      unitCode: ['', [Validators.required, this.utils.trimSpace]],
      typeCode: ['', [Validators.required, this.utils.trimSpace]],
      costPrice: ['', [Validators.required, this.utils.trimSpace]],
      sellPrice: ['', [Validators.required, this.utils.trimSpace]],
      isMainObject: ['', Validators.required],
      isQuantitative: ['', Validators.required],
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }
  changeTab(tab: number) {
    this.currentTab = tab;
    this.drawerService.returnData({
      type: 'tab',
      tab: tab,
    });
  }

  get f() {
    return this.productForm.controls;
  }

  ngOnInit() {
    this._service1.GetAllUnit().subscribe((result: any) => {
      this.unitCodes = result.data;
    });
    this._service1.GetAllItemType().subscribe((result: any) => {
      this.itemTypes = result.data;
    });

    this.productForm?.get('code')?.setValue(this.code);
    this.productForm?.get('name')?.setValue(this.name);
    this.productForm?.get('isActive')?.setValue(this.isActive);
    this.productForm?.get('isManufacture')?.setValue(this.isManufacture);
    this.productForm?.get('unitCode')?.setValue(this.unitCode);
    this.productForm?.get('typeCode')?.setValue(this.typeCode);
    this.productForm?.get('costPrice')?.setValue(this.costPrice);
    this.productForm?.get('sellPrice')?.setValue(this.sellPrice);
    this.productForm?.get('isMainObject')?.setValue(this.isMainObject);
    this.productForm?.get('isQuantitative')?.setValue(this.isQuantitative);
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
      name: '',
      isActive: '',
      isManufacture: '',
      unitCode: '',
      typeCode: '',
      costPrice: '',
      sellPrice: '',
      isMainObject: '',
      isQuantitative: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
    this.productForm?.get('code')?.setValue('');
    this.productForm?.get('name')?.setValue('');
    this.productForm?.get('isActive')?.setValue(true);
    this.productForm?.get('isManufacture')?.setValue(true);
    this.productForm?.get('unitCode')?.setValue('');
    this.productForm?.get('typeCode')?.setValue('');
    this.productForm?.get('costPrice')?.setValue('');
    this.productForm?.get('sellPrice')?.setValue('');
    this.productForm?.get('isMainObject')?.setValue('');
    this.productForm?.get('isQuantitative')?.setValue('');
  }

  onEdit() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    // this._service
    //   .Update(
    //     {
    //       code: this.code.trim(),
    //       name: this.productForm.value.name.trim(),
    //       isActive: this.productForm.value.isActive,
    //       isManufacture: this.productForm.value.isManufacture,
    //       unitCode: this.productForm.value.unitCode,
    //       typeCode: this.productForm.value.typeCode,
    //       costPrice: this.productForm.value.costPrice,
    //       sellPrice: this.productForm.value.sellPrice,
    //       isMainObject: this.productForm.value.isMainObject,
    //       isQuantitative: this.productForm.value.isQuantitative,

    //     },
    //     false,
    //   )
    //   .subscribe(
    //     (data) => {
    //       this.drawerService.returnData(data);
    //       this.submitted = false;
    //     },
    //     (error) => {
    //       console.log('error: ', error);
    //     },
    //   );
  }
}
