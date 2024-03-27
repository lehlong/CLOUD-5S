import {NgModule} from '@angular/core';
import {BusinessRoutingModule} from './business-routing.module';
import {SharedModule} from '../share.modules';
import {StockImportIndexComponent} from 'src/app/@module/business/stock-import/stock-import-index/stock-import-index.component';
import {StockItemIdnexComponent} from 'src/app/@module/business/stock-item/stock-item-index.component';
import {StockExportIndexComponent} from 'src/app/@module/business/stock-export/stock-export-index/stock-export-index.component';
import {NotificationIndexComponent} from 'src/app/@module/business/notification/notification-index/notification-index.component';
import {MapComponent} from 'src/app/@module/business/map/map.component';
import {
  CustomerCareIndexComponent,
  CustomerCareCreateComponent,
  CustomerCareEditComponent,
  CustomerInforComponent,
} from './customer-care';
import {StockImportEditComponent} from 'src/app/@module/business/stock-import/stock-import-edit/stock-import-edit.component';
import {StockImportCreateComponent} from 'src/app/@module/business/stock-import/stock-import-create/stock-import-create.component';
import {StockImportDetailComponent} from 'src/app/@module/business/stock-import/stock-import-detail/stock-import-detail.component';
import {StockChooseItemComponent} from 'src/app/@module/business/stock-import/stock-choose-item/stock-choose-item.component';
import {StockExportEditComponent} from 'src/app/@module/business/stock-export/stock-export-edit/stock-export-edit.component';
import {NotifyChooseItemComponent} from 'src/app/@module/business/notification/notify-choose-item/notify-choose-item.component';
import {NotificationDetailsComponent} from 'src/app/@module/business/notification/notification-details/notification-details.component';
import {NotificationCreateComponent} from 'src/app/@module/business/notification/notification-create/notification-create.component';
import {CustomerListOrderComponent} from 'src/app/@module/business/customer-care/customer-list-order/customer-list-order.component';
import {DetailOrderComponent} from 'src/app/@module/business/customer-care/detail-order/detail-order.component';
import {OrderImportIndexComponent} from './order-import/order-import-index/order-import-index.component';
import {OrderImportCreateComponent} from './order-import/order-import-create/order-import-create.component';
import {OrderChooseItemComponent} from './order-import/order-choose-item/order-choose-item.component';
import {OrderImportEditComponent} from './order-import/order-import-edit/order-import-edit.component';
import {OrderImportDetailComponent} from './order-import/order-import-detail/order-import-detail.component';
import {PaymentVoucherIndexComponent} from './payment-voucher/payment-voucher-index/payment-voucher-index.component';
import {PaymentVoucherDetailComponent} from './payment-voucher/payment-voucher-detail/payment-voucher-detail.component';
import {PaymentVoucherEditComponent} from './payment-voucher/payment-voucher-edit/payment-voucher-edit.component';
import {PaymentVoucherCreateComponent} from './payment-voucher/payment-voucher-create/payment-voucher-create.component';
import {IncomeIndexComponent} from './income/income-index/income-index.component';
import {IncomeCreateComponent} from './income/income-create/income-create.component';
import {IncomeDetailComponent} from './income/income-detail/income-detail.component';
import {IncomeEditComponent} from './income/income-edit/income-edit.component';
import {PaymentIncomeIndexComponent} from './payment-in-come/payment-in-come-index/payment-in-come-index.component';
import {PaymentIncomeDetailComponent} from './payment-in-come/payment-in-come-detail/payment-in-come-detail.component';
import {ChoosePartnerComponent} from './payment-voucher/choose-partner/choose-partner.component';
import {ChooseReceiptComponent} from './payment-voucher/choose-receipt/choose-receipt.component';
import {ChoosePartnerIncomeComponent} from './income/choose-partner/choose-partner.component';
import {PaymentPayIndexComponent} from './payment-pay/payment-pay-index/payment-pay-index.component';
import {PaymentPayDetailComponent} from './payment-pay/payment-pay-detail/payment-pay-detail.component';
import {ChooseExportIncomeComponent} from './income/choose-export/choose-export.component';
import {ManufactureCommandIndexComponent} from './manufacture-command/manufacture-command-index/manufacture-command-index.component';
import {ManufactureCommandPrintComponent} from './manufacture-command/manufacture-command-print/manufacture-command-print.component';
import {ContractEditComponent} from 'src/app/@module/business/contract/contract-edit/contract-edit.component';
import {ContractIndexComponent} from 'src/app/@module/business/contract/contract-index/contract-index.component';
import {ContractCreateComponent} from 'src/app/@module/business/contract/contract-create/contract-create.component';
import {ContractDetailComponent} from 'src/app/@module/business/contract/contract-detail/contract-detail.component';
import {ContractChooseItemComponent} from 'src/app/@module/business/contract/contract-choose-item/contract-choose-item.component';
import {FileManagementComponent} from './file-management/file-management/file-management.component';

