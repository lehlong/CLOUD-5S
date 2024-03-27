import {DrawerService} from 'src/app/services/Common/drawer.service';
import {Component} from '@angular/core';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {FeatureInOutFilter} from 'src/app/@filter/SO/feature-in-out.filter';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {CheckInOut} from 'src/app/models/MD/checkInOut.model';
import {FeatureInOutService} from 'src/app/services/SO/feature-in-out.service';
import {utils} from 'src/app/utils/utils';
import {InOutDetailComponent} from '../in-out-detail/in-out-detail.component';
import {CHECK_INOUT_RIGHTS} from 'src/app/utils/constant/access-right';
import {MatDialog} from '@angular/material/dialog';
import {InOutCameraComponent} from '../in-out-camera/in-out-camera.component';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks} from 'date-fns';
import {GlobalService} from 'src/app/services/Common/global.service';
import { OrderDetailComponent } from '../../order/order-detail/order-detail.component';
import {RefreshService} from 'src/app/services/Common/refresh.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-in-out-index',
  templateUrl: './in-out-index.component.html',
  styleUrls: ['./in-out-index.component.scss'],
})
export class InOutIndexComponent {
  rangePresets = {
    'Tuần trước': [startOfWeek(subWeeks(new Date(), 1)), endOfWeek(subWeeks(new Date(), 1))],
    'Hôm qua': [addDays(new Date(), -1), addDays(new Date(), -1)],
    'Hôm nay': [new Date(), new Date()],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
    'Tháng này': [startOfMonth(new Date()), endOfMonth(new Date())],
  };
  faFileExcel = faFileExcel;
  CHECK_INOUT_RIGHTS = CHECK_INOUT_RIGHTS;
  displayedColumns: string[] = ['STT', 'index', 'orderCode','license_plates', 'actions', 'date_time','rfid'];
  paginationResult!: PaginationResult;
  filter = new FeatureInOutFilter();
  constructor(
    private _service: FeatureInOutService,
    private drawerService: DrawerService,
    private utils: utils,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private refreshService:RefreshService
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'content.business.in_out.list.breadcrumb',
        path: 'sale-orders/in-out',
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

  ngAfterViewInit() {
    this.refreshService.hubReceive.subscribe((message: any) => {
      if(message) {
        this.search();
      }
    });
  }

  loadInit(first: boolean = false) {
    this.search(first);
  }

  search(first: boolean = false) {
    const filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      FromDate:
        this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : '',
      ToDate: this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : '',
      id: this.filter?.id,
    };
    this._service.search(filterFormat).subscribe({
      next: ({data}) => {
        this.paginationResult = data;
        this.router.navigate([], {
          replaceUrl: true,
          relativeTo: this.route,
          queryParams: this.filter,
        });
        if (this.filter.id !== '') {
          const detail = data?.data?.find((item: any) => item.id == this.filter.id);
          if (detail && first) {
            this.openEdit(detail);
          }
        }
      },
      error: (response) => {
        console.log(response);
      },
    });
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
          this.openEdit(result.item);
        } else if (result?.status && this.utils.checkComponent(InOutIndexComponent)) {
          this.loadInit();
        }
      });
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

  reload() {
    this.filter = new FeatureInOutFilter();
    this.search();
  }

  openEdit(item: CheckInOut) {
    
    this.router.navigate([], {
      replaceUrl: true,
      relativeTo: this.route,
      queryParams: {
        ...this.filter,
        id: item.id,
      },
    });

    this.drawerService
      .open(InOutDetailComponent, {
        itemDetail: item,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(InOutIndexComponent)) {
          this.loadInit();
        }
      });
  }

  exportExcel() {
    const filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      FromDate:
        this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : '',
      ToDate: this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : '',
      id: this.filter?.id,
    };
    return this._service.exportExcel(filterFormat).subscribe((result: Blob) => {
      const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      var anchor = document.createElement('a');
      anchor.download = 'Lich-su-vao-ra.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }

  showCamera() {
    const dialogRef = this.dialog.open(InOutCameraComponent);
  }

  showAlbum() {
    this.router.navigate(['/sale-orders/in-out/album']);
  }
}
