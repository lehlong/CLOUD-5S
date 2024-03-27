import {startOfWeek, endOfWeek, addDays, startOfDay, endOfDay, addHours} from 'date-fns';
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {OrderService} from 'src/app/services/SO/order.service';
import {utils} from 'src/app/utils/utils';
import {FormControl} from '@angular/forms';
import {HumidityFilter} from 'src/app/@filter/Business/humidity-evaluate';
import * as moment from 'moment';
import {HumidityEvaluateService} from 'src/app/services/Business/humidity.service';
import Swal from 'sweetalert2';
import {GlobalService} from 'src/app/services/Common/global.service';
import {OrderCreateComponent} from 'src/app/@module/sale-orders/order/order-create/order-create.component';
import {MOISTURE_RIGHTS} from 'src/app/utils/constant/access-right';
@Component({
  selector: 'app-humidity-evaluate-index',
  templateUrl: './humidity-evaluate-index.component.html',
  styleUrls: ['./humidity-evaluate-index.component.scss']
})
export class HumidityEvaluateIndexComponent {
  faFileExcel = faFileExcel;
  displayedColumns: string[] = [
    'index',
    'code',
    'importDate',
    'vehicleCode',
    'partner',
    'area',
    'handleBy',
    'trayWeight',
    'trayWeightAndFreshwood',
    'freshWood',
    'trayWeightAndDrywood',
    'dryWood',
    'averageHumidity',
    'evaluate',
  ];
  paginationResult!: PaginationResult; 
  filter = new HumidityFilter();
  rangePresets = {
    '2 giờ sau': [new Date(), addHours(new Date(), 2)],
    'Hôm nay': [startOfDay(new Date()), endOfDay(new Date())],
    'Ngày mai': [startOfDay(addDays(new Date(), 1)), endOfDay(addDays(new Date(), 1))],
    '3 ngày sau': [new Date(), endOfDay(addDays(new Date(), 3))],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
  };

  updateListOrder: any = [];
  freshWoodArr : any = [] ; 
  dryWoodArr : any = [] ; 
  avgHumidityArr : any = [] ; 

  listVehicle: any = [];
  listPartnerAll: any = [];
  listArea: any = [];

