import {Component, HostListener} from '@angular/core';
import {OrderService} from 'src/app/services/SO/order.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {STATE_ORDER, ACTION_ORDER} from 'src/app/utils/constant/index';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';
import {OrderFilter} from 'src/app/@filter/SO/order.filter';
import {utils} from 'src/app/utils/utils';
@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.scss'],
})
export class DetailOrderComponent {
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthDeault = window.innerWidth <= 767 ? `${window.innerWidth}px` : `${window.innerWidth * 0.7}px`;
  }
  widthDeault: string = '0px';
  STATE_ORDER = STATE_ORDER;
  ACTION_ORDER = ACTION_ORDER;
  code: string = '';
  filter = new OrderFilter();
  showButton = {
    editMixer: false,
  };
  detailData: any = {};
  listMixerAll: any = [];
  mixerCode: string = '';

  constructor(
    private _service: OrderService,
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
    this.GetAllMixer();
    this.GetDetail();
  }

  GetAllMixer() {
    this.dropdownService.GetAllMixer().subscribe(
      ({data}) => {
        this.listMixerAll = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  GetDetail() {
    this._service
      .GetDetail({
        code: this.code,
      })
      .subscribe(
        ({data}) => {
          this.mixerCode = data?.mixer?.code || '';
          this.detailData = {
            ...data,
            orderProcesses: data.orderProcesses.map((element: any, index: number) => {
              return {
                ...element,
              };
            }),
          };
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }

  close() {
    this.filter = {
      ...this.filter,
      code: '',
    };
    this.router.navigate([], {replaceUrl: true, relativeTo: this.route, queryParams: this.filter});
    this.drawerService.close();
  }
}
