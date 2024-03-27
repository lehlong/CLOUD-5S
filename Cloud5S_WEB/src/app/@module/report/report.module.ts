import {NgModule} from '@angular/core';
import {ReportRoutingModule} from './report-routing.module';
import {SharedModule} from '../share.modules';
import {DashboardComponent} from 'src/app/@module/report/dashboard/dashboard.component';
import {ReportImportExportIndexComponent} from 'src/app/@module/report/report-import-export-index/report-import-export-index.component';
import {ReportStockExportIndexComponent} from 'src/app/@module/report/report-stock-export-index/report-stock-export-index.component';
import {ReportStockImportIndexComponent} from 'src/app/@module/report/report-stock-import-index/report-stock-import-index.component';
import {ReportComponent} from 'src/app/@module/report/report/report.component';
import {ReportMoistureIndexComponent} from './report-moisture-index/report-moisture-index.component';
import {MidnightReportComponent} from './midnight-report/midnight-report.component';
import {ReportScaleWeightIndexComponent} from './report-scale-weight/report-scale-weight-index/report-scale-weight-index.component';
import {ReportImportTotalIndexComponent} from './report-import-total/report-import-total-index/report-import-total-index.component';
import {SevenHourReportComponent} from './seven-hour-report/seven-hour-report.component';
import { ReportInventoryIndexComponent } from './report-inventory/report-inventory-index/report-inventory-index.component';
import { ReportStockItemIndexComponent } from './report-stock-item/report-stock-item-index/report-stock-item-index.component';

@NgModule({
  declarations: [
    ReportComponent,
    DashboardComponent,
    ReportImportExportIndexComponent,
    ReportStockExportIndexComponent,
    ReportStockImportIndexComponent,
    ReportMoistureIndexComponent,
    MidnightReportComponent,
    ReportScaleWeightIndexComponent,
    ReportImportTotalIndexComponent,
    SevenHourReportComponent,
    ReportInventoryIndexComponent,
    ReportStockItemIndexComponent,
  ],
  imports: [SharedModule, ReportRoutingModule],
})
export class ReportModule {}
