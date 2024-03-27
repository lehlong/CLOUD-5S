import {startOfWeek, endOfWeek, addDays, startOfDay, endOfDay, addHours} from 'date-fns';
import {Component} from '@angular/core';
import {ActivatedRoute, Router, NavigationExtras} from '@angular/router';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {DropdownService} from 'src/app/services/Common/dropdown.service';
import {OrderService} from 'src/app/services/SO/order.service';
import {utils} from 'src/app/utils/utils';
import {FormControl} from '@angular/forms';
import {HumidityFilter,HumidityReportFilter} from 'src/app/@filter/Business/humidity-evaluate';
import * as moment from 'moment';
import {HumidityEvaluateService} from 'src/app/services/Business/humidity.service';
import Swal from 'sweetalert2';
import {GlobalService} from 'src/app/services/Common/global.service';
import {OrderCreateComponent} from 'src/app/@module/sale-orders/order/order-create/order-create.component';
import {EVALUATE_MOISTURE} from 'src/app/utils/constant/moisture';
import {REPORT_MOISTURE_RIGHTS} from 'src/app/utils/constant/access-right';
@Component({
  selector: 'app-report-moisture-index',
  templateUrl: './report-moisture-index.component.html',
  styleUrls: ['./report-moisture-index.component.scss'],
})
export class ReportMoistureIndexComponent {
  faFileExcel = faFileExcel;
  displayedColumns: string[] = [
    'index',
    'importDate',
    'processBy',
    'vehicleCode',
    'area',
    'trayWeight',
    'trayWeightAndFreshwood',
    'freshWood',
    'trayWeightAndDrywood',
    'dryWood',
    'averageHumidity',
    'evaluate',
  ];
  paginationResult!: PaginationResult;
  EVALUATE_MOISTURE = EVALUATE_MOISTURE;
  filter = new HumidityReportFilter();
  rangePresets = {
    '2 giờ sau': [new Date(), addHours(new Date(), 2)],
    'Hôm nay': [startOfDay(new Date()), endOfDay(new Date())],
    'Ngày mai': [startOfDay(addDays(new Date(), 1)), endOfDay(addDays(new Date(), 1))],
    '3 ngày sau': [new Date(), endOfDay(addDays(new Date(), 3))],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
  };

  updateListOrder: any = [];
  freshWoodArr: any = [];
  dryWoodArr: any = [];
  avgHumidityArr: any = [];

  listVehicle: any = [];
  listPartnerAll: any = [];
  listArea: any = [];

