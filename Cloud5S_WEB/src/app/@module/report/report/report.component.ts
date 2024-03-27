import {Component} from '@angular/core';
import {ChartService} from '../../../services/Report/chart.service';
import * as moment from 'moment';
import {formatNumber} from '../../../utils/func-feature';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexPlotOptions,
  ApexTooltip,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  colors: string[];
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
};

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent {
  lstData: any[] = [];
  lstName: string[] = [];
  lstValue_1: number[] = [];
  lstValue_2: number[] = [];
  viewType: string = 'week';
  order: string = '';
  export: string = '';
  totalOrder: string = '';
  totalOrderNotAccepted: string = '';
  formatNumber = formatNumber;
  public chartOptions: Partial<ChartOptions> | any;

  listTimeRange: any[] = [
    {
      code: 'week',
      name: 'Thống kê 1 tuần',
    },
    {
      code: 'two-week',
      name: 'Thống kê 2 tuần',
    },
  ];
  constructor(private _service: ChartService) {}

  ngOnInit(): void {
    this.loadInit();
  }

  loadInit() {
    this.StatisticsByDay();
    this.showChart();
  }
  StatisticsByDay() {
    const currentDate = moment();
    const formattedToDate = currentDate.format('yyyy-MM-DD');
    this._service.StatisticsByDay({date: formattedToDate}).subscribe((data) => {
      this.order = data.data.order;
      this.export = data.data.export;
      this.totalOrder = data.data.totalOrder;
      this.totalOrderNotAccepted = data.data.totalOrderNotAccepted;
    });
  }
  showChart() {
    const currentDate = moment();
    let WeekBefore;
    if (this.viewType == 'week') {
      WeekBefore = moment().subtract(6, 'day');
    }
    if (this.viewType == 'two-week') {
      WeekBefore = moment().subtract(13, 'day');
    }
    const formattedToDate = currentDate.format('yyyy-MM-DD');
    const formattedFromDate = WeekBefore?.format('yyyy-MM-DD');

    this._service.GetChartInfor({FromDate: formattedFromDate, ToDate: formattedToDate}).subscribe((data) => {
      this.lstData = data.data;
      this.lstName = this.lstData.map((x: any) => moment(x.date).format('DD/MM'));
      this.lstValue_1 = this.lstData.map((x: any) => x.orderQuantity);
      this.lstValue_2 = this.lstData.map((x: any) => x.exportQuantity);

      this.chartOptions = {
        series: [
          {
            name: 'Sản lượng đặt',
            type: 'column',
            data: this.lstValue_1,
            color: '#0060A6',
            yAxisIndex: 0,
          },
          {
            name: 'Sản lượng xuất',
            type: 'column',
            data: this.lstValue_2,
            color: '#FF3E3E',
            yAxisIndex: 1,
          },
        ],
        chart: {
          type: 'bar',
          height: 450,
        },
        plotOptions: {
          bar: {
            barHeight: '100%',
            distributed: true,
            horizontal: false,
            dataLabels: {
              position: 'bottom',
            },
          },
        },
        dataLabels: {
          enabled: false,
          textAnchor: 'start',
          style: {
            colors: ['#fff'],
          },

          formatter: function (val: any, opt: any) {
            return val;
            // return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
          },
          offsetX: 0,
          dropShadow: {
            enabled: true,
          },
        },
        stroke: {
          width: 1,
          colors: ['#fff'],
        },
        xaxis: {
          categories: this.lstName,
          labels: {
            show: true,
          },
        },
        yaxis: [
          {
            labels: {
              show: true,
            },
          },
          {
            labels: {
              show: true,
            },
            opposite: true,
          },
        ],
        title: {
          text: 'Xu hướng khách hàng',
          align: 'center',
          floating: true,
        },
        subtitle: {
          text: '',
          align: 'center',
        },
        tooltip: {
          theme: 'dark',
          x: {
            show: false,
          },
          y: {
            title: {
              formatter: function () {
                return '';
              },
            },
          },
        },
      };
    });
  }
  selectTypeCode(e: any) {
    this.viewType = e.target.value;
    this.showChart();
  }
}
