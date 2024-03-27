import {NgModule} from '@angular/core';
import {MasterDataRoutingModule} from './master-data-routing.module';
import {SharedModule} from '../share.modules';
import {UnitEditComponent} from './unit/unit-edit/unit-edit.component';
import {UnitCreateComponent} from './unit/unit-create/unit-create.component';
import {UnitIndexComponent} from './unit/unit-index/unit-index.component';
import {CustomerIndexComponent} from './customer/customer-index/customer-index.component';
import {CustomerCreateComponent} from './customer/customer-create/customer-create.component';
import {CustomerEditComponent} from './customer/customer-edit/customer-edit.component';
import {ProviderIndexComponent} from './provider/provider-index/provider-index.component';
import {ProviderCreateComponent} from './provider/provider-create/provider-create.component';
import {ProviderEditComponent} from './provider/provider-edit/provider-edit.component';
import {WarehouseIndexComponent} from './warehouse/warehouse-index/warehouse-index.component';
import {WarehouseCreateComponent} from './warehouse/warehouse-create/warehouse-create.component';
import {WarehouseEditComponent} from './warehouse/warehouse-edit/warehouse-edit.component';
import {ItemTypeIndexComponent} from './item-type/item-type-index/item-type-index.component';
import {ItemTypeCreateComponent} from './item-type/item-type-create/item-type-create.component';
import {ItemTypeEditComponent} from './item-type/item-type-edit/item-type-edit.component';
import {AreaIndexComponent} from './area/area-index/area-index.component';
import {AreaCreateComponent} from './area/area-create/area-create.component';
import {AreaEditComponent} from './area/area-edit/area-edit.component';
import {ProductIndexComponent} from './product/product-index/product-index.component';
import {ProductCreateComponent} from './product/product-create/product-create.component';
import {ProductEditComponent} from './product/product-edit/product-edit.component';
import {MixerIndexComponent, MixerCreateComponent, MixerEditComponent} from './mixer';
import {PourTypeIndexComponent, PourTypeCreateComponent, PourTypeEditComponent} from './pour-type';
import {OrdertypeIndexComponent} from './ordertype/ordertype-index/ordertype-index.component';
import {OrdertypeCreateComponent} from './ordertype/ordertype-create/ordertype-create.component';
import {OrdertypeEditComponent} from './ordertype/ordertype-edit/ordertype-edit.component';
import {DepartmentCreateComponent, DepartmentEditComponent, DepartmentIndexComponent} from './department';
import {VehicleTypeCreateComponent, VehicleTypeIndexComponent, VehicleTypeEditComponent} from './vehicle-type';
import {VehicleIndexComponent, VehicleEditComponent, VehicleCreateComponent} from './vehicle';
import {PartnerIndexComponent} from './partner/partner-index/partner-index.component';
import {PartnerEditComponent} from './partner/partner-edit/partner-edit.component';
import {PartnerCreateComponent} from './partner/partner-create/partner-create.component';
import {ProfileInforComponent} from './profile/profile-infor/profile-infor.component';
import {DevicegroupIndexComponent} from './devicegroup/devicegroup-index/devicegroup-index.component';
import {DevicegroupCreateComponent} from './devicegroup/devicegroup-create/devicegroup-create.component';
import {DevicegroupEditComponent} from './devicegroup/devicegroup-edit/devicegroup-edit.component';
import {DeviceTypeIndexComponent} from './device-type/device-type-index/device-type-index.component';
import {DeviceTypeCreateComponent} from './device-type/device-type-create/device-type-create.component';
import {DeviceTypeEditComponent} from './device-type/device-type-edit/device-type-edit.component';
import {DeviceIndexComponent} from './device/device-index/device-index.component';
import {DeviceCreateComponent} from './device/device-create/device-create.component';
import {DeviceEditComponent} from './device/device-edit/device-edit.component';
import {BankAccountIndexComponent} from './bank-account/bank-account-index/bank-account-index.component';
import {BankAccountEditComponent} from './bank-account/bank-account-edit/bank-account-edit.component';
import {BankAccountCreateComponent} from './bank-account/bank-account-create/bank-account-create.component';
import {InComeIndexComponent} from './Income/in-come-index/in-come-index.component';
import {InComeEditComponent} from './Income/in-come-edit/in-come-edit.component';
import {InComeCreateComponent} from './Income/in-come-create/in-come-create.component';
import {PayIndexComponent} from './pay/pay-index/pay-index.component';
import {PayEditComponent} from './pay/pay-edit/pay-edit.component';
import {PayCreateComponent} from './pay/pay-create/pay-create.component';
import {AttachmentIndexComponent} from './attachment/attachment-index/attachment-index.component';
import {PurchasingStationIndexComponent} from './purchasing-station/purchasing-station-index/purchasing-station-index.component';
import {PurchasingStationCreateComponent} from './purchasing-station/purchasing-station-create/purchasing-station-create.component';
import {PurchasingStationEditComponent} from './purchasing-station/purchasing-station-edit/purchasing-station-edit.component';
import {PourSectionIndexComponent} from './pour-section/pour-section-index/pour-section-index.component';
import {PourSectionCreateComponent} from './pour-section/pour-section-create/pour-section-create.component';
import {PourSectionEditComponent} from './pour-section/pour-section-edit/pour-section-edit.component';
import {PourLineIndexComponent} from './pour-line/pour-line-index/pour-line-index.component';
import {PourLineCreateComponent} from './pour-line/pour-line-create/pour-line-create.component';
import {PourLineEditComponent} from './pour-line/pour-line-edit/pour-line-edit.component';
import {ChipperIndexComponent} from './chipper/chipper-index/chipper-index.component';
import {ChipperCreateComponent} from './chipper/chipper-create/chipper-create.component';
import {ChipperEditComponent} from './chipper/chipper-edit/chipper-edit.component';
import {ShipIndexComponent} from './ship/ship-index/ship-index.component';
import {ShipCreateComponent} from './ship/ship-create/ship-create.component';
import {ShipEditComponent} from './ship/ship-edit/ship-edit.component';
import {WorkingShiftIndexComponent} from './working-shift/working-shift-index/working-shift-index.component';
import {WorkingShiftCreateComponent} from './working-shift/working-shift-create/working-shift-create.component';
import {WorkingShiftEditComponent} from './working-shift/working-shift-edit/working-shift-edit.component';
import {PricePolicyIndexComponent} from './price-policy/price-policy-index/price-policy-index.component';
import {PricePolicyCreateComponent} from './price-policy/price-policy-create/price-policy-create.component';
import {PricePolicyEditComponent} from './price-policy/price-policy-edit/price-policy-edit.component';
import { BridgePortIndexComponent } from './bridge-port/bridge-port-index/bridge-port-index.component';
import { BridgePortCreateComponent } from './bridge-port/bridge-port-create/bridge-port-create.component';
import { BridgePortEditComponent } from './bridge-port/bridge-port-edit/bridge-port-edit.component';
import { RfidIndexComponent } from './rfid/rfid-index/rfid-index.component';
import { RfidEditComponent } from './rfid/rfid-edit/rfid-edit.component';
import { RfidCreateComponent } from './rfid/rfid-create/rfid-create.component';

