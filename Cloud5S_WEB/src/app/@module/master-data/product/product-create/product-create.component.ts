import {Component} from '@angular/core';
import {ProductService} from 'src/app/services/MD/product.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {utils} from 'src/app/utils/utils';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Dropdown} from 'bootstrap';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {optionsGroup} from 'src/app/@filter/MD/product.filter';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductFilter} from 'src/app/@filter/MD/product.filter';
import {PRODUCT_RIGHTS} from 'src/app/utils/constant/index';
@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent {
  productForm: FormGroup;
  submitted: boolean = false;
  optionsGroup: optionsGroup[] = [];
  filterGroup = new BaseFilter();
  filter = new ProductFilter();
  unitCodes: any[] = [];
  itemTypes: any[] = [];
  selectedItem: string = '';
  PRODUCT_RIGHTS = PRODUCT_RIGHTS;
  editData: any;
  modalType: string = 'add'; // Mặc định là form thêm sản phẩm, nếu có edit data là form edit
  codeEdit: string = '';
  constructor(
    private _service: ProductService,
    private _service1: DropdownService,
    private _fb: FormBuilder,
    private utils: utils,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.productForm = this._fb.group({
      code: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-_]*$/), this.utils.trimSpace]],
      name: ['', [Validators.required, this.utils.trimSpace]],
      isActive: [true, [Validators.required]],
      isManufacture: [true, [Validators.required]],
      typeCode: ['', [Validators.required, this.utils.trimSpace]],
      unitCode: ['', [Validators.required, this.utils.trimSpace]],
    });

    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  get f() {
    return this.productForm.controls;
  }

  ngOnInit(): void {
    if (this.editData) {
      this.codeEdit = this.editData.code;
      this.productForm.setValue({
        code: this.editData.code,
        name: this.editData.name,
        isActive: !!this.editData.isActive,
        isManufacture: !!this.editData.isManufacture,
        typeCode: this.editData.typeCode,
        unitCode: this.editData.unitCode,
      });
      this.productForm.get('code')?.disable();
      this.modalType = 'edit';
    }
    this._service1.GetAllUnit().subscribe((result: any) => {
      this.unitCodes = result.data;
    });
    this._service1.GetAllItemType().subscribe((result: any) => {
      this.itemTypes = result.data;
    });
  }
  close() {
    this.filter = {
      ...this.filter,
      code: '',
      name: '',
      isActive: '',
      isManufacture: '',
      typeCode: '',
      unitCode: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
    this.productForm?.get('code')?.setValue('');
    this.productForm?.get('name')?.setValue('');
    this.productForm?.get('isActive')?.setValue(true);
    this.productForm?.get('isManufacture')?.setValue(true);
    this.productForm?.get('typeCode')?.setValue('');
  }

  onCreate() {
    this.submitted = true;

    // return;
    if (this.productForm.invalid) {
      return;
    }

    switch (this.modalType) {
      case 'add':
        this._service
          .Insert({
            isActive: this.productForm.value.isActive,
            isManufacture: this.productForm.value.isManufacture,
            code: this.productForm.value.code.trim(),
            name: this.productForm.value.name.trim(),
            unitCode: this.productForm.value.unitCode,
            typeCode: this.productForm.value.typeCode,
            costPrice: 0,
            sellPrice: 0,
            itemFormula: null,
          })
          .subscribe(
            (data) => {
              this.drawerService.returnData(data);
              this.submitted = false;
            },
            (error) => {
              console.log('error: ', error);
              console.log('test');
            },
          );
        break;
      case 'edit':
        const bodyRequest = {
          code: this.codeEdit,
          name: this.productForm.value.name.trim(),
          isActive: this.productForm.value.isActive,
          isManufacture: this.productForm.value.isManufacture,
          typeCode: this.productForm.value.typeCode,
          unitCode: this.productForm.value.unitCode,
          costPrice: 0,
          sellPrice: 0,
          itemFormula: null,
        };
        console.log(bodyRequest);

        this._service.Update(bodyRequest).subscribe({
          next: (data) => {
            this.drawerService.returnData(data);
            this.submitted = false;
          },
          error: (error) => {
            console.log('error: ', error);
            console.log('test');
          },
        });
    }
  }
}
