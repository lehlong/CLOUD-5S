import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';


@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor(private _commonService: CommonService) {} 
  GetChartInfor(params: any) {
    return this._commonService.getRequest(`Order/Chart?FromDate=${params.FromDate}&ToDate=${params.ToDate}`);
  }
  StatisticsByDay(params:any){
    return this._commonService.getRequest(`Order/Quantity?date=${params.date}`);
  }
}
