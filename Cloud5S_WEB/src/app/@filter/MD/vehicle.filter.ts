import {BaseFilter} from '../Common/base.filter';
import {EROLE_CODES} from 'src/app/utils/constant';

export class VehicleFilter extends BaseFilter {
  code: string = '';
  typeCode: string = '';
  unitCode: string = '';
  RoleCode: string = EROLE_CODES['LAI_XE'];

  driverUserName?: string = '';
}

export class AccountGetAllFilter {
  groupId: string = '';
  RoleCode: string = EROLE_CODES['LAI_XE'];
  KeyWord: string = '';
  isActive: boolean | string = true;
}