import {HumidityEvaluateIndexComponent} from './humidity-evaluate/humidity-evaluate-index/humidity-evaluate-index.component';
import {ProductionManagerIndexComponent} from './production-manager/production-manager-index/production-manager-index.component';
import {ListPurchaseOrdersComponent} from './production-manager/list-purchase-orders/list-purchase-orders.component';
import {ShiftBasedProductionManagementComponent} from './production-manager/shift-based-production-management/shift-based-production-management.component';
import {EnterProductionInformationComponent} from './production-manager/shift-based-production-management/enter-production-information/enter-production-information.component';
import {ChangeSectionLineComponent} from './production-manager/report-inventory/change-section-line/change-section-line.component';
import {HumidityEvaluateViewComponent} from './humidity-evaluate/humidity-evaluate-view/humidity-evaluate-view.component';
import {ReportInventoryComponent} from './production-manager/report-inventory/report-inventory.component';
import { ListStockItemTransferLogComponent } from './production-manager/list-stock-item-transfer-log/list-stock-item-transfer-log.component';
import { DataStockWoodComponent } from './production-manager/data-stock-wood/data-stock-wood.component';
@NgModule({
  declarations: [
    CustomerListOrderComponent,
    DetailOrderComponent,
    NotificationCreateComponent,
    NotificationDetailsComponent,
    NotifyChooseItemComponent,
    StockExportEditComponent,
    StockChooseItemComponent,
    StockImportDetailComponent,
    StockImportCreateComponent,
    StockImportEditComponent,
    CustomerCareEditComponent,
    CustomerInforComponent,
    CustomerCareCreateComponent,
    StockImportIndexComponent,
    StockItemIdnexComponent,
    StockExportIndexComponent,
    CustomerCareIndexComponent,
    NotificationIndexComponent,
    MapComponent,
    OrderImportIndexComponent,
    OrderImportCreateComponent,
    OrderChooseItemComponent,
    OrderImportEditComponent,
    OrderImportDetailComponent,
    PaymentVoucherIndexComponent,
    PaymentVoucherDetailComponent,
    PaymentVoucherEditComponent,
    PaymentVoucherCreateComponent,
    IncomeIndexComponent,
    IncomeCreateComponent,
    IncomeDetailComponent,
    IncomeEditComponent,
    PaymentIncomeIndexComponent,
    PaymentIncomeDetailComponent,
    ChoosePartnerComponent,
    ChooseReceiptComponent,
    ChoosePartnerIncomeComponent,
    PaymentPayIndexComponent,
    PaymentPayDetailComponent,
    ChooseExportIncomeComponent,
    ManufactureCommandIndexComponent,
    ManufactureCommandPrintComponent,
    ContractIndexComponent,
    ContractEditComponent,
    ContractCreateComponent,
    ContractDetailComponent,
    ContractChooseItemComponent,
    FileManagementComponent,
    HumidityEvaluateIndexComponent,
    ProductionManagerIndexComponent,
    ListPurchaseOrdersComponent,
    ShiftBasedProductionManagementComponent,
    ReportInventoryComponent,
    EnterProductionInformationComponent,
    ChangeSectionLineComponent,
    HumidityEvaluateViewComponent,
    ListStockItemTransferLogComponent,
    DataStockWoodComponent,
  ],
  imports: [BusinessRoutingModule, SharedModule],
})
export class BusinessModule {}
