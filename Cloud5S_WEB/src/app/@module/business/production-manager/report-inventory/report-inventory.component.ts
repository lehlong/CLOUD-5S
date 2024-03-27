import {Component, HostListener, Input} from '@angular/core';
import {ReportInventoryService} from 'src/app/services/Report/report-inventory.service';
import {ReportInventoryFilter} from 'src/app/@filter/Report/report-inventory.filter';
import {Router, ActivatedRoute} from '@angular/router';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {STATE_ORDER, LIST_STATE} from 'src/app/utils/constant/index';
import {utils} from 'src/app/utils/utils';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {ChangeSectionLineComponent} from './change-section-line/change-section-line.component';
import {GlobalService} from 'src/app/services/Common/global.service';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-report-inventory',
  templateUrl: './report-inventory.component.html',
  styleUrls: ['./report-inventory.component.scss'],
})
export class ReportInventoryComponent {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthColums = this.globalService.toggleSidebar ? window.innerWidth - 1230 : window.innerWidth - 980;
    this.widthDeault = window.innerWidth <= 1000 ? window.innerWidth : 1000;
  }
  listCreatebyAll: any = [];
  @Input() tab: number = 2;
  listItemAll: any = [];
  faFileExcel = faFileExcel;
  listStockAll: any = [];
  listPourLineAll: any = [];
  listPourLine: any = [];
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
  widthDeault: number = 0;
  dataTable: any = [];

  constructor(
    private _service: ReportInventoryService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private globalService: GlobalService,
    public utils: utils,
  ) {
    this.widthColums = this.globalService.toggleSidebar ? window.innerWidth - 1250 : window.innerWidth - 990;
    this.widthDeault = window.innerWidth <= 1000 ? window.innerWidth : 1000;
    this.globalService.toggleSidebarSubject.subscribe((value) => {
      this.widthDeault =
        window.innerWidth <= 767 ? window.innerWidth : value ? window.innerWidth - 250 : window.innerWidth;
      this.widthColums = this.widthDeault - 830 < 71 ? 71 : this.widthDeault - 830;
    });
    this.globalService.setBreadcrumb([
      {
        name: 'Báo cáo tồn kho',
        path: 'report/report-inventory',
      },
    ]);
    this.route.queryParams.subscribe((params: any) => {
      if (this.tab == 2) {
        this.filter = {
          ...this.filter,
          ...params,
        };
      }
    });
  }

  openMoveRows(data: any) {
    const dialogRef = this.dialog.open(ChangeSectionLineComponent, {
      position: {
        top: '150px',
      },
      width: `${this.widthDeault}px`,
    });
    dialogRef.componentInstance.data = [data];
    dialogRef.afterClosed().subscribe((response: any) => {
      if (response) {
        this.loadInit();
      }
    });
  }

  ngOnInit(): void {
    this.loadInit();
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
        this.listPourLine = this.listPourLineAll;
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

  searchold() {
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

          if (item.amount) {
            pourLine.items.push({
              pourSectionCode: pourSectionCode,
              pourLineCode: pourLineCode,
              pourSectionName: item.pourSection?.name,
              pourLineName: item.pourLine?.name,
              itemCode: item.itemCode,
              itemName: item.item?.name,
              areaCode: item.areaCode,
              areaName: item.area?.name,
              amount: item.amount,
              unitCode: item.unitCode,
              unitName: item.unit.name,
              companyName: item?.company?.name,
              companyCode: item?.company?.code,
            });
          }
        });

        (this.listData = result?.map((pour: any) => {
          const pourLines = pour.pourLines
            .map((pourLine: any) => {
              return {
                ...pourLine,
                totalAmount: pourLine?.items?.reduce((total: number, item: any) => {
                  return total + item?.amount;
                }, 0),
                expand: false,
              };
            })
            .sort((a: any, b: any) => {
              const numA = parseInt(a.pourLineName.split(' ')[1]);
              const numB = parseInt(b.pourLineName.split(' ')[1]);

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
        })),
          this.router.navigate([], {
            replaceUrl: true,
            relativeTo: this.route,
            queryParams: {
              ...this.filter,
              tab: this.tab,
            },
          });
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  search(edit: boolean = false) {
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
        this.dataTable = {
          ...data,
          pours: data?.reduce((response: any, pour: any) => {
            const pourLinesResult = pour?.pourLines.reduce((result: any, pourLine: any) => {
              const items = pourLine?.items;
              return items?.length > 0
                ? [
                    ...result,
                    {
                      ...pourLine,
                      totalAmount: items.reduce((total: number, item: any) => {
                        return total + item?.amount;
                      }, 0),
                      expand: false,
                      items: items,
                    },
                  ]
                : result;
            }, []);
            return pourLinesResult?.length > 0
              ? [
                  ...response,
                  {
                    ...pour,
                    expand: true,
                    pourLines: pourLinesResult,
                    totalAmount: pourLinesResult.reduce((total: number, item: any) => {
                      return total + item?.totalAmount;
                    }, 0),
                  },
                ]
              : response;
          }, []),
        };
        console.log('this.dataTable', this.dataTable);
        console.log('this.data', data);
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  SumValueNumber(arr: any[], key: string) {
    if (arr != null) {
      var sum = arr.reduce(function (sum, item) {
        return sum + item[key];
      }, 0);

      return sum;
    }
    return 0;
  }
  loadInit() {
    this.GetAllCreateby();
    this.GetAllItem();
    this.GetAllStock();
    this.GetAllPourLine();
    this.GetAllPourSection();
    this.GetAllArea();
    this.GetAllCompany();
    this.search();
  }

  reload() {
    this.selectedStates = [];
    this.filter = new ReportInventoryFilter();
    this.search();
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
