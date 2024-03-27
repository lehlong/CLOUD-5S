import {Component, Input} from '@angular/core';
import {ProductionManagerService} from 'src/app/services/Business/production-manager.service';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {ListPurchaseOrdersFilter} from 'src/app/@filter/Business/production-manager.filter';
import {Router, ActivatedRoute} from '@angular/router';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {
  STATE_LIST_PURCHASE_ORDERS,
  LIST_PURCHASE_ORDERS_STATE,
  PROCESS_TYPE,
  LIST_PROCESS_TYPE,
  PRODUCTION_MANAGER,
  STATE_SHIFT,
} from 'src/app/utils/constant/index';
import {utils} from 'src/app/utils/utils';
import {addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks} from 'date-fns';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import {manufactureUpdate} from 'src/app/models/Business/production-manager.model';
import {OrderDetailComponent} from 'src/app/@module/sale-orders/order/order-detail/order-detail.component';
import {DrawerService} from 'src/app/services/Common/drawer.service';

@Component({
  selector: 'app-list-purchase-orders',
  templateUrl: './list-purchase-orders.component.html',
  styleUrls: ['./list-purchase-orders.component.scss'],
})
export class ListPurchaseOrdersComponent {
  @Input() tab: number = 0;
  maxTagCount = 1;
  rangePresets = {
    'Tuần trước': [startOfWeek(subWeeks(new Date(), 1)), endOfWeek(subWeeks(new Date(), 1))],
    'Hôm qua': [addDays(new Date(), -1), addDays(new Date(), -1)],
    'Hôm nay': [new Date(), new Date()],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
    'Tháng này': [startOfMonth(new Date()), endOfMonth(new Date())],
  };
  submitted: boolean = false;

  STATE_LIST_PURCHASE_ORDERS = STATE_LIST_PURCHASE_ORDERS;
  LIST_PURCHASE_ORDERS_STATE = LIST_PURCHASE_ORDERS_STATE;
  LIST_PROCESS_TYPE = LIST_PROCESS_TYPE;
  PROCESS_TYPE = PROCESS_TYPE;
  PRODUCTION_MANAGER = PRODUCTION_MANAGER;
  STATE_SHIFT = STATE_SHIFT;

  listPartner: any = [];
  listVehicle: any = [];
  listArea: any = [];

  listPourSection: any = [];
  listPourLine: any = [];
  listWorkingShift: any = [];

  listMethod : any =  [
      {name :"Gắp thường" , code: "GAP_THUONG"},
      {name :"Gắp điện" , code: "GAP_DIEN"}
  ]

  displayedColumns: string[] = [
    'lock',
    'index',
    'code',
    'orderDate',
    'goodsIntakeShift',
    'vehicleCode',
    'partnerName',
    'itemName',
    'area',
    'orderNumber',
    'state',
    'choppingNumber',
    'amount',
  ];
  paginationResult!: PaginationResult;
  filter = new ListPurchaseOrdersFilter();

  constructor(
    private _service: ProductionManagerService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
    public utils: utils,
    private drawerService: DrawerService,
  ) {
    this.route.queryParams.subscribe((params: any) => {
      if (this.tab == 0) {
        this.filter = {
          ...this.filter,
          ...params,
        };
      }
    });
  }

  getTotalOrderNumber() {
    return this.utils.formatNumber(
      this.paginationResult.data.reduce((total: number, element: any) => {
        const totalOrderDetails = element?.orderDetails.reduce((totalChild: number, item: any) => {
          return totalChild + item?.orderNumber;
        }, 0);
        return total + totalOrderDetails;
      }, 0),
    );
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
      .subscribe((result) => {});
  }

