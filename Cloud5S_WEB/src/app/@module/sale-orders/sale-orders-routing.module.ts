import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderIndexComponent} from './order/order-index/order-index.component';
import {OrderReleaseIndexComponent} from './batching/order-release-index/order-release-index.component';
import {DebtIndexComponent} from './debt/debt-index/debt-index.component';
import {ExportIndexComponent} from './export/export-index/export-index.component';
import {OrderScaleIndexComponent} from './order-scale/order-scale-index/order-scale-index.component';
import {InOutIndexComponent} from './in-out/in-out-index/in-out-index.component';
import {InOutAlbumComponent} from './in-out/in-out-album/in-out-album.component';
import {PlanManagementIndexComponent} from './plan-management/plan-management-index/plan-management-index.component';
import {ResultComponent} from 'src/app/@module/components/result/result.component';
import {OrderDeliveryIndexComponent} from './order-delivery/order-delivery-index/order-delivery-index.component';
import {OrderDeliveryManagementIndexComponent} from './order-delivery-management/order-delivery-management-index/order-delivery-management-index.component';
import {OrderSellIndexComponent} from './order-sell/order-sell-index/order-sell-index.component';
import {ReportOrderScaleComponent} from './order-scale/report-order-scale/report-order-scale/report-order-scale.component';

const routes: Routes = [
  {path: 'order', component: OrderIndexComponent},
  {path: 'order-sell', component: OrderSellIndexComponent},
  {path: 'debt', component: DebtIndexComponent},
  {path: 'batching', component: OrderReleaseIndexComponent},
  {path: 'export', component: ExportIndexComponent},
  {path: 'orderscale', component: OrderScaleIndexComponent},
  {path: 'in-out', component: InOutIndexComponent},
  {path: 'in-out/album', component: InOutAlbumComponent},
  {path: 'plan-management', component: PlanManagementIndexComponent},
  {path: 'order-delivery', component: OrderDeliveryIndexComponent},
  {path: 'order-delivery-management', component: OrderDeliveryManagementIndexComponent},
  {path: 'report-orderscale', component: ReportOrderScaleComponent},
  {path: '**', component: ResultComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaleOrderRoutingModule {}
