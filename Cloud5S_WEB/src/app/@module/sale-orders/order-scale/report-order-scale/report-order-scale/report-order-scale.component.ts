import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {utils} from 'src/app/utils/utils';
import {startOfWeek, endOfWeek, addDays, startOfDay, endOfDay, addHours} from 'date-fns';
import * as moment from 'moment';
import {GlobalService} from 'src/app/services/Common/global.service';
import {OrderScaleService} from 'src/app/services/SO/order-scale.service';

import {OrderScaleIndexFilter} from 'src/app/@filter/SO/order-scale-index.filter';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {ORDERSCALE_RIGHTS} from 'src/app/utils/constant';

export class apiReturn {
  viewListReportScaleByRegionDto!: any[];
  totalWegthAndPercent!: any[];
  totalAll!: string;
}

@Component({
  selector: 'app-report-order-scale',
  templateUrl: './report-order-scale.component.html',
  styleUrls: ['./report-order-scale.component.scss'],
})
export class ReportOrderScaleComponent {
  rangePresets = {
    '2 giờ sau': [new Date(), addHours(new Date(), 2)],
    'Hôm nay': [startOfDay(new Date()), endOfDay(new Date())],
    'Ngày mai': [startOfDay(addDays(new Date(), 1)), endOfDay(addDays(new Date(), 1))],
    '3 ngày sau': [new Date(), endOfDay(addDays(new Date(), 3))],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
  };

  listReportScaleByRegionDto: any = [];
  totalWegthAndPercent: any = [];
  totalAll: string = '';
  areaList: any = [];
  renderHeader1: any = [];
  renderHeader2: any = [];
  vehicleAll: any[] = [];
  listPartnerAll: any = [];
  listItemAll: any = [];
  listAreaAll: any = [];
  listCompanyAll: any = [];
  userTypeFilter: any;
  displayedColumns: string[] = [];
  displayedColumnsHeader: string[] = [];

  dataTable: any = [];
  filter = new OrderScaleIndexFilter();