  saveInfo() {
    this.submitted = true;
    this.paginationResult = {
      ...this.paginationResult,
      data: this.paginationResult.data.map((item: any) => {
        const totalamount = item.manufactures.reduce((result: number, element: any) => {
          if (!element?.amount || element?.amount === '') {
            return result;
          }
          return result + element?.amount;
        }, 0);
        const totalVolume = item.orderDetails.reduce((result: number, element: any) => {
          if (!element?.orderNumber || element?.orderNumber === '') {
            return result;
          }
          return result + element?.orderNumber;
        }, 0);
        const choppingNumber = item?.choppingNumber && item?.choppingNumber !== '' ? item?.choppingNumber : 0;
        return {
          ...item,
          empty:
            item?.state === STATE_LIST_PURCHASE_ORDERS['KHOI_TAO'].value ||
            item?.state === STATE_LIST_PURCHASE_ORDERS['CAN_LAN_1'].value ||
            item?.latchState === STATE_SHIFT['DA_CHOT'].value
              ? false
              : item?.manufactures?.every((manufacture: any) => !manufacture?.amount),
          volumeError: totalamount === 0 && choppingNumber === 0 ? false : totalamount + choppingNumber !== totalVolume,
        };
      }),
    };
        const checkValid = this.paginationResult.data.some((element: any) => {
      return (
        element?.volumeError ||
        element?.manufactures.some((item: any) => {
          return item?.amount && (!item?.pourSectionCode || !item?.pourLineCode);
        }) || (element?.choppingNumber > 0 && !element.pickUpMethod)  
      );
    });
    if (checkValid) {
    Swal.fire({
    showCloseButton: true,
    title: 'Chưa chọn khu, dãy hoặc tổng khối lượng sản xuất và hạ bãi khác khối lượng hàng',
    icon: 'warning',
    showConfirmButton: false,
    toast: true,
    position: 'top-right',
    allowOutsideClick: true,
    });
    return;
    }

    const parameters = this.paginationResult.data.reduce((result: any, element: manufactureUpdate) => {
      const totalamount = element.manufactures.reduce((result: number, item: any) => {
        return item?.amount ? result + item?.amount : result;
      }, 0);
      // if (totalamount === 0 && !element?.choppingNumber) {
      //   return result;
      // }
      let pours = element?.manufactures.reduce((result: any, item: any) => {
        return item?.amount
          ? [
              ...result,
              {
                pourSectionCode: item?.pourSectionCode,
                pourLineCode: item?.pourLineCode,
                amount: item?.amount,
                itemCode: item?.itemCode,
                areaCode: item?.areaCode,
                unitCode: item?.unitCode,
              },
            ]
          : result;
      }, []);
      return [
        ...result,
        {
          orderCode: element?.code,
          pours: pours?.length > 0 ? pours : null,
          choppingNumber: element?.choppingNumber || 0,
          pickUpMethod: element?.pickUpMethod || null 
        },
      ];
    }, []);
        this._service.saveData(parameters).subscribe(
      ({data}) => {
        this.loadInit();
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  ngOnInit(): void {
    this.loadInit();
  }

  GetAllPartner() {
    this.dropdownService
      .GetAllPartner({
        IsProvider: true,
      })
      .subscribe(
        ({data}) => {
          this.listPartner = data;
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }

  GetAllVehicle() {
    this.dropdownService.GetAllVehicle().subscribe(
      ({data}) => {
        this.listVehicle = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  GetAllArea() {
    this.dropdownService.GetAllArea().subscribe(
      ({data}) => {
        this.listArea = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
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

  GetAllPourSection() {
    this.dropdownService.GetAllPourSection().subscribe(
      ({data}) => {
        this.listPourSection = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  GetAllPourLine() {
    this.dropdownService.GetAllPourLine().subscribe(
      ({data}) => {
        this.listPourLine = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  reload() {
    this.filter = new ListPurchaseOrdersFilter();
    this.search();
  }

  changePourSection(value: string = '', orderCode: string = '', i: number = 0) {
    this.paginationResult = {
      ...this.paginationResult,
      data: this.paginationResult.data.map((element: any) => {
        if (orderCode === element?.code) {
          return {
            ...element,
            manufactures: element?.manufactures.map((item: any, index: number) => {
              if (i == index) {
                return {
                  ...item,
                  disablePourLineCode: !value || value == '',
                  pourSectionCode: value,
                  listPourLine:
                    !value || value == ''
                      ? this.listPourLine
                      : this.listPourLine.filter((pourLine: any) => pourLine?.sectionCode === value),
                  pourLineCode: null,
                };
              }
              return item;
            }),
          };
        }
        return element;
      }),
    };
  }

  addManufactures(orderCode: string = '') {
    this.paginationResult = {
      ...this.paginationResult,
      data: this.paginationResult.data.map((element: any) => {
        if (orderCode === element?.code) {
          return {
            ...element,
            manufactures: [
              ...element?.manufactures,
              {
                disablePourLineCode: true,
                pourSectionCode: null,
                pourLineCode: null,
                listPourLine: [],
                amount: null,
                itemCode: element?.orderDetails[0]?.itemCode,
                areaCode: element?.areaCode,
                unitCode: element?.orderDetails[0]?.unitCode,
              },
            ],
          };
        }
        return element;
      }),
    };
  }

  removeManufactures(orderCode: string = '', index: number = 0) {
    this.paginationResult = {
      ...this.paginationResult,
      data: this.paginationResult.data.map((element: any) => {
        if (orderCode === element?.code) {
          let temp = [...element?.manufactures];
          temp.splice(index, 1);
          return {
            ...element,
            manufactures: [...temp],
          };
        }
        return element;
      }),
    };
  }

  fillAllChoppingNumber(itemData:any) {
    const totalItem = itemData.orderDetails.reduce((total: number, element: any) => {
      return total + element.orderNumber;
    }, 0)
    this.paginationResult = {
      ...this.paginationResult,
      data: this.paginationResult.data.map((element: any) => {
        if (itemData.code === element?.code) {
          return {
            ...element,
            choppingNumber: totalItem,
          };
        }
        return element;
      }),
    };
  }

  fillAllManufactures(itemData:any, index:number) {
    const totalItem = itemData.orderDetails.reduce((total: number, element: any) => {
      return total + element.orderNumber;
    }, 0)
    this.paginationResult = {
      ...this.paginationResult,
      data: this.paginationResult.data.map((element: any) => {
        if (itemData.code === element?.code) {
          let temp = [...element?.manufactures];
          temp[index]["amount"] = totalItem;
          return {
            ...element,
            manufactures: [...temp],
          };
        }
        return element;
      }),
    };
  }

  search() {
    const filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      fromDate:
        this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : '',
      toDate: this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : '',
      workingShiftCode: this.filter.workingShiftCode,
      state: this.filter.state,
      vehicleCode: this.filter.vehicleCode,
      partnerCode: this.filter.partnerCode,
      type: this.filter.type,
    };
    if ('state' in filterFormat && filterFormat.state?.length == 0) {
      delete filterFormat.state;
    }
    this._service.getListPurchaseOrders(filterFormat).subscribe({
      next: ({data}) => {
        this.paginationResult = {
          ...data,
          data: data?.data?.map((element: any) => {
            return {
              ...element,
              empty:
                element?.state === STATE_LIST_PURCHASE_ORDERS['KHOI_TAO'].value ||
                element?.state === STATE_LIST_PURCHASE_ORDERS['CAN_LAN_1'].value ||
                element?.latchState === STATE_SHIFT['DA_CHOT'].value
                  ? false
                  : element?.manufactures?.every((manufacture: any) => !manufacture?.amount),
              hide:
                element?.state === STATE_LIST_PURCHASE_ORDERS['KHOI_TAO'].value ||
                element?.state === STATE_LIST_PURCHASE_ORDERS['CAN_LAN_1'].value,
              disable: element?.latchState === STATE_SHIFT['DA_CHOT'].value,
              choppingNumber:
                element?.state === STATE_LIST_PURCHASE_ORDERS['KHOI_TAO'].value ||
                element?.state === STATE_LIST_PURCHASE_ORDERS['CAN_LAN_1'].value
                  ? null
                  : element?.manufactures.find((item: any) => item?.processType == PROCESS_TYPE['SX_TT'].value)
                      ?.amount || null,
              pickUpMethod:
                element?.state === STATE_LIST_PURCHASE_ORDERS['KHOI_TAO'].value ||
                element?.state === STATE_LIST_PURCHASE_ORDERS['CAN_LAN_1'].value
                  ? null
                  : element?.manufactures.find((item: any) => item?.processType == PROCESS_TYPE['SX_TT'].value)
                      ?.pickUpMethod || null,
              volumeError: false,
              manufactures:
                element?.manufactures?.filter((item: any) => item.processType !== PROCESS_TYPE['SX_TT'].value)?.length >
                0
                  ? element?.manufactures?.reduce((result: any, item: any) => {
                      if (item?.processType == this.PROCESS_TYPE['SX_TT'].value) {
                        return result
                      }
                      let listPourLineItem = this.listPourLine;
                      if (
                        element?.state !== STATE_LIST_PURCHASE_ORDERS['KHOI_TAO'].value &&
                        element?.state !== STATE_LIST_PURCHASE_ORDERS['CAN_LAN_1'].value &&
                        element?.latchState !== STATE_SHIFT['DA_CHOT'].value &&
                        item?.pourSectionCode &&
                        item?.pourSectionCode !== ''
                      ) {
                        listPourLineItem = this.listPourLine.filter(
                          (pourLine: any) => pourLine.sectionCode == item?.pourSectionCode,
                        );
                      }
                      return [
                        ...result,
                        {
                          ...item,
                          disable: element?.latchState === STATE_SHIFT['DA_CHOT'].value,
                          disablePourLineCode: !item?.pourSectionCode || item?.pourSectionCode === '',
                          pourSectionCode:
                            element?.state === STATE_LIST_PURCHASE_ORDERS['KHOI_TAO'].value ||
                            element?.state === STATE_LIST_PURCHASE_ORDERS['CAN_LAN_1'].value ||
                            !item?.pourSectionCode ||
                            item?.pourSectionCode === ''
                              ? null
                              : item.pourSectionCode,
                          pourLineCode:
                            element?.state === STATE_LIST_PURCHASE_ORDERS['KHOI_TAO'].value ||
                            element?.state === STATE_LIST_PURCHASE_ORDERS['CAN_LAN_1'].value
                              ? null
                              : item.pourLineCode,
                          listPourLine: listPourLineItem,
                          amount:
                            element?.state === STATE_LIST_PURCHASE_ORDERS['KHOI_TAO'].value ||
                            element?.state === STATE_LIST_PURCHASE_ORDERS['CAN_LAN_1'].value
                              ? null
                              : item.amount,
                          itemCode: element?.orderDetails[0]?.itemCode,
                          areaCode: element?.areaCode,
                          unitCode: element?.orderDetails[0]?.unitCode,
                        },
                      ];
                    }, [])
                  : [
                      {
                        disable: element?.latchState === STATE_SHIFT['DA_CHOT'].value,
                        disablePourLineCode: true,
                        pourSectionCode: null,
                        pourLineCode: null,
                        listPourLine: [],
                        amount: null,
                        itemCode: element?.orderDetails[0]?.itemCode,
                        areaCode: element?.areaCode,
                        unitCode: element?.orderDetails[0]?.unitCode,
                      },
                    ],
            };
          }),
        };
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

  loadInit() {
    this.GetAllPartner();
    this.GetAllVehicle();
    this.GetAllArea();
    this.GetAllPourSection();
    this.GetAllPourLine();
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
