import {AttachmentIndexComponent} from './attachment/attachment-index/attachment-index.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UnitIndexComponent} from './unit/unit-index/unit-index.component';
import {CustomerIndexComponent} from './customer/customer-index/customer-index.component';
import {ProviderIndexComponent} from './provider/provider-index/provider-index.component';
import {WarehouseIndexComponent} from './warehouse/warehouse-index/warehouse-index.component';
import {ItemTypeIndexComponent} from './item-type/item-type-index/item-type-index.component';
import {AreaIndexComponent} from './area/area-index/area-index.component';
import {MixerIndexComponent} from './mixer';
import {ProductIndexComponent} from './product/product-index/product-index.component';
import {OrdertypeIndexComponent} from './ordertype/ordertype-index/ordertype-index.component';
import {PourTypeIndexComponent} from './pour-type';
import {DepartmentIndexComponent} from './department';
import {VehicleTypeIndexComponent} from './vehicle-type';
import {VehicleIndexComponent} from './vehicle';
import {PartnerIndexComponent} from './partner/partner-index/partner-index.component';
import {ProfileInforComponent} from './profile/profile-infor/profile-infor.component';
import {DevicegroupIndexComponent} from './devicegroup/devicegroup-index/devicegroup-index.component';
import {DeviceTypeIndexComponent} from './device-type/device-type-index/device-type-index.component';
import {DeviceIndexComponent} from './device/device-index/device-index.component';
import {ResultComponent} from 'src/app/@module/components/result/result.component';
import {InComeIndexComponent} from './Income/in-come-index/in-come-index.component';
import {BankAccountIndexComponent} from './bank-account/bank-account-index/bank-account-index.component';
import {PayIndexComponent} from './pay/pay-index/pay-index.component';
import {PurchasingStationIndexComponent} from './purchasing-station/purchasing-station-index/purchasing-station-index.component';
import {PourSectionIndexComponent} from './pour-section/pour-section-index/pour-section-index.component';
import {PourLineIndexComponent} from './pour-line/pour-line-index/pour-line-index.component';

import {ChipperIndexComponent} from './chipper/chipper-index/chipper-index.component';
import {ShipIndexComponent} from './ship/ship-index/ship-index.component';
import {WorkingShiftIndexComponent} from './working-shift/working-shift-index/working-shift-index.component';
import {PricePolicyIndexComponent} from './price-policy/price-policy-index/price-policy-index.component';
import {BridgePortIndexComponent} from './bridge-port/bridge-port-index/bridge-port-index.component';
import { RfidIndexComponent } from './rfid/rfid-index/rfid-index.component';
const routes: Routes = [
  {path: 'unit', component: UnitIndexComponent},
  {path: 'customer', component: CustomerIndexComponent},
  {path: 'provider', component: ProviderIndexComponent},
  {path: 'stock', component: WarehouseIndexComponent},
  {path: 'item-type', component: ItemTypeIndexComponent},
  {path: 'area', component: AreaIndexComponent},
  {path: 'mixer', component: MixerIndexComponent},
  {path: 'product', component: ProductIndexComponent},
  {path: 'pour-type', component: PourTypeIndexComponent},
  {path: 'order-type', component: OrdertypeIndexComponent},
  {path: 'department', component: DepartmentIndexComponent},
  {path: 'vehicle-type', component: VehicleTypeIndexComponent},
  {path: 'vehicle', component: VehicleIndexComponent},
  {path: 'partner', component: PartnerIndexComponent},
  {path: 'profile', component: ProfileInforComponent},
  {path: 'device-group', component: DevicegroupIndexComponent},
  {path: 'device-type', component: DeviceTypeIndexComponent},
  {path: 'device', component: DeviceIndexComponent},
  {path: 'bank-account', component: BankAccountIndexComponent},
  {path: 'in-come', component: InComeIndexComponent},
  {path: 'pay', component: PayIndexComponent},
  {path: 'attachment', component: AttachmentIndexComponent},
  {path: 'purchasing-station', component: PurchasingStationIndexComponent},
  {path: 'pour-section', component: PourSectionIndexComponent},
  {path: 'pour-line', component: PourLineIndexComponent},
  {path: 'bridge-port', component: BridgePortIndexComponent},
  {path: 'chipper', component: ChipperIndexComponent},
  {path: 'ship', component: ShipIndexComponent},
  {path: 'working-shift', component: WorkingShiftIndexComponent},
  {path: 'price-policy', component: PricePolicyIndexComponent},
  {path: 'rfid', component: RfidIndexComponent},
  {path: '**', component: ResultComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterDataRoutingModule {}
