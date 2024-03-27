import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from 'src/app/@module/report/dashboard/dashboard.component';
import {ReportImportExportIndexComponent} from 'src/app/@module/report/report-import-export-index/report-import-export-index.component';
import {ReportStockExportIndexComponent} from 'src/app/@module/report/report-stock-export-index/report-stock-export-index.component';
import {ReportStockImportIndexComponent} from 'src/app/@module/report/report-stock-import-index/report-stock-import-index.component';
import {ReportMoistureIndexComponent} from './report-moisture-index/report-moisture-index.component';
import {MidnightReportComponent} from './midnight-report/midnight-report.component';
import {ReportScaleWeightIndexComponent} from './report-scale-weight/report-scale-weight-index/report-scale-weight-index.component';
import {ReportImportTotalIndexComponent} from './report-import-total/report-import-total-index/report-import-total-index.component';
import {ReportStockItemIndexComponent} from './report-stock-item/report-stock-item-index/report-stock-item-index.component';
import {SevenHourReportComponent} from './seven-hour-report/seven-hour-report.component';
import {ReportInventoryIndexComponent} from './report-inventory/report-inventory-index/report-inventory-index.component';
const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'report-import-export', component: ReportImportExportIndexComponent},
  {path: 'report-stock-export', component: ReportStockExportIndexComponent},
  {path: 'report-stock-import', component: ReportStockImportIndexComponent},
  {path: 'report-moisture', component: ReportMoistureIndexComponent},
  {path: 'midnight-report', component: MidnightReportComponent},
  {path: 'report-scale-weight', component: ReportScaleWeightIndexComponent},
  {path: 'report-import-total', component: ReportImportTotalIndexComponent},
  {path: 'seven-hour-report', component: SevenHourReportComponent},
  {path: 'report-inventory', component: ReportInventoryIndexComponent},
  {path: 'report-stock-item', component: ReportStockItemIndexComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
