import {startOfWeek, endOfWeek, addDays, startOfDay, endOfDay, addHours} from 'date-fns';
import {Component} from '@angular/core';
import {ActivatedRoute, Router, NavigationExtras} from '@angular/router';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {OrderService} from 'src/app/services/SO/order.service';
import {utils} from 'src/app/utils/utils';
import {FormControl} from '@angular/forms';
import {HumidityFilter} from 'src/app/@filter/Business/humidity-evaluate';
import * as moment from 'moment';
import {HumidityEvaluateService} from 'src/app/services/Business/humidity.service';
import Swal from 'sweetalert2';
import {GlobalService} from 'src/app/services/Common/global.service';
import {OrderCreateComponent} from 'src/app/@module/sale-orders/order/order-create/order-create.component';
import {EVALUATE_MOISTURE} from 'src/app/utils/constant/moisture';
import { OrderDetailComponent } from 'src/app/@module/sale-orders/order/order-detail/order-detail.component';
import {MOISTURE_RIGHTS} from 'src/app/utils/constant/access-right';
@Component({
  selector: 'app-humidity-evaluate-view',
  templateUrl: './humidity-evaluate-view.component.html',
  styleUrls: ['./humidity-evaluate-view.component.scss'],
})
export class HumidityEvaluateViewComponent {
  faFileExcel = faFileExcel;
  displayedColumns: string[] = [
    'index',
    'code',
    'importDate',
    'vehicleCode',
    'partner',
    'area',
    'handleBy',
    'trayWeight',
    'trayWeightAndFreshwood',
    'freshWood',
    'trayWeightAndDrywood',
    'dryWood',
    'averageHumidity',
    'evaluate',
  ];
  paginationResult!: PaginationResult ;
  EVALUATE_MOISTURE = EVALUATE_MOISTURE;
  filter = new HumidityFilter();
  rangePresets = {
    '2 giờ sau': [new Date(), addHours(new Date(), 2)],
    'Hôm nay': [startOfDay(new Date()), endOfDay(new Date())],
    'Ngày mai': [startOfDay(addDays(new Date(), 1)), endOfDay(addDays(new Date(), 1))],
    '3 ngày sau': [new Date(), endOfDay(addDays(new Date(), 3))],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
  };

  updateListOrder: any = [];
  freshWoodArr: any = [];
  dryWoodArr: any = [];
  avgHumidityArr: any = [];

  listVehicle: any = [];
  listPartnerAll: any = [];
  listArea: any = [];

  listEvaluate: any = [];