  listEvaluate: any = [];
  emptyInfor: boolean = true;
  fullInfor: boolean = true;
  MOISTURE_RIGHTS = MOISTURE_RIGHTS ;
  constructor(
    private _service: HumidityEvaluateService,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
    private utils: utils,
    private _os: OrderService,
    private globalService: GlobalService
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Quản lý độ ẩm',
        path: 'business/humidity-evaluate',
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
    this.route.queryParams.subscribe((params) => {
      (this.filter.currentPage = params['currentPage']),
        (this.filter.pageSize = params['pageSize']),
        (this.filter.keyWord = params['keyWord']),
        (this.filter.PartnerCode = params['PartnerCode']),
        (this.filter.VehicleCode = params['VehicleCode']),
        (this.filter.AreaCode = params['AreaCode']),
        (this.filter.selectedRange = (params['FromDate']!=='' && params['ToDate'] !=='') ? [
          moment(params['FromDate']).startOf('day').toDate(),
          moment(params['ToDate']).endOf('day').toDate(),
        ] : []);
        this.fullInfor =  params['fullInfor'] == 'true' ? true : false ;
        this.emptyInfor = params['emptyInfor'] == 'true' ? true : false ;
        // 
        this.filter.IsFullInfor = this.fullInfor;
        this.filter.IsEmptyInfor = this.emptyInfor;
    });
    this.loadInit(true);
  }
  Back(){
    this.router.navigate(['/business/humidity-view']);
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
  GetVehicle() {
    this.dropdownService.GetAllVehicle().subscribe(
      ({data}) => {
        this.listVehicle = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
  GetArea() {
    this.dropdownService.GetAllArea().subscribe(
      ({data}) => {
        this.listArea = data;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }
  GetAllEvaluate() {
        this.listEvaluate = [
          {code :"Head" , name:"Head"},
          {code :"Middle" , name:"Middle"},
          {code :"Tail" , name:"Tail"},
        ];
  }

  onChangeHandleBy(e: any, element: any , i: number) {
    const index = this.updateListOrder.findIndex((item: any) => item.orderCode == element.code);
    if (index >= 0) {
      this.updateListOrder[index].processBy = e?.target?.value;
    } else {
      this.updateListOrder = [
        ...this.updateListOrder,
        { 
          id: element.moisture.id,
          orderCode: element.code,
          processDate: element.moisture.processDate, 
          processBy: e?.target?.value,
          trayWeight : element.moisture.trayWeight ,
          trayWetWeight : element.moisture.trayWetWeight,
          wetWeight: element.moisture.wetWeight,
          trayDryWeight : element.moisture.trayDryWeight,
          dryWeight: element.moisture.dryWeight,
          moisture: element.moisture.moisture,
          remark:element.moisture.remark,
          note:""
        }
      ];
    }
    // console.log('this.updateListOrder', this.updateListOrder);
  }
  onChangeTrayWeight(e: any, element: any , i: number) {
    const index = this.updateListOrder.findIndex((item: any) => item.orderCode == element.code);
    if (index >= 0) {
      this.updateListOrder[index].trayWeight = e;

      this.updateListOrder[index].wetWeight = 
       Number(this.updateListOrder[index].trayWetWeight) - Number(this.updateListOrder[index].trayWeight);

      this.updateListOrder[index].dryWeight = 
      Number(this.updateListOrder[index].trayDryWeight) - Number(this.updateListOrder[index].trayWeight);  
      let avgHumidity;
      if(Number(this.updateListOrder[index].wetWeight) > 0){
         avgHumidity = ((this.updateListOrder[index].wetWeight - this.updateListOrder[index].dryWeight) / this.updateListOrder[index].wetWeight)*100
      }else{
        avgHumidity = null
      }
      this.freshWoodArr[i] = this.updateListOrder[index].wetWeight > 0 ? this.updateListOrder[index].wetWeight : null;
      this.dryWoodArr[i] = this.updateListOrder[index].dryWeight > 0 ? this.updateListOrder[index].dryWeight : null ;
      this.avgHumidityArr[i] = avgHumidity && avgHumidity > 0 ? avgHumidity.toFixed(2) : null;
      this.updateListOrder[index].moisture = Number(this.avgHumidityArr[i]);
      this.updateListOrder[index].dryWeight = this.dryWoodArr[i];
      this.updateListOrder[index].wetWeight = this.freshWoodArr[i];
    } else {
      this.updateListOrder = [
        ...this.updateListOrder,
        { 
          id: element.moisture.id,
          orderCode: element.code, 
          processDate: element.moisture.processDate,
          trayWeight : e ,
          processBy: element.moisture.processBy,
          trayWetWeight : element.moisture.trayWetWeight,
          wetWeight: element.moisture.wetWeight,
          trayDryWeight : element.moisture.trayDryWeight,
          dryWeight: element.moisture.dryWeight,
          moisture: element.moisture.moisture,
          remark:element.moisture.remark,
          note:""
        }
      ];
    }
    // console.log('this.updateListOrder', this.updateListOrder);
  }
  onChangeTrayWeightAndFreshwood(e: any, element: any , i: number) {
    const index = this.updateListOrder.findIndex((item: any) => item.orderCode == element.code);
    if (index >= 0) {
      this.updateListOrder[index].trayWetWeight = e;

      this.updateListOrder[index].wetWeight = 
       Number(this.updateListOrder[index].trayWetWeight) - Number(this.updateListOrder[index].trayWeight);

       let avgHumidity;
       if(Number(this.updateListOrder[index].wetWeight) > 0){
         avgHumidity = ((this.updateListOrder[index].wetWeight - this.updateListOrder[index].dryWeight) / this.updateListOrder[index].wetWeight)*100
       }else{
        avgHumidity = null
       }

       this.freshWoodArr[i] = this.updateListOrder[index].wetWeight > 0 ? this.updateListOrder[index].wetWeight : null;
       this.avgHumidityArr[i] = avgHumidity && avgHumidity > 0 ? avgHumidity.toFixed(2) : null;
       this.updateListOrder[index].moisture = Number(this.avgHumidityArr[i]);
       this.updateListOrder[index].wetWeight = this.freshWoodArr[i];
    } else {
      this.updateListOrder = [
        ...this.updateListOrder,
        { 
          id: element.moisture.id,
          orderCode: element.code, 
          processDate: element.moisture.processDate,
          wetWeight: e,
          trayWeight : element.moisture.trayWeight,
          processBy: element.moisture.processBy,
          trayWetWeight : element.moisture.trayWetWeight,   
          trayDryWeight : element.moisture.trayDryWeight,
          dryWeight: element.moisture.dryWeight,
          moisture: element.moisture.moisture,
          remark:element.moisture.remark,
          note:""
        }
      ];
    }
    // console.log('this.updateListOrder', this.updateListOrder);
  }
  onChangeTrayWeightAndDrywood(e: any, element: any , i: number) {
    const index = this.updateListOrder.findIndex((item: any) => item.orderCode == element.code);
    if (index >= 0) {
      this.updateListOrder[index].trayDryWeight = e;

      this.updateListOrder[index].dryWeight = 
       Number(this.updateListOrder[index].trayDryWeight) - Number(this.updateListOrder[index].trayWeight);

       let avgHumidity ;
       if(Number(this.updateListOrder[index].wetWeight) > 0){
        avgHumidity = ((this.updateListOrder[index].wetWeight - this.updateListOrder[index].dryWeight) / this.updateListOrder[index].wetWeight)*100
       }else{
        avgHumidity = null;
       }

       this.dryWoodArr[i] = this.updateListOrder[index].dryWeight > 0 ? this.updateListOrder[index].dryWeight : null ;
       this.avgHumidityArr[i] = avgHumidity && avgHumidity > 0 ? avgHumidity.toFixed(2) : null ;
       this.updateListOrder[index].moisture = Number(this.avgHumidityArr[i]);
       this.updateListOrder[index].dryWeight = this.dryWoodArr[i];
    } else {
      this.updateListOrder = [
        ...this.updateListOrder,
        { 
          id: element.moisture.id,
          orderCode: element.code, 
          processDate: element.moisture.processDate,
          trayDryWeight : e,
          wetWeight: element.moisture.wetWeight,
          trayWeight : element.moisture.trayWeight,
          processBy: element.moisture.processBy,
          trayWetWeight : element.moisture.trayWetWeight,     
          dryWeight: element.moisture.dryWeight,
          moisture: element.moisture.moisture,
          remark:element.moisture.remark,
          note:""
        }
      ];
    }
    // console.log('this.updateListOrder', this.updateListOrder);
  }

  onSelectEvaluate(e: any, element: any , i: number) {
    const index = this.updateListOrder.findIndex((item: any) => item.orderCode == element.code);
    if (index >= 0) {
      this.updateListOrder[index].remark = e;
    } else {
      this.updateListOrder = [
        ...this.updateListOrder,
        {
          id: element.moisture.id,
          orderCode: element.code, 
          processDate: element.moisture.processDate,
          trayDryWeight : element.moisture.trayDryWeight,
          wetWeight: element.moisture.wetWeight,
          trayWeight : element.moisture.trayWeight,
          processBy: element.moisture.processBy,
          trayWetWeight : element.moisture.trayWetWeight,     
          dryWeight: element.moisture.dryWeight,
          moisture: element.moisture.moisture,
          remark: e,
          note:""
        }
      ];
    }
    // console.log('this.updateListOrder', this.updateListOrder);
  }


  openCreate() {
    this.drawerService.open(OrderCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(HumidityEvaluateIndexComponent)) {
        this.loadInit();
      }
    });
  }

  handleCheckboxChange() {
    this.filter.IsFullInfor = this.fullInfor;
    this.filter.IsEmptyInfor = this.emptyInfor;
    this.search();
  }

  search(first: boolean = false) {
    const filterFormat = {
      currentPage: this.filter.currentPage,
      pageSize: this.filter.pageSize,
      keyWord: this.filter.keyWord,
      type:"NHAP_HANG",
      PartnerCode: this.filter.PartnerCode,
      VehicleCode: this.filter.VehicleCode,
      AreaCode: this.filter.AreaCode,
      IsFullInfor: this.filter.IsFullInfor,
      IsEmptyInfor: this.filter.IsEmptyInfor,
      FromDate:
      !!this.filter?.selectedRange && this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : '',
      ToDate: !!this.filter?.selectedRange && this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : ''
    };
    this._service.search(filterFormat).subscribe({
      next: ({data}) => {
        let tmpData: any = {};
        if (this.fullInfor && this.emptyInfor) {
          tmpData = data.data.map((it: any) => {
            if (!it.moisture) {
              return {
                ...it,
                moisture: {
                  id: null,
                  orderCode: null,
                  processBy: null,
                  processDate: null,
                  trayWeight: null,
                  trayWetWeight: null,
                  wetWeight: null,
                  trayDryWeight: null,
                  dryWeight: null,
                  moisture: null,
                  remark: null,
                  note: '',
                },
                              };
            }
            return {...it};
          });
        }
        if(this.fullInfor && !this.emptyInfor){
          tmpData = data.data.filter((it:any)=>{
             return (
              it.moisture != null &&
              it.moisture.id !==null &&
              it.moisture.trayWeight !==null &&
              it.moisture.trayWetWeight !==null &&
              it.moisture.wetWeight !==null &&
              it.moisture.trayDryWeight !==null &&
              it.moisture.dryWeight !==null &&
              it.moisture.moisture !==null
            );
          })
        }
        if(!this.fullInfor && this.emptyInfor){
          tmpData = data.data.filter((it:any)=>{
            return (
             it.moisture == null ||
             it.moisture.id ==null ||
             it.moisture.trayWeight ==null ||
             it.moisture.trayWetWeight ==null ||
             it.moisture.wetWeight ==null ||
             it.moisture.trayDryWeight ==null ||
             it.moisture.dryWeight ==null ||
             it.moisture.moisture ==null
           )
         }).map((it:any)=>{
            return {
               ...it ,
               moisture: {
                id: it.id ? it.id : null,
                orderCode: it.orderCode ? it.orderCode : null,
                processBy: it.processBy ? it.processBy : null,
                processDate: it.processDate ? it.processDate : null,
                trayWeight: it.trayWeight ? it.trayWeight : null,
                trayWetWeight: it.trayWetWeight ? it.trayWetWeight : null,
                wetWeight: it.wetWeight ? it.wetWeight : null,
                trayDryWeight: it.trayDryWeight ? it.trayDryWeight : null,
                dryWeight: it.dryWeight ? it.dryWeight : null,
                moisture: it.moisture ? it.moisture : null,
                remark: it.remark ? it.remark : null,
                note: '',
              },
                          }
         })
        }
        if(!this.fullInfor && !this.emptyInfor){
            this.paginationResult = {
              ...this.paginationResult,
              data :[]
            };
            return;
        }

        this.paginationResult = {
          ...data,
          data: tmpData.map((it:any)=>{
            return {
              ... it,
              isFullInfor : !!it.moisture?.trayWeight && 
                           !!it.moisture?.trayWetWeight && 
                           !!it.moisture?.trayDryWeight &&
                           !!it.moisture?.moisture&&
                           !!it.moisture?.wetWeight&&
                           !!it.moisture?.dryWeight&&
                           !! it.moisture?.remark
            }
         })
        };
        
        this.freshWoodArr = data.data.map((item:any)=>{
          if(item.moisture){
            return item.moisture.wetWeight;
          }
           return ""
        });

        this.dryWoodArr = data.data.map((item:any)=>{
          if(item.moisture){
            return item.moisture.dryWeight;
          }
          return ""
        });
        this.avgHumidityArr = data.data.map((item:any)=>{
          if(item.moisture){
            return item.moisture.moisture; 
          }
          return ""
        });
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  loadInit(first: boolean = false) {
    this.GetAllPartner();
    this.GetVehicle();
    this.GetArea();
    this.GetAllEvaluate();
    this.search(first);
  }

  reload() {
    this.filter = new HumidityFilter();
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

  onUpdate() {
      let isValid = true;
      if(this.updateListOrder.length > 0){
          const cloneData = this.paginationResult.data;
          for (let i = 0; i < cloneData.length; i++) {
            const itemA = cloneData[i];
            const orderCodeA = itemA.moisture.orderCode;
            const itemB = this.updateListOrder.find((item:any) => item.orderCode === orderCodeA);
        
            if (itemB) {
                itemA.moisture.dryWeight = itemB.dryWeight ;
                itemA.moisture.moisture = itemB.moisture;
                itemA.moisture.orderCode = itemB.orderCode;
                itemA.moisture.processBy = itemB.processBy;
                itemA.moisture.processDate  = itemB.processDate ;
                itemA.moisture.remark  = itemB.remark ;
                itemA.moisture.trayDryWeight  = itemB.trayDryWeight ;
                itemA.moisture.trayWeight  = itemB.trayWeight ;
                itemA.moisture.trayWetWeight  = itemB.trayWetWeight ;
                itemA.moisture.wetWeight  = itemB.wetWeight ;
            }
        }

        this.paginationResult = {
          ... this.paginationResult,
          data: cloneData.map((it:any)=>{
            return {
              ...it,
              errWeight :(it.moisture == null) || (
                it.moisture.trayWeight == null &&
                it.moisture.trayWetWeight == null &&
                it.moisture.trayDryWeight == null &&
                it.moisture.wetWeight == null &&
                it.moisture.dryWeight == null &&
                it.moisture.moisture == null
              ) ?
              {
                trayWeightErr : false,
                trayWetWeightErr: false,
                trayDryWeightErr:false
              } :
              {
                trayWeightErr :  it.moisture?.trayWeight >= it.moisture?.trayWetWeight || it.moisture?.trayWeight >= it.moisture?.trayDryWeight,
                trayWetWeightErr :  it.moisture?.trayWeight >= it.moisture?.trayWetWeight || it.moisture?.trayDryWeight >= it.moisture?.trayWetWeight ,
                trayDryWeightErr :  it.moisture?.trayWeight >= it.moisture?.trayDryWeight || it.moisture?.trayDryWeight >= it.moisture?.trayWetWeight,
              }
            }
          })
        }

        isValid = this.updateListOrder.every((it :any)=>{
          return (
            it.trayWeight < it.trayWetWeight &&
            it.trayWeight < it.trayDryWeight &&
            it.trayDryWeight < it.trayWetWeight
          )
        }) 
        if(!isValid){
          Swal.fire({
            showCloseButton: true,
            title: 'Các trường thông tin chưa chính xác',
            icon: 'error',
            position: 'top-right'
          })
           return;
        }    
      }    
      this._service.UpdateHumidity(this.updateListOrder).subscribe(
        (data) => {
          this.loadInit(true);
          this.updateListOrder = [];
        },
        (error) => {
          console.log('error: ', error);
        },
      );
  }
}
