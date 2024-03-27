import {Injectable} from '@angular/core';
import {CommonService} from './common.service';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  constructor(private _commonService: CommonService) {}

  GetAllUnit(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`Unit/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllBusiness(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`Business/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllBankAccount(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`BankAccount/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllDepartment(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`Department/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllPosition(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`Position/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllPayType(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`PayType/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllAccount(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`Account/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllStock(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`Stock/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllItemType(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`ItemType/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllPartner(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`Partner/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllCompany(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`Company/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllBerth(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`Berth/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllProvider(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`Partner/GetAll`, {
      ...parameters,
      IsActive: isActive,
      IsProvider: true,
    });
  }

  GetAllPourType(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`PourType/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllOrderType(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`OrderType/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllOrder(parameters?: '') {
    return this._commonService.getRequest(`Order/GetAll`, parameters);
  }

  GetAllArea(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`Area/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllItem(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`Item/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllSand(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`Sand/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllStone(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`Stone/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllMixer(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`Mixer/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllDeviceType(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`DeviceType/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllDeviceGroup(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`DeviceGroup/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllVehicle(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`Vehicle/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }
  GetAllShip(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`Ship/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }
  GetAllCreateby(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`Account/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllAccountGroup(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`AccountGroup/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllVehicletype(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`VehicleType/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllBank(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`BankAccount/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }
  GetAllIncomeType(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`IncomeType/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllPurchasingStation(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`PurchasingStation/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }
  GetAllOrderBatch(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`OrderBatch/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllPourSection(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`PourSection/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllPourLine(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`PourLine/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllChipper(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`Chipper/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllWorkingShift(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`WorkingShift/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }
}
