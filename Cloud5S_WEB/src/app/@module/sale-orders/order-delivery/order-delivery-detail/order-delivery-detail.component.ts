import {Component, HostListener, ViewContainerRef,NgZone, ViewChild } from '@angular/core';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {
  STATE_ORDER,
  ACTION_ORDER,
  LIST_STATE,
  LIST_NEW_STATE,
  STATE_ORDER_NEW,
  STATE_ORDER_DELIVERY,
  ORDER_DELIVERY_RIGHTS,
  ORDER_SELL_RIGHTS,
} from 'src/app/utils/constant/index';
import Swal from 'sweetalert2';
import {GlobalService} from 'src/app/services/Common/global.service';
import {Router, ActivatedRoute} from '@angular/router';
import {OrderFilter, OrderExportFilter, OrderExportVehicleFilter} from 'src/app/@filter/SO/order.filter';
import {utils} from 'src/app/utils/utils';
import {
  EORDER_EXPORT_STEPS,
  LIST_ORDER_EXPORT,
  ORDER_EXPORT_TYPE,
  PAYMENT_METHODS,
} from 'src/app/utils/constant/order-export';
// import {OrderExportFilter} from 'src/app/@filter/SO/export.filter';
import {OrderExportService} from 'src/app/services/SO/order-export.service';
import {PrintService} from 'src/app/services/Common/print.service';
import {OrderExportPrintComponent} from 'src/app/@module/print-templates/order-export-print/order-export-print.component';
import {OrderPrintComponent} from 'src/app/@module/print-templates/order-print/order-print.component';
import OrderDeliveryService from 'src/app/services/SO/order-delivery.service';
import {OrderService} from 'src/app/services/SO/order.service';
import {ModuleAttachmentService} from 'src/app/services/Business/module-attachment.service';
import {OrderDeliveryEditComponent} from '../order-delivery-edit/order-delivery-edit.component';
// import {ExportSearchFilter} from 'src/app/@filter/SO/order-delivery.filter';
import {addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks} from 'date-fns';
import * as moment from 'moment';
import {AttachmentService} from 'src/app/services/Business/attachment.service';
import {AttachmentDtoModel} from 'src/app/models/Business/attachment.model';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {RefreshOrderBatchServiceService} from 'src/app/services/SO/refresh-order-batch-service.service';
import { NzTabSetComponent } from 'ng-zorro-antd/tabs';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-delivery-detail.component.html',
  styleUrls: ['./order-delivery-detail.component.scss'],
})
export class OrderDeliveryDetailComponent {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthDeault =
      window.innerWidth <= 767
        ? `${window.innerWidth}px`
        : this.globalService.toggleSidebar
        ? `${window.innerWidth - 250}px`
        : `${window.innerWidth}px`;
  }
  rangePresets = {
    'Tuần trước': [startOfWeek(subWeeks(new Date(), 1)), endOfWeek(subWeeks(new Date(), 1))],
    'Hôm qua': [addDays(new Date(), -1), addDays(new Date(), -1)],
    'Hôm nay': [new Date(), new Date()],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
    'Tháng này': [startOfMonth(new Date()), endOfMonth(new Date())],
  };
  maxTagCount = 1;
  itemDetail: any;
  itemDetailExport: any;
  STATE_ORDER_NEW = STATE_ORDER_NEW;
  STATE_ORDER_DELIVERY = STATE_ORDER_DELIVERY;
  ACTION_ORDER = ACTION_ORDER;
  STATE_ORDER = STATE_ORDER;
  LIST_STATE = LIST_STATE;
  LIST_NEW_STATE = LIST_NEW_STATE;
  detailData: any = {};
  code: string = '';
  ORDER_EXPORT_TYPE = ORDER_EXPORT_TYPE;
  widthDeault: string = '0px';
  STATE_ORDER_EXPORT = LIST_ORDER_EXPORT;
  bankAccount: any;
  datafiles: any = [];
  filesUploaded!: FileList;
  maxSizeInBytes: number = 5000 * 1024;
  referenceId: string = '';
  dates: any = [];
  displayedColumns: string[] = [];
  dataSource: any = [];
  totalValues: any = [];
  hearder: any = [];
  disabledDate = (current: Date): boolean => {
    return false;
  };
  totalAverage: any = 0;
  totalWeight: any = 0;
  totalValue: any = 0;

  PAYMENT_METHODS = PAYMENT_METHODS;
  filter = new OrderFilter();
  filterVehicle = new OrderExportVehicleFilter();
  showButton = {
    edit: false,
    confirm: false,
    cancel: false,
    upload: false,
  };
  filterExport = new OrderExportFilter();
  selectedRange: Date[] = [moment().subtract(3, 'days').startOf('day').toDate(), moment().endOf('day').toDate()];
  selectedRangeVehicle: Date[] = [moment().subtract(3, 'days').startOf('day').toDate(), moment().endOf('day').toDate()];
  listVehicle: any = [];
  totalExport: number = 0;
  isInforGeneral: boolean = true;
  showMap: boolean = false;
  ORDER_DELIVERY_RIGHTS = ORDER_DELIVERY_RIGHTS;
  ORDER_SELL_RIGHTS = ORDER_SELL_RIGHTS;
  selectedRangeShip: Date[] = [];
  startDateChil: Date = new Date();
  endDateChil: Date = new Date();
  paginationResult!: PaginationResult;
  @ViewChild(NzTabSetComponent) tabSet!: NzTabSetComponent;
  
  constructor(
    private _service: OrderDeliveryService,
    private moduleAttachmentService: ModuleAttachmentService,
    private attachmentService: AttachmentService,
    private _order: OrderService,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
    private _ps: PrintService,
    private viewContainerRef: ViewContainerRef,
    private dropdownService: DropdownService,
    public utils: utils,
    private globalService: GlobalService,
    private refreshOrderBatchServiceService: RefreshOrderBatchServiceService,
    private ngZone: NgZone
  ) {
    this.widthDeault =
      window.innerWidth <= 767
        ? `${window.innerWidth}px`
        : this.globalService.toggleSidebar
        ? `${window.innerWidth - 250}px`
        : `${window.innerWidth}px`;
    this.globalService.toggleSidebarSubject.subscribe((value) => {
      this.widthDeault =
        window.innerWidth <= 767
          ? `${window.innerWidth}px`
          : value
          ? `${window.innerWidth - 250}px`
          : `${window.innerWidth}px`;
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  ngOnInit(): void {
    this.getDetail();
    this.GetVehicle();
  }
  ngAfterViewInit() {
    this.refreshOrderBatchServiceService.initiateSignalrConnection();
    this.refreshOrderBatchServiceService.hubReceive.subscribe((message: any) => {
      if(this.tabSet.nzSelectedIndex == 0){
        this.getDetail();
        this.GetVehicle();
      }
      if(this.tabSet.nzSelectedIndex == 1){
        this.getDetailVehicle();
      }
      if(this.tabSet.nzSelectedIndex == 2){
        this.getDetailExport();
      }
    });
    this.refreshOrderBatchServiceService.hubSecondTimeReceive.subscribe((message: any) => {
      if(this.tabSet.nzSelectedIndex == 0){
        this.getDetail();
        this.GetVehicle();
      }
      if(this.tabSet.nzSelectedIndex == 1){
        this.getDetailVehicle();
      }
      if(this.tabSet.nzSelectedIndex == 2){
        this.getDetailExport();
      }
    });
  }
  getDetail() {
    this._service.GetDetail(this.code).subscribe((res) => {
      this.ngZone.run(() => {
        this.itemDetail = {...res.data};
        let startDate = this.itemDetail?.startDate;
        let endDate = this.itemDetail?.endDate;
        this.startDateChil = startDate;
        this.endDateChil = endDate;
        this.referenceId = this.itemDetail?.referenceId;
        if (startDate && endDate) {
          this.selectedRange = [new Date(startDate), new Date(endDate)];
          this.selectedRangeVehicle = [new Date(startDate), new Date(endDate)];
          this.selectedRangeShip = [new Date(startDate), new Date(endDate)];
          this.disabledDate = (current: Date): boolean => {
            if (this.selectedRangeVehicle) {
              const currentDate = current.setHours(0, 0, 0, 0);
              const startDateVehicle = new Date(startDate).setHours(0, 0, 0, 0);
              const endDateVehicle = new Date(endDate).setHours(0, 0, 0, 0);
              return currentDate < startDateVehicle || currentDate > endDateVehicle;
            }
            return false;
          };
        }
        this.showButton.edit =
          this.itemDetail.state != STATE_ORDER_DELIVERY['DA_KET_THUC'].value &&
          this.itemDetail.state != STATE_ORDER_DELIVERY['DANG_XUAT_HANG'].value &&
          this.itemDetail.state != STATE_ORDER_DELIVERY['DA_HUY'].value;
        this.showButton.confirm = this.itemDetail?.state == STATE_ORDER_DELIVERY['DANG_XUAT_HANG'].value;
        this.showButton.cancel =
          this.itemDetail.state == STATE_ORDER_DELIVERY['KHOI_TAO'].value || this.itemDetail?.state == null;
      });
      });
  }

  getDetailExport() {
    const filterExport = {
      currentPage: this.filterExport.currentPage,
      pageSize: this.filterExport.pageSize,
      keyWord: this.filterExport.keyWord,
      FromDate: this.selectedRange.length > 0 ? moment(this.selectedRange[0])?.format('YYYY-MM-DD') : '',
      ToDate: this.selectedRange?.length > 1 ? moment(this.selectedRange[1])?.format('YYYY-MM-DD') : '',
      VehicleCode: this.filterExport?.VehicleCode,
      States: this.filterExport?.States,
      Type: 'XUAT_HANG',
      BatchCode: this.itemDetail.code,
    };
    if ('States' in filterExport && filterExport.States?.length == 0) {
      delete filterExport.States;
    }

    this._order.search(filterExport).subscribe((res) => {
      this.ngZone.run(() => {
        this.paginationResult = res.data;
        this.totalExport = this.paginationResult.totalRecord;
      })
    });
  }

  getDetailVehicle() {
    if (this.selectedRangeVehicle?.length != 2) return;
    this.dates = [];
    const filterExport = {
      FromDate: this.selectedRangeVehicle.length > 0 ? moment(this.selectedRangeVehicle[0])?.format('YYYY-MM-DD') : '',
      ToDate: this.selectedRangeVehicle?.length > 1 ? moment(this.selectedRangeVehicle[1])?.format('YYYY-MM-DD') : '',
      VehicleCode: this.filterVehicle.VehicleCode,
    };

    this._order.ExportVehicle(filterExport).subscribe((res) => {
      this.ngZone.run(() => {
      this.dates = [];
      this.dataSource = res.data.orderTotals;
      this.totalValues = res.data.totalValues;
      this.totalAverage = res.data.totalAverage;
      this.totalWeight = res.data.totalWeight;
      this.totalValue = res.data.totalValue;
      this.dataSource[0]?.data?.filter((i: any) => {
        this.dates.push(this.convertTime(i.orderDate));
      });
      let datesArr = this.dates.filter((value : any, index : any, self :any) => self.indexOf(value) === index);
      this.displayedColumns = [
        'index',
        'vehicleCode',
        'total',
        ... datesArr.reduce(
          (acc: any, date: any, index: any) =>
            acc.concat([`value0To6-${index}`, `value6To12-${index}`, `value12To18-${index}`, `value18To24-${index}`]),
          [],
        ),
      ];
      this.hearder = datesArr.map((date: any, index: any) => 'header-row-hn-' + (index + 1));
      })
    });
  }

  convertTime(dateString: any) {
    const dateObject = new Date(dateString);

    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // +1 vì tháng bắt đầu từ 0
    const day = String(dateObject.getDate()).padStart(2, '0');

    const newDateString = `${day}/${month}/${year}`;

    return newDateString;
  }

  exportExcel() {
    return this._order
      .ExportVehicleDownload({
        FromDate:
          this.selectedRangeVehicle.length > 0 ? moment(this.selectedRangeVehicle[0])?.format('YYYY-MM-DD') : '',
        ToDate: this.selectedRangeVehicle?.length > 1 ? moment(this.selectedRangeVehicle[1])?.format('YYYY-MM-DD') : '',
      })
      .subscribe((result: Blob) => {
        const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        const url = window.URL.createObjectURL(blob);
        var anchor = document.createElement('a');
        anchor.download = 'phuong-tien-cho-hang.xlsx';
        anchor.href = url;
        anchor.click();
      });
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
  }

  totalMoney() {
    const arrMoney = this.itemDetail.orderBatchDetails.map((item: any) => item?.sumMoney || 0);
    return (
      arrMoney.reduce((total: number, currentValue: number) => {
        return total + currentValue;
      }) || 0
    );
  }

  onUpdate() {
    this.drawerService.open(OrderDeliveryEditComponent, {item: this.itemDetail});
  }

  onConfirm() {
    Swal.fire({
      showCloseButton: true,
      title: 'Bạn muốn xác nhận phiếu?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this._service.Complete(this.itemDetail.code).subscribe(
          (data) => {
            this.getDetail();
            this.drawerService.returnData(data);
            this.showButton.confirm = false;
            this.showButton.cancel = false;
          },
          (error) => {
            console.log('error: ', error);
          },
        );
      }
    });
  }

  onCancel() {
    Swal.fire({
      showCloseButton: true,
      title: 'Bạn muốn xác nhận hủy phiếu?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this._service.CancelState(this.itemDetail.code).subscribe(
          (data) => {
            this.getDetail();
            this.drawerService.returnData(data);
            this.showButton.confirm = false;
            this.showButton.cancel = false;
          },
          (error) => {
            console.log('error: ', error);
          },
        );
      }
    });
  }

  toPercent(num1: any, num2: any) {
    let result = (parseInt(num1) / parseInt(num2)) * 100;
    return result.toFixed(2) + '%';
  }

  GetVehicle() {
    this.dropdownService.GetAllVehicle().subscribe(
      ({data}) => {
        this.listVehicle = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  onVehicleChange(event: any) {
    this.filterExport.VehicleCode = event;
    this.getDetailExport();
  }

  onStateChange(event: any) {
    this.filterExport.States = event;
    this.getDetailExport();
  }

  onDateRangeChange(event: any) {
    this.selectedRange = event;
    this.getDetailExport();
  }

  onTabChange(event: any): void {
    if (event.index == 0) {
      this.isInforGeneral = true;
      // 
      this.getDetail();
      this.GetVehicle();
    } else {
      this.isInforGeneral = false;
    }
    if (event.index == 3) {
      this.showMap = true;
    } else {
      this.showMap = false;
    }
    if (event.index == 1) this.getDetailVehicle();
    if (event.index == 2) this.getDetailExport();

    if (event.index == 4) {
      this.showButton.upload = true;
      this.getDataFiles();
    } else {
      this.showButton.upload = false;
    }
    // You can perform any desired actions here when the tab changes.
  }

  getDataFiles() {
    this.moduleAttachmentService.GetByRefrenceId(this.referenceId).subscribe(({data}) => {
      this.datafiles = data;
    });
  }

  isDisableButton() {
    return (
      this.itemDetail?.state == EORDER_EXPORT_STEPS.DA_XAC_NHAN ||
      this.itemDetail?.state == EORDER_EXPORT_STEPS.DA_BI_HUY
    );
  }

  onPrint() {
    const dataPrint = {...this.itemDetail};
    this._ps.printComponent(dataPrint, OrderPrintComponent, this.viewContainerRef, 'order-export.css');
  }

  downloadFile(item: AttachmentDtoModel) {
    this.attachmentService.Download(item.attachmentId).subscribe((blob: any) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = `${item.attachment.name}`;
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }

  removeFile(id: string) {
    Swal.fire({
      showCloseButton: true,
      title: 'Xóa file ?',
      text: 'Hành động này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Huỷ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.attachmentService.Delete(id).subscribe(
          (data) => {
            this.getDataFiles();
          },
          (error) => {
            console.log('error: ', error);
          },
        );
      }
    });
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    this.filesUploaded = files;
    if (files.length == 0) return;
    const selectedFile = event.target.files[0];
    let fileType = 'OTHER';
    if (selectedFile.type.includes('image')) fileType = 'IMAGE';
    if (selectedFile.type.includes('pdf')) fileType = 'PDF';
    if (selectedFile.type.includes('word')) fileType = 'WORD';
    if (selectedFile.type.includes('video')) fileType = 'VIDEO';
    if (selectedFile.type.includes('excel')) fileType = 'EXCEL';

    if (selectedFile.size > this.maxSizeInBytes) {
      Swal.fire({
        showCloseButton: true,
        title: 'File tải lên quá lớn',
        icon: 'warning',
        showConfirmButton: false,
        toast: true,
        position: 'top-right',
        allowOutsideClick: true,
        timer: 2000,
      });
      return;
    }

    return this.moduleAttachmentService
      .Upload(selectedFile, {
        moduleType: 'ORDER',
        fileType: fileType,
        referenceId: this.referenceId,
      })
      .subscribe((res) => {
        if (res.status) {
          Swal.fire({
            showCloseButton: true,
            title: 'Tải file lên thành công',
            icon: 'success',
            showConfirmButton: false,
            toast: true,
            position: 'top-right',
            allowOutsideClick: true,
            timer: 2000,
          });
          this.getDataFiles();
        }
      });
  }
  formatFileSize(bytes: any) {
    if (bytes == 0) return '0 KB';

    const sizes = ['KB', 'MB', 'GB', 'TB'];
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  onChangePage(pageNumber: number) {
    this.filterExport.currentPage = pageNumber;
    this.getDetailExport();
  }

  pageSizeChange(pageSize: number) {
    this.filterExport.currentPage = 1;
    this.filterExport.pageSize = pageSize;
    this.getDetailExport();
  }
}
