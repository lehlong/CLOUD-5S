import {Component, HostListener, Input} from '@angular/core';
import {ProductionManagerService} from 'src/app/services/Business/production-manager.service';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {Router, ActivatedRoute} from '@angular/router';
import {EnterProductionInfomationFilter} from 'src/app/@filter/Business/production-manager.filter';
import {utils} from 'src/app/utils/utils';
import {TranslateService} from '@ngx-translate/core';
import * as moment from 'moment';
import {PROCESS_TYPE, STATE_LIST_PURCHASE_ORDERS, PRODUCTION_MANAGER, STATE_SHIFT} from 'src/app/utils/constant/index';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {GlobalService} from 'src/app/services/Common/global.service';
import {DebounceService} from 'src/app/services/Common/debounce.service';

@Component({
  selector: 'app-enter-production-information',
  templateUrl: './enter-production-information.component.html',
  styleUrls: ['./enter-production-information.component.scss'],
})
export class EnterProductionInformationComponent {
  @Input() isPlan: boolean = false;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthDeault =
      window.innerWidth <= 767
        ? window.innerWidth
        : this.globalService.toggleSidebar
        ? window.innerWidth - 250
        : window.innerWidth;
    this.widthColums = this.widthDeault - 830 < 71 ? 71 : this.widthDeault - 830;
  }
  widthDeault: number = 0;
  widthColums: number = 0;
  PROCESS_TYPE = PROCESS_TYPE;
  STATE_LIST_PURCHASE_ORDERS = STATE_LIST_PURCHASE_ORDERS;
  STATE_SHIFT = STATE_SHIFT;
  PRODUCTION_MANAGER = PRODUCTION_MANAGER;
  processDate: string | null = null;
  workingShiftCode: string | null = null;
  dataTable: any = [];
  filter = new EnterProductionInfomationFilter();
  listWorkingShift: any = [];
  submitted: boolean = false;
  submittedConfirm: boolean = false;
  listPourLineSection: any = [];
  edit: boolean = false;
  showButton: any = {
    cancel: false,
    confirm: false,
    edit: false,
  };

  showErr: boolean = false;
  listAllChipper: any = [];
  canUpdate: boolean = false;
  constructor(
    private _service: ProductionManagerService,
    private translate: TranslateService,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    public utils: utils,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private debounceService: DebounceService,
    private globalService: GlobalService,
  ) {
    this.widthDeault =
      window.innerWidth <= 767
        ? window.innerWidth
        : this.globalService.toggleSidebar
        ? window.innerWidth - 250
        : window.innerWidth;
    this.widthColums = this.widthDeault - 830 < 71 ? 71 : this.widthDeault - 830;
    this.globalService.toggleSidebarSubject.subscribe((value) => {
      this.widthDeault =
        window.innerWidth <= 767 ? window.innerWidth : value ? window.innerWidth - 250 : window.innerWidth;
      this.widthColums = this.widthDeault - 830 < 71 ? 71 : this.widthDeault - 830;
    });
  }

  changeAmount(item: any = null) {
    console.log('changeAmount');
    this.debounceService.debounce(
      'totalAmount',
      () => {
        for (let i = 0; i < this.dataTable.pours.length; i++) {
          const pour = this.dataTable.pours[i];

          const pourLinesResult = pour?.pourLines.reduce((result: any, pourLine: any) => {
            return pourLine?.items?.length > 0
              ? [
                  ...result,
                  {
                    ...pourLine,
                    totalPrevAmount: pourLine?.items?.reduce((total: number, item: any) => {
                      return total + item?.prevAmount;
                    }, 0),
                    totalAmount: pourLine?.items?.reduce((total: number, item: any) => {
                      return total + item?.amount;
                    }, 0),
                  },
                ]
              : result;
          }, []);

          for (let j = 0; j < pour?.pourLines.length; j++) {
            const pourLine = pour?.pourLines[j];
            this.dataTable.pours[i].pourLines[j].totalPrevAmount = pourLine?.items?.reduce(
              (total: number, item: any) => {
                return total + item?.prevAmount;
              },
              0,
            );
            this.dataTable.pours[i].pourLines[j].totalAmount = pourLine?.items?.reduce((total: number, item: any) => {
              return total + item?.amount;
            }, 0);
          }

          this.dataTable.pours[i].totalPrevAmount = pourLinesResult.reduce((total: number, item: any) => {
            return total + item?.totalPrevAmount;
          }, 0);
          this.dataTable.pours[i].totalAmount = pourLinesResult.reduce((total: number, item: any) => {
            return total + item?.totalAmount;
          }, 0);
        }
        if (item) {
          this.changeToTalAmountItem(item);
        }
      },
      200,
    );
  }

  //fixnew
  processArray(arr: any, pourSectionCode: any, pourLineCode: any, toTalNumber: any, item: any) {
    if (item.pourSectionCode === pourSectionCode && item.pourLineCode === pourLineCode) {
      const filteredArray = arr.filter(
        (item: any) => item.pourSectionCode === pourSectionCode && item.pourLineCode === pourLineCode,
      );
      filteredArray.sort((a: any, b: any) => a.prevAmount - b.prevAmount);

      let remainingTotal = toTalNumber;
      for (let i = 0; i < filteredArray.length; i++) {
        const currentItem = filteredArray[i];
        if (currentItem.prevAmount <= remainingTotal) {
          currentItem.tmpAmount = currentItem.prevAmount;
          remainingTotal -= currentItem.prevAmount;
        } else {
          currentItem.tmpAmount = remainingTotal;
          remainingTotal = 0;
        }
      }
      for (let i = 0; i < filteredArray.length; i++) {
        const currentItem = filteredArray[i];
        if (!currentItem.hasOwnProperty('tmpAmount')) {
          currentItem.tmpAmount = 0;
        }
      }
      return arr;
    }
  }
  changeAmountOrder(order: any) {
    this.debounceService.debounce(
      'totalAmount',
      () => {
        for (let i = 0; i < this.dataTable.pours.length; i++) {
          const pour = this.dataTable.pours[i];
          for (let j = 0; j < pour?.pourLines.length; j++) {
            const pourLine = pour?.pourLines[j];
            for (let k = 0; k < pourLine.items.length; k++) {
              const itemDt = pourLine?.items[k];
              if (
                pour.pourSectionCode == order.pourSectionCode &&
                pourLine.pourLineCode == order.pourLineCode &&
                order.itemIndex == itemDt.index
              ) {
                let totalOrder = itemDt.orders.reduce((totalOrder: number, order: any) => {
                  return totalOrder + order.amount;
                }, 0);
                this.dataTable.pours[i].pourLines[j].items[k].amount = totalOrder;
              }
            }
          }
        }
        setTimeout(() => {
          this.changeAmount();
        }, 100);
      },
      200,
    );
  }

  changeToTalAmountItem(item: any, key: any = '00') {
    this.debounceService.debounce(
      `totalAmountItem-${key}`,
      () => {
        for (let i = 0; i < this.dataTable.pours.length; i++) {
          const pour = this.dataTable.pours[i];
          for (let j = 0; j < pour?.pourLines.length; j++) {
            const pourLine = pour?.pourLines[j];
            for (let k = 0; k < pourLine.items.length; k++) {
              const itemDt = pourLine?.items[k];
              if (
                pour.pourSectionCode == item.pourSectionCode &&
                pourLine.pourLineCode == item.pourLineCode &&
                item.index == itemDt.index
              ) {
                let itemAmount = itemDt.amount;
                for (let o = 0; o < itemDt?.orders.length; o++) {
                  let orderItem = itemDt?.orders[o];
                  if (itemAmount >= orderItem.prevAmount) {
                    this.dataTable.pours[i].pourLines[j].items[k].orders[o].amount = orderItem.prevAmount;
                    itemAmount = itemAmount - orderItem.prevAmount;
                  } else {
                    this.dataTable.pours[i].pourLines[j].items[k].orders[o].amount = itemAmount;
                    itemAmount = 0;
                  }
                }
              }
            }
          }
        }
      },
      200,
    );
  }

  changeToTalAmount(_ps: any, _pl: any, event: any = null) {
    this.debounceService.debounce(
      'totalAmount',
      () => {
        for (let i = 0; i < this.dataTable.pours.length; i++) {
          const pour = this.dataTable.pours[i];

          for (let j = 0; j < pour?.pourLines.length; j++) {
            const pourLine = pour?.pourLines[j];
            if (
              pourLine.pourLineCode == _pl.pourLineCode &&
              pourLine?.items?.length > 0 &&
              pourLine.items[0].pourSectionCode == pour.pourSectionCode
            ) {
              const tempItems = pourLine.items.map((item: any) => {
                return item.orders;
              });
              const result = tempItems.reduce((accumulator: any[], value: any) => accumulator.concat(value), []);
              const tst = this.handleByTime(result, event);
              const cloneResult = result.map((itemA: any) => {
                const correspondingObjectB = tst.find((objB: any) => objB.orderCode === itemA.orderCode);
                if (correspondingObjectB) {
                  return {...itemA, amount: correspondingObjectB.amount};
                }
                return {...itemA, amount: 0};
              });
              for (let rs = 0; rs < result.length; rs++) {
                result[rs].amount = cloneResult[rs].amount;
              }
              // result[1].amount = 5000;
              // result[0].amount = 5000;
              // result[3].amount = 10000;
              // result[4].amount = 20000;
              for (let k = 0; k < pourLine.items.length; k++) {
                const item = pourLine.items[k];
                const toTalItem = result.reduce((acc: any, rs: any) => {
                  if (rs.itemIndex == item.index) {
                    return acc + rs.amount;
                  }
                  return acc;
                }, 0);
                this.dataTable.pours[i].pourLines[j].items[k].amount = toTalItem;
              }
            }
          }
          const pourLinesResult = pour?.pourLines.reduce((result: any, pourLine: any) => {
            return pourLine?.items?.length > 0
              ? [
                  ...result,
                  {
                    ...pourLine,
                    totalPrevAmount: pourLine?.items?.reduce((total: number, item: any) => {
                      return total + item?.prevAmount;
                    }, 0),
                    totalAmount: pourLine?.items?.reduce((total: number, item: any, index: any) => {
                      return total + item?.amount;
                    }, 0),
                  },
                ]
              : result;
          }, []);

          for (let j = 0; j < pour?.pourLines.length; j++) {
            const pourLine = pour?.pourLines[j];

            this.dataTable.pours[i].pourLines[j].totalPrevAmount = pourLine?.items?.reduce(
              (total: number, item: any) => {
                return total + item?.prevAmount;
              },
              0,
            );
          }

          this.dataTable.pours[i].totalPrevAmount = pourLinesResult.reduce((total: number, item: any) => {
            return total + item?.totalPrevAmount;
          }, 0);
          this.dataTable.pours[i].totalAmount = pourLinesResult.reduce((total: number, item: any) => {
            return total + item?.totalAmount;
          }, 0);
        }
      },
      200,
    );
  }
  //fix new
  handleByTime(arr: any[], event: any) {
    let totalAmount = event;
    let clData = JSON.parse(JSON.stringify(arr));
    const clonedData = clData.map((cl: any, index: any) => {
      return {
        ...cl,
        amount: 0,
      };
    });
    clonedData.sort((a: any, b: any) => new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime());
    for (let i = 0; i < clonedData.length; i++) {
      let currentElement = clonedData[i];
      let remainingAmount = totalAmount - currentElement.prevAmount;
      if (remainingAmount >= 0) {
        currentElement.amount = currentElement.prevAmount;
        totalAmount = remainingAmount;
      } else {
        currentElement.amount = totalAmount;
        remainingAmount = 0;
        break;
      }
    }
    return clonedData;
  }

  handleEdit(value: boolean) {
    this.edit = value;
    this.search(value);
  }

  ngOnInit(): void {
    if (this.workingShiftCode) {
      this.filter.WorkingShiftCode = this.workingShiftCode;
    }
    if (this.processDate) {
      this.filter.processDate = moment(this.processDate).format('YYYY-MM-DD');
    }
    this.GetAllWorkingShift();
    if (!this.workingShiftCode && !this.processDate) {
      Swal.fire({
        showCloseButton: true,
        title: 'Vui lòng chọn ngày sản xuất và ca sản xuất để tìm kiếm',
        icon: 'info',
        showConfirmButton: false,
        toast: true,
        position: 'top-right',
        allowOutsideClick: true,
      });
    } else {
      this.loadInit();
    }
  }

  loadInit() {
    this.GetAllWorkingShift();
    this.GetAllChipper();
    this.search();
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
  GetAllChipper() {
    this.dropdownService.GetAllChipper().subscribe(
      ({data}) => {
        this.listAllChipper = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  unLatchData() {
    this.submittedConfirm = true;
    if (!this.filter.processDate || !this.filter.WorkingShiftCode) {
      Swal.fire({
        showCloseButton: true,
        title: 'Vui lòng chọn ngày sản xuất, ca sản xuất',
        icon: 'warning',
        showConfirmButton: false,
        toast: true,
        position: 'top-right',
        allowOutsideClick: true,
      });
      return;
    }
    Swal.fire({
      title: 'Huỷ chốt thông tin',
      text: 'Bạn có muốn huỷ chốt thông tin này ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Huỷ chốt',
      cancelButtonText: 'Huỷ',
    }).then((result) => {
      if (result.isConfirmed) {
        this._service
          .unLatchData({
            LatchDate: moment(this.filter.processDate).format('YYYY-MM-DD'),
            ShiftCode: this.filter.WorkingShiftCode,
          })
          .subscribe(
            (data) => {
              this.loadInit();
            },
            (error) => {
              console.log('error: ', error);
            },
          );
      }
    });
  }

  fillTotalItem(itemData: any) {
    this.dataTable = {
      ...this.dataTable,
      pours: [
        ...this.dataTable.pours.map((pour: any) => {
          if (pour.pourSectionCode === itemData.pourSectionCode) {
            return {
              ...pour,
              pourLines: pour?.pourLines?.map((pourLine: any) => {
                if (pourLine?.pourLineCode === itemData.pourLineCode) {
                  return {
                    ...pourLine,
                    items: pourLine.items.map((item: any, index: number) => {
                      if (itemData.itemIndex == item.index) {
                        return {
                          ...item,
                          orders: item.orders.map((od: any, idx: number) => {
                            if (itemData.orderIndex == od.orderIndex) {
                              return {
                                ...od,
                                amount: od.prevAmount,
                              };
                            }
                            return od;
                          }),
                          amount: item.orders.reduce((acc: any, itDt: any, index: number) => {
                            if (itDt.orderIndex == itemData.orderIndex) {
                              return acc + itDt.prevAmount;
                            }
                            return acc + itDt.amount;
                          }, 0),
                        };
                      }
                      return item;
                    }),
                  };
                }
                return pourLine;
              }),
            };
          }
          return pour;
        }),
      ],
    };
    this.changeAmount(itemData);
  }

  fillTotal(itemData: any) {
    this.dataTable = {
      ...this.dataTable,
      pours: [
        ...this.dataTable.pours.map((pour: any) => {
          if (pour.pourSectionCode === itemData.pourSectionCode) {
            return {
              ...pour,
              pourLines: pour?.pourLines?.map((pourLine: any) => {
                if (pourLine?.pourLineCode === itemData.pourLineCode) {
                  return {
                    ...pourLine,
                    items: pourLine.items.map((item: any, index: number) => {
                      if (index === itemData.index) {
                        return {
                          ...item,
                          amount: item.prevAmount,
                        };
                      }
                      return item;
                    }),
                  };
                }
                return pourLine;
              }),
            };
          }
          return pour;
        }),
      ],
    };
    this.changeAmount(itemData);
  }

  fillTotalLine(itemData: any, pourLineClick: any) {
    for (let i = 0; i < this.dataTable.pours.length; i++) {
      const pour = this.dataTable.pours[i];
      for (let j = 0; j < pour?.pourLines.length; j++) {
        const pourLine = pour?.pourLines[j];
        if (
          pour.pourSectionCode === itemData.pourSectionCode &&
          pourLine?.pourLineCode === pourLineClick.pourLineCode
        ) {
          this.dataTable.pours[i].pourLines[j].totalAmount = pourLine.totalPrevAmount;
        }
      }
    }
    this.changeAmount();
    this.changeToTalAmount(itemData, pourLineClick, pourLineClick.totalPrevAmount);
  }

  latchData() {
    this.submittedConfirm = true;
    if (!this.filter.processDate || !this.filter.WorkingShiftCode) {
      Swal.fire({
        showCloseButton: true,
        title: 'Vui lòng chọn ngày sản xuất, ca sản xuất',
        icon: 'warning',
        showConfirmButton: false,
        toast: true,
        position: 'top-right',
        allowOutsideClick: true,
      });
      return;
    }
    //
    const transformChipper: any = [];
    this.dataTable.chippers.forEach((item: any) => {
      transformChipper.push({
        chipperCode: item.code,
        amount: item.amount,
      });
    });
    if (this.SumValueNumber(transformChipper, 'amount') != this.sumTotalProduction()) {
      Swal.fire({
        showCloseButton: true,
        title: 'Tổng khối lượng ở các máy băm phải bằng tổng khối lượng sản xuất !',
        icon: 'warning',
        showConfirmButton: false,
        toast: true,
        position: 'top-right',
        allowOutsideClick: true,
      });
      return;
    }

    Swal.fire({
      title: 'Chốt thông tin',
      text: 'Bạn có muốn chốt thông tin này ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Chốt',
      cancelButtonText: 'Huỷ',
    }).then((result) => {
      if (result.isConfirmed) {
        this._service
          .latchData({
            LatchDate: moment(this.filter.processDate).format('YYYY-MM-DD'),
            ShiftCode: this.filter.WorkingShiftCode,
          })
          .subscribe(
            (data) => {
              this.loadInit();
            },
            (error) => {
              console.log('error: ', error);
            },
          );
      }
    });
  }

  saveData() {
    this.submitted = true;
    this.canUpdate = true;
    const transformedData: any = [];
    this.dataTable.pours.forEach((section: any) => {
      const pourSectionCode = section.pourSectionCode;
      section.pourLines.forEach((line: any) => {
        const pourLineCode = line.pourLineCode;
        line.items.forEach((item: any) => {
          transformedData.push({
            pourSectionCode: pourSectionCode,
            pourLineCode: pourLineCode,
            // amount: item.amount,
            itemCode: item.itemCode,
            areaCode: item.areaCode,
            unitCode: item.unitCode,
            // prevAmount: item.prevAmount,
            orders: item.orders.map((it: any) => {
              return {
                amount: it.amount,
                orderCode: it.orderCode,
                prevAmount: it.prevAmount,
              };
            }),
          });
        });
      });
    });
    this.dataTable.pours.forEach((section: any) => {
      section.pourLines.forEach((line: any) => {
        if (line?.items?.some((item: any) => item?.amount > item?.prevAmount)) {
          Swal.fire({
            showCloseButton: true,
            title: 'Khối lượng xuất phải bé hơn hoặc bằng khối lượng tồn !',
            icon: 'warning',
            showConfirmButton: false,
            toast: true,
            position: 'top-right',
            allowOutsideClick: true,
          });
          this.canUpdate = false;
          return;
        }
      });
    });

    transformedData.forEach((trsData: any) => {
      if (trsData?.orders?.some((item: any) => item?.amount > item?.prevAmount)) {
        Swal.fire({
          showCloseButton: true,
          title: 'Khối lượng xuất phải bé hơn hoặc bằng khối lượng tồn !',
          icon: 'warning',
          showConfirmButton: false,
          toast: true,
          position: 'top-right',
          allowOutsideClick: true,
        });
        this.canUpdate = false;
        return;
      }
    });
    const transformChipper: any = [];
    this.dataTable.chippers.forEach((item: any) => {
      transformChipper.push({
        chipperCode: item.code,
        amount: item.amount,
      });
    });
    if (this.SumValueNumber(transformChipper, 'amount') != this.sumTotalProduction()) {
      Swal.fire({
        showCloseButton: true,
        title: 'Tổng khối lượng ở các máy băm phải bằng tổng khối lượng sản xuất !',
        icon: 'warning',
        showConfirmButton: false,
        toast: true,
        position: 'top-right',
        allowOutsideClick: true,
      });
      this.canUpdate = false;
      return;
    }
    const parameters = {
      processDate: this.filter.processDate + 'T02:00:48.580Z',
      processWorkingShiftCode: this.filter.WorkingShiftCode,
      note: this.filter.note,
      pours: transformedData,
      chippers: transformChipper,
    };
    if (this.canUpdate) {
      this._service.updateDateShift(parameters).subscribe({
        next: ({data}) => {
          this.edit = false;
          this.loadInit();
        },
        error: (response) => {
          console.log(response);
        },
      });
    }
  }

  searchDebounce(key: string) {
    this.debounceService.debounce(
      key,
      () => {
        this.search();
      },
      400,
    );
  }

  search(edit: boolean = false) {
    if (!this.filter.processDate || !this.filter.WorkingShiftCode) {
      Swal.fire({
        showCloseButton: true,
        title: 'Vui lòng chọn ngày sản xuất và ca sản xuất để tìm kiếm',
        icon: 'warning',
        showConfirmButton: false,
        toast: true,
        position: 'top-right',
        allowOutsideClick: true,
      });
      return;
    }
    const filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      processDate: this.filter?.processDate ? moment(this.filter?.processDate)?.format('YYYY-MM-DD') : null,
      WorkingShiftCode: this.filter.WorkingShiftCode,
    };
    this._service.getListProductionInfomation(filterFormat).subscribe({
      next: ({data}) => {
        this.showButton = {
          cancel: data?.canReverse && data?.latchState !== this.STATE_SHIFT['CHUA_CHOT'].value,
          confirm: data?.latchState == this.STATE_SHIFT['CHUA_CHOT'].value,
          edit: data?.latchState !== this.STATE_SHIFT['DA_CHOT'].value,
        };
        if (edit) {
          const additionalChipper = this.listAllChipper
            .filter((item1: any) => !this.dataTable.chippers.find((item2: any) => item1.code === item2.code))
            .map((item: any) => ({code: item.code, name: item.name, amount: 0}));
          const resultArray = this.dataTable.chippers.concat(additionalChipper);
          this.dataTable = {
            ...data,
            chippers: resultArray,
            pours: data?.pours.map((pour: any) => {
              const pourLines = pour.pourLines.map((pourLine: any, index: number) => {
                return {
                  ...pourLine,
                  totalPrevAmount: pourLine?.items?.reduce((total: number, item: any) => {
                    return total + item?.prevAmount;
                  }, 0),
                  totalAmount: pourLine?.items?.reduce((total: number, item: any) => {
                    if (item.isShow) {
                      return total + item?.amount;
                    }
                    return total;
                  }, 0),
                  expand: true,
                  items: pourLine.items.map((item: any, index: number) => {
                    if (item.isShow) {
                      return {
                        ...item,
                        expand: false,
                        pourSectionCode: pour?.pourSectionCode,
                        pourLineCode: pourLine.pourLineCode,
                        index: index,
                        orders: item.orders.map((it: any, indx: number) => {
                          return {
                            ...it,
                            pourSectionCode: pour?.pourSectionCode,
                            pourLineCode: pourLine.pourLineCode,
                            itemIndex: index,
                            orderIndex: indx,
                          };
                        }),
                        totalPrevAmount: item?.orders?.reduce((total: number, od: any) => {
                          return total + od?.prevAmount;
                        }, 0),
                        totalAmount: item?.orders?.reduce((total: number, od: any) => {
                          return total + od?.amount;
                        }, 0),
                      };
                    } else {
                      return {
                        ...item,
                        amount: 0,
                        expand: false,
                        pourSectionCode: pour?.pourSectionCode,
                        pourLineCode: pourLine.pourLineCode,
                        index: index,
                        orders: item.orders.map((it: any, indx: number) => {
                          return {
                            ...it,
                            amount: 0,
                            pourSectionCode: pour?.pourSectionCode,
                            pourLineCode: pourLine.pourLineCode,
                            itemIndex: index,
                            orderIndex: indx,
                          };
                        }),
                        totalPrevAmount: item?.orders?.reduce((total: number, od: any) => {
                          return total + od?.prevAmount;
                        }, 0),
                        totalAmount: item?.orders?.reduce((total: number, od: any) => {
                          return total + od?.amount;
                        }, 0),
                      };
                    }
                  }),
                };
              });

              return {
                ...pour,
                expand: true,
                pourLines: pourLines,
                totalPrevAmount: pourLines.reduce((total: number, item: any) => {
                  return total + item?.totalPrevAmount;
                }, 0),
                totalAmount: pourLines.reduce((total: number, item: any) => {
                  return total + item?.totalAmount;
                }, 0),
              };
            }),
          };
        } else {
          this.dataTable = {
            ...data,
            chippers: data.chippers.filter((it: any) => {
              return it.amount > 0;
            }),
            pours: data.pours.reduce((response: any, pour: any) => {
              const pourLinesResult = pour?.pourLines.reduce((result: any, pourLine: any) => {
                const items = pourLine?.items?.filter((item: any) => item?.isShow);
                return items?.length > 0
                  ? [
                      ...result,
                      {
                        ...pourLine,
                        totalPrevAmount: items?.reduce((total: number, item: any) => {
                          return total + item?.prevAmount;
                        }, 0),
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
                      totalPrevAmount: pourLinesResult.reduce((total: number, item: any) => {
                        return total + item?.totalPrevAmount;
                      }, 0),
                      totalAmount: pourLinesResult.reduce((total: number, item: any) => {
                        return total + item?.totalAmount;
                      }, 0),
                    },
                  ]
                : response;
            }, []),
          };
        }
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
  SumValueNumber(arr: any[], key: string) {
    if (arr != null) {
      if (key == 'orderNumber') {
        let tmpArr: any = [];
        let sum = arr.reduce(function (sum, item) {
          if (tmpArr.includes(item.orderCode)) {
            return sum;
          }
          tmpArr.push(item?.orderCode);
          return sum + item[key];
        }, 0);
        return sum;
      } else {
        let sum = arr.reduce(function (sum, item) {
          return sum + item[key];
        }, 0);

        return sum;
      }
    }
    return 0;
  }
  changeChipperAmount() {
    const transformChipper: any = [];
    this.dataTable.chippers.forEach((item: any) => {
      transformChipper.push({
        chipperCode: item.code,
        amount: item.amount,
      });
    });
    if (this.SumValueNumber(transformChipper, 'amount') != this.sumTotalProduction()) {
      this.showErr = true;
    } else {
      this.showErr = false;
    }
  }
  sumTotalProduction() {
    if (!this.dataTable?.pours && !this.dataTable?.choppings) {
      return 0;
    }
    return (
      this.SumValueNumber(this.dataTable?.pours, 'totalAmount') +
      this.SumValueNumber(this.dataTable?.choppings, 'choppingNumber')
    );
  }
  close() {
    this.filter = new EnterProductionInfomationFilter();
    this.drawerService.returnData('close');
    this.drawerService.close();
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
