import {Component, HostListener, Input} from '@angular/core';
import {NotifyService} from 'src/app/services/Business/notify.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {AccountGroupService} from 'src/app/services/AD/account-group.service';
import {STATE_ORDER, ACTION_ORDER, ORDER_RIGHTS} from 'src/app/utils/constant/index';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {NotifyFilter} from 'src/app/@filter/Business/notify.filter';
import {utils} from 'src/app/utils/utils';
import {of, forkJoin} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {NotifyModel} from '../../../../models/Business/notify.model';
@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.scss'],
})
export class NotificationDetailsComponent {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
  }
  widthDeault: string = '0px';
  filter = new NotifyFilter();
  @Input() id: string = '';
  allDataDetail: NotifyModel = {
    contents: '',
  };
  constructor(
    private _service: NotifyService,
    private _accountGroupService: AccountGroupService,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    private utils: utils,
    private route: ActivatedRoute,
  ) {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  ngOnInit(): void {
    this.loadInit();
  }

  loadInit() {
    this.GetDetail();
  }

  GetDetail() {
    this._service.GetDetail(this.id).subscribe(
      ({data}) => {
        const detailObservables = data.details.map((detail: any) => {
          return this.GetDetailAccount(detail.account.groupId);
        });

        forkJoin(detailObservables).subscribe((detailResults: any) => {
          this.allDataDetail = {
            ...data,
            data2: detailResults.map((result: any) => result.data.name),
          };
          console.log('this.allDataDetail', this.allDataDetail);
        });
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
  GetDetailAccount(id: string) {
    return this._accountGroupService.GetDetail(id);
  }

  close() {
    this.filter = {
      ...this.filter,
      id: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
  }
}