  listEvaluate: any = [];
  sumArrWeight : any[] = [];
  REPORT_MOISTURE_RIGHTS = REPORT_MOISTURE_RIGHTS;
  constructor(
    private _service: HumidityEvaluateService,
    private drawerService: DrawerService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute,
    public utils: utils,
    private _os: OrderService,
    private globalService: GlobalService,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Báo cáo quản lý độ ẩm',
        path: 'report/report-moisture',
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
      {code: 'Head', name: 'Head'},
      {code: 'Middle', name: 'Middle'},
      {code: 'Tail', name: 'Tail'},
    ];
  }

  openCreate() {
    this.drawerService.open(OrderCreateComponent).subscribe((result) => {
      if (result?.status && this.utils.checkComponent(ReportMoistureIndexComponent)) {
        this.loadInit();
      }
    });
  }

  groupSheetByAreaCode(arr : any[]) {
    const groupedByAreaCode: any = {};
    for (const item of arr) {
      const {...rest} = item;
      const {areaCode} = item ;
      if (!groupedByAreaCode[areaCode]) {
        groupedByAreaCode[areaCode] = [];
      }
      groupedByAreaCode[areaCode].push(rest);
    }

    const formattedArray = Object.entries(groupedByAreaCode).map(([areaCode, values]) => ({
      areaCode: areaCode, 
      items: values,
    }));
    return formattedArray
  }

   calculateTotalEveryWeight(arr : any[] , typeWeight : any) {
    let totalWeight = 0;
    for (const item of arr) {
      totalWeight += Number(item[typeWeight]);
    }
    return totalWeight;
  }
 
  search(first: boolean = false) {
    this.sumArrWeight = [];
    const filterFormat = {
      type: 'NHAP_HANG',
      AreaCode: this.filter.AreaCode,
      FromDate:
        this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : '',
      ToDate: this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : '',
    };
    this._service.searchReport(filterFormat).subscribe({ 
      next: ({data}) => {

        //Lọc ra những phần tử có moisture trả về 1 mảng
        const newData = data?.data?.filter((item:any)=>{
          return item.moisture;
        })
        
        //Lọc ra những phần tử có moisture trả về 1 mảng chỉ lấy các key cần thiết nếu không có gán giá trị = 0 
       const cloneNewData = newData.map((it:any)=>{
          return {
             vehicleCode : it.vehicleCode ? it.vehicleCode : "",
             areaCode : it.area?.code ? it.area?.code : "",
             areaName : it.area?.name ? it.area?.name : "",
             processBy : it.moisture?.processBy  ?  it.moisture?.processBy : "" ,  
             orderDate : it.orderDate  ?  it.orderDate : "" ,  
             trayWeight : it.moisture?.trayWeight  ?  it.moisture?.trayWeight : 0 ,  
             trayWetWeight : it.moisture?.trayWetWeight  ?  it.moisture?.trayWetWeight : 0 ,  
             wetWeight : it.moisture?.wetWeight  ?  it.moisture?.wetWeight : 0 ,  
             trayDryWeight : it.moisture?.trayDryWeight  ?  it.moisture?.trayDryWeight : 0 ,  
             dryWeight : it.moisture?.dryWeight  ?  it.moisture?.dryWeight : 0 ,   
             moisture : it.moisture?.moisture  ?  it.moisture?.moisture : 0 ,  
             remark : it.moisture?.remark  ?  it.moisture?.remark : "" ,  
          }
       })
       
       // trả về 1 mảng gồm các object có các giá trị areaCode để nhóm và items là các mảng chứa các phần tử có chung areaCode
       const finishArr = this.groupSheetByAreaCode(cloneNewData);
       console.log("finishArr",finishArr)
      // trả về 1 mảng gồm các object có các giá trị areaCode để nhóm và items là các mảng chứa các phần tử có chung areaCode
      // nhưng mỗi object chèn thêm 1 object chứa các thông tin về total weight
       const cloneFinishArr = finishArr.map((it:any)=>{
           return {
             ... it ,
             allWeightArr: {    
                 orderDate: it.orderdate ? it.orderdate : "",
                 processBy: it.processBy ? it.processBy : "Total",
                 vehicleCode: it.vehicleCode ? it.vehicleCode : "",
                 areaCode:  "Total",
                 areaName : it.items[0]?.areaName ? it.items[0]?.areaName : "", 

                 trayWeight : this.calculateTotalEveryWeight(it.items , 'trayWeight'),
                 trayWetWeight : this.calculateTotalEveryWeight(it.items , 'trayWetWeight'),
                 wetWeight : this.calculateTotalEveryWeight(it.items , 'wetWeight'),
                 trayDryWeight : this.calculateTotalEveryWeight(it.items , 'trayDryWeight'),
                 dryWeight : this.calculateTotalEveryWeight(it.items , 'dryWeight'),
                 moisture: ((this.calculateTotalEveryWeight(it.items , 'moisture'))/(it.items.length)).toFixed(2),
             }
           }
       })
       
      // thêm object chứa thông tin về tổng các weight vào cuối mảng items
       const cloneNewFinishArr = cloneFinishArr.map((it:any)=>{
          return {
            ...it,
             items : [... it.items , it.allWeightArr ]
          }
       })
       
       // Tạo ra 1 mảng mới chứa các object chưá tổng các weight của từng areaCode khác nhau
       cloneNewFinishArr.forEach((it:any)=>{
           this.sumArrWeight.push(it.allWeightArr);
       })
       let cloneSumArrWeight
       if(this.sumArrWeight.length){
         cloneSumArrWeight = 
         {
              orderDate: "",
              processBy:  "",
              vehicleCode: "",
              areaCode: "Sum", 
              areaName: "Sum",

              trayWeight : this.calculateTotalEveryWeight(this.sumArrWeight , 'trayWeight'),
              trayWetWeight : this.calculateTotalEveryWeight(this.sumArrWeight, 'trayWetWeight'),
              wetWeight : this.calculateTotalEveryWeight(this.sumArrWeight , 'wetWeight'),
              trayDryWeight : this.calculateTotalEveryWeight(this.sumArrWeight , 'trayDryWeight'),
              dryWeight : this.calculateTotalEveryWeight(this.sumArrWeight, 'dryWeight'),
              moisture: ((this.calculateTotalEveryWeight(this.sumArrWeight, 'moisture'))/(this.sumArrWeight.length)).toFixed(2),
        }
       }else{
        cloneSumArrWeight = 
        {
             orderDate: "",
             processBy:  "",
             vehicleCode: "",
             areaCode: "Sum", 
             areaName: "Sum", 

             trayWeight : 0,
             trayWetWeight : 0,
             wetWeight : 0,
             trayDryWeight : 0,
             dryWeight : 0,
             moisture: "0",
       }
       }
       // tạo ra mảng sumArr nối giữa các mảng với nhau để gắn vào data trong paginationResult
       let sumArr : any[] = []; 
       for(let i = 0 ; i < cloneNewFinishArr.length ; i++ ){
         sumArr = sumArr.concat(cloneNewFinishArr[i].items);
       }
       // thêm obj này vào cuối mảng sumArr
       sumArr.push(cloneSumArrWeight);

        this.paginationResult = {
          ...data,
          data: sumArr
        };
        this.router.navigate([], {
          replaceUrl: true,
          relativeTo: this.route,
          queryParams: this.filter,
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

  exportExcel() {
    let filterFormat = {     
      AreaCode: this.filter.AreaCode,
      FromDate:
        this.filter?.selectedRange?.length > 0 ? moment(this.filter?.selectedRange[0])?.format('YYYY-MM-DD') : '',
      ToDate: this.filter?.selectedRange?.length > 1 ? moment(this.filter?.selectedRange[1])?.format('YYYY-MM-DD') : '',
    };
    return this._service.ExportExcel(filterFormat).subscribe((result: Blob) => {
      const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      var anchor = document.createElement('a');
      anchor.download = 'bao-cao-quan-ly-do-am.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }
}