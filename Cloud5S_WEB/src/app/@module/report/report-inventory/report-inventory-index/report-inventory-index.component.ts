import {Component, HostListener} from '@angular/core';
import {ReportInventoryService} from 'src/app/services/Report/report-inventory.service';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {ReportInventoryFilter} from 'src/app/@filter/Report/report-inventory.filter';
import {Router, ActivatedRoute} from '@angular/router';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {STATE_ORDER, LIST_STATE} from 'src/app/utils/constant/index';
import {utils} from 'src/app/utils/utils';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import * as moment from 'moment';

import {GlobalService} from 'src/app/services/Common/global.service';
@Component({
  selector: 'app-report-inventory-index',
  templateUrl: './report-inventory-index.component.html',
  styleUrls: ['./report-inventory-index.component.scss'],
})
export class ReportInventoryIndexComponent {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthColums = this.globalService.toggleSidebar ? window.innerWidth - 290 - 810 : window.innerWidth - 40 - 810;
  }
  listCreatebyAll: any = [];
  listItemAll: any = [];
  faFileExcel = faFileExcel;
  listStockAll: any = [];
  listPourLineAll: any = [];
  listItemTypeAll: any = [];
  listCompanyAll: any = [];
  listData: any = [];
  listAreaAll: any = [];
  listPourSectionAll: any = [];
  selectedStates: any = [];
  filter = new ReportInventoryFilter();
  state_order = STATE_ORDER;
  list_state = LIST_STATE;
  widthColums: number = 0;

  listPourSection: any = [];
  listPourLine: any = [];
  dataTableMove: any = [];
  submitted: boolean = false;

  constructor(
    private _service: ReportInventoryService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private utils: utils,
  ) {
    this.widthColums = this.globalService.toggleSidebar ? window.innerWidth - 290 - 810 : window.innerWidth - 40 - 810;
    this.globalService.toggleSidebarSubject.subscribe((value) => {
      value ? window.innerWidth - 290 - 810 : window.innerWidth - 40 - 810;
    });
    this.globalService.setBreadcrumb([
      {
        name: 'Báo cáo tồn kho',
        path: 'report/report-inventory',
      },
    ]);
    this.route.queryParams.subscribe((params: any) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  ngOnInit(): void {
    this.loadInit(true);
  }
  ngOnDestroy() {
    this.globalService.setBreadcrumb([]);
  }

  GetAllStock() {
    this.dropdownService.GetAllStock().subscribe(
      ({data}) => {
        this.listStockAll = data;
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
  GetAllPourSection() {
    this.dropdownService.GetAllPourSection().subscribe(
      ({data}) => {
        this.listPourSectionAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
  GetAllPourLine() {
    this.dropdownService.GetAllPourLine().subscribe(
      ({data}) => {
        this.listPourLineAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
  GetAllCreateby() {
    this.dropdownService.GetAllCreateby().subscribe(
      ({data}) => {
        this.listCreatebyAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
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

  exportExcel() {
    const filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      ItemCode: this.filter.ItemCode,
      PourLineCode: this.filter.PourLineCode,
      PourSectionCode: this.filter.PourSectionCode,
      StockCode: this.filter.StockCode,
      AreaCode: this.filter.AreaCode,
      CompanyCode: this.filter.CompanyCode,
    };
    return this._service.ExportExcel(filterFormat).subscribe((result: Blob) => {
      const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      var anchor = document.createElement('a');
      anchor.download = 'danh-sach-bao-cao-ton-kho.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }

  search(first: boolean = false) {
    const filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      ItemCode: this.filter.ItemCode,
      CompanyCode: this.filter.CompanyCode,
      AreaCode: this.filter.AreaCode,
      StockCode: this.filter.StockCode,
      PourLineCode: this.filter.PourLineCode,
      PourSectionCode: this.filter.PourSectionCode,
    };
    this._service.search(filterFormat).subscribe({
      next: ({data}) => {
        const result: any[] = [];
        data.forEach((item: any) => {
          const pourSectionCode = item.pourSectionCode;
          const pourLineCode = item.pourLineCode;
          let pourSection = result.find((section: any) => section.pourSectionCode === pourSectionCode);

          if (!pourSection) {
            pourSection = {
              pourSectionCode,
              pourSectionName: item.pourSection.name,
              pourLines: [],
            };
            result.push(pourSection);
          }

          let pourLine = pourSection.pourLines.find((line: any) => line.pourLineCode === pourLineCode);
          if (!pourLine) {
            pourLine = {
              pourLineCode,
              pourLineName: item.pourLine.name,
              items: [],
            };
            pourSection.pourLines.push(pourLine);
          }

          pourLine.items.push({
            itemCode: item.itemCode,
            itemName: item.item.name,
            areaCode: item.areaCode,
            areaName: item.area.name,
            amount: item.amount,
            unitCode: item.unitCode,
            unitName: item.unit.name,
            companyName: item.company.name,
          });
        });

        this.listData = result?.map((pour: any) => {
          const pourLines = pour.pourLines
            .map((pourLine: any) => {
              return {
                ...pourLine,
                totalAmount: pourLine?.items?.reduce((total: number, item: any) => {
                  return total + item?.amount;
                }, 0),
                expand: true,
              };
            })
            .sort((a: any, b: any) => {
              const numA = parseInt(a.pourLineName.split(' ')[1]);
              const numB = parseInt(b.pourLineName.split(' ')[1]);
              console.log(numA, numB);
              // Kiểm tra xem có phải là số không
              const isNumberA = !isNaN(numA);
              const isNumberB = !isNaN(numB);

              // Nếu cả hai là số, sử dụng số để so sánh
              if (isNumberA && isNumberB) {
                return numA - numB;
              } else {
                return a.pourLineName.localeCompare(b.pourLineName);
              }
            });
          return {
            ...pour,
            expand: true,
            pourLines: pourLines,
            totalAmount: pourLines.reduce((total: number, item: any) => {
              return total + item?.totalAmount;
            }, 0),
          };
        });
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
    this.GetAllCreateby();
    this.GetAllItem();
    this.GetAllStock();
    this.GetAllPourLine();
    this.GetAllPourSection();
    this.GetAllArea();
    this.GetAllCompany();
    this.search(first);
  }

  reload() {
    this.selectedStates = [];

    this.filter = new ReportInventoryFilter();
    this.search(true);
  }

  onChangePage(pageNumber: number) {
    this.filter.currentPage = pageNumber;
    this.search();
  }

  changePourSection($event: any) {
    this.listPourLine =
      $event == null
        ? this.listPourSectionAll
        : this.listPourLineAll.filter((item: any) => {
            return item.pourSection.code == $event;
          });
  }
}
