import {Component, OnInit, Input} from '@angular/core';
import {OrderService} from 'src/app/services/SO/order.service';
import {fakeData} from 'src/app/utils/fake';
import {addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks} from 'date-fns';
import * as moment from 'moment';
import {utils} from 'src/app/utils/utils';

@Component({
  selector: 'app-leave-ship',
  templateUrl: './leave-ship.component.html',
  styleUrls: ['./leave-ship.component.scss'],
})
export class LeaveShipComponent implements OnInit {
  @Input() selectedRangeShip: any;
  @Input() startDateChil: any;
  @Input() endDateChil: any;
  filter = {
    fromDate: '',
    toDate: '',
  };

  data: any;
  rowData: any;
  colData: any;
  selectedRange: Date[] = [];
  rangePresets = {
    'Tuần trước': [startOfWeek(subWeeks(new Date(), 1)), endOfWeek(subWeeks(new Date(), 1))],
    'Hôm qua': [addDays(new Date(), -1), addDays(new Date(), -1)],
    'Hôm nay': [new Date(), new Date()],
    'Tuần này': [startOfWeek(new Date()), endOfWeek(new Date())],
    'Tháng này': [startOfMonth(new Date()), endOfMonth(new Date())],
  };
  disabledDate = (current: Date): boolean => {
    return false;
  };

  constructor(private _service: OrderService, public utils: utils) {}
  ngOnInit(): void {
    this.loadInit();
  }

  loadInit() {
    this.selectedRange = [new Date(this.startDateChil), new Date(this.endDateChil)];
    this.disabledDate = (current: Date): boolean => {
      const currentDate = current.setHours(0, 0, 0, 0);
      const startDate = new Date(this.startDateChil).setHours(0, 0, 0, 0);
      const endDate = new Date(this.endDateChil).setHours(0, 0, 0, 0);
      return currentDate < startDate || currentDate > endDate;
    };
    this.getDetailShip();
  }
  getDetailShip() {
    const filterFormat = {
      FromDate: this.selectedRange.length > 0 ? moment(this.selectedRange[0])?.format('YYYY-MM-DD') : '',
      ToDate: this.selectedRange?.length > 1 ? moment(this.selectedRange[1])?.format('YYYY-MM-DD') : '',
    };
    if (filterFormat.FromDate && filterFormat.ToDate) {
      this._service.ExportCargo(filterFormat).subscribe((res) => {
        if (res.status) {
          this.data = res.data;
          this.colData = res.data.colData;
          this.rowData = res.data.rowData;
        }
      });
    }
  }

  shiftName(item: any) {
    let name = '';
    switch (item) {
      case '1':
        name = '0-6';
        break;
      case '2':
        name = '6-12';
        break;
      case '3':
        name = '12-18';
        break;
      case '4':
        name = '18-24';
        break;
    }
    return name;
  }

  exportExcel() {
    const filterFormat = {
      FromDate: this.selectedRange.length > 0 ? moment(this.selectedRange[0])?.format('YYYY-MM-DD') : '',
      ToDate: this.selectedRange?.length > 1 ? moment(this.selectedRange[1])?.format('YYYY-MM-DD') : '',
    };
    return this._service.ExportCargoDownload(filterFormat).subscribe((result: Blob) => {
      const blob = new Blob([result], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const url = window.URL.createObjectURL(blob);
      var anchor = document.createElement('a');
      anchor.download = 'bao-cao-van-chuyen-dam-xuong-tau.xlsx';
      anchor.href = url;
      anchor.click();
    });
  }
}
