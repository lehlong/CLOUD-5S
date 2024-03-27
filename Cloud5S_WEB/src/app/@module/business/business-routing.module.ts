import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StockImportIndexComponent} from 'src/app/@module/business/stock-import/stock-import-index/stock-import-index.component';
import {StockItemIdnexComponent} from 'src/app/@module/business/stock-item/stock-item-index.component';
import {StockExportIndexComponent} from 'src/app/@module/business/stock-export/stock-export-index/stock-export-index.component';
import {CustomerCareIndexComponent} from 'src/app/@module/business/customer-care';
import {NotificationIndexComponent} from 'src/app/@module/business/notification/notification-index/notification-index.component';
import {MapComponent} from 'src/app/@module/business/map/map.component';
import {OrderImportIndexComponent} from './order-import/order-import-index/order-import-index.component';
import {PaymentVoucherIndexComponent} from './payment-voucher/payment-voucher-index/payment-voucher-index.component';
import {ResultComponent} from 'src/app/@module/components/result/result.component';
import {IncomeIndexComponent} from './income/income-index/income-index.component';
import {PaymentIncomeIndexComponent} from './payment-in-come/payment-in-come-index/payment-in-come-index.component';
import {PaymentPayIndexComponent} from './payment-pay/payment-pay-index/payment-pay-index.component';
import {ManufactureCommandIndexComponent} from './manufacture-command/manufacture-command-index/manufacture-command-index.component';
import {ManufactureCommandPrintComponent} from './manufacture-command/manufacture-command-print/manufacture-command-print.component';
import {ContractIndexComponent} from 'src/app/@module/business/contract/contract-index/contract-index.component';
import {FileManagementComponent} from './file-management/file-management/file-management.component';
import {HumidityEvaluateIndexComponent} from 'src/app/@module/business/humidity-evaluate/humidity-evaluate-index/humidity-evaluate-index.component';
import {ProductionManagerIndexComponent} from './production-manager/production-manager-index/production-manager-index.component';
import { HumidityEvaluateViewComponent } from 'src/app/@module/business/humidity-evaluate/humidity-evaluate-view/humidity-evaluate-view.component';

const routes: Routes = [
  {path: 'map', component: MapComponent},
  {path: 'notification', component: NotificationIndexComponent},
  {path: 'customer-care', component: CustomerCareIndexComponent},
  {path: 'stockitem', component: StockItemIdnexComponent},
  {path: 'stock-export', component: StockExportIndexComponent},
  {path: 'stock-import', component: StockImportIndexComponent},
  {path: 'order-import', component: OrderImportIndexComponent},
  {path: 'payment-voucher', component: PaymentVoucherIndexComponent},
  {path: 'payment-in-come', component: PaymentIncomeIndexComponent},
  {path: 'payment-pay', component: PaymentPayIndexComponent},
  {path: 'income', component: IncomeIndexComponent},
  {path: 'manufacture-command', component: ManufactureCommandIndexComponent},
  {path: 'manufacture-print', component: ManufactureCommandPrintComponent},
  {path: 'contract', component: ContractIndexComponent},
  {path: 'file-management', component: FileManagementComponent},
  {path: 'humidity-evaluate', component: HumidityEvaluateIndexComponent},
  {path: 'humidity-view', component: HumidityEvaluateViewComponent},
  {path: 'production-manager', component: ProductionManagerIndexComponent},
  {path: '**', component: ResultComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessRoutingModule {}