  faFileExcel = faFileExcel;
  ORDERSCALE_RIGHTS = ORDERSCALE_RIGHTS;
  constructor(
    private _orderScaleService: OrderScaleService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
    public utils: utils,
    private globalService: GlobalService,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Báo cáo tổng hợp trọng lượng cân',
        path: 'sale-orders/report-orderscale',
      },
    ]);
    this.route.queryParams.subscribe((params: any) => {
      if (params.fromDate && params.toDate) {
        this.filter.selectedRange[0] = params.fromDate;
        this.filter.selectedRange[1] = params.toDate;
      }
    });
  }

  ngOnDestroy() {
    this.globalService.setBreadcrumb([]);
  }

  ngOnInit(): void {
    this.loadInit();
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
  changeSelectedRange($event: any) {
    this.filter.selectedRange = $event;
    this.GeReport();
  }
  exportExcel() {
    const filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: 2000,
      keyWord: this.filter.keyWord,
      FromDate:
        this.filter?.selectedRange?.length > 0
          ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD HH:mm:ss')
          : '',
      ToDate:
        this.filter?.selectedRange?.length > 1
          ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD HH:mm:ss')
          : '',
      PartnerCode: this.filter.PartnerCode,
      ItemCode: this.filter.ItemCode,
      VehicleCode: this.filter.VehicleCode,
      areaCode: this.filter.areaCode,
      companyCode: this.filter.companyCode,
    };
    return this._orderScaleService.ExportReportExcel(filterFormat).subscribe((result: Blob) => {
      const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      var anchor = document.createElement('a');
      anchor.download = 'Bao-cao-THTLC.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }
  GeReport() {
    setTimeout(() => {
      const filterFormat = {
        PartnerCode: this.filter.PartnerCode,
        ItemCode: this.filter.ItemCode,
        VehicleCode: this.filter.VehicleCode,
        areaCode: this.filter.areaCode,
        scaleTypeCode: this.userTypeFilter === 'BUY' || null,
        Type: this.filter.scaleTypeCode || null,
        companyCode: this.filter.companyCode,
        currentPage: this.filter.currentPage,
        pageSize: this.filter.pageSize,
        keyWord: this.filter.keyWord,
        FromDate:
          this.filter?.selectedRange?.length > 0
            ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD HH:mm:ss')
            : '',
        ToDate:
          this.filter?.selectedRange?.length > 1
            ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD HH:mm:ss')
            : '',
      };
      this._orderScaleService.GeReport(filterFormat).subscribe({
        next: ({data}) => {
          let result = data as unknown as apiReturn;
          this.listReportScaleByRegionDto = result?.viewListReportScaleByRegionDto;
          this.totalWegthAndPercent = result?.totalWegthAndPercent;
          this.totalAll = result?.totalAll;
          this.dataTable = [];
          this.areaList = [];
          this.renderHeader1 = [];
          this.renderHeader2 = [];
          this.displayedColumns = [];
          this.displayedColumnsHeader = [];
          // this.router.navigate([], {
          //   replaceUrl: true,
          //   relativeTo: this.route,
          //   queryParams: this.filter,
          // });
          this.customAreaList();
        },
        error: (response) => {
          console.log(response);
        },
      });
    }, 300);
  }

  loadInit() {
    this.GeReport();
    this.GetAllCompany();
    this.GetAllPartner();
    this.GetAllVehicle();
    this.GetAllArea();
  }

  customAreaList() {
    this.areaList = [...new Set(this.totalWegthAndPercent.map((item: any) => item.areaName))];
    const bobIndex = this.areaList.indexOf('Khu vực khác');
    if (bobIndex !== -1) {
      this.areaList.splice(bobIndex, 1);
      this.areaList.unshift('Khu vực khác');
    }
    this.getHeader1();
    this.getHeader2();
  }
  getHeader1() {
    this.renderHeader1 = [...this.areaList];
    this.renderHeader1.unshift('date');
    this.renderHeader1.push('totalWeight');
  }
  getHeader2() {
    this.areaList.forEach((item2: any) => {
      let data = [
        ...new Set(
          this.totalWegthAndPercent
            .filter((item: any) => {
              return item.areaName == item2;
            })
            .map((item: any) => item.itemName),
        ),
      ];
      data.forEach((item3: any) => {
        this.renderHeader2.push(item2 + '_' + item3);
      });
    });
    this.customDisplayColumns();
  }
  customDisplayColumns() {
    this.displayedColumns.push('date');
    this.renderHeader2.forEach((item: any) => {
      this.displayedColumnsHeader.push(item + '_klg');
      this.displayedColumnsHeader.push(item + '_tle');
      this.displayedColumns.push(item + '_klg');
      this.displayedColumns.push(item + '_tle');
    });
    this.displayedColumns.push('totalWeight');
    this.customDataTable();
  }

  customDataTable() {
    this.listReportScaleByRegionDto.forEach((item: any) => {
      const obj: {[key: string]: any} = {};
      for (const prop of this.displayedColumns) {
        obj[prop] = null;
      }
      this.displayedColumns.forEach((col: any) => {
        if (col == 'date') {
          obj[col] = item[col];
        } else if (col == 'totalWeight') {
          obj[col] = item[col].toLocaleString();
        } else {
          let splitCol = col.split('_');
          let areaName = splitCol[0];
          let itemName = splitCol[1];
          let klg_tle = splitCol[2];
          if (item['reportScaleByRegionDtos']) {
            let data = item['reportScaleByRegionDtos'].filter((report: any) => {
              return report.areaName == areaName && report.itemName == itemName;
            });
            if (data.length == 1) {
              if (klg_tle == 'klg') {
                // làm tròn nếu cần
                if (data[0].weight) {
                  const parsedNumber = parseFloat(data[0].weight);
                  const roundedNumber = isNaN(parsedNumber) ? data[0].weight : parsedNumber;
                  obj[col] = roundedNumber;
                } else {
                  obj[col] = null;
                }
              } else {
                if (data[0].percent) {
                  const parsedNumber = parseFloat(data[0].percent);
                  const roundedNumber = isNaN(parsedNumber) ? data[0].percent : parsedNumber.toFixed(2);
                  obj[col] = roundedNumber;
                } else {
                  obj[col] = null;
                }
              }
            }
          }
        }
      });
      this.dataTable.push(obj);
    });
  }
  checkHeader2(item2: string) {
    return item2.split('_')[1];
  }
  checkDisplayedColumn(item3: string) {
    if (item3.includes('klg')) {
      return 'Khối Lượng';
    }
    return 'Tỉ lệ %';
  }

  returnValueByRow(row: any, col: string) {
    if (col.includes('tle')) {
      return row[col] != null ? row[col] + ' %' : null;
    }
    return row[col] ? row[col].toLocaleString() : null;
  }

  getTotal(col: string) {
    if (col == 'totalWeight') {
      console.log(this.totalAll);
      return this.totalAll ? parseFloat(this.totalAll).toLocaleString() : null;
    } else {
      let splitCol = col.split('_');
      let areaName = splitCol[0];
      let itemName = splitCol[1];
      let klg_tle = splitCol[2];
      let data = this.totalWegthAndPercent.filter((total: any) => {
        return total.areaName == areaName && total.itemName == itemName;
      });
      let result = 0;
      data.forEach((d: any) => {
        if (klg_tle == 'klg') {
          result += parseFloat(d.totalWeight);
        } else {
          result += parseFloat(d.totalPercent);
        }
      });
      if (klg_tle == 'klg') {
        return result.toLocaleString();
      }
      return result.toFixed(2) + ' %';
    }
  }

  getListItemByAreaName(item2: string): any {
    return [
      ...new Set(
        this.totalWegthAndPercent
          .filter((item: any) => {
            return item.areaName == item2;
          })
          .map((item: any) => item.itemName),
      ),
    ];
  }

  reload() {
    this.filter = new OrderScaleIndexFilter();
    this.GeReport();
    this.userTypeFilter = '';
  }

  redirect() {
    this.router.navigate(['/sale-orders/orderscale'], {
      queryParams: {fromDate: this.filter.selectedRange[0], toDate: this.filter.selectedRange[1]},
    });
  }
}
