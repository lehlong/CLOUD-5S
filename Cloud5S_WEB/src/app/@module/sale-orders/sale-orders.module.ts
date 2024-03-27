import {NgModule} from '@angular/core';
import {SaleOrderRoutingModule} from './sale-orders-routing.module';
import {SharedModule} from '../share.modules';
import {OrderIndexComponent} from './order/order-index/order-index.component';
import {OrderCreateComponent} from './order/order-create/order-create.component';
import {OrderEditComponent} from './order/order-edit/order-edit.component';
import {OrderReleaseIndexComponent} from './batching/order-release-index/order-release-index.component';
import {OrderReleaseCreateComponent} from './batching/order-release-create/order-release-create.component';
import {OrderReleaseEditComponent} from './batching/order-release-edit/order-release-edit.component';
import {OrderReleaseDetailComponent} from './batching/order-release-detail/order-release-detail.component';
import {DebtIndexComponent} from 'src/app/@module/sale-orders/debt/debt-index/debt-index.component';
import {DebtEditComponent} from 'src/app/@module/sale-orders/debt/debt-detail/debt-edit.component';
import {ExportIndexComponent} from './export/export-index/export-index.component';
import {ExportDetailComponent} from './export/export-detail/export-detail.component';
import {OrderReleaseInfoComponent} from './batching/order-release-info/order-release-info.component';
import {OrderScaleIndexComponent} from './order-scale/order-scale-index/order-scale-index.component';
import {OrderScaleEditComponent} from './order-scale/order-scale-edit/order-scale-edit.component';
import {InOutIndexComponent} from './in-out/in-out-index/in-out-index.component';
import {StockImportPrintComponent} from 'src/app/@module/print-templates/stock-import-print/stock-import-print.component';
import {OrderDetailComponent} from './order/order-detail/order-detail.component';
import {OrderReleasePrintComponent} from '../print-templates/order-release-print/order-release-print.component';
import {InOutDetailComponent} from './in-out/in-out-detail/in-out-detail.component';
import {InOutCameraComponent} from './in-out/in-out-camera/in-out-camera.component';
import {InOutAlbumComponent} from './in-out/in-out-album/in-out-album.component';
import {InOutImgComponent} from './in-out/in-out-img/in-out-img.component';
import {PlanManagementIndexComponent} from './plan-management/plan-management-index/plan-management-index.component';
import {ExportCreateComponent} from './export/export-create/export-create.component';
import {ExportEditComponent} from './export/export-edit/export-edit.component';
import {ExportTableComponent} from './export/export-table/export-table.component';
import {ChooseVehicleComponent} from './order-delivery/choose-vehicle/choose-vehicle.component';
import {UpdateShipComponent} from './order-sell/update-ship/update-ship.component';
import {OrderDeliveryIndexComponent} from './order-delivery/order-delivery-index/order-delivery-index.component';
import {OrderDeliveryCreateComponent} from './order-delivery/order-delivery-create/order-delivery-create.component';
import {OrderDeliveryDetailComponent} from './order-delivery/order-delivery-detail/order-delivery-detail.component';
import {OrderDeliveryEditComponent} from './order-delivery/order-delivery-edit/order-delivery-edit.component';
import {OrderDeliveryManagementIndexComponent} from './order-delivery-management/order-delivery-management-index/order-delivery-management-index.component';
import {OrderSellCreateComponent} from './order-sell/order-sell-create/order-sell-create.component';
import {OrderSellDetailComponent} from './order-sell/order-sell-detail/order-sell-detail.component';
import {OrderSellEditComponent} from './order-sell/order-sell-edit/order-sell-edit.component';
import {OrderSellIndexComponent} from './order-sell/order-sell-index/order-sell-index.component';
import {TrackingJourneyComponent} from './order-delivery/order-delivery-detail/tracking-journey/tracking-journey.component';
import { LeaveShipComponent } from './order-delivery/order-delivery-detail/leave-ship/leave-ship.component';
import { ReportOrderScaleComponent } from './order-scale/report-order-scale/report-order-scale/report-order-scale.component';

@NgModule({
  declarations: [
    StockImportPrintComponent,
    DebtEditComponent,
    DebtIndexComponent,
    OrderIndexComponent,
    OrderCreateComponent,
    OrderEditComponent,
    OrderReleaseIndexComponent,
    OrderReleaseCreateComponent,
    OrderReleaseEditComponent,
    OrderReleaseDetailComponent,
    ExportIndexComponent,
    ExportDetailComponent,
    OrderReleaseInfoComponent,
    OrderScaleIndexComponent,
    OrderScaleEditComponent,
    InOutIndexComponent,
    OrderDetailComponent,
    OrderReleasePrintComponent,
    InOutDetailComponent,
    InOutCameraComponent,
    InOutAlbumComponent,
    InOutImgComponent,
    PlanManagementIndexComponent,
    ExportCreateComponent,
    ExportEditComponent,
    ExportTableComponent,
    ExportEditComponent,
    ChooseVehicleComponent,
    UpdateShipComponent,
    OrderDeliveryIndexComponent,
    OrderDeliveryCreateComponent,
    OrderDeliveryDetailComponent,
    OrderDeliveryEditComponent,
    OrderDeliveryManagementIndexComponent,
    OrderSellCreateComponent,
    OrderSellDetailComponent,
    OrderSellEditComponent,
    OrderSellIndexComponent,
    TrackingJourneyComponent,
    LeaveShipComponent,
    ReportOrderScaleComponent,
  ],
  imports: [SharedModule, SaleOrderRoutingModule],
})
export class SaleOrdersModule {}
