import {Component} from '@angular/core';

import {ReportOrderScaleService} from 'src/app/services/Report/report-scale-weight.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {OrderScaleFilter} from 'src/app/@filter/SO/order-scale.filter';
import {Router, ActivatedRoute} from '@angular/router';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {STATE_ORDER, SCALE_TYPES, LIST_STATE} from 'src/app/utils/constant/order';
import {utils} from 'src/app/utils/utils';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';

import {MatDialog} from '@angular/material/dialog';
import * as moment from 'moment';
import {addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks} from 'date-fns';
import {BaseFilter} from 'src/app/@filter/Common/base.filter';
import {GlobalService} from 'src/app/services/Common/global.service';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-report-scale-weight-index',
  templateUrl: './report-scale-weight-index.component.html',
  styleUrls: ['./report-scale-weight-index.component.scss'],
})
export class ReportScaleWeightIndexComponent {
  rangePresets = {
    'Tuần trước': [startOfWeek(subWeeks(new Date(), 1)), endOfWeek(subWeeks(new Date(), 1))],
    'Hôm qua': [addDays(new Date(), -1), addDays(new Date(), -1)],
    'Hôm nay': [new Date(), new Date()],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
    'Tháng này': [startOfMonth(new Date()), endOfMonth(new Date())],
  };
  listPartnerAll: any = [];
  listItemAll: any = [];
  listAreaAll: any = [];
  listCompanyAll: any = [];
  faFileExcel = faFileExcel;
  listItemFilter: any = [];
  selectedStates: any = [];
  displayedColumns: string[] = [
    'index',
    'vehicleCode',
    'customerName',
    'itemName',
    'weight1',
    'weight2',
    'weight',
    'time',
    'timeWeight1',
    'time2',
    'timeWeight2',
  ];
  filterDateRange: Date[] = [moment().subtract(3, 'days').toDate(), moment().toDate()];

  listData: any = [];
  state_order = STATE_ORDER;
  list_state = LIST_STATE;

  filter = new OrderScaleFilter();

  vehicleAll: any[] = [];

  constructor(
    private _service: ReportOrderScaleService,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private utils: utils,
    private dialog: MatDialog,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Danh sách thống kê trọng lượng cân',
        path: 'sale-orders/orderscale',
      },
    ]);
    this.route.queryParams.subscribe((params: any) => {
      if (params?.States !== '') {
        this.selectedStates = this.list_state.filter((item: any) => {
          return params?.States?.includes(item.value);
        });
      }
    });
  }

  ngOnInit(): void {
    this.loadInit(true);
  }
  userTypeFilter: any;
  selectItemType(userType: {value: string; label: string}, event: any) {}
  ngOnDestroy() {
    this.globalService.setBreadcrumb([]);
  }

  GetAllItem() {
    this.dropdownService.GetAllItem().subscribe(
      ({data}) => {
        this.listItemAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  GetAllCompany() {
    this.dropdownService.GetAllCompany().subscribe(
      ({data}) => {
        this.listCompanyAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
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
  GetAllVehicle() {
    this.dropdownService.GetAllVehicle().subscribe(
      ({data}) => {
        this.vehicleAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  GetAllArea() {
    this.dropdownService.GetAllArea().subscribe(
      ({data}) => {
        this.listAreaAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  exportExcel() {
    const filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      FromDate:
        this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : '',
      ToDate: this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : '',
      PartnerCode: this.filter.PartnerCode,
      ItemCode: this.filter.ItemCode,
      VehicleCode: this.filter.VehicleCode,
      areaCode: this.filter.areaCode,
      companyCode: this.filter.companyCode,
    };
    return this._service.ExportExcel(filterFormat).subscribe((result: Blob) => {
      const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      var anchor = document.createElement('a');
      anchor.download = 'bao-cao-tram-can.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }

  search(first: boolean = false) {
    const filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      FromDate:
        this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : '',
      ToDate: this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : '',
      PartnerCode: this.filter.PartnerCode,
      ItemCode: this.filter.ItemCode,
      VehicleCode: this.filter.VehicleCode,
      areaCode: this.filter.areaCode,
      scaleTypeCode: this.userTypeFilter === 'BUY' || null,
      Type: this.filter.scaleTypeCode || null,
      companyCode: this.filter.companyCode,
    };
    this._service.search(filterFormat).subscribe({
      next: ({data}) => {
        console.log(data);
        this.listData = data;
        this.router.navigate([], {
          replaceUrl: true,
          relativeTo: this.route,
          queryParams: this.filter,
        });
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  loadInit(first: boolean = false) {
    this.GetAllCompany();
    this.GetAllPartner();
    this.GetAllVehicle();
    this.GetAllArea();
    this.GetAllItem();
    this.search(first);
  }

  reload() {
    this.selectedStates = [];
    this.filter = new OrderScaleFilter();
    this.search();
    this.userTypeFilter = '';
  }
}
