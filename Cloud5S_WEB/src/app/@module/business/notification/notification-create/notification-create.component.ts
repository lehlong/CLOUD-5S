import {Component, HostListener} from '@angular/core';
import {NotifyService} from 'src/app/services/Business/notify.service';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import * as moment from 'moment';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {NotifyFilter} from 'src/app/@filter/Business/notify.filter';
import {utils} from 'src/app/utils/utils';
import {itemNotify} from 'src/app/models/Business/notify.model';
import {STATE_STOCK, ACTION_STOCK} from 'src/app/utils/constant/index';
import {MatDialog} from '@angular/material/dialog';
import {NotifyChooseItemComponent} from '../notify-choose-item/notify-choose-item.component';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic/build/ckeditor';
import {NOTIFY_RIGHTS} from 'src/app/utils/constant/access-right';
@Component({
  selector: 'app-notification-create',
  templateUrl: './notification-create.component.html',
  styleUrls: ['./notification-create.component.scss'],
})
export class NotificationCreateComponent {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
  }
  notifyForm: FormGroup;
  submitted: boolean = false;
  listStock: any = [];
  stateDetail: string = '';
  STATE_STOCK = STATE_STOCK;
  ACTION_STOCK = ACTION_STOCK;
  listItemDetails: itemNotify[] = [];
  filter = new NotifyFilter();
  widthDeault: string = '0px';
  NOTIFY_RIGHTS = NOTIFY_RIGHTS;
  public Editor: any = ClassicEditor;

  content: any = '';
  constructor(
    private _service: NotifyService,
    private _fb: FormBuilder,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    private utils: utils,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
    this.notifyForm = this._fb.group({
      subtitle: ['', [Validators.required, this.utils.trimSpace]],
      contents: ['', [Validators.required]],
      details: this._fb.array([]),
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  get details(): FormArray {
    return this.notifyForm.get('details') as FormArray;
  }

  createDetails(params: any = null): FormGroup {
    return this._fb.group({
      receiverName: params?.receiverName || '',
    });
  }

  addDetails(params: any = null) {
    this.details.push(this.createDetails(params));
  }

  removedetails(index: number) {
    this.details.removeAt(index);
    this.listItemDetails.splice(index, 1);
  }

  openChooseItem() {
    const dialogRef = this.dialog.open(NotifyChooseItemComponent, {
      position: {
        top: '150px',
      },
      width: this.widthDeault,
    });
    dialogRef.componentInstance.listSelect = this.listItemDetails;
    dialogRef.afterClosed().subscribe((result: any[]) => {
      if (result) {
        const details = this._fb.array([]);
        this.notifyForm.setControl('details', details);
        this.listItemDetails = result.map((itemA, index) => {
          const matchingItem: any = this.listItemDetails.find((itemB) => itemB.userName === itemA.userName);

          if (matchingItem) {
            this.addDetails({
              receiverName: matchingItem?.userName || '',
            });
            return matchingItem;
          }
          this.addDetails({
            receiverName: itemA?.userName || '',
          });
          return itemA;
        });
      }
    });
  }

  ngOnInit(): void {
    this.loadInit();
  }

  loadInit() {
    this.GetAllStock();
  }

  GetAllStock() {
    this.dropdownService.GetAllStock().subscribe(
      ({data}) => {
        this.listStock = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  get f() {
    return this.notifyForm.controls;
  }

  close() {
    this.filter = {
      ...this.filter,
      id: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
  }
  onEditorChange(event: any) {
    const editorContent = event.editor.getData();
  }

  onCreate() {
    this.submitted = true;
    if (this.notifyForm.invalid) {
      Swal.fire({
        showCloseButton: true,
        title: 'Vui lòng nhập đủ thông tin còn trống',
        icon: 'warning',
        showConfirmButton: false,
        toast: true,
        position: 'top-right',
        allowOutsideClick: true,
        timer: 2000,
      });
      return;
    }
    //
    let objectInsert = {
      // ...this.notifyForm.value,
      contents : this.notifyForm.value.contents,
      details: this.notifyForm.value.details,
      subtitle : this.notifyForm.value.subtitle.trim(),
    };
    if (!objectInsert.details.length) {
      Swal.fire({
        showCloseButton: true,
        title: 'Chưa chọn danh sách người thông báo',
        icon: 'warning',
        showConfirmButton: false,
        toast: true,
        position: 'top-right',
        allowOutsideClick: true,
        timer: 2000,
      });
      return;
    }
    //
    this._service.Insert({...objectInsert, url: null}).subscribe(
      (data) => {
        this.drawerService.returnData(data);
        this.submitted = false;
        // const details = this._fb.array([]);
        // this.notifyForm.setControl('details', details);
        // this.notifyForm.get('contents')?.setValue('');
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
}
