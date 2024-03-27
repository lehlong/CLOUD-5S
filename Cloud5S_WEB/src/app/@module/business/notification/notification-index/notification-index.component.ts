import {Component} from '@angular/core';
import {NotifyService} from 'src/app/services/Business/notify.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {NotificationCreateComponent} from '../notification-create/notification-create.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {NotifyFilter} from 'src/app/@filter/Business/notify.filter';
import {NotificationModel} from 'src/app/models/Business/notify.model';
import {NotifyModel} from 'src/app/models/Business/notify.model';
import {Router, ActivatedRoute} from '@angular/router';
import {utils} from 'src/app/utils/utils';
import {STATE_STOCK} from 'src/app/utils/constant/index';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {NotificationDetailsComponent} from '../notification-details/notification-details.component';
import {NOTIFY_RIGHTS} from 'src/app/utils/constant/access-right';
import {addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks} from 'date-fns';
import * as moment from 'moment';
import {GlobalService} from 'src/app/services/Common/global.service';
@Component({
  selector: 'app-notification-index',
  templateUrl: './notification-index.component.html',
  styleUrls: ['./notification-index.component.scss'],
})
export class NotificationIndexComponent {
  rangePresets = {
    'Tuần trước': [startOfWeek(subWeeks(new Date(), 1)), endOfWeek(subWeeks(new Date(), 1))],
    'Hôm qua': [addDays(new Date(), -1), addDays(new Date(), -1)],
    'Hôm nay': [new Date(), new Date()],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
    'Tháng này': [startOfMonth(new Date()), endOfMonth(new Date())],
  };
  displayedColumns: string[] = ['index', 'code', 'dateNotify', 'title', 'sendTo', 'state'];
  paginationResult!: PaginationResult;
  filter = new NotifyFilter();
  STATE_STOCK = STATE_STOCK;
  faFileExcel = faFileExcel;
  NOTIFY_RIGHTS = NOTIFY_RIGHTS;

  constructor(
    private _service: NotifyService,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
    private utils: utils,
    private globalService: GlobalService,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Quản lý thông báo',
        path: 'business/notification',
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

  exportExcel() {
    return this._service
      .ExportExcel({
        currentPage: this.filter.currentPage,
        pageSize: this.filter.pageSize,
        keyWord: this.filter.keyWord,
        FromDate:
          this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : '',
        ToDate:
          this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : '',
        id: this.filter.id,
      })
      .subscribe((result: Blob) => {
        const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        const url = window.URL.createObjectURL(blob);
        var anchor = document.createElement('a');
        anchor.download = 'phieu-nhap-kho.xlsx';
        anchor.href = url;
        anchor.click();
      });
  }

  openCreate() {
    this.drawerService.open(NotificationCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(NotificationIndexComponent)) {
        this.loadInit();
      }
    });
  }

  openDetail(id: string = '') {
    this.router.navigate([], {
      replaceUrl: true,
      relativeTo: this.route,
      queryParams: {
        ...this.filter,
        id: id,
      },
    });
    this.drawerService
      .open(NotificationDetailsComponent, {
        id: id,
      })
      .subscribe((result) => {
        if (result?.status && this.utils.checkComponent(NotificationIndexComponent)) {
          this.loadInit();
        }
      });
  }
  search(first: boolean = false) {
    this._service
      .search(
        {
          currentPage: this.filter.currentPage,
          pageSize: this.filter.pageSize,
          keyWord: this.filter.keyWord,
          FromDate:
            this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : '',
          ToDate:
            this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : '',
          id: this.filter.id,
        }
      )
      .subscribe({
        next: ({data}) => {
          this.paginationResult = {
            ...data,
            data: data.data.map((item: NotifyModel) => {
              return {
                id: item.id,
                createDate: item?.createDate,
                subtitle: item?.subtitle,
                receiverName: item?.details?.map((detail: any) => detail?.receiverName || ''),
                seen: item?.seen,
                notSeen: item?.notSeen,
              };
            }),
          };
          this.router.navigate([], {
            replaceUrl: true,
            relativeTo: this.route,
            queryParams: this.filter,
          });
          if (this.filter.id !== '') {
            const detail = data?.data?.find((item: NotificationModel) => item.id == this.filter.id);
            if (detail && first) {
              this.openDetail(detail?.id);
            }
          }
        },
        error: (response) => {
          console.log(response);
        },
      });
  }

  loadInit(first: boolean = false) {
    this.search(first);
  }

  reload() {
    this.filter = new NotifyFilter();
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
}
