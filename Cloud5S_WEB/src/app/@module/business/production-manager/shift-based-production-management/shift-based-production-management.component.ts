import {Component, Input} from '@angular/core';
import {ProductionManagerService} from 'src/app/services/Business/production-manager.service';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {ShiftBasedProductionManaementFilter} from 'src/app/@filter/Business/production-manager.filter';
import {Router, ActivatedRoute} from '@angular/router';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {utils} from 'src/app/utils/utils';
import {addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks} from 'date-fns';
import * as moment from 'moment';
import {GlobalService} from 'src/app/services/Common/global.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {PRODUCTION_MANAGER, STATE_SHIFT} from 'src/app/utils/constant/index';
import Swal from 'sweetalert2';
import {EnterProductionInformationComponent} from 'src/app/@module/business/production-manager/shift-based-production-management/enter-production-information/enter-production-information.component';

@Component({
  selector: 'app-shift-based-production-management',
  templateUrl: './shift-based-production-management.component.html',
  styleUrls: ['./shift-based-production-management.component.scss'],
})
export class ShiftBasedProductionManagementComponent {
  @Input() tab: number = 1;
  maxTagCount = 1;
  rangePresets = {
    'Tuần trước': [startOfWeek(subWeeks(new Date(), 1)), endOfWeek(subWeeks(new Date(), 1))],
    'Hôm qua': [addDays(new Date(), -1), addDays(new Date(), -1)],
    'Hôm nay': [new Date(), new Date()],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
    'Tháng này': [startOfMonth(new Date()), endOfMonth(new Date())],
  };
  submitted: boolean = false;
  listWorkingShift: any = [];

  displayedColumns: string[] = [
    'detail',
    'index',
    'processDate',
    'workingShift',
    'itemName',
    'orderNumber',
    'pourNumber',
    'note',
    'latchState',
  ];
  paginationResult!: PaginationResult;
  filter = new ShiftBasedProductionManaementFilter();
  PRODUCTION_MANAGER = PRODUCTION_MANAGER;
  STATE_SHIFT = STATE_SHIFT;

  constructor(
    private _service: ProductionManagerService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
    public utils: utils,
    private globalService: GlobalService,
    private drawerService: DrawerService,
  ) {
    this.route.queryParams.subscribe((params: any) => {
      if(this.tab == 1) {
        this.filter = {
          ...this.filter,
          ...params,
        };
      }
    });
  }

  ngOnInit(): void {
    this.loadInit();
  }

  GetAllWorkingShift() {
    this.dropdownService.GetAllWorkingShift().subscribe(
      ({data}) => {
        this.listWorkingShift = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  enterProductionInfo(processDate: string | null = null, workingShiftCode: string | null = null) {
    this.drawerService
      .open(EnterProductionInformationComponent, {
        processDate: processDate,
        workingShiftCode: workingShiftCode,
      })
      .subscribe((result) => {
        if(result == "close") {
          this.loadInit();
        }
      });
  }

  getTotalOrderNumber() {
    return this.utils.formatNumber(
      this.paginationResult.data.reduce((total: number, element: any) => {
        return total + element?.orderNumber;
      }, 0),
    );
  }

  getTotalPourNumber() {
    return this.utils.formatNumber(
      this.paginationResult.data.reduce((total: number, element: any) => {
        return total + element?.pourNumber;
      }, 0),
    );
  }

  getTotalOrderQuantity() {
    return this.utils.formatNumber(
      this.paginationResult.data.reduce((total: number, element: any) => {
        return total + element?.orderQuantity;
      }, 0),
    );
  }

  search() {
    if (this.filter?.selectedRange?.length == 0) {
      Swal.fire({
        showCloseButton: true,
        title: 'Vui lòng chọn khoảng thời gian',
        icon: 'warning',
        showConfirmButton: false,
        toast: true,
        position: 'top-right',
        allowOutsideClick: true,
      });
      return;
    }
    let filterFormat: any = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      workingShiftCode: this.filter.workingShiftCode,
      fromDate: moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD'),
      toDate: moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD'),
    };
    this._service.getListShiftBasedProductionManagement(filterFormat).subscribe({
      next: ({data}) => {
        console.log(this.tab);
        this.paginationResult = data;
        this.router.navigate([], {
          replaceUrl: true,
          relativeTo: this.route,
          queryParams: {
            ...this.filter,
            tab: this.tab
          },
        });
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  reload() {
    this.filter = new ShiftBasedProductionManaementFilter();
    this.search();
  }

  loadInit() {
    this.GetAllWorkingShift();
    this.search();
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
}