  emptyInfor: boolean = true;
  fullInfor: boolean = true;
  MOISTURE_RIGHTS = MOISTURE_RIGHTS;
  constructor(
    private _service: HumidityEvaluateService,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
    public utils: utils,
    private _os: OrderService,
    private globalService: GlobalService,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Quản lý độ ẩm',
        path: 'business/humidity-view',
      },
    ]);
    // this.route.queryParams.subscribe((params: any) => {
    //   this.filter = {
    //     ...this.filter,
    //     ...params,
    //   };
    // });
  }

  ngOnInit(): void {
    this.loadInit(true);
  }

  openDetail(code: string = '') {
    this.router.navigate([], {
      replaceUrl: true,
      relativeTo: this.route,
      queryParams: {
        ...this.filter,
        code: code,
      },
    });
    this.drawerService
      .open(OrderDetailComponent, {
        code: code,
      })
      .subscribe((result) => {
        if (result.openEdit) {
          // this.openEdit(result.item);
        } else if (result?.status && this.utils.checkComponent(HumidityEvaluateViewComponent)) {
          this.loadInit();
        }
      });
  }


  editInfor() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        currentPage: this.filter.currentPage,
        pageSize: this.filter.pageSize,
        keyWord: this.filter.keyWord,
        type: 'NHAP_HANG',
        PartnerCode: this.filter.PartnerCode,
        VehicleCode: this.filter.VehicleCode,
        AreaCode: this.filter.AreaCode,
        FromDate:
          this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : '' ,
        ToDate:
          this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : '',

         //checkbox
         emptyInfor: this.emptyInfor,
         fullInfor: this.fullInfor
      },
    };
    this.router.navigate(['/business/humidity-evaluate'], navigationExtras);
  }

  GetAllPartner() {
    this.dropdownService.GetAllPartner().subscribe(
      ({data}) => {
        this.listPartnerAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
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
  GetArea() {
    this.dropdownService.GetAllArea().subscribe(
      ({data}) => {
        this.listArea = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
  GetAllEvaluate() {
    this.listEvaluate = [
      {code: 'Head', name: 'Head'},
      {code: 'Middle', name: 'Middle'},
      {code: 'Tail', name: 'Tail'},
    ];
  }

  openCreate() {
    this.drawerService.open(OrderCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(HumidityEvaluateViewComponent)) {
        this.loadInit();
      }
    });
  }

  handleCheckboxChange() {
    this.filter.IsFullInfor = this.fullInfor;
    this.filter.IsEmptyInfor = this.emptyInfor;
    this.search();
  }

  search(first: boolean = false) {
    const filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      type: 'NHAP_HANG',
      PartnerCode: this.filter.PartnerCode,
      VehicleCode: this.filter.VehicleCode,
      AreaCode: this.filter.AreaCode,
      IsFullInfor: this.filter.IsFullInfor,
      IsEmptyInfor: this.filter.IsEmptyInfor,
      FromDate:
        this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : '',
      ToDate: this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : '',
    };
    this._service.search(filterFormat).subscribe({
      next: ({data}) => {
        let tmpData: any = {};
        if (this.fullInfor && this.emptyInfor) {
          tmpData = data.data.map((it: any) => {
            if (!it.moisture) {
              return {
                ...it,
                moisture: {
                  id: null,
                  orderCode: '',
                  processBy: '',
                  processDate: null,
                  trayWeight: null,
                  trayWetWeight: null,
                  wetWeight: null,
                  trayDryWeight: null,
                  dryWeight: null,
                  moisture: null,
                  remark: '',
                  note: '',
                },
              };
            }
            return {...it};
          });
        }
        if(this.fullInfor && !this.emptyInfor){
          tmpData = data.data.filter((it:any)=>{
             return (
              it.moisture != null &&
              it.moisture.id !==null &&
              it.moisture.trayWeight !==null &&
              it.moisture.trayWetWeight !==null &&
              it.moisture.wetWeight !==null &&
              it.moisture.trayDryWeight !==null &&
              it.moisture.dryWeight !==null &&
              it.moisture.moisture !==null
            );
          })
        }
        if(!this.fullInfor && this.emptyInfor){
          tmpData = data.data.filter((it:any)=>{
            return (
             it.moisture == null ||
             it.moisture.id ==null ||
             it.moisture.trayWeight ==null ||
             it.moisture.trayWetWeight ==null ||
             it.moisture.wetWeight ==null ||
             it.moisture.trayDryWeight ==null ||
             it.moisture.dryWeight ==null ||
             it.moisture.moisture ==null
           )
         }).map((it:any)=>{
            return {
               ...it ,
               moisture: {
                id: it.id ? it.id : null,
                orderCode: it.orderCode ? it.orderCode : '',
                processBy: it.processBy ? it.processBy : '',
                processDate: it.processDate ? it.processDate : null,
                trayWeight: it.trayWeight ? it.trayWeight : null,
                trayWetWeight: it.trayWetWeight ? it.trayWetWeight : null,
                wetWeight: it.wetWeight ? it.wetWeight : null,
                trayDryWeight: it.trayDryWeight ? it.trayDryWeight : null,
                dryWeight: it.dryWeight ? it.dryWeight : null,
                moisture: it.moisture ? it.moisture : null,
                remark: it.remark ? it.remark : '',
                note: '',
              },
            }
         })
        }
        if(!this.fullInfor && !this.emptyInfor){
            this.paginationResult = {
               ...this.paginationResult ,
               data : []
            };
            return;
        }

        this.paginationResult = {
          ...data,
          data: tmpData
        };
        this.freshWoodArr = data.data.map((item: any) => {
          if (item.moisture) {
            return item.moisture.wetWeight;
          }
          return '';
        });
        this.dryWoodArr = data.data.map((item: any) => {
          if (item.moisture) {
            return item.moisture.dryWeight;
          }
          return '';
        });
        this.avgHumidityArr = data.data.map((item: any) => {
          if (item.moisture) {
            return item.moisture.moisture;
          }
          return '';
        });

        this.router.navigate([], {
          replaceUrl: true,
          relativeTo: this.route,
          queryParams: this.filter,
        });
        if (this.filter.code !== '') {
          const detail = data?.data?.find((item: any) => item.code == this.filter.code);
          if (detail) {
            this.openDetail(detail?.code);
          }
        }
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  loadInit(first: boolean = false) {
    this.GetAllPartner();
    this.GetVehicle();
    this.GetArea();
    this.GetAllEvaluate();
    this.search(first);
  }

  reload() {
    this.filter = new HumidityFilter();
    this.search(true);
  }

  onChangePage(pageNumber: number) {
    this.filter.currentPage = pageNumber;
    this.search();
  }

  pageSizeChange(pageSize: number) {
    this.filter.currentPage = 1;
    this.filter.pageSize = pageSize;
    this.search();
  }

  ExportListExcel() {
    const filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      type: 'NHAP_HANG',
      PartnerCode: this.filter.PartnerCode,
      VehicleCode: this.filter.VehicleCode,
      AreaCode: this.filter.AreaCode,
      FromDate:
        this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : '',
      ToDate: this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : '',
    };
    return this._service.ExportListExcel(filterFormat).subscribe((result: Blob) => {
      const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      var anchor = document.createElement('a');
      anchor.download = 'quan-ly-do-am.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }
}