@NgModule({
  declarations: [
    UnitEditComponent,
    UnitCreateComponent,
    UnitIndexComponent,
    CustomerIndexComponent,
    CustomerCreateComponent,
    CustomerEditComponent,
    ProviderIndexComponent,
    ProviderCreateComponent,
    ProviderEditComponent,
    WarehouseIndexComponent,
    WarehouseCreateComponent,
    WarehouseEditComponent,
    ItemTypeIndexComponent,
    ItemTypeCreateComponent,
    ItemTypeEditComponent,
    AreaIndexComponent,
    AreaCreateComponent,
    AreaEditComponent,
    MixerIndexComponent,
    MixerCreateComponent,
    MixerEditComponent,
    PourTypeIndexComponent,
    PourTypeCreateComponent,
    PourTypeEditComponent,
    ProductIndexComponent,
    ProductCreateComponent,
    ProductEditComponent,
    OrdertypeIndexComponent,
    OrdertypeCreateComponent,
    OrdertypeEditComponent,
    DepartmentIndexComponent,
    DepartmentCreateComponent,
    DepartmentEditComponent,
    VehicleTypeIndexComponent,
    VehicleTypeCreateComponent,
    VehicleTypeEditComponent,
    VehicleIndexComponent,
    VehicleCreateComponent,
    VehicleEditComponent,
    PartnerIndexComponent,
    PartnerEditComponent,
    PartnerCreateComponent,
    ProfileInforComponent,
    DevicegroupIndexComponent,
    DevicegroupCreateComponent,
    DevicegroupEditComponent,
    DeviceTypeIndexComponent,
    DeviceTypeCreateComponent,
    DeviceTypeEditComponent,
    DeviceIndexComponent,
    DeviceCreateComponent,
    DeviceEditComponent,
    BankAccountIndexComponent,
    BankAccountEditComponent,
    BankAccountCreateComponent,
    InComeIndexComponent,
    InComeEditComponent,
    InComeCreateComponent,
    PayIndexComponent,
    PayEditComponent,
    PayCreateComponent,
    AttachmentIndexComponent,
    PurchasingStationIndexComponent,
    PurchasingStationCreateComponent,
    PurchasingStationEditComponent,
    PourSectionIndexComponent,
    PourSectionCreateComponent,
    PourSectionEditComponent,
    PourLineIndexComponent,
    PourLineCreateComponent,
    PourLineEditComponent,

    ChipperIndexComponent,
    ChipperCreateComponent,
    ChipperEditComponent,
    ShipIndexComponent,
    ShipCreateComponent,
    ShipEditComponent,
    WorkingShiftIndexComponent,
    WorkingShiftCreateComponent,
    WorkingShiftEditComponent,
    PricePolicyIndexComponent,
    PricePolicyCreateComponent,
    PricePolicyEditComponent,
    BridgePortIndexComponent,
    BridgePortCreateComponent,
    BridgePortEditComponent,
    RfidIndexComponent,
    RfidEditComponent,
    RfidCreateComponent,
  ],
  imports: [SharedModule, MasterDataRoutingModule],
})
export class MasterDataModule {}
