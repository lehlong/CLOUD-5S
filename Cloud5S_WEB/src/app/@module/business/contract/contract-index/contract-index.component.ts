import {Component} from '@angular/core';
import {ContractService} from 'src/app/services/Business/contract.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {ContractCreateComponent} from '../contract-create/contract-create.component';
import {ContractEditComponent} from '../contract-edit/contract-edit.component';
import {ContractDetailComponent} from '../contract-detail/contract-detail.component';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {ContractFilter} from 'src/app/@filter/Business/contract.filter';
import {ContractModel} from 'src/app/models/Business/contract.model';
import {Router, ActivatedRoute} from '@angular/router';
import {utils} from 'src/app/utils/utils';
import {STATE_CONTRACT, STATE_TYPE_CONTRACT} from 'src/app/utils/constant/index';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {CONTRACT_RIGHTS} from 'src/app/utils/constant/access-right';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks} from 'date-fns';
import * as moment from 'moment';
import {GlobalService} from 'src/app/services/Common/global.service';
@Component({
  selector: 'app-contract-index',
  templateUrl: './contract-index.component.html',
  styleUrls: ['./contract-index.component.scss'],
})
export class ContractIndexComponent {
  rangePresets = {
    'Tuần trước': [startOfWeek(subWeeks(new Date(), 1)), endOfWeek(subWeeks(new Date(), 1))],
    'Hôm qua': [addDays(new Date(), -1), addDays(new Date(), -1)],
    'Hôm nay': [new Date(), new Date()],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
    'Tháng này': [startOfMonth(new Date()), endOfMonth(new Date())],
  };
  displayedColumns: string[] = [
    'index',
    'code',
    'type',
    'partner',
    'commodity',
    'contractValue',
    'startDate',
    'endDate',
    'state',
  ];
  paginationResult!: PaginationResult;
  filter = new ContractFilter();
  STATE_CONTRACT = STATE_CONTRACT;
  STATE_TYPE_CONTRACT = STATE_TYPE_CONTRACT;
  faFileExcel = faFileExcel;
  CONTRACT_RIGHTS = CONTRACT_RIGHTS;

  listContractAll: any = [];
  listPartnerAll: any = [];

  constructor(
    private _service: ContractService,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
    public utils: utils,
    private globalService: GlobalService,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Quản lý hợp đồng',
        path: 'business/contract',
      },
    ]);
    this.route.queryParams.subscribe((params: any) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  ngOnDestroy() {
    this.globalService.setBreadcrumb([]);
  }

  ngOnInit(): void {
    this.loadInit(true);
  }

  GetAllContract() {
    this.listContractAll = [
      {
        name: 'Hợp đồng mua',
        value: 'MUA',
      },
      {
        name: 'Hợp đồng bán',
        value: 'BAN',
      },
    ];
    // this.dropdownService.GetAllStock().subscribe(
    //   ({data}) => {
    //     this.listContractAll = data;
    //   },
    //   (error) => {
    //     console.log('error: ', error);
    //   },
    // );
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
        PartnerCode: this.filter.PartnerCode,
        Type: this.filter.Type,
      })
      .subscribe((result: Blob) => {
        const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        const url = window.URL.createObjectURL(blob);
        var anchor = document.createElement('a');
        anchor.download = 'quan-ly-hop-dong.xlsx';
        anchor.href = url;
        anchor.click();
      });
  }

  openCreate() {
    this.drawerService.open(ContractCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(ContractIndexComponent)) {
        if (result?.create) {
          this.openDetail(result?.data?.code);
        }
        this.loadInit();
      }
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
      .open(ContractDetailComponent, {
        code: code,
      })
      .subscribe((result) => {
        if (result.openEdit) {
          this.openEdit(result.code);
        } else if (result?.status && this.utils.checkComponent(ContractIndexComponent)) {
          this.loadInit();
        }
      });
  }

  openEdit(code: string) {
    this.router.navigate([], {
      replaceUrl: true,
      relativeTo: this.route,
      queryParams: {
        ...this.filter,
        code: code,
      },
    });
    this.drawerService
      .open(ContractEditComponent, {
        code: code,
      })
      .subscribe((result) => {
        console.log('result', result);
        if (result.openDetail) {
          this.openDetail(result.code);
        } else if (result?.status && this.utils.checkComponent(ContractIndexComponent)) {
          this.loadInit();
        }
      });
  }

  search(first: boolean = false) {
    this._service
      .search({
        currentPage: this.filter.currentPage,
        pageSize: this.filter.pageSize,
        keyWord: this.filter.keyWord,
        FromDate:
          this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : '',
        ToDate:
          this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : '',
        PartnerCode: this.filter.PartnerCode,
        Type: this.filter.Type,
      })
      .subscribe({
        next: ({data}) => {
          this.paginationResult = {
            ...data,
            data: data.data.map((item: ContractModel) => {
              return {
                code: item.code,
                type: item.type,
                partnerName: item?.partner?.name,
                commodity: item.details,
                startDate: item.startDate,
                endDate: item.endDate,
                state: item.state,
              };
            }),
          };
          this.router.navigate([], {
            replaceUrl: true,
            relativeTo: this.route,
            queryParams: this.filter,
          });
          if (this.filter.code !== '') {
            const detail = data?.data?.find((item: ContractModel) => item.code == this.filter.code);
            if (detail && first) {
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
    this.GetAllContract();
    this.GetAllPartner();
    this.search(first);
  }

  reload() {
    this.filter = new ContractFilter();
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
